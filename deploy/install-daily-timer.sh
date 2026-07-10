#!/usr/bin/env bash
# ============================================================
#  install-daily-timer.sh  (OPCIONAL)
#  Mueve la automatización diaria (IA + newsletter) al VPS.
#
#  Solo úsalo si NO quieres depender de GitHub Actions.
#  ⚠️  Si activas esto, DESACTIVA el workflow de GitHub Actions
#      (.github/workflows/daily-update.yml) para no enviar el
#      newsletter dos veces.
#
#  Antes de ejecutar:
#     1) cp /var/www/curador-rarezas/.env.example /var/www/curador-rarezas/.env
#     2) nano /var/www/curador-rarezas/.env   # rellena tus API keys
#     3) chmod 600 /var/www/curador-rarezas/.env
#
#  Uso (como root):  bash install-daily-timer.sh
# ============================================================
set -euo pipefail
if [[ $EUID -ne 0 ]]; then echo "Ejecuta como root." >&2; exit 1; fi

APP_DIR="${APP_DIR:-/var/www/curador-rarezas}"

if [[ ! -f "$APP_DIR/.env" ]]; then
  echo "❌ Falta $APP_DIR/.env — créalo desde .env.example y rellena tus keys." >&2
  exit 1
fi
chmod 600 "$APP_DIR/.env"

echo "==> Instalando dependencias de Node en $APP_DIR"
( cd "$APP_DIR" && npm install --no-audit --no-fund --omit=dev )

cat > /etc/systemd/system/curador-daily.service <<EOF
[Unit]
Description=Curador de Rarezas — actualización diaria (IA + newsletter)
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
WorkingDirectory=${APP_DIR}
EnvironmentFile=${APP_DIR}/.env
# Regenera la base y envía el email. Luego deja los ficheros legibles por Nginx.
ExecStart=/usr/bin/npm run daily
ExecStartPost=/bin/chown -R www-data:www-data ${APP_DIR}
EOF

cat > /etc/systemd/system/curador-daily.timer <<'EOF'
[Unit]
Description=Ejecuta la actualización diaria a las 09:00 UTC

[Timer]
OnCalendar=*-*-* 09:00:00 UTC
Persistent=true

[Install]
WantedBy=timers.target
EOF

systemctl daemon-reload
systemctl enable --now curador-daily.timer
echo "✅ Timer diario instalado. Próxima ejecución:"
systemctl list-timers curador-daily.timer --no-pager
echo
echo "Para probarlo ahora mismo:   systemctl start curador-daily.service"
echo "Ver el log:                  journalctl -u curador-daily.service -f"
echo
echo "⚠️  Recuerda desactivar el workflow de GitHub Actions para no duplicar envíos."
