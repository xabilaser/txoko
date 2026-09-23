# Backup script (Windows PowerShell)
# Creates a portable ZIP excluding node_modules, dist, .git and previous backups

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
# If executed via npm script, CWD is project root; ensure we run from root
Set-Location (Resolve-Path "$projectRoot\..")

if (!(Test-Path -Path "backups")) {
  New-Item -ItemType Directory -Path "backups" | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$dest = Join-Path "backups" ("txoko-backup-" + $timestamp + ".zip")

Write-Host "Creating backup at $dest ..."

# Use tar (bsdtar on Windows) to build a ZIP with excludes
# Requires Windows 10+ (tar available by default)
$tarCmd = @(
  "tar",
  "-a",              # auto-select format by extension (.zip)
  "-c",
  "-f", $dest,
  "--exclude=node_modules",
  "--exclude=dist",
  "--exclude=.git",
  "--exclude=backups",
  "."
)

$proc = Start-Process -FilePath $tarCmd[0] -ArgumentList $tarCmd[1..($tarCmd.Length-1)] -NoNewWindow -PassThru -Wait
if ($proc.ExitCode -ne 0) {
  throw "tar exited with code $($proc.ExitCode)"
}

Write-Host "Backup completed: $dest"
