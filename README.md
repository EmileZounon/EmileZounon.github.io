# emilegiovannie.github.io

Personal portfolio website for **Emile Giovannie ZOUNON** — EdTech & AI Strategist.
Live at → **[emilezounon.com](https://emilezounon.com)**

---

## Table of Contents

1. [Stack & Hosting](#stack--hosting)
2. [File Structure](#file-structure)
3. [Internationalization (i18n)](#internationalization-i18n)
4. [Design System](#design-system)
5. [Typography](#typography)
6. [Color Palette](#color-palette)
7. [Spacing & Layout](#spacing--layout)
8. [Components](#components)
9. [Animations & Interactions](#animations--interactions)
10. [Mobile Responsiveness](#mobile-responsiveness)
11. [Contact Form (Formspree)](#contact-form-formspree)
12. [Third-Party Dependencies](#third-party-dependencies)
13. [Deployment](#deployment)
14. [Reusing This for Another Site](#reusing-this-for-another-site)

---

## Stack & Hosting

| Layer | Choice |
|---|---|
| Markup | Vanilla HTML5 |
| Styling | Vanilla CSS3 (custom properties, grid, flexbox) |
| Scripting | Vanilla JavaScript (ES2020+, no frameworks) |
| Hosting | GitHub Pages (auto-deploy on push to `main`) |
| Domain | Custom domain via GitHub Pages CNAME |
| Forms | [Formspree](https://formspree.io) (static form backend) |
| Icons | [Font Awesome 6.5.1](https://fontawesome.com) (CDN) |
| Fonts | Google Fonts (Cormorant Garamond + Outfit) |

No build step, no bundler, no dependencies to install. Edit files and push.

---

## File Structure

```
/
├── index.html                  # Homepage (hero + featured work + what I do)
├── work.html                   # Full project portfolio
├── about.html                  # Education, skills, certs, press, personal
├── blog.html                   # Blog index
├── gallery.html                # Photo gallery with lightbox
├── contact.html                # Contact form + stats + connect list
│
├── css/
│   └── styles.css              # Single stylesheet (all styles, all breakpoints)
│
├── js/
│   └── main.js                 # All JS: nav, scroll, fade-in, lightbox, form
│
├── assets/
│   ├── *.pdf                   # Downloadable guides and resources
│   └── images/                 # Gallery photos (if any)
│
├── blog/
│   ├── bridging-digital-gap.html
│   ├── remote-work-tips.html
│   ├── scaling-online-programs.html
│   ├── edtech/index.html       # EdTech category page
│   └── remote-work/index.html  # Remote Work category page
│
├── projects/
│   ├── ai-translation.html
│   ├── partner-onboarding.html
│   ├── dsm-onboarding.html
│   ├── developgio.html
│   └── prompt-library.html
│
├── fr/                         # French locale (Francophone / DevelopGio angle)
│   ├── index.html
│   ├── work.html
│   ├── about.html
│   ├── blog.html
│   ├── gallery.html
│   ├── contact.html
│   └── blog/
│       ├── bridging-digital-gap.html
│       ├── remote-work-tips.html
│       └── scaling-online-programs.html
│
├── zh/                         # Simplified Chinese locale (scale / IBM metrics angle)
│   ├── index.html
│   ├── work.html
│   ├── about.html
│   ├── blog.html
│   ├── gallery.html
│   ├── contact.html
│   └── blog/
│       ├── bridging-digital-gap.html
│       ├── remote-work-tips.html
│       └── scaling-online-programs.html
│
├── ja/                         # Japanese locale (karate / craft / mastery angle)
│   ├── index.html
│   ├── work.html
│   ├── about.html
│   ├── blog.html
│   ├── gallery.html
│   ├── contact.html
│   └── blog/
│       ├── bridging-digital-gap.html
│       ├── remote-work-tips.html
│       └── scaling-online-programs.html
│
├── favicon.svg                 # SVG favicon — "EGZ" text on dark navy square
└── README.md
```

---

## Internationalization (i18n)

The site supports four languages. Each locale is a full copy of every page in its own subdirectory, sharing the same CSS and JS assets.

### Locale Structure

| Locale | Directory | Audience / Cultural angle |
|---|---|---|
| English (default) | `/` | US/global professional framing |
| French | `/fr/` | Francophone / DevelopGio & Benin angle first |
| Simplified Chinese | `/zh/` | Scale metrics & institutional partnerships lead |
| Japanese | `/ja/` | Karate / craft / mastery metaphor first |

Each locale contains all 9 pages: `index.html`, `work.html`, `about.html`, `blog.html`, `gallery.html`, `contact.html`, and `blog/bridging-digital-gap.html`, `blog/remote-work-tips.html`, `blog/scaling-online-programs.html`.

### Language Switcher

A globe-icon dropdown in the navbar appears on both desktop and mobile. It reads the current page's URL path to detect the active locale and navigates to the equivalent page in the selected language.

```
// js/main.js — locale detection & routing
const pathParts = window.location.pathname.split('/');
const currentLang = ['fr','zh','ja'].includes(pathParts[1]) ? pathParts[1] : 'en';
```

Clicking a language option maps the current path to the target locale (e.g., `/ja/about.html` → `/fr/about.html`). The switcher is rendered once in the navbar HTML and works on every page with no per-page JS.

### SEO

Every page includes four `<link rel="alternate" hreflang="...">` tags for all locales, allowing search engines to serve the correct language version per visitor.

### CJK Fonts

Chinese and Japanese pages fall back to system CJK fonts via CSS `:lang()` selectors in `styles.css`:

```css
:lang(zh), :lang(zh-CN) { font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif; }
:lang(ja)               { font-family: 'Hiragino Sans', 'Yu Gothic', sans-serif; }
```

### Adding a New Language

1. Create a new subdirectory (e.g., `/pt/`)
2. Copy and translate all 9 HTML files
3. Add the locale to the language dropdown in each page's navbar
4. Add the `hreflang` alternate tag for the new locale to all pages
5. Update `js/main.js` locale detection array (`['fr','zh','ja','pt']`)

---

## Design System

All design tokens live in `:root` inside `css/styles.css`. Change them once, they apply everywhere.

```css
:root {
    --primary:       #1B2A4A;   /* deep navy blue — headings, primary text */
    --accent:        #037EF3;   /* electric blue — links, buttons, accents */
    --accent-hover:  #025EC0;   /* darker blue — button hover state */
    --dark:          #071525;   /* near-black navy — hero & page headers */
    --dark-surface:  #0B1E35;   /* slightly lighter dark — dark surface variant */
    --light:         #EEF4FF;   /* ice blue — alternating section backgrounds */
    --surface:       #FFFFFF;   /* white — card backgrounds, form */
    --border:        #D4E5FB;   /* light blue-gray — card borders, dividers */
    --text:          #1A1826;   /* near-black — body text */
    --text-light:    #6B6577;   /* medium gray — subtitles, metadata, placeholders */
    --white:         #FAFAF8;   /* off-white — text on dark backgrounds */

    --font-display:  'Cormorant Garamond', Georgia, serif;
    --font-body:     'Outfit', system-ui, sans-serif;

    --max-width:     1200px;
    --radius:        6px;
    --radius-lg:     10px;
    --shadow:        0 1px 4px rgba(0,0,0,0.06);
    --shadow-md:     0 4px 20px rgba(0,0,0,0.10);
    --shadow-lg:     0 8px 40px rgba(0,0,0,0.14);
    --transition:    0.3s ease;
}
```

---

## Typography

### Fonts

| Role | Font | Weights Used | Used For |
|---|---|---|---|
| Display | **Cormorant Garamond** | 300, 400, 500, 600, 700 (+ italic) | Headings, hero name, card titles, blockquotes |
| Body | **Outfit** | 300, 400, 500, 600, 700 | All body text, nav, labels, buttons, metadata |

Loaded via `@import` at the top of `styles.css` (no `<link>` tags in HTML needed).

### Type Scale

| Element | Size | Weight | Font |
|---|---|---|---|
| `h1` | 3.5rem → 2.25rem (mobile) | 600 | Display |
| `h2` | 2.25rem → 1.75rem (mobile) | 600 | Display |
| `h3` | 1.65rem | 600 | Display |
| `h4` | 1.25rem | 600 | Display |
| Hero last name | `clamp(4rem, 9vw, 7.5rem)` | 700 | Display |
| Hero first name | `clamp(1.75rem, 3.5vw, 3rem)` | 300 | Display |
| Section titles | 2.5rem | 600 | Display |
| Body text | 1rem / 1.05rem | 400 | Body |
| Card description | 0.9rem | 400 | Body |
| Nav links | 0.85rem | 500 | Body |
| Labels / metadata | 0.7–0.75rem | 600 | Body (uppercase, letter-spaced) |
| Buttons | 0.85rem | 600 | Body (uppercase, letter-spaced) |

---

## Color Palette

### Light sections (`background-color: var(--light)`)
Alternating sections use `#EEF4FF` (ice blue) to break up all-white layouts. Applied via inline `style="background-color: var(--light);"` on `<section>` elements.

### Dark sections (hero, page headers)
Background: `#071525`. Overlaid with four radial-gradient blue glows:
```css
radial-gradient(ellipse at 80% 20%, rgba(3,126,243,0.22) 0%, transparent 52%),
radial-gradient(ellipse at 10% 70%, rgba(3,94,192,0.28) 0%, transparent 48%),
radial-gradient(ellipse at 55% 100%, rgba(7,21,37,0.55) 0%, transparent 45%),
radial-gradient(ellipse at 50% 0%,  rgba(3,126,243,0.10) 0%, transparent 40%)
```

### Tag colors

| Tag class | Background | Text | Use |
|---|---|---|---|
| `.tag-ai` | `#EEF4FB` | `#1B3A6B` | AI, GPT, machine learning |
| `.tag-design` | `#EEF9F4` | `#1B5C3A` | Design, Articulate, UX |
| `.tag-education` | `#FBF4EE` | `#6B3A1B` | Education, courses, learning |
| `.tag-tech` | `#F4EEFC` | `#4A1B6B` | Technical tools, code, platforms |

---

## Spacing & Layout

- **Container max-width:** 1200px, centered, `padding: 0 2rem` (→ `0 1.25rem` mobile)
- **Section padding:** `5.5rem 0` (→ `3.5rem 0` at 768px, `2.75rem 0` at 480px)
- **Card grid:** `repeat(auto-fill, minmax(320px, 1fr))` — collapses to `1fr` on mobile
- **3-column layout:** Used for "What I Do" columns — collapses to `1fr` on mobile

---

## Components

### Navbar
- Fixed, transparent on hero/page-header pages
- On scroll (>50px) or on pages without a dark header: dark blur background
  ```css
  background-color: rgba(12,11,20,0.92);
  backdrop-filter: blur(18px);
  box-shadow: 0 1px 0 rgba(3,126,243,0.15);
  ```
- **EGZ logo** pulses with blue glow on hover (`egzPulse` keyframe)
- **Mobile:** hamburger slides in a drawer from the right (75% width, max 300px)
  - Drawer has a close `×` button (injected by JS, works on all pages without touching HTML)
  - Opening the drawer locks body scroll and dims the background with a backdrop
  - Clicking outside, a nav link, or the `×` all close the drawer

### Hero (homepage)
- Full viewport height (`min-height: 100vh`)
- **Grain texture:** SVG `feTurbulence` noise tiled at 200×200px, `opacity: 0.028`
- **"EGZ" watermark:** giant outline text (`-webkit-text-stroke`), `position: absolute`, `z-index: 0`, behind all content. Pulses with blue glow (`watermarkPulse` keyframe, 4s)
- All elements animate in with staggered `fadeUp` (opacity 0→1, translateY 18px→0)

### Cards
- White background, `1px solid var(--border)`, `2px solid var(--accent)` top border
- Hover: lifts `translateY(-4px)` + blue glow shadow
- Card types: `font-size: 0.7rem`, uppercase, accent color label above title

### Buttons
| Class | Style |
|---|---|
| `.btn-primary` | Solid `#037EF3`, white text, lifts on hover with blue shadow |
| `.btn-outline` | Transparent, blue border + text, fills on hover |

### Blog items
- Full-width list with bottom border
- Hover: slides content `padding-left: 1.25rem` + 2px blue left accent bar animates in

### Contact Form
- Card container (white, blue top accent border)
- **Underline-only inputs** (no box border — bottom border only, turns blue on focus)
- Name + Email in a 2-column row on desktop, stacked on mobile
- Full-width submit button
- AJAX submission via Formspree (no page reload)
- Success/error feedback shown inline below the button

### Gallery Lightbox
- Click any image → opens fullscreen overlay
- Keyboard: `Escape` to close, `←` / `→` to navigate
- Click background to close

### Page Headers (non-homepage pages)
- Dark background matching hero
- Subtle radial gradient + blue accent line at bottom edge

---

## Animations & Interactions

### Keyframes

| Name | Effect | Used On |
|---|---|---|
| `fadeUp` | `opacity 0→1` + `translateY(18px→0)` | Hero elements (staggered 0.2s–1s delays) |
| `egzPulse` | Blue text-shadow pulses bright↔dim | EGZ nav logo on hover (1.4s loop) |
| `watermarkPulse` | `-webkit-text-stroke` opacity pulses + glow expands | Hero "EGZ" watermark (4s loop) |

### Scroll-based
- **Navbar:** transitions from transparent → dark blur after 50px scroll
- **Fade-in on scroll:** elements with `.fade-in` class use `IntersectionObserver` (threshold 0.1). Once in view, they get `.visible` (opacity 0→1, translateY 20px→0 over 0.6s)

### CSS Micro-interactions
- Nav links: animated underline (width 0→100%) on hover/active
- Card hover: lift + glow
- Blog item hover: left border slide + content indent
- Card link hover: gap between text and arrow icon widens
- Form inputs: bottom border color transitions on focus

---

## Mobile Responsiveness

Three breakpoints, all in `styles.css`:

### `max-width: 1024px` — Tablet
- `h1` → 2.75rem
- Hero last name → `clamp(3rem, 8vw, 6rem)`

### `max-width: 768px` — Mobile
- Hamburger menu replaces nav links
- Mobile nav drawer (fixed, slides from right)
- Body scroll locked when menu open (`body.menu-open { overflow: hidden }`)
- Dark backdrop behind open drawer (`body.menu-open::before`)
- Card grid → single column
- 3-column layout → single column
- Hero watermark → `clamp(6rem, 24vw, 10rem)` (scaled down)
- Hero padding tightened
- Tables get `display: block; overflow-x: auto` (horizontal scroll)
- Nav links min-height 44px (touch target standard)
- Container padding → `0 1.25rem`

### `max-width: 480px` — Small phones (iPhone SE etc.)
- Hero padding further reduced
- Hero last name → `clamp(2.75rem, 17vw, 4rem)`
- Hero watermark → `clamp(4.5rem, 28vw, 7rem)`
- Section titles → 2rem
- Page header h1 → 2rem
- Blog post heading → 1.65rem
- Cards → `padding: 1.5rem`
- Buttons → slightly smaller padding
- Contact form → single column, tighter padding

---

## Contact Form (Formspree)

Form is in `contact.html`. Submission handled in `js/main.js` via `fetch()`.

**Formspree endpoint:** `https://formspree.io/f/mjgeojrj`

To change the receiving email:
1. Log in at [formspree.io](https://formspree.io)
2. Update the email on form `mjgeojrj`
3. No code change needed

To swap in a different Formspree form:
```js
// js/main.js — search for this line and replace the ID
const response = await fetch('https://formspree.io/f/YOUR_NEW_ID', {
```

**Free tier:** 50 submissions/month. Upgrade at formspree.io if needed.

---

## Third-Party Dependencies

All loaded via CDN — no `npm install` needed.

| Dependency | Version | Purpose | CDN |
|---|---|---|---|
| Font Awesome | 6.5.1 | Icons throughout the site | cdnjs.cloudflare.com |
| Cormorant Garamond | — | Display / heading font | Google Fonts |
| Outfit | — | Body / UI font | Google Fonts |
| Formspree | — | Contact form backend | formspree.io |

---

## Deployment

The site deploys automatically via **GitHub Pages** on every push to `main`.

```bash
# Make changes, then:
git add .
git commit -m "Your message"
git push
# Site updates at emilezounon.com within ~60 seconds
```

**Custom domain:** Configured via a `CNAME` file in the repo root and DNS settings pointing `emilezounon.com` → GitHub Pages.

**Favicon:** `favicon.svg` — SVG with dark navy rounded square and "EGZ" in accent blue. No `.ico` file needed; modern browsers support SVG favicons.

---

## Reusing This for Another Site

This is a clean, zero-dependency static portfolio template. To adapt it:

### 1. Swap the design tokens
Edit the 11 color variables and 2 font variables in `:root` — everything updates automatically.

### 2. Swap the fonts
Replace the `@import` at the top of `styles.css` with any Google Fonts URL, then update `--font-display` and `--font-body`.

### 3. Update content
- `index.html` — hero name, tagline, featured work cards
- `work.html` — project cards (grouped by category)
- `about.html` — education, skills, certifications, personal section
- `contact.html` — stats, connect list, quote

### 4. Connect a new contact form
Sign up at formspree.io, create a form, paste the new ID into `js/main.js`.

### 5. Update the favicon
Edit `favicon.svg` — change the initials, colors, or shape to match the new brand.

### 6. Update the schema JSON
In `index.html` at the bottom, update the `<script type="application/ld+json">` block with the new person's name, URL, job title, and LinkedIn.

### Key patterns to know
- **Alternating section backgrounds:** add `style="background-color: var(--light);"` to any `<section>`
- **Fade-in on scroll:** add class `fade-in` to any element
- **Card accent top border:** `.card` and `.edu-card` both use `border-top: 2px solid var(--accent)` — reuse this pattern for any card-like component
- **Dark header pages:** use `<header class="page-header">` for any page that needs the dark top section
- **Mobile nav close button:** injected by JS automatically — no HTML change needed when adding new pages
