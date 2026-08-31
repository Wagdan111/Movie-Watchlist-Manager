# 🎬 Reel List — Movie Watchlist Manager

A dark-themed, ticket-stub-inspired movie watchlist manager built entirely with **vanilla HTML5, CSS3, and JavaScript** — no frameworks, no build tools, no backend, no external APIs. Everything runs in the browser and persists with `LocalStorage`.

> Built as a portfolio project to practice core front-end fundamentals: DOM manipulation, state management, CSS Grid/Flexbox, and responsive, animated UI design.

---

## ✨ Features

- **Browse your watchlist** — movies displayed as film-ticket-style cards in a responsive CSS Grid.
- **Search** — instantly filter movies by title as you type.
- **Filter by genre** — Action, Drama, Comedy, Sci-Fi, Thriller, Animation, Horror, Romance.
- **Filter by status** — All / Watched / To Watch.
- **Sort** — by title (A–Z / Z–A), rating (high–low / low–high), or release year (newest / oldest).
- **Add a movie** — via a modal form (title, genre, year, rating, duration, description).
- **Edit a movie** — update any detail after it's been added.
- **Remove a movie** — with a confirmation prompt.
- **Mark watched / unwatched** — toggle status with one click; watched titles get a "WATCHED" stamp.
- **Share** — copies a short summary of the movie to the clipboard (uses the native Web Share API on supported devices).
- **Live stats strip** — total titles, watched count, titles left to watch, and average rating.
- **Persistent data** — everything is saved to `LocalStorage`, so your watchlist survives page reloads and browser restarts.
- **Fully responsive** — tuned layouts for phones, tablets, and desktops.
- **Accessible-minded** — visible focus states, `aria-live` regions, keyboard-friendly modal (Esc to close).

---

## 🛠️ Built With

- **HTML5** — semantic structure
- **CSS3** — custom properties (design tokens), CSS Grid for the movie layout, Flexbox for toolbars/controls, keyframe animations, and a fully responsive layout
- **Vanilla JavaScript (ES6+)** — an IIFE-based app module, `LocalStorage` API, event delegation, no external libraries

No React, no Vue, no Bootstrap, no jQuery, no API calls, no database.

---

## 📁 Project Structure

```
movie-watchlist-manager/
├── index.html          # App shell & markup
├── css/
│   └── styles.css      # Design tokens, layout, components, responsive rules
├── js/
│   ├── movies.js       # Seed data (default movie list, used only on first run)
│   ├── storage.js      # LocalStorage read/write helpers
│   └── app.js          # App state, rendering, search/filter/sort, CRUD, share
└── README.md
```

---

## 🚀 Getting Started

No build step, no dependencies to install.

1. Download / clone this folder.
2. Open `index.html` directly in your browser, **or** serve it locally for the best experience:

   ```bash
   # with Python
   python3 -m http.server 8000

   # then visit
   http://localhost:8000
   ```

3. Start adding movies — your data is saved automatically in your browser's `LocalStorage`.

> 💡 Clearing your browser's site data for this page will reset the watchlist back to the seeded default list.

---

## 🎨 Design Notes

The visual identity leans into the *film ticket* rather than a generic streaming-app clone:

- A near-black, blue-charcoal background with a warm **marquee gold** accent and a **teal** "watched" accent.
- Movie posters are generated entirely in CSS (gradient + initial letter) — no images are downloaded, so the app works fully offline.
- Each card has a perforated "tear line" between the poster and the details, echoing a real cinema ticket stub.
- Motion is deliberate and restrained: card lift on hover, a smooth modal entrance, and a lightweight toast for feedback — no gratuitous animation.

---

## 🧠 What This Project Demonstrates

- Structuring a multi-file vanilla JS app without a framework
- Managing application state (search, filters, sort) and deriving a filtered view without mutating the source data
- Reading/writing structured data to `LocalStorage` with error handling and graceful fallbacks
- Building a reusable component (the movie card) from a JS template function
- Designing a cohesive, non-templated visual system with CSS custom properties
- Writing responsive CSS with Grid and Flexbox for real-world layouts

---

## 📄 License

This project is free to use for learning and portfolio purposes.
