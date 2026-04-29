$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$EnvFile = if (Test-Path ".env.local") { ".env.local" } elseif (Test-Path ".env") { ".env" } else { ".env.local" }

function Assert-Command($name) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    throw "Missing required command: $name"
  }
}

Assert-Command "docker"

try {
  docker compose version | Out-Null
} catch {
  throw "docker compose (Compose v2) is required."
}

$createdEnv = $false
if (-not (Test-Path $EnvFile)) {
  if (-not (Test-Path ".env.example")) {
    throw ".env.example not found."
  }
  Copy-Item ".env.example" $EnvFile
  $createdEnv = $true
  Write-Host "Created $EnvFile from .env.example"
}

function Get-EnvValue($key) {
  $lines = Get-Content $EnvFile -ErrorAction Stop
  foreach ($line in $lines) {
    if ($line -match "^\s*#" -or -not ($line -match "=")) { continue }
    $parts = $line.Split("=", 2)
    if ($parts[0] -eq $key) { return $parts[1] }
  }
  return $null
}

function Set-EnvValue($key, $value) {
  $lines = Get-Content $EnvFile -ErrorAction Stop
  $out = New-Object System.Collections.Generic.List[string]
  $found = $false
  foreach ($line in $lines) {
    if ($line -match "^\s*#" -or -not ($line -match "=")) {
      $out.Add($line)
      continue
    }
    $parts = $line.Split("=", 2)
    if ($parts[0] -eq $key) {
      $out.Add("$key=$value")
      $found = $true
    } else {
      $out.Add($line)
    }
  }
  if (-not $found) { $out.Add("$key=$value") }
  ($out -join "`n") + "`n" | Set-Content $EnvFile -Encoding UTF8
}

