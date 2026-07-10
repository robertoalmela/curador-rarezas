#!/usr/bin/env bash
# ============================================================
#  setup-vps.sh — Provisiona un VPS Ubuntu/Debian para servir
#  "Curador de Rarezas" con Nginx.
#
#  Uso (en el VPS, como root):
#     bash setup-vps.sh
#
#  Idempotente: puedes ejecutarlo varias veces sin problema.
# ============================================================
set -euo pipefail

# ---------- Configuración (edítala si hace falta) ----------
REPO_URL="${REPO_URL:-https://github.com/robertoalmela/curador-rarezas.git}"
BRANCH="${BRANCH:-main}"
APP_DIR="${APP_DIR:-/var/www/curador-rarezas}"
SERVER_NAME="${SERVER_NAME:-_}"   # "_" = cualquier host (IP). Pon tu dominio para HTTPS.
# -----------------------------------------------------------

log() { echo -e "\n\033[1;36m==> $*\033[0m"; }

if [[ $EUID -ne 0 ]]; then
  echo "Ejecuta este script como root (o con sudo)." >&2
  exit 1
fi

log "1/6  Actualizando el sistema"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y

log "2/6  Instalando paquetes base (nginx, git, curl, ufw, fail2ban)"
apt-get install -y nginx git curl ca-certificates ufw fail2ban

log "3/6  Instalando Node.js 20 LTS (para la automatización diaria opcional)"
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
node -v && npm -v

log "4/6  Clonando/actualizando el repositorio en $APP_DIR"
if [[ -d "$APP_DIR/.git" ]]; then
  git -C "$APP_DIR" fetch origin "$BRANCH"
  git -C "$APP_DIR" checkout "$BRANCH"
  git -C "$APP_DIR" reset --hard "origin/$BRANCH"
else
  mkdir -p "$(dirname "$APP_DIR")"
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
fi
# Nginx necesita poder leer los ficheros
chown -R www-data:www-data "$APP_DIR"
find "$APP_DIR" -type d -exec chmod 755 {} \;
find "$APP_DIR" -type f -exec chmod 644 {} \;

log "5/6  Configurando Nginx"
install -m 644 "$APP_DIR/deploy/nginx-curador.conf" /etc/nginx/sites-available/curador
# Sustituye el server_name si se ha pasado uno
sed -i "s/__SERVER_NAME__/${SERVER_NAME}/g; s#__APP_DIR__#${APP_DIR}#g" /etc/nginx/sites-available/curador
ln -sf /etc/nginx/sites-available/curador /etc/nginx/sites-enabled/curador
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl restart nginx

log "6/6  Configurando el firewall (UFW)"
ufw allow OpenSSH
ufw allow 'Nginx Full'   # abre 80 y 443
ufw --force enable
systemctl enable fail2ban
systemctl restart fail2ban

echo
echo "============================================================"
echo "  ✅ Listo. Tu web debería estar disponible en:"
echo "       http://$(curl -fsS4 ifconfig.me 2>/dev/null || echo TU_IP)/"
echo
echo "  Siguientes pasos opcionales:"
echo "   · Refrescar la web tras la actualización diaria:  deploy/update-site.sh"
echo "   · Añadir dominio + HTTPS:                         deploy/enable-https.sh tu-dominio.com"
echo "   · Mover la automatización al VPS:                 deploy/install-daily-timer.sh"
echo "============================================================"
