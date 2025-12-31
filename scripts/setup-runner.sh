#!/bin/bash
#
# GitHub Actions Self-Hosted Runner Setup for Jukas
# Run as root: curl -fsSL https://raw.githubusercontent.com/Peckage/jukas/canary/scripts/setup-runner.sh | bash
#

set -e

# Configuration
RUNNER_USER="jukas"
RUNNER_HOME="/opt/jukas"
RUNNER_DIR="${RUNNER_HOME}/runner"
APP_DIR="${RUNNER_HOME}/app"
REPO_OWNER="Peckage"
REPO_NAME="jukas"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[!]${NC} $1"; }
log_error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

echo ""
echo "════════════════════════════════════════"
echo "   GitHub Actions Runner Setup          "
echo "   Repository: ${REPO_OWNER}/${REPO_NAME}"
echo "════════════════════════════════════════"
echo ""

# Check root
if [[ $EUID -ne 0 ]]; then
    log_error "This script must be run as root"
fi

# Check if user exists
if ! id "$RUNNER_USER" &>/dev/null; then
    log_info "Creating user '$RUNNER_USER'..."
    useradd -m -d "$RUNNER_HOME" -s /bin/bash "$RUNNER_USER"
    log_success "User created"
else
    log_success "User '$RUNNER_USER' already exists"
fi

# Ensure directories exist
mkdir -p "$RUNNER_DIR" "$APP_DIR"
chown -R "$RUNNER_USER:$RUNNER_USER" "$RUNNER_HOME"

# Fix git safe.directory
log_info "Configuring git safe.directory..."
sudo -u "$RUNNER_USER" git config --global --add safe.directory "$APP_DIR"
log_success "Git configured"

# Install runner dependencies
log_info "Installing dependencies..."
apt-get update -qq
apt-get install -y -qq curl jq libicu-dev >/dev/null 2>&1
log_success "Dependencies installed"

# Get latest runner version
log_info "Fetching latest runner version..."
RUNNER_VERSION=$(curl -s https://api.github.com/repos/actions/runner/releases/latest | jq -r '.tag_name' | sed 's/v//')
RUNNER_ARCH="linux-x64"
RUNNER_URL="https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-${RUNNER_ARCH}-${RUNNER_VERSION}.tar.gz"
log_success "Latest version: v${RUNNER_VERSION}"

# Download and extract runner
log_info "Downloading runner..."
cd "$RUNNER_DIR"
if [[ -f "./config.sh" ]]; then
    log_warn "Runner already installed. Skipping download."
else
    curl -sL "$RUNNER_URL" -o runner.tar.gz
    tar xzf runner.tar.gz
    rm runner.tar.gz
    chown -R "$RUNNER_USER:$RUNNER_USER" "$RUNNER_DIR"
    log_success "Runner downloaded and extracted"
fi

# Install runner dependencies (for .NET)
log_info "Installing runner dependencies..."
"$RUNNER_DIR/bin/installdependencies.sh" >/dev/null 2>&1 || true
log_success "Runner dependencies installed"

echo ""
echo "════════════════════════════════════════"
echo "         MANUAL STEP REQUIRED           "
echo "════════════════════════════════════════"
echo ""
echo "1. Go to: https://github.com/${REPO_OWNER}/${REPO_NAME}/settings/actions/runners/new"
echo ""
echo "2. Copy the token from the 'Configure' section (starts with A...)"
echo ""
echo "3. Run these commands:"
echo ""
echo -e "   ${GREEN}sudo -u $RUNNER_USER bash${NC}"
echo -e "   ${GREEN}cd $RUNNER_DIR${NC}"
echo -e "   ${GREEN}./config.sh --url https://github.com/${REPO_OWNER}/${REPO_NAME} --token YOUR_TOKEN --name jukas_runner --labels jukas_runner${NC}"
echo ""
echo "4. After configuration, exit and run:"
echo ""
echo -e "   ${GREEN}sudo $RUNNER_DIR/svc.sh install $RUNNER_USER${NC}"
echo -e "   ${GREEN}sudo $RUNNER_DIR/svc.sh start${NC}"
echo ""
echo "════════════════════════════════════════"
echo ""

# Create deploy script for the workflow
log_info "Creating deploy script..."
cat > "${RUNNER_HOME}/deploy.sh" << 'DEPLOY_SCRIPT'
#!/bin/bash
# Deploy script for GitHub Actions
set -e

APP_DIR="/opt/jukas/app"
cd "$APP_DIR"

echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🔨 Building application..."
pnpm build

echo "🔄 Restarting service..."
sudo systemctl restart jukas

echo "✅ Deployment complete!"
DEPLOY_SCRIPT

chmod +x "${RUNNER_HOME}/deploy.sh"
chown "$RUNNER_USER:$RUNNER_USER" "${RUNNER_HOME}/deploy.sh"
log_success "Deploy script created at ${RUNNER_HOME}/deploy.sh"

# Add sudoers entry for passwordless restart
log_info "Configuring sudoers for service management..."
cat > /etc/sudoers.d/jukas << EOF
# Allow jukas user to manage the jukas service without password
$RUNNER_USER ALL=(ALL) NOPASSWD: /bin/systemctl restart jukas
$RUNNER_USER ALL=(ALL) NOPASSWD: /bin/systemctl stop jukas
$RUNNER_USER ALL=(ALL) NOPASSWD: /bin/systemctl start jukas
$RUNNER_USER ALL=(ALL) NOPASSWD: /bin/systemctl status jukas
EOF
chmod 440 /etc/sudoers.d/jukas
log_success "Sudoers configured"

echo ""
log_success "Runner setup complete!"
echo ""
echo "After configuring the runner, create .github/workflows/deploy.yml in your repo."
echo ""
