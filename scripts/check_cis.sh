#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ENV_FILE:-$ROOT_DIR/.env.local}"

if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a
fi

BIND_HOST="${AURORA_BIND_HOST:-127.0.0.1}"
FRONTEND_PORT="${AURORA_FRONTEND_PORT:-19100}"
BACKEND_PORT="${AURORA_BACKEND_PORT:-19101}"
PROXY_URL="${CIS_PROXY_URL:-https://cis.auroramind.fr}"

FRONTEND_URL="http://${BIND_HOST}:${FRONTEND_PORT}"
BACKEND_URL="http://${BIND_HOST}:${BACKEND_PORT}/api/v1/health"

printf "Checking frontend (%s)...\n" "$FRONTEND_URL"
curl -fsS "${FRONTEND_URL}/login" > /dev/null

printf "Checking backend (%s)...\n" "$BACKEND_URL"
curl -fsS "$BACKEND_URL" > /dev/null

if [ "${SKIP_PROXY:-0}" != "1" ]; then
  printf "Checking proxy (%s)...\n" "$PROXY_URL"
  curl -fsS "${PROXY_URL}/api/v1/health" > /dev/null
  curl -fsS "${PROXY_URL}/" > /dev/null
fi

echo "OK"
