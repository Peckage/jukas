# Jukas - The Card Game 🃏

A fast-paced, memory-driven elimination card game. Stay under 100 points to survive!

**Live:** [jukas.nl](https://jukas.nl)

## Features

- 📊 **Score Keeper** - Track scores across rounds with persistent sessions
- 🎮 **Quick Setup Guide** - Visual step-by-step instructions
- 🃏 **Card Reference** - Complete card values and effects
- 📖 **Full Rules** - Everything you need to know
- 📱 **Mobile-First Design** - Works great on phones
- 🏆 **Victory Animations** - Celebrate wins with confetti!

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Production Deployment

### One-Line Setup Script

Deploy to your VPS with a single command:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/mirkodandrea/jukas/main/scripts/setup.sh)
```

The script will:

- ✅ Detect existing installations (Node.js, nginx, certbot)
- ✅ Prompt for port, domain, and what to install
- ✅ Create a dedicated `jukas` user
- ✅ Clone and build the app
- ✅ Set up systemd service
- ✅ Configure nginx with SSL

Or download and review first:

```bash
curl -fsSL https://raw.githubusercontent.com/mirkodandrea/jukas/main/scripts/setup.sh -o setup.sh
chmod +x setup.sh
sudo ./setup.sh
```

### Manual Deployment

See [docs/nginx-config.md](docs/nginx-config.md) for manual nginx configuration.

## Tech Stack

- **Framework:** Next.js 15 with React 19
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Storage:** localStorage for game persistence

## License

MIT
