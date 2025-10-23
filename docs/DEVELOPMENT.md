# Development Guide

## Project Structure

```
christian-platform/
├── main-platform/          # React + Vite main application
├── backend-api/            # Express + TypeScript API
├── modules/                # Existing module repositories
│   ├── culture/           # Port 5174
│   ├── christianity/      # Port 5175
│   ├── bible-know/        # Port 5176
│   └── church-admin/      # Port 5177
└── scripts/               # Helper scripts
```

## Development Servers

### Main Platform & Backend
```bash
# Start both
npm run dev

# Or individually
npm run dev:backend  # http://localhost:3001
npm run dev:main     # http://localhost:5173
```

### Modules
Each module runs independently:

```bash
# Terminal 1 - Culture
cd modules/culture
npm run dev  # Port 5174

# Terminal 2 - Christianity
cd modules/christianity
npm run dev  # Port 5175

# Terminal 3 - BibleKnow
cd modules/bible-know
npm run dev  # Port 5176

# Terminal 4 - ChurchAdmin
cd modules/church-admin
npm run dev  # Port 5177
```

## Testing Locally

1. Start backend: `npm run dev:backend`
2. Start main platform: `npm run dev:main`
3. Start any module you're working on
4. Open http://localhost:5173

## Building for Production

```bash
npm run build
```

This builds both main platform and backend.

## Common Tasks

### Add New API Endpoint
1. Create route in `backend-api/src/routes/`
2. Create controller in `backend-api/src/controllers/`
3. Register route in `backend-api/src/index.ts`

### Add New Module
1. Add module config in `main-platform/src/config/modules.ts`
2. Clone/create module in `modules/`
3. Update routes in main App.tsx

### Update Environment Variables
- Main Platform: `main-platform/.env.local`
- Backend: `backend-api/.env`

## Troubleshooting

### Port conflicts
If ports are in use, update in:
- `vite.config.ts` (each project)
- `.env.local` files

### CORS errors
Update `FRONTEND_URL` in `backend-api/.env`

### Module not loading
1. Check module is running
2. Check URL in module config
3. Check browser console
