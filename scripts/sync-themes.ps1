$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$src = Join-Path $root "shared\\ui\\themes stack.json"
$dst = Join-Path $root "frontend\\themes\\aurora-themes.source.txt"

if (-not (Test-Path $src)) {
  throw "Source file not found: $src"
}

New-Item -ItemType Directory -Force -Path (Split-Path -Parent $dst) | Out-Null
Copy-Item -Force $src $dst

Write-Host "Synced themes:"
Write-Host "- $src -> $dst"

