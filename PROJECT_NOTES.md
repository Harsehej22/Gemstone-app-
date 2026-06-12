# Project Notes

## Tech Stack

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Frontend | React 18 + TypeScript | Industry standard, strong ecosystem, type safety |
| Build Tool | Vite | Fast HMR, modern ESM-based dev server |
| Styling | Tailwind CSS | Utility-first, rapid UI development, built-in dark mode |
| State | React Query | Server state caching, loading/error states, cache invalidation |
| Routing | React Router v7 | Declarative routing with protected route support |
| Backend | Express + TypeScript | Lightweight, well-documented, familiar REST patterns |
| Database | MongoDB + Mongoose | Flexible schema for recommendation history, easy aggregation |
| Auth | JWT | Stateless authentication suitable for SPA architecture |
| Validation | Zod | Shared validation philosophy between frontend and backend |
| PDF | PDFKit | Server-side PDF generation without headless browser |

## Architecture Decisions

### Monorepo with npm Workspaces
Client and server live under `src/` with independent `package.json` files but shared root tooling. This keeps related code together while allowing independent builds and deployments.

### Layered Backend Architecture
```
Routes → Controllers → Services → Models
```
- **Routes**: HTTP method + path mapping, middleware chain
- **Controllers**: Request/response handling, status codes
- **Services**: Business logic, reusable across controllers
- **Models**: Data persistence with Mongoose

### Rule-Based Recommendation Engine
Rather than ML/AI, the engine uses deterministic zodiac-to-gemstone mapping per Vedic astrology conventions. Zodiac is calculated from date of birth using tropical zodiac date ranges.

### Confidence Score
A transparent scoring model (not ML-based):
- Base score: 70%
- +20% if gemstone's zodiac list includes user's sign
- +10% if profile birth details are complete

### JWT Stateless Auth
Tokens are stored in localStorage on the client. The server validates on each request. Logout is client-side token removal (no server-side session store needed for this scale).

### API Response Envelope
All responses use `{ success, message?, data }` for consistent client error handling.

## Assumptions

1. **Zodiac calculation** uses tropical (Western) zodiac date ranges, not sidereal (Vedic) adjustments. In production, ayanamsa correction may be needed for Indian astrology clients.

2. **Time of birth** is collected but not used in the current rule engine. It would be needed for ascendant (lagna) and house-based recommendations in a future version.

3. **Place of birth** is used in report narrative only, not for timezone correction of birth time.

4. **One gemstone per zodiac** — the mapping follows the provided business rules. Real consultations may recommend secondary stones based on dasha periods.

5. **Admin user** is seeded via script. No self-service admin promotion exists.

6. **Password requirements** are minimal (6 characters). Production should enforce stronger policies.

7. **Blue Sapphire trial period** is mentioned in wearing instructions but not enforced in software.

## Database Schema Summary

### Users
- Authentication fields (email, password, role)
- Profile fields (name, DOB, time, place, gender)
- Password excluded from JSON serialization

### Gemstones
- Catalog of 8 gemstones with full metadata
- `zodiacSigns` array for many-to-many zodiac mapping
- Editable by admin

### Recommendations
- Snapshot of birth details at time of recommendation
- Reference to gemstone document (populated on read)
- Confidence score and generated report summary
- Indexed by userId + createdAt for history queries
- Text index on gemstoneName and reportSummary for search

## Future Improvements

### High Priority
- [ ] Sidereal zodiac with ayanamsa selection
- [ ] Use birth time + place for ascendant calculation
- [ ] Email verification on registration
- [ ] Password reset flow
- [ ] Rate limiting on recommendation generation

### Medium Priority
- [ ] Secondary gemstone recommendations based on planetary periods
- [ ] Gemstone compatibility checker (which stones not to wear together)
- [ ] User notification when admin updates gemstone data
- [ ] Pagination UI on dashboard history
- [ ] Unit and integration tests (Jest + Supertest + React Testing Library)

### Low Priority
- [ ] Multi-language support (Hindi, Sanskrit gemstone names)
- [ ] Appointment booking for in-person consultation
- [ ] Payment integration for premium detailed reports
- [ ] WebSocket real-time admin notifications
- [ ] GraphQL API alternative

## Security Considerations

- JWT secret must be strong in production
- CORS restricted to configured client URL
- Passwords hashed with bcrypt (12 rounds)
- Admin routes protected by role middleware
- Input validated with Zod on all write endpoints
- MongoDB injection prevented by Mongoose parameterized queries
- Error messages sanitized in production mode
