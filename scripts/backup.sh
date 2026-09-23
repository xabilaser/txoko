#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"
cd "$ROOT_DIR"

mkdir -p backups
STAMP="$(date +%Y%m%d-%H%M%S)"
OUT="backups/txoko-backup-$STAMP.zip"

echo "Creating backup at $OUT ..."
# Use zip with excludes if available; fallback to tar.gz
if command -v zip >/dev/null 2>&1; then
  zip -r "$OUT" . -x "node_modules/*" "dist/*" ".git/*" "backups/*"
else
  OUT_TGZ="backups/txoko-backup-$STAMP.tar.gz"
  tar --exclude node_modules --exclude dist --exclude .git --exclude backups -czf "$OUT_TGZ" .
  echo "Backup created at $OUT_TGZ (tar.gz)"
  exit 0
fi

echo "Backup completed: $OUT"
