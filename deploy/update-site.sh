#!/usr/bin/env bash
# ============================================================
#  update-site.sh — Refresca la web con lo último de GitHub.
#  Útil tras la actualización diaria (GitHub Actions regenera
#  script.js y hace push; esto trae esos cambios al VPS).
#
#  Uso:  bash update-site.sh
# ============================================================
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/curador-rarezas}"
BRANCH="${BRANCH:-main}"

cd "$APP_DIR"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"
chown -R www-data:www-data "$APP_DIR"

echo "✅ Web actualizada a $(git rev-parse --short HEAD) ($(git log -1 --pretty=%s))"
