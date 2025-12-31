#!/bin/bash
#
# Jukas Production Setup Script
# 
# Creates a dedicated user, installs dependencies, and sets up systemd + nginx
# Run with: sudo ./setup.sh
#
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_banner() {
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════╗"
    echo "║           JUKAS SETUP SCRIPT           ║"
    echo "║      The Card Game - Production        ║"
    echo "╚════════════════════════════════════════╝"
    echo -e "${NC}"
}

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[!]${NC} $1"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "This script must be run as root (use sudo)"
        exit 1
    fi
}

# Prompt for configuration
get_config() {
    echo ""
    log_info "Configuration"
    echo "─────────────────────────────────────────"
    
    # Port
    read -p "Enter port to run Jukas on [default: 3000]: " PORT
    PORT=${PORT:-3000}
    
    # Domain
    read -p "Enter domain name [default: jukas.nl]: " DOMAIN
    DOMAIN=${DOMAIN:-jukas.nl}
    
    # Email for SSL
    read -p "Enter email for SSL certificate: " SSL_EMAIL
    
    # Git repo
    read -p "GitHub repo [default: mirkodandrea/jukas]: " REPO
    REPO=${REPO:-mirkodandrea/jukas}
    
    # Confirm
    echo ""
    echo "─────────────────────────────────────────"
    echo -e "Port:    ${GREEN}$PORT${NC}"
    echo -e "Domain:  ${GREEN}$DOMAIN${NC}"
    echo -e "Email:   ${GREEN}$SSL_EMAIL${NC}"
    echo -e "Repo:    ${GREEN}$REPO${NC}"
    echo "─────────────────────────────────────────"
    read -p "Continue with these settings? [Y/n]: " CONFIRM
    CONFIRM=${CONFIRM:-Y}
    
    if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
        log_warn "Setup cancelled"
        exit 0
    fi
}

# Create dedicated user
create_user() {
    log_info "Creating dedicated 'jukas' user..."
    
    if id "jukas" &>/dev/null; then
        log_warn "User 'jukas' already exists, skipping..."
    else
        useradd -r -m -d /opt/jukas -s /bin/bash jukas
        log_success "Created user 'jukas' with home /opt/jukas"
    fi
}

# Install system dependencies
install_deps() {
    log_info "Installing system dependencies..."
    
    apt update
    apt install -y curl git nginx
    
    # Install Node.js 20 LTS via NodeSource
    if ! command -v node &> /dev/null; then
        log_info "Installing Node.js 20..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        apt install -y nodejs
    fi
    
    # Install pnpm
    if ! command -v pnpm &> /dev/null; then
        log_info "Installing pnpm..."
        npm install -g pnpm
    fi
    
    log_success "Dependencies installed"
}

# Clone and build the app
setup_app() {
    log_info "Setting up Jukas application..."
    
    APP_DIR="/opt/jukas/app"
    
    if [ -d "$APP_DIR" ]; then
        log_warn "App directory exists, pulling latest..."
        cd "$APP_DIR"
        sudo -u jukas git pull
    else
        log_info "Cloning repository..."
        sudo -u jukas git clone "https://github.com/${REPO}.git" "$APP_DIR"
        cd "$APP_DIR"
    fi
    
    log_info "Installing npm dependencies..."
    sudo -u jukas pnpm install
    
    log_info "Building application..."
    sudo -u jukas pnpm build
    
    log_success "Application built successfully"
}

# Create systemd service
create_service() {
    log_info "Creating systemd service..."
    
    cat > /etc/systemd/system/jukas.service << EOF
[Unit]
Description=Jukas Card Game - Next.js Application
After=network.target

[Service]
Type=simple
User=jukas
Group=jukas
WorkingDirectory=/opt/jukas/app
Environment=NODE_ENV=production
Environment=PORT=${PORT}
ExecStart=/usr/bin/pnpm start
Restart=on-failure
RestartSec=10

# Hardening
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/opt/jukas
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF
    
    systemctl daemon-reload
    systemctl enable jukas
    systemctl start jukas
    
    log_success "Systemd service created and started"
}

# Configure nginx
setup_nginx() {
    log_info "Configuring nginx..."
    
    cat > /etc/nginx/sites-available/jukas << EOF
# Jukas - Auto-generated config
upstream jukas_upstream {
    server 127.0.0.1:${PORT};
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy settings
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_cache_bypass \$http_upgrade;

    # Static files with long cache
    location /_next/static {
        proxy_pass http://jukas_upstream;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # All requests to Next.js
    location / {
        proxy_pass http://jukas_upstream;
    }

    access_log /var/log/nginx/jukas.access.log;
    error_log /var/log/nginx/jukas.error.log;
}
EOF
    
    # Enable site
    ln -sf /etc/nginx/sites-available/jukas /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
    
    # Test and reload
    nginx -t
    systemctl reload nginx
    
    log_success "Nginx configured"
}

# Setup SSL with certbot
setup_ssl() {
    log_info "Setting up SSL with Certbot..."
    
    # Install certbot if needed
    if ! command -v certbot &> /dev/null; then
        apt install -y certbot python3-certbot-nginx
    fi
    
    # Get certificate
    certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" \
        --redirect \
        --non-interactive \
        --agree-tos \
        -m "${SSL_EMAIL}"
    
    log_success "SSL certificate installed"
}

# Print summary
print_summary() {
    echo ""
    echo -e "${GREEN}════════════════════════════════════════${NC}"
    echo -e "${GREEN}         SETUP COMPLETE! 🎉             ${NC}"
    echo -e "${GREEN}════════════════════════════════════════${NC}"
    echo ""
    echo -e "Your Jukas instance is now running!"
    echo ""
    echo -e "  🌐 URL:     ${BLUE}https://${DOMAIN}${NC}"
    echo -e "  🔌 Port:    ${PORT}"
    echo -e "  📁 App:     /opt/jukas/app"
    echo -e "  👤 User:    jukas"
    echo ""
    echo -e "Useful commands:"
    echo -e "  ${YELLOW}sudo systemctl status jukas${NC}   - Check status"
    echo -e "  ${YELLOW}sudo systemctl restart jukas${NC}  - Restart app"
    echo -e "  ${YELLOW}sudo journalctl -u jukas -f${NC}   - View logs"
    echo ""
    echo -e "To update:"
    echo -e "  ${YELLOW}cd /opt/jukas/app && sudo -u jukas git pull && sudo -u jukas pnpm build && sudo systemctl restart jukas${NC}"
    echo ""
}

# Main
main() {
    print_banner
    check_root
    get_config
    create_user
    install_deps
    setup_app
    create_service
    setup_nginx
    
    if [[ -n "$SSL_EMAIL" ]]; then
        setup_ssl
    else
        log_warn "Skipping SSL setup (no email provided)"
        log_info "Run manually: sudo certbot --nginx -d ${DOMAIN}"
    fi
    
    print_summary
}

main "$@"
