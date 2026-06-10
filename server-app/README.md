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

## ניהול תוכן (CMS)

מערכת ניהול תוכן מובנית מאפשרת לערוך את כל התוכן של עמוד הנחיתה ללא נגיעה בקוד.

- **כניסה:** `http://localhost:3000/admin` (ללא סיסמה)
- **שמירה:** כל התוכן נשמר בקובץ `server/data/content.json` (נוצר גיבוי `.bak` לפני כל שמירה).
- **תמונות:** מועלות אל `public/uploads/` או מוזנות כקישור URL.
- **טאבים:** הירו · הורות–המציאות · הפתרון · מה כלול בכל שבוע · תחומי תוכן · אודות · בונוסים · עלות חברות · כללי (ניווט/פוטר).

עמוד הנחיתה טוען את התוכן מ-`/api/content` בעת הטעינה (hydration). אם השרת לא זמין — מוצג תוכן ברירת המחדל הסטטי שב-`index.html`.

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET  | `/api/content`        | מחזיר את כל תוכן העמוד (JSON) |
| PUT  | `/api/content`        | שמירת כל התוכן (מהאדמין) |
| POST | `/api/content/upload` | העלאת תמונה — מחזיר URL |
| POST | `/api/contact`        | Contact form submission |
| POST | `/api/subscribe`      | Subscription / payment trigger |

## Adding logic

- Payment: edit `server/routes/subscribe.js`
- Email:   edit `server/routes/contact.js`
- New routes: create `server/routes/yourroute.js` and register in `server/index.js`
