#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

env_file=""
if [[ -f ".env.local" ]]; then
  env_file=".env.local"
elif [[ -f ".env" ]]; then
  env_file=".env"
else
  env_file=".env.local"
fi

created_env="false"
if ! command -v docker >/dev/null 2>&1; then
  echo "ERROR: Docker is required. Install Docker Desktop (Windows/macOS) or Docker Engine (Linux)." >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "ERROR: docker compose is required (Compose v2 plugin)." >&2
  exit 1
fi

if [[ ! -f "$env_file" ]]; then
  if [[ ! -f ".env.example" ]]; then
    echo "ERROR: .env.example not found." >&2
    exit 1
  fi
  cp .env.example "$env_file"
  created_env="true"
  echo "Created ${env_file} from .env.example"
fi

python_bin=""
if command -v python3 >/dev/null 2>&1; then
  python_bin="python3"
elif command -v python >/dev/null 2>&1; then
  python_bin="python"
fi

if [[ -z "$python_bin" ]]; then
  echo "ERROR: python3 (or python) is required for one-pass setup." >&2
  echo "Tip: install Python 3, or edit ${env_file} manually and run: docker compose --env-file ${env_file} up -d --build" >&2
  exit 1
fi

set_env_kv() {
  local key="$1"
  local value="$2"
  "$python_bin" - "$env_file" "$key" "$value" <<'PY'
from __future__ import annotations

import sys
from pathlib import Path

env_path = Path(sys.argv[1])
key = sys.argv[2]
value = sys.argv[3]

lines = env_path.read_text(encoding="utf-8").splitlines()
out = []
found = False
for line in lines:
    if not line or line.lstrip().startswith("#") or "=" not in line:
        out.append(line)
        continue
    k, _ = line.split("=", 1)
    if k == key:
        out.append(f"{key}={value}")
        found = True
    else:
        out.append(line)

if not found:
    out.append(f"{key}={value}")

env_path.write_text("\n".join(out) + "\n", encoding="utf-8")
PY
}

get_env_kv() {
  local key="$1"
  "$python_bin" - "$env_file" "$key" <<'PY'
import sys
from pathlib import Path

env_path = Path(sys.argv[1])
key = sys.argv[2]
if not env_path.exists():
    raise SystemExit(1)
for line in env_path.read_text(encoding="utf-8").splitlines():
    if not line or line.lstrip().startswith("#") or "=" not in line:
        continue
    k, v = line.split("=", 1)
    if k == key:
        print(v)
        break
PY
}

random_secret() {
  "$python_bin" - <<'PY'
import secrets
import string

alphabet = string.ascii_letters + string.digits
print("".join(secrets.choice(alphabet) for _ in range(32)))
PY
}

fernet_key() {
  "$python_bin" - <<'PY'
import base64
import os

print(base64.urlsafe_b64encode(os.urandom(32)).decode("utf-8"))
PY
}

port_is_free() {
  local port="$1"
  "$python_bin" - "$port" <<'PY'
import socket
import sys

port = int(sys.argv[1])
s = socket.socket()
try:
    s.bind(("127.0.0.1", port))
except OSError:
    raise SystemExit(1)
finally:
    s.close()
PY
}

find_free_port() {
  local start="$1"
  local port="$start"
  while ! port_is_free "$port" >/dev/null 2>&1; do
    port="$((port + 1))"
    if [[ "$port" -gt 65535 ]]; then
      echo "ERROR: could not find a free port starting at $start" >&2
      exit 1
    fi
  done
  echo "$port"
}

bind_host="$(get_env_kv AURORA_BIND_HOST 2>/dev/null || true)"
bind_host="${bind_host:-127.0.0.1}"
set_env_kv AURORA_BIND_HOST "$bind_host"

frontend_port="$(get_env_kv AURORA_FRONTEND_PORT 2>/dev/null || true)"
backend_port="$(get_env_kv AURORA_BACKEND_PORT 2>/dev/null || true)"
db_port="$(get_env_kv AURORA_DB_PORT 2>/dev/null || true)"

frontend_port="${frontend_port:-19100}"
backend_port="${backend_port:-19101}"
db_port="${db_port:-19432}"

if [[ "$created_env" == "true" ]]; then
  frontend_port="$(find_free_port "$frontend_port")"
  backend_port="$(find_free_port "$backend_port")"
  db_port="$(find_free_port "$db_port")"
fi

set_env_kv AURORA_FRONTEND_PORT "$frontend_port"
set_env_kv AURORA_BACKEND_PORT "$backend_port"
set_env_kv AURORA_DB_PORT "$db_port"

db_password="$(get_env_kv AURORA_DB_PASSWORD 2>/dev/null || true)"
if [[ -z "$db_password" || "$db_password" == "change_me" ]]; then
  set_env_kv AURORA_DB_PASSWORD "$(random_secret)"
fi

admin_email="$(get_env_kv ADMIN_EMAIL 2>/dev/null || true)"
admin_password="$(get_env_kv ADMIN_PASSWORD 2>/dev/null || true)"
project_title="$(get_env_kv AURORA_PROJECT_TITLE 2>/dev/null || true)"
public_app_name="$(get_env_kv NEXT_PUBLIC_APP_NAME 2>/dev/null || true)"

is_tty="false"
if [[ -t 0 ]]; then
  is_tty="true"
fi

needs_project_title_prompt="false"
if [[ -z "${project_title:-}" || "${project_title:-}" == "Mon projet" ]]; then
  needs_project_title_prompt="true"
fi

needs_admin_email_prompt="false"
if [[ -z "${admin_email:-}" || "${admin_email:-}" == "admin@example.com" ]]; then
  needs_admin_email_prompt="true"
fi

