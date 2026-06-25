# Mohamed Ayas — Personal Portfolio Website

A premium, fully responsive personal portfolio website for **Mohamed Ayas**, Digital Marketing Executive, Marketing Strategist, Graphic Designer and Web Developer.

Built with **pure HTML, CSS and JavaScript** — no frameworks, no build tools, no external libraries. Everything runs from three files.

---

## Folder Structure

```
mohamed-ayas-portfolio/
├── index.html                  # Page structure & content (all sections)
├── style.css                   # Design tokens, layout, responsive rules, animations
├── script.js                   # All interactivity (vanilla JS, no dependencies)
├── README.md                   # This file
├── HOW-TO-CHANGE-IMAGES.md     # Step-by-step guide for swapping photos in VS Code
└── assets/
    ├── 01-about-photo.jpg          # About section portrait
    ├── 02-portfolio-video.jpg      # Portfolio "Video" category thumbnail
    └── 03-social-share-cover.jpg   # Social share preview image (Open Graph / Twitter Card)
```

All icons, the hero "growth line" graphic, and the remaining portfolio thumbnails (Marketing, Design, Web Development) are inline SVG — no extra image requests beyond the three real photos above.

**Want to change or add photos yourself in VS Code?** See **`HOW-TO-CHANGE-IMAGES.md`** — it's a dedicated, no-coding-experience-required walkthrough.

---

## Features

- **Hero** with animated SVG "growth line" signature graphic, typing-effect accent word, and animated stat counters (4+ Brands, 100+ Campaigns, 1000+ Leads, 5+ Projects)
- **About** section with timeline-style highlight cards (Marketing Management, Digital Campaign Strategy, Brand Growth, Creative Leadership)
- **Skills** with 14 animated percentage bars across marketing, design, dev and AI tooling
- **Services** — 10 premium glassmorphism service cards
- **Portfolio** — filterable grid (All / Marketing / Design / Video / Web Development) with a project detail modal popup
- **Experience** — vertical timeline (Marketing Manager → Digital Marketing Executive → IT & Media Officer → English Teacher)
- **Testimonials** — auto-advancing slider with manual dot navigation
- **Achievements** — animated counters (Projects, Campaigns, Leads, Clients)
- **Contact** — validated contact form (client-side only; see note below) plus direct email, phone, location and social links
- **Dark / Light mode toggle** (persists across visits via `localStorage`)
- **Sticky navigation** with scroll-spy active state and a mobile slide-out menu
- **Scroll-triggered reveal animations**, smooth scrolling, back-to-top button, loading screen
- **SEO**: descriptive `<title>`, meta description/keywords, Open Graph + Twitter Card tags, canonical tag, and JSON-LD `Person` structured data
- Respects `prefers-reduced-motion` and keeps visible keyboard focus states throughout

### Important note on the contact form

The form validates input in the browser and shows a success message, but **it does not send email on its own** — a static site has nowhere to send it to. To make it actually deliver messages to `ayashfa01@gmail.com`, wire it to one of:

- [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) (no backend needed — just change the form's `action`/fetch endpoint)
- A simple serverless function (Netlify Functions, Vercel Functions) that forwards to email
- Your own backend, if hosting somewhere with server support (e.g. Hostinger)

### Adding more photos or video

For a full step-by-step walkthrough with screenshots-style instructions, see **`HOW-TO-CHANGE-IMAGES.md`**. Short version:

- **More photos**: drop new images into `/assets`, then either rename them to match an existing file (e.g. `01-about-photo.jpg`) so they slot in automatically, or update the matching `src="assets/..."` path in `index.html`.
- **Real video clips**: the Portfolio "Video" card currently uses a photo (`02-portfolio-video.jpg`) with a play-icon overlay as a clickable poster. To play an actual video on click, swap the modal's content for that card to a `<video>` tag, or link out to YouTube/Instagram/TikTok by wrapping the card in an `<a>` tag pointing to the clip.
- **Instagram content**: Instagram does not allow direct hot-linking or scraping of photos/videos from profiles. To feature specific posts or reels, download them from your own account and add them to `/assets` the same way.

---

## Local Preview

No build step needed. Either:

- Open `index.html` directly in a browser, **or**
- Run a tiny local server (recommended, avoids any file:// quirks):
  ```bash
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

---

## Deployment Instructions

### GitHub Pages
1. Create a new GitHub repository and push these three files (`index.html`, `style.css`, `script.js`) to the root of the `main` branch.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. Save. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

### Netlify
1. Go to [app.netlify.com](https://app.netlify.com) and log in.
2. Click **Add new site → Deploy manually**, then drag the project folder (containing `index.html`, `style.css`, `script.js`) into the upload area.
   - Or connect your GitHub repo via **Add new site → Import an existing project** for automatic redeploys on every push.
3. Netlify assigns a live URL immediately (e.g. `your-site.netlify.app`). Add a custom domain under **Domain settings** if desired.

### Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New → Project**, then either drag-and-drop the folder or import the GitHub repository.
3. Framework preset: choose **Other** (this is a static site, no build command needed).
4. Click **Deploy**. Vercel gives you a live URL (e.g. `your-site.vercel.app`) and supports custom domains under **Project Settings → Domains**.

### Hostinger
1. Log in to **hPanel** and go to **Files → File Manager** (or connect via FTP using the credentials in **Files → FTP Accounts**).
2. Navigate to `public_html` (or the subfolder for your domain).
3. Upload `index.html`, `style.css` and `script.js` directly into that folder (no subfolder needed — they must sit alongside each other).
4. Visit your domain — the site is live immediately, no further configuration required.

---

## Browser Support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari) on desktop, tablet and mobile. Uses standard CSS custom properties, `backdrop-filter`, and `IntersectionObserver` — all are gracefully degraded or skipped on unsupported browsers (animations simply show their end state instead of failing).

---

## Credits

Designed and built for **Mohamed Ayas** — Digital Marketing Executive | Marketing Strategist | Graphic Designer | Web Developer.
Contact: ayashfa01@gmail.com · +94 76 417 7123 · Sri Lanka
