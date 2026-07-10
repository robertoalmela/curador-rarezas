#!/usr/bin/env bash
# ============================================================
#  enable-https.sh — Añade un dominio y HTTPS gratis (Let's Encrypt)
#
#  Requisito: el dominio ya debe apuntar (registro A) a la IP del VPS.
#
#  Uso (como root):
#     bash enable-https.sh tu-dominio.com [www.tu-dominio.com]
# ============================================================
set -euo pipefail

if [[ $EUID -ne 0 ]]; then echo "Ejecuta como root." >&2; exit 1; fi
if [[ $# -lt 1 ]]; then
  echo "Uso: bash enable-https.sh tu-dominio.com [www.tu-dominio.com]" >&2
  exit 1
fi

DOMAIN="$1"; shift
EXTRA_DOMAINS=("$@")
EMAIL="${CERTBOT_EMAIL:-robertoalmela300@gmail.com}"

echo "==> Instalando Certbot"
apt-get update -y
apt-get install -y certbot python3-certbot-nginx

echo "==> Ajustando server_name en Nginx a: $DOMAIN ${EXTRA_DOMAINS[*]}"
sed -i "s/server_name .*/server_name ${DOMAIN} ${EXTRA_DOMAINS[*]};/" /etc/nginx/sites-available/curador
nginx -t && systemctl reload nginx

# Construye los flags -d
DFLAGS=(-d "$DOMAIN")
for d in "${EXTRA_DOMAINS[@]}"; do DFLAGS+=(-d "$d"); done

echo "==> Solicitando certificado y configurando redirección a HTTPS"
certbot --nginx "${DFLAGS[@]}" \
  --non-interactive --agree-tos -m "$EMAIL" --redirect

echo "==> Comprobando renovación automática"
systemctl list-timers | grep -i certbot || true

echo "✅ HTTPS activo. Tu web ya responde en https://${DOMAIN}/"
