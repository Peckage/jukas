# Jukas - The Card Game 🃏

A fast-paced, memory-driven elimination card game. Everyone starts with 100 lives: be the last one standing!

**Live:** [jukas.nl](https://jukas.nl)

## Features

- 📊 **Score Keeper** - Counts lives round by round, with a graph of the game at the end
- 🎮 **Learn to Play** - An animated, step-by-step walkthrough
- 🃏 **Card Reference** - What every card costs and what it does
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

Open [http://localhost:3050](http://localhost:3050) to view the app.

## Production Deployment

### One-Line Setup Script

Deploy to your VPS with a single command:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/Peckage/jukas/main/scripts/setup.sh)
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
curl -fsSL https://raw.githubusercontent.com/Peckage/jukas/main/scripts/setup.sh -o setup.sh
chmod +x setup.sh
sudo ./setup.sh
```

### Manual Deployment

See [docs/nginx-config.md](docs/nginx-config.md) for manual nginx configuration.

## Tech Stack

- **Framework:** Next.js 16 with React 19
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui on a glass design system (`src/app/globals.css`)
- **Storage:** localStorage for game persistence

## License

MIT
