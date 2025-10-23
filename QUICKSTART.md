# Quick Start

## 1. Configure API Keys

Edit `backend-api/.env`:
- Add MongoDB connection string
- Add Gemini API key
- Update JWT secret

## 2. Install Dependencies

```bash
npm run install:all
./scripts/install-modules.sh
```

## 3. Start Development

```bash
./scripts/start-all.sh
```

Open http://localhost:5173

## 4. Start Modules (Optional)

```bash
cd modules/culture && npm run dev       # Port 5174
cd modules/christianity && npm run dev  # Port 5175
cd modules/bible-know && npm run dev    # Port 5176
cd modules/church-admin && npm run dev  # Port 5177
```

See README.md for full documentation.