needs_admin_password_prompt="false"
if [[ -z "${admin_password:-}" || "${admin_password:-}" == "change_me" ]]; then
  needs_admin_password_prompt="true"
fi

if [[ "$is_tty" == "true" && ( "$created_env" == "true" || "$needs_project_title_prompt" == "true" || "$needs_admin_email_prompt" == "true" || "$needs_admin_password_prompt" == "true" ) ]]; then
  echo
  if [[ "$created_env" == "true" ]]; then
    echo "=== Configuration du projet (premier lancement) ==="
  else
    echo "=== Configuration du projet (valeurs par défaut détectées) ==="
  fi

  if [[ "$created_env" == "true" || "$needs_project_title_prompt" == "true" ]]; then
    default_project_title="${project_title:-Mon projet}"
    read -r -p "Nom du projet (affiché dans l'interface) [${default_project_title}] : " input_title
    project_title="${input_title:-$default_project_title}"
    set_env_kv AURORA_PROJECT_TITLE "$project_title"

    # Keep frontend name aligned by default.
    set_env_kv NEXT_PUBLIC_APP_NAME "$project_title"
  fi

  if [[ "$created_env" == "true" || "$needs_admin_email_prompt" == "true" ]]; then
    default_admin_email="${admin_email:-admin@example.com}"
    read -r -p "Email administrateur (connexion) [${default_admin_email}] : " input_email
    admin_email="${input_email:-$default_admin_email}"
    set_env_kv ADMIN_EMAIL "$admin_email"
  fi

  if [[ "$created_env" == "true" || "$needs_admin_password_prompt" == "true" ]]; then
    while true; do
      echo
      read -r -s -p "Mot de passe administrateur (laisser vide pour générer automatiquement) : " pass1
      echo
      if [[ -z "$pass1" ]]; then
        admin_password="$(random_secret)"
        echo "Mot de passe généré. (Il est enregistré dans ${env_file})"
        break
      fi
      read -r -s -p "Confirmer le mot de passe : " pass2
      echo
      if [[ "$pass1" != "$pass2" ]]; then
        echo "Les mots de passe ne correspondent pas. Réessaie."
        continue
      fi
      admin_password="$pass1"
      break
    done
    set_env_kv ADMIN_PASSWORD "$admin_password"
  fi
fi

if [[ -z "$project_title" ]]; then
  set_env_kv AURORA_PROJECT_TITLE "Mon projet"
fi

if [[ -z "$public_app_name" ]]; then
  set_env_kv NEXT_PUBLIC_APP_NAME "${project_title:-Mon projet}"
fi

if [[ -z "$admin_email" ]]; then
  set_env_kv ADMIN_EMAIL "admin@example.com"
fi

if [[ -z "$admin_password" || "$admin_password" == "change_me" ]]; then
  set_env_kv ADMIN_PASSWORD "$(random_secret)"
fi

if [[ "$is_tty" != "true" ]]; then
  if [[ "$needs_admin_email_prompt" == "true" || "$needs_admin_password_prompt" == "true" ]]; then
    echo
    echo "NOTE: exécution non-interactive détectée (pas de terminal)."
    echo "Les identifiants administrateur sont (ou seront) définis dans ${env_file}."
    echo "Ouvre ${env_file} et vérifie ADMIN_EMAIL / ADMIN_PASSWORD avant de te connecter."
  fi
fi

allowed_origins="$(get_env_kv ALLOWED_ORIGINS 2>/dev/null || true)"
if [[ -z "$allowed_origins" ]]; then
  set_env_kv ALLOWED_ORIGINS "http://localhost:3000,http://localhost:${frontend_port},https://stack.auroramind.fr"
fi

jwt_secret="$(get_env_kv JWT_SECRET_KEY 2>/dev/null || true)"
if [[ -z "$jwt_secret" || "$jwt_secret" == "change_me" || "${#jwt_secret}" -lt 32 ]]; then
  set_env_kv JWT_SECRET_KEY "$(random_secret)"
fi

enc_key="$(get_env_kv AURORA_ENCRYPTION_KEY 2>/dev/null || true)"
if [[ -z "$enc_key" || "$enc_key" == "change_me" ]]; then
  set_env_kv AURORA_ENCRYPTION_KEY "$(fernet_key)"
fi

jwt_alg="$(get_env_kv JWT_ALGORITHM 2>/dev/null || true)"
if [[ -z "$jwt_alg" ]]; then
  set_env_kv JWT_ALGORITHM "HS256"
fi

jwt_exp="$(get_env_kv JWT_ACCESS_TOKEN_EXPIRE_MINUTES 2>/dev/null || true)"
if [[ -z "$jwt_exp" ]]; then
  set_env_kv JWT_ACCESS_TOKEN_EXPIRE_MINUTES "60"
fi

backend_url="$(get_env_kv NEXT_PUBLIC_BACKEND_URL 2>/dev/null || true)"
if [[ -z "$backend_url" ]]; then
  set_env_kv NEXT_PUBLIC_BACKEND_URL "/api/v1"
fi

echo "Starting stack (Docker Compose)..."
docker compose --env-file "$env_file" up -d --build

echo "Applying database migrations..."
docker compose --env-file "$env_file" exec -T backend python -m alembic upgrade head

echo
echo "Ready."
echo "- Frontend: http://localhost:${frontend_port}/login"
echo "- Backend health: http://localhost:${backend_port}/api/v1/health"
echo "- Postgres: host=${bind_host} port=${db_port}"
echo
echo "If installed on a server with AURORA_BIND_HOST=127.0.0.1, use an SSH tunnel:"
echo "  ssh -L ${frontend_port}:localhost:${frontend_port} -L ${backend_port}:localhost:${backend_port} -L ${db_port}:localhost:${db_port} user@your-server -N"
