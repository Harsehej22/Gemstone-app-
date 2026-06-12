# AI Usage Disclosure

This document describes where AI assistance was used in building the Gemstone Recommendation App.

## Overview

This project was built with AI assistance (Cursor AI / Claude) as part of a technical assessment. AI was used as a development accelerator across architecture, implementation, and documentation.

## Areas Where AI Was Used

### 1. Project Scaffolding & Architecture
- Monorepo structure with `src/client` and `src/server` workspaces
- Clean architecture folder layout (controllers, services, models, routes, middleware)
- Technology stack selection and integration patterns

### 2. Backend Implementation
- Express server setup with TypeScript and ESM modules
- Mongoose schema design for Users, Gemstones, and Recommendations
- JWT authentication middleware and auth service
- Zod validation schemas for request validation
- Rule-based gemstone recommendation engine with zodiac calculation
- PDF report generation service using PDFKit
- Admin analytics aggregation queries
- Database seed script with default gemstone catalog

### 3. Frontend Implementation
- React + Vite + TypeScript project setup
- Tailwind CSS configuration with dark mode support
- Reusable UI component library (Button, Input, Card, etc.)
- React Query integration for server state management
- Auth and Theme context providers
- Protected route and admin route guards
- Dashboard, profile, recommendation, and admin pages
- Responsive mobile-friendly layouts

### 4. DevOps & Deployment
- Docker Compose configuration for MongoDB, server, and client
- Multi-stage Dockerfiles for production builds
- Nginx reverse proxy configuration

### 5. Documentation
- README with setup instructions
- API documentation with endpoint reference
- Environment variable guide
- This AI usage disclosure document
- Project notes with architecture decisions

## Areas Developed Without AI Generation

The following were defined by the project requirements and implemented accordingly:

- Zodiac-to-gemstone mapping rules (provided in the spec)
- Business logic for confidence score calculation
- Gemstone catalog data (planet associations, benefits, wearing methods)
- Admin panel feature requirements
- Authentication flow requirements

## Human Review & Decisions

All AI-generated code was structured to follow:
- TypeScript strict mode
- Separation of concerns (controllers → services → models)
- Consistent error handling patterns
- RESTful API conventions
- Accessible UI patterns with loading and empty states

## Tools Used

- **Cursor IDE** with AI agent for code generation
- **Claude** as the underlying language model for architecture and implementation
