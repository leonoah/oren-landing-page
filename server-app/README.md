# מועדון ההורים של מיכמוני — Server

Express.js server that serves the landing page and exposes API routes.

## Setup

```bash
npm install
cp .env.example .env
# Fill in your values in .env
```

## Run

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

The landing page is available at → http://localhost:3000

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/contact` | Contact form submission |
| POST | `/api/subscribe` | Subscription / payment trigger |

## Adding logic

- Payment: edit `server/routes/subscribe.js`
- Email:   edit `server/routes/contact.js`
- New routes: create `server/routes/yourroute.js` and register in `server/index.js`
