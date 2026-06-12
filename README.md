# Gemstone Recommendation App

A full-stack web application for an astrology consultation business that recommends gemstones based on user birth details and generates detailed recommendation reports.
## Live Features

✅ Authentication & Authorization  
✅ Profile Management  
✅ Gemstone Recommendation Engine  
✅ Recommendation History  
✅ PDF Report Export  
✅ Admin Dashboard  
✅ Analytics & Statistics  
✅ Dark Mode Support  
✅ Docker Deployment

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, TypeScript, Tailwind CSS, React Query, React Router |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB with Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Validation | Zod |
| PDF Export | PDFKit |

## Architecture

Frontend (React)
        |
        v
Backend API (Express)
        |
        v
MongoDB Database

## Features

- **User Authentication** — Register, login, logout with JWT-protected routes
- **User Profile** — Name, date/time/place of birth, gender
- **Gemstone Engine** — Rule-based zodiac-to-gemstone recommendation system
- **Dashboard** — Profile card, latest recommendation, searchable history
- **Admin Panel** — User management, gemstone editing, analytics dashboard
- **Export** — Download recommendations as PDF or JSON
- **Dark Mode** — System preference detection with manual toggle
- **Docker** — Full containerized deployment setup

## Project Structure

```
src/
├── client/                 # React frontend (Vite)
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── contexts/       # Auth & theme providers
│       ├── pages/          # Route pages
│       ├── services/       # API client layer
│       └── types/          # TypeScript interfaces
└── server/                 # Express backend
    └── src/
        ├── config/         # Database configuration
        ├── controllers/    # Request handlers
        ├── middleware/     # Auth, validation, error handling
        ├── models/         # Mongoose schemas
        ├── routes/         # API route definitions
        ├── services/       # Business logic
        ├── types/          # Shared TypeScript types
        └── utils/          # Helpers, seed script, zodiac logic
```
## Future Improvements

- AI-powered gemstone recommendation engine
- Horoscope API integration
- Email notification system
- Appointment booking module
- Multi-language support
- Advanced analytics dashboard
- Cloud deployment using AWS

## Prerequisites

- Node.js 18+
- MongoDB 6+ (local or Docker)
- npm 9+

## Quick Start

### 1. Clone and install

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your values (see [Environment Variables](#environment-variables)).

### 3. Start MongoDB

```bash
# Using Docker
docker run -d -p 27017:27017 --name gemstone-mongo mongo:7

# Or use your local MongoDB instance
```

### 4. Seed the database

```bash
npm run seed
```

This creates gemstone data and an admin account:
- **Email:** `admin@gemstone.app`
- **Password:** `Admin@123`

### 5. Run development servers

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/gemstone-app` |
| `JWT_SECRET` | Secret key for JWT signing | *(required in production)* |
| `JWT_EXPIRES_IN` | Token expiration | `7d` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `VITE_API_URL` | API URL for frontend | `http://localhost:5000/api` |

## Docker Deployment

```bash
# Build and start all services
docker-compose up --build

# Seed database (run once)
docker exec gemstone-server node -e "require('child_process').execSync('npm run seed', {stdio:'inherit'})"
```

Services:
- Frontend: http://localhost:5173
- API: http://localhost:5000/api
- MongoDB: localhost:27017

## API Documentation

See [API.md](./API.md) for complete endpoint reference.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both client and server in development |
| `npm run dev:server` | Start server only |
| `npm run dev:client` | Start client only |
| `npm run build` | Build both client and server |
| `npm run start` | Start production server |
| `npm run seed` | Seed gemstones and admin user |

## Zodiac Gemstone Mapping

| Zodiac Sign | Gemstone |
|-------------|----------|
| Aries | Ruby |
| Taurus | Emerald |
| Gemini | Emerald |
| Cancer | Pearl |
| Leo | Ruby |
| Virgo | Emerald |
| Libra | Diamond |
| Scorpio | Coral |
| Sagittarius | Yellow Sapphire |
| Capricorn | Blue Sapphire |
| Aquarius | Amethyst |
| Pisces | Yellow Sapphire |

## License

MIT
