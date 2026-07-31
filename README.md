# Topscore Learning Corporate Website

Version 1 foundation for the public Topscore Learning website. The authenticated PEER application is intentionally outside this repository.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router

## Local setup

Requirements: Node.js 20 or later and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Commands

```bash
npm run dev       # Start the development server
npm run build     # Type-check and create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

## Environment

Copy `.env.example` to `.env.local`. Never commit live credentials. Variables prefixed with `VITE_` are exposed to browser code and must not contain secrets.

### Enquiry delivery

Forms post to `/api/enquiry` by default. The server validates submissions, applies honeypot and rate-limit checks, optionally verifies Cloudflare Turnstile, selects the recipient from server-side configuration, and forwards the sanitized payload to `FORM_DELIVERY_ENDPOINT`.

Set these server-only variables in the deployment environment:

```text
FORM_DELIVERY_ENDPOINT
FORM_DELIVERY_TOKEN
FORM_RECIPIENT_GENERAL
FORM_RECIPIENT_PEER
FORM_RECIPIENT_ACADEMY
FORM_RECIPIENT_CONSULTING
```

To enable Turnstile, configure both `VITE_TURNSTILE_SITE_KEY` and the server-only `TURNSTILE_SECRET_KEY`. The delivery endpoint and token can be replaced without changing page or form components.

## Project structure

```text
src/
├── app/          # Application shell and router
├── components/   # Layout, sections and UI primitives
├── content/      # Central company, navigation, service and SEO content
├── pages/        # Route-level page components
├── styles/       # Global styles and design tokens
└── types/        # Shared TypeScript content types
```

## Routes

The foundation includes `/`, `/about`, `/products`, `/peer`, `/research`, `/research/:slug`, `/academy`, `/consulting`, `/contact`, `/privacy`, `/terms`, `/cookies`, and a wildcard 404 route.

## Current scope

This phase supplies routing, shared layout, accessible navigation, the footer, central configuration and placeholder pages. Full page content, forms, SEO metadata management, analytics and integrations belong to later phases.