function New-RandomSecret() {
  $bytes = New-Object byte[] 24
  [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
  return [Convert]::ToBase64String($bytes).Replace("+", "").Replace("/", "").Replace("=", "")
}

function New-FernetKey() {
  $bytes = New-Object byte[] 32
  [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
  return [Convert]::ToBase64String($bytes).Replace("+", "-").Replace("/", "_")
}

function Test-PortFree($port) {
  try {
    $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, [int]$port)
    $listener.Start()
    $listener.Stop()
    return $true
  } catch {
    return $false
  }
}

function Find-FreePort($startPort) {
  $p = [int]$startPort
  while ($p -le 65535) {
    if (Test-PortFree $p) { return $p }
    $p++
  }
  throw "Could not find a free port starting at $startPort"
}

$bindHost = (Get-EnvValue "AURORA_BIND_HOST")
if ([string]::IsNullOrWhiteSpace($bindHost)) { $bindHost = "127.0.0.1" }
Set-EnvValue "AURORA_BIND_HOST" $bindHost

$frontendPort = (Get-EnvValue "AURORA_FRONTEND_PORT")
$backendPort = (Get-EnvValue "AURORA_BACKEND_PORT")
$dbPort = (Get-EnvValue "AURORA_DB_PORT")
if ([string]::IsNullOrWhiteSpace($frontendPort)) { $frontendPort = 19100 }
if ([string]::IsNullOrWhiteSpace($backendPort)) { $backendPort = 19101 }
if ([string]::IsNullOrWhiteSpace($dbPort)) { $dbPort = 19432 }

if ($createdEnv) {
  $frontendPort = Find-FreePort $frontendPort
  $backendPort = Find-FreePort $backendPort
  $dbPort = Find-FreePort $dbPort
}

Set-EnvValue "AURORA_FRONTEND_PORT" $frontendPort
Set-EnvValue "AURORA_BACKEND_PORT" $backendPort
Set-EnvValue "AURORA_DB_PORT" $dbPort

$dbPassword = (Get-EnvValue "AURORA_DB_PASSWORD")
if ([string]::IsNullOrWhiteSpace($dbPassword) -or $dbPassword -eq "change_me") {
  Set-EnvValue "AURORA_DB_PASSWORD" (New-RandomSecret)
}

$projectTitle = (Get-EnvValue "AURORA_PROJECT_TITLE")
$publicAppName = (Get-EnvValue "NEXT_PUBLIC_APP_NAME")
$adminEmail = (Get-EnvValue "ADMIN_EMAIL")
$adminPassword = (Get-EnvValue "ADMIN_PASSWORD")

function SecureStringToPlain([System.Security.SecureString]$secure) {
  if ($null -eq $secure) { return "" }
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try { return [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr) } finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
}

$needsProjectTitlePrompt = ([string]::IsNullOrWhiteSpace($projectTitle) -or $projectTitle -eq "Mon projet")
$needsAdminEmailPrompt = ([string]::IsNullOrWhiteSpace($adminEmail) -or $adminEmail -eq "admin@example.com")
$needsAdminPasswordPrompt = ([string]::IsNullOrWhiteSpace($adminPassword) -or $adminPassword -eq "change_me")

$isInteractive = -not [Console]::IsInputRedirected

if (($createdEnv -or $needsProjectTitlePrompt -or $needsAdminEmailPrompt -or $needsAdminPasswordPrompt) -and $isInteractive) {
  Write-Host ""
  if ($createdEnv) {
    Write-Host "=== Configuration du projet (premier lancement) ==="
  } else {
    Write-Host "=== Configuration du projet (valeurs par défaut détectées) ==="
  }

  if ($createdEnv -or $needsProjectTitlePrompt) {
    if ([string]::IsNullOrWhiteSpace($projectTitle)) { $projectTitle = "Mon projet" }
    $inputTitle = Read-Host "Nom du projet (affiché dans l'interface) [$projectTitle]"
    if (-not [string]::IsNullOrWhiteSpace($inputTitle)) { $projectTitle = $inputTitle }
    Set-EnvValue "AURORA_PROJECT_TITLE" $projectTitle

    # Keep frontend name aligned by default.
    Set-EnvValue "NEXT_PUBLIC_APP_NAME" $projectTitle
  }

  if ($createdEnv -or $needsAdminEmailPrompt) {
    if ([string]::IsNullOrWhiteSpace($adminEmail)) { $adminEmail = "admin@example.com" }
    $inputEmail = Read-Host "Email administrateur (connexion) [$adminEmail]"
    if (-not [string]::IsNullOrWhiteSpace($inputEmail)) { $adminEmail = $inputEmail }
    Set-EnvValue "ADMIN_EMAIL" $adminEmail
  }

  if ($createdEnv -or $needsAdminPasswordPrompt) {
    while ($true) {
      Write-Host ""
      $pass1 = Read-Host "Mot de passe administrateur (laisser vide pour générer automatiquement)" -AsSecureString
      $pass1Plain = (SecureStringToPlain $pass1)
      if ([string]::IsNullOrWhiteSpace($pass1Plain)) {
        $adminPassword = (New-RandomSecret)
        Write-Host "Mot de passe généré. (Il est enregistré dans $EnvFile)"
        break
      }
      $pass2 = Read-Host "Confirmer le mot de passe" -AsSecureString
      $pass2Plain = (SecureStringToPlain $pass2)
      if ($pass1Plain -ne $pass2Plain) {
        Write-Host "Les mots de passe ne correspondent pas. Réessaie."
        continue
      }
      $adminPassword = $pass1Plain
      break
    }
    Set-EnvValue "ADMIN_PASSWORD" $adminPassword
  }
}

if (($needsAdminEmailPrompt -or $needsAdminPasswordPrompt) -and (-not $isInteractive)) {
  Write-Host ""
  Write-Host "NOTE: exécution non-interactive détectée (entrée redirigée)."
  Write-Host "Les identifiants administrateur sont (ou seront) définis dans $EnvFile."
  Write-Host "Ouvre $EnvFile et vérifie ADMIN_EMAIL / ADMIN_PASSWORD avant de te connecter."
}

if ([string]::IsNullOrWhiteSpace($projectTitle)) {
  Set-EnvValue "AURORA_PROJECT_TITLE" "Mon projet"
}

if ([string]::IsNullOrWhiteSpace($publicAppName)) {
  $publicAppName = (Get-EnvValue "AURORA_PROJECT_TITLE")
  if ([string]::IsNullOrWhiteSpace($publicAppName)) { $publicAppName = "Mon projet" }
  Set-EnvValue "NEXT_PUBLIC_APP_NAME" $publicAppName
}

if ([string]::IsNullOrWhiteSpace($adminEmail)) {
  Set-EnvValue "ADMIN_EMAIL" "admin@example.com"
}

if ([string]::IsNullOrWhiteSpace($adminPassword) -or $adminPassword -eq "change_me") {
  Set-EnvValue "ADMIN_PASSWORD" (New-RandomSecret)
}

$allowedOrigins = (Get-EnvValue "ALLOWED_ORIGINS")
if ([string]::IsNullOrWhiteSpace($allowedOrigins)) {
  Set-EnvValue "ALLOWED_ORIGINS" "http://localhost:3000,http://localhost:$frontendPort,https://stack.auroramind.fr"
}

$jwtSecret = (Get-EnvValue "JWT_SECRET_KEY")
if ([string]::IsNullOrWhiteSpace($jwtSecret) -or $jwtSecret -eq "change_me" -or $jwtSecret.Length -lt 32) {
  Set-EnvValue "JWT_SECRET_KEY" (New-RandomSecret)
}

$encKey = (Get-EnvValue "PILOT_ENCRYPTION_KEY")
if ([string]::IsNullOrWhiteSpace($encKey) -or $encKey -eq "change_me") {
  $legacyEncKey = (Get-EnvValue "AURORA_ENCRYPTION_KEY")
  if (-not [string]::IsNullOrWhiteSpace($legacyEncKey) -and $legacyEncKey -ne "change_me") {
    $encKey = $legacyEncKey
  } else {
    $encKey = New-FernetKey
  }
  Set-EnvValue "PILOT_ENCRYPTION_KEY" $encKey
}

$jwtAlg = (Get-EnvValue "JWT_ALGORITHM")
if ([string]::IsNullOrWhiteSpace($jwtAlg)) {
  Set-EnvValue "JWT_ALGORITHM" "HS256"
}

$jwtExp = (Get-EnvValue "JWT_ACCESS_TOKEN_EXPIRE_MINUTES")
if ([string]::IsNullOrWhiteSpace($jwtExp)) {
  Set-EnvValue "JWT_ACCESS_TOKEN_EXPIRE_MINUTES" "60"
}

$backendUrl = (Get-EnvValue "NEXT_PUBLIC_BACKEND_URL")
if ([string]::IsNullOrWhiteSpace($backendUrl)) {
  Set-EnvValue "NEXT_PUBLIC_BACKEND_URL" "/api/v1"
}

Write-Host "Starting stack (Docker Compose)..."
docker compose --env-file $EnvFile up -d --build

Write-Host "Applying database migrations..."
docker compose --env-file $EnvFile exec -T backend python -m alembic upgrade head

Write-Host ""
Write-Host "Ready."
Write-Host "- Frontend: http://localhost:$frontendPort/login"
Write-Host "- Backend health: http://localhost:$backendPort/api/v1/health"
Write-Host "- Postgres: host=$bindHost port=$dbPort"
