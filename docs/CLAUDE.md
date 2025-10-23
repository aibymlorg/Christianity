# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a unified Christian Community Platform that integrates 4 distinct React-based modules through a main gateway application. The platform serves different audiences (seekers, scholars, students, church leaders) with specialized tools for Christian education, theological research, church administration, and cultural exploration.

## Architecture

### Monorepo Structure
The repository uses a multi-package structure with a shared backend API:

```
christian-platform/
├── main-platform/        # Gateway app (React + Vite + TypeScript)
├── backend-api/          # Shared API (Express + TypeScript + MongoDB)
├── modules/              # 4 independent module repositories
│   ├── culture/          # Christian Culture Explorer (for seekers)
│   ├── christianity/     # Theology & Research (for scholars)
│   ├── bible-know/       # Bible Learning (for students)
│   ├── church-admin/     # Church Administration (for leaders)
│   └── roll-call/        # Attendance management
└── scripts/              # Helper scripts
```

### The 4 Modules

1. **Culture Module** (`modules/culture/`) - Target: Seekers exploring Christianity
   - "Shadow knowledge" approach - gentle cultural introduction
   - Bible exploration games, cultural history, theology assistant
   - Each module has its own `CLAUDE.md` with detailed architecture

2. **AIChristianity Module** (`modules/christianity/`) - Target: Theology scholars/students
   - Academic theological research and sermon generation
   - Advanced chat, document analysis, 11 LLM model support
   - See `modules/christianity/CLAUDE.md` for details

3. **BibleKnow Module** (`modules/bible-know/`) - Target: Sunday School students
   - Interactive Bible education with Hebrew/Greek learning
   - Gamified progression, 7 learning modes

4. **ChurchAdmin Module** (`modules/church-admin/`) - Target: Church leaders
   - Sermon generation, church management tools
   - Integrated with roll-call attendance system

### Integration Pattern
- Main platform handles authentication and routing
- Modules load in iframes with auth token passing via postMessage
- Each module runs independently on different ports in development
- All modules share the backend API for user management

## Development Commands

### Installation
```bash
# Install all dependencies (main platform + backend)
npm run install:all

# Install module dependencies
./scripts/install-modules.sh
# OR from root:
npm run modules:install
```

### Running Locally

**Quick Start (Backend + Main Platform):**
```bash
./scripts/start-all.sh
# Backend: http://localhost:3001
# Main Platform: http://localhost:5173
```

**Individual Services:**
```bash
# Backend API
npm run dev:backend
# OR
cd backend-api && npm run dev

# Main Platform
npm run dev:main
# OR
cd main-platform && npm run dev

# Individual Modules (each in separate terminal)
cd modules/culture && npm run dev        # Port 5174
cd modules/christianity && npm run dev   # Port 5175
cd modules/bible-know && npm run dev     # Port 5176
cd modules/church-admin && npm run dev   # Port 5177
```

### Building
```bash
# Build backend and main platform
npm run build

# Build individual modules
cd modules/[module-name] && npm run build
```

## Configuration

### Backend Environment (backend-api/.env)
Required for backend API to function:
```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/christian-platform
GEMINI_API_KEY=your-gemini-api-key
JWT_SECRET=your-secret-min-32-characters
PORT=3001
```

Optional:
```bash
OLLAMA_API_KEY=your-ollama-key
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment (main-platform/.env.local)
```bash
VITE_API_URL=http://localhost:3001

# Module URLs (for development)
VITE_CULTURE_MODULE_URL=http://localhost:5174
VITE_CHRISTIANITY_MODULE_URL=http://localhost:5175
VITE_BIBLE_KNOW_MODULE_URL=http://localhost:5176
VITE_CHURCH_ADMIN_MODULE_URL=http://localhost:5177
```

### Module-Specific Configuration
Each module requires its own `GEMINI_API_KEY` in `.env.local` file. See individual module CLAUDE.md files for details.

## Tech Stack

### Main Platform
- React 19 + TypeScript
- Vite 7
- React Router v7
- Zustand (state management)
- Tailwind CSS 4
- Axios

### Backend API
- Express 5 + TypeScript
- MongoDB with native driver
- JWT authentication
- bcryptjs for password hashing
- Helmet + CORS for security

### Modules
All modules use:
- React 18/19 + TypeScript
- Vite 6/7
- Tailwind CSS 3/4
- Google Gemini AI
- Ollama Cloud LLMs (christianity and culture modules)

## Key Implementation Details

### Authentication Flow
1. User logs in via main platform → Backend issues JWT token
2. Token stored in Zustand store + localStorage
3. When module iframe loads, main platform sends auth via postMessage
4. Module stores token and uses for API calls

### Module Communication
Modules receive auth updates via window.postMessage:
```typescript
// Main platform sends:
{ type: 'AUTH_TOKEN', token: string, user: object }
{ type: 'AUTH_LOGOUT' }

// Module sends:
{ type: 'IFRAME_READY' }
```

### Backend API Structure
```
backend-api/src/
├── routes/        # Express route definitions
├── controllers/   # Request handlers
├── middleware/    # Auth, validation, error handling
├── models/        # MongoDB models
└── lib/           # Utilities
```

Current implementation note: The backend scaffolding is created but may not have all routes implemented yet. Check directory contents when working with API endpoints.

### Main Platform Structure
```
main-platform/src/
├── components/
│   ├── auth/      # Login/register components
│   ├── layout/    # Header, navigation, layout
│   └── modules/   # Module iframe wrapper
├── pages/
│   ├── dashboard/ # User dashboard
│   └── public/    # Landing, login, register
├── auth/          # Zustand auth store
├── config/        # Module configuration
├── lib/           # API client, utilities
└── types/         # TypeScript types
```

## Working with Modules

### Adding a New Module
1. Add module to `modules/` directory
2. Update `scripts/install-modules.sh` to include new module
3. Add module config to main platform's module configuration
4. Add route in main platform for the module
5. Update environment variables with module URL

### Modifying Existing Modules
Each module is an independent repository. Changes should:
1. Be made within the module's directory
2. Follow the module's own CLAUDE.md guidance
3. Maintain the postMessage auth integration pattern
4. Respect the module's target audience and tone

## Testing

### Health Check
```bash
# Backend health check
curl http://localhost:3001/health
```

### Development Testing Checklist
- [ ] Backend starts without errors
- [ ] Main platform starts without errors
- [ ] Can login/register
- [ ] Dashboard loads
- [ ] At least one module loads in iframe
- [ ] No console errors
- [ ] MongoDB connected
- [ ] Module receives auth token

## Common Issues

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Module Not Loading
1. Check module is running on correct port
2. Check URL in main platform config
3. Check browser console for CORS errors
4. Verify postMessage origin allowlist

### MongoDB Connection Failed
1. Verify connection string in `.env`
2. Whitelist IP in MongoDB Atlas
3. Check database user credentials

## Deployment Notes

This platform is designed for Vercel deployment:
- Main platform → Vercel project (static)
- Backend API → Vercel serverless functions
- Each module → Independent Vercel project

Update production URLs in environment variables after deployment.
