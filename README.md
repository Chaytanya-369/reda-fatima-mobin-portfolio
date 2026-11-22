# Reda Fatima Mobin — Portfolio

A cinematic, editorial portfolio for filmmaker, screenwriter and creative strategist **Reda Fatima Mobin**.
Concept: **“Stories that stay.”** Hero line: *“Making sense of the world, one frame at a time.”*

All facts on the site come from `Reda Fatma Mobin Portfolio.pdf`, its embedded links, and pages verified online (the YouTube trailer and the ETBrandEquity articles). Nothing is invented. The PDF spells her name “Reda Fatma Mobin”; the site uses **Reda Fatima Mobin** everywhere except her ETBrandEquity byline and the LinkedIn URL, which are kept as published.

---

## 1. Quick start

```bash
cd website
npm install
npm run dev          # http://localhost:3000
npm run build        # static export -> website/out
npm start            # serves ./out locally (npx serve)
npm run media        # re-processes images after you add originals
npm run typecheck
```

Requires Node 20+ (built and tested on Node 24).

## 2. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16 (App Router) + React 19 + TypeScript** | Static export, per-page metadata, file-based case-study routes |
| Styling | **Hand-written CSS with design tokens** (`src/app/globals.css`) | Full art-direction control; no runtime CSS |
| Motion | **GSAP 3 + ScrollTrigger**, **Lenis** smooth scroll | Split-word reveals, clip-path image reveals, parallax, pinned horizontal Process section |
| Fonts | `next/font` (self-hosted): **Instrument Serif** (display), **DM Sans** (text), **DM Mono** (labels/timecode) | No layout shift and no third-party font requests |
| Images | `sharp` pipeline → responsive **AVIF + WebP** | Small files, `srcset`/`sizes`, intrinsic dimensions (CLS = 0) |

Runtime dependencies are only `next`, `react`, `react-dom`, `gsap` and `lenis`.

## 3. Architecture

```
website/
├─ media-source/
│  ├─ originals/        ← put high-res originals here (named by media id)
│  └─ pdf-extract/      ← images extracted from the PDF (current fallback)
├─ scripts/
│  ├─ media-sources.mjs ← REGISTRY: every image id → source + crop + folder
│  └─ optimize-media.mjs← builds public/media/** + src/content/media.generated.json, OG image, icons
├─ public/media/        ← generated responsive images (portraits/, documentary/gharq/ …)
└─ src/
   ├─ app/              ← layout (SEO, fonts, JSON-LD), home, work/[slug] case studies, 404, sitemap, robots
   ├─ content/          ← ALL editable copy
   │  ├─ site.ts          profile, contact, nav, journey, skills, kit, process stages
   │  ├─ projects.ts      10 case studies built from content blocks
   │  ├─ writing.ts       20 verified ETBrandEquity articles
   │  └─ photography.ts   home gallery + Abhaav link
   ├─ components/       ← Hero, Nav, Img, Lightbox, VideoEmbed, WorkIndex, CaseBlocks, ContactForm, motion utilities
   │  └─ sections/        About, Work, Process, Photography, Writing, Contact
   └─ lib/media.ts      ← media manifest lookup + srcset helpers
```

**Content is fully data-driven.** You can edit copy, add a project, or reorder blocks in `src/content/*` without touching components. Case studies are built from typed blocks (`lead`, `text`, `gallery` with 8 layouts, `video`, `voices`, `stat`, `list`, `headlines`), so each project gets its own treatment:

- **Gharq:** YouTube trailer, subtitled “voices from the film”, a 35mm filmstrip of stills, festival laurels.
- **Crossroads:** full-bleed title frame and a mosaic.
- **Fitoor:** a staggered “photo-story” sequence of frames.
- **On The Loose:** a surveillance-camera treatment (REC/HUD overlays) that reflects the film’s theme.
- **Saayah:** behind-the-scenes pair.
- **ISB:** 70% / 30% stat and phone mock-ups.
- **NerdNerdy / Xtreme Vision:** reels and post grids.
- **ETBrandEquity:** a dated, linked article archive.

## 4. Design system

- **Palette** (tokens on `:root`), taken from her own material: cinematic charcoal `#110f0e`, warm ivory `#f1ebe2`, terracotta `#e0916b` (and `#a84a2a` for use on light backgrounds), slate blue `#6574b8` / deep slate `#171a2b` (the gradient from her PDF), and dusty rose `#d9a7a0`. Each project also has its own `--accent`, drawn from its imagery (the grey-green Yamuna for Gharq, dusk amber for Crossroads, Fitoor red and so on).
- **Texture:** a fixed film-grain overlay that echoes the PDF’s grain.
- **Navigation:** 01 About · 02 Work · 03 Index · 04 Photography · 05 Writing · 06 Contact. It appears on every page, and links from a case study return to the home page section. **Work** is the curated featured experience; **Index** (`/#index`) is the complete filterable directory of all 10 projects. The active item is tracked by scroll position and marked by a gliding hairline with a dot; hovering rolls the label. In the mobile menu, the active item is set in terracotta italic.
- **Structure:** the home page is told in acts. *Meet Reda* → *Selected Work* (**Act I: The Storyteller**, **Act II: The Strategist**, then a filterable Index of all 10 projects across all 7 categories) → *Process* (a pinned horizontal sequence, plus a “call sheet” of skills and kit) → *Photography* (asymmetric grid and lightbox) → *Writing* (newspaper masthead) → *Contact*.

## 5. Replacing photographs and videos

1. Find the image’s **id** in `scripts/media-sources.mjs` (for example `gharq-boat`).
2. Save the original as `media-source/originals/gharq-boat.jpg` (`.jpg/.png/.webp/.tif` all work). An original is used as-is, with no crop applied.
3. Run `npm run media`, then `npm run build`.

Nothing else changes, because components read sizes from the generated manifest. To add a new image, add an entry to `media-sources.mjs`, run `npm run media`, and reference the id in `src/content/*`.

**Video:** set `youtubeId` in a `video` block in `projects.ts`. The embed loads nothing from YouTube until the visitor clicks Play, then uses `youtube-nocookie.com`. It never autoplays with sound.

## 6. Assets

### Currently used (all extracted from the PDF; none is stock or AI-generated)
46 images. Status reflects source resolution: **OK for now** means it is usable, and **Replace** means it is a screenshot or too low-res for large display.

| id | folder | px | status |
|---|---|---|---|
| portrait-camera / portrait-gallery / portrait-studio | portraits | 960–1210 wide | OK for now (`portrait-studio` is extracted but not yet placed) |
| gharq-poster + 8 stills | documentary/gharq | 633–768 wide | **Replace**: stills are ~683px with burned-in subtitles |
| crossroads-title + 4 stills | documentary/crossroads | ~960–1150 | OK for now |
| fitoor-turban / forest / red / cave | audiovisual/fitoor | 1150–1532 | OK for now |
| saayah-still | audiovisual/saayah | 1280 | OK for now |
| saayah-bts-1/2 | audiovisual/saayah | 648 | **Replace**: these are collages, so supply individual BTS photos |
| otl-park / highfive / closeup / smile | music-video/on-the-loose | 959–1347 | OK for now |
| photo-hands, photo-jewellery | photography/selected | 1205–1805 | OK for now |
| photo-couple, photo-tomb | photography/selected | 525–764 | **Replace**: cropped from Instagram screenshots |
| isb-grid-1/2 | social-media/isb | 573 | **Replace**: phone screenshots |
| nn-* (6) | social-media/nerdnerdy | 356–1123 | **Replace** most: screenshots |
| xv-* (4) | social-media/xtreme-vision | ~540 | **Replace**: screenshots |
| et-list-1/2 | journalism | ~500 | **Replace** or remove; the linked archive now covers this |

The Gharq stills, ISB screenshots and similar sources are flagged `temp: true` in `media-sources.mjs`, and their `<picture>` gets `data-temp` so they’re easy to find.

### Original assets still needed (priority order)
1. **Gharq:** high-res poster and 6–10 film stills (2000px+ wide, preferably without subtitles).
2. **Hero reel:** 2–4 high-res stills (2400px+, 2.39:1 or 16:9) from Fitoor, Crossroads, On The Loose and Saayah.
3. **Photography:** the Abhaav essay images plus full-resolution portrait, architecture and product work (currently only 4 photos).
4. **Saayah:** individual BTS photos and stills from episode 2.
5. **ISB / NerdNerdy / Xtreme Vision:** original exported creatives and reel thumbnails, not phone screenshots.
6. **Portraits:** a high-res portrait for About (current files are phone photos around 1000px).

### Temporary placeholders
There is no lorem ipsum, stock imagery or AI imagery anywhere. The only “placeholders” are the low-res/screenshot images listed above, plus the **“Request a screening link”** buttons described below.

## 7. Links: what was verified and what needs confirmation

Checked on 22 Nov 2026:

| Link | Status |
|---|---|
| YouTube `dfrVc6EV4Mw` | ✅ “Gharq \| Official Trailer \| Documentary”, also linked from the PDF’s Gharq page; used on the Gharq case study |
| YouTube `dTqVv4PPyS8` | ⚠️ **Not used.** It is “The Crossroads \| Back on Popular Demand” by *Star Life Africa*, an unrelated TV series and not Reda’s documentary *Crossroads*. Please confirm whether a different link was intended. |
| Abhaav photo essay (Drive) | ✅ Public (“Abhaav_A photo essay by Reda Fatma Mobin.pdf”) |
| Crossroads / On The Loose / Saayah (Drive) | ❌ **Return “Page not found” to the public** (private or removed). The site shows “Request a screening link” (a pre-filled email) instead. To publish them, set each file to *Anyone with the link* and move the URL from `privateLinks` back into `links` in `projects.ts`. |
| Fitoor (Instagram reel) | ✅ Loads (Instagram may ask visitors to log in) |
| ETBrandEquity author page + 20 articles | ✅ Every URL returns 200 with byline “Reda Fatma Mobin”, Aug–Dec 2022. The author page has a “Load more” control, so older articles may exist. |
| ISB Admissions Instagram / LinkedIn, Reda’s Instagram | ✅ Instagram profiles load. LinkedIn blocks automated checks (HTTP 999), which is normal, so the URLs are used exactly as supplied. |

Other items to confirm:
- **Crossroads role.** The PDF says “I (and team)” and lists Reda in the collective “A film by” credit, so the site says *Filmmaker (team film)*. Send her specific role(s) if you want them named.
- **Festival years.** The laurels on the Gharq poster are too small to read reliably, so no years are shown.
- **`saayah-still`** comes from the PDF’s Skills page, shot on the same café set as the Saayah BTS photos. It is captioned generically. Confirm it is from episode 2.

## 8. Contact form

- **Validation:** name, email format and message length, shown inline with `aria-invalid` and focus moved to the first error. Success and error messages appear in a live status region.
- **Spam protection:** a hidden honeypot field plus a minimum time on the page before submitting.
- **Without a backend (current state):** after validation it opens the visitor’s email app with a pre-filled message to `redafatmamobin@gmail.com`, and says so on screen. This was tested.
- **With a backend:** set `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree, Getform, Web3Forms or your own API that accepts a JSON POST) in `.env.local` or in the host’s environment variables, then rebuild. This path has not been tested against a live service because none is configured yet.

## 9. SEO

Configured: title and description, Open Graph and Twitter cards (`/og-image.jpg`, generated from a Fitoor still), favicon and apple-touch icon, Person JSON-LD (home), CreativeWork/Article JSON-LD (case studies), `sitemap.xml`, `robots.txt`, semantic landmarks and a correct heading order.

**Domain:** none is set. When the domain is final, set `NEXT_PUBLIC_SITE_URL=https://your-domain` and rebuild. That enables canonical URLs and absolute URLs in Open Graph, the sitemap and robots, which currently fall back to `http://localhost:3000`.

## 10. Deployment (not deployed — needs your go-ahead)

`npm run build` produces a fully static site in `website/out/`, so any static host works:

- **Vercel:** import the repo with root directory `website` and set `NEXT_PUBLIC_SITE_URL`.
- **Netlify / Cloudflare Pages:** build command `npm run build`, publish directory `out` (base `website`).
- **Any server or S3:** upload the contents of `out/`. Serve `404.html` for unknown routes.

## 11. Testing summary (22 Nov 2026)

- `tsc --noEmit` is clean and `next build` succeeds: 15 static routes, including 10 case studies.
- Crawled the static build: all 11 pages and 245 image/asset URLs return 200 with no broken internal links. The 404 page works.
- **Lighthouse 12** on the static build:

  | Page | Performance | Accessibility | Best Practices | SEO | Notes |
  |---|---|---|---|---|---|
  | Home, desktop | 98 | 100 | 100 | 100 | LCP 1.1s |
  | Home, mobile | 90 | 100 | 100 | 100 | LCP 3.5s under simulated slow 4G and 4× CPU; mostly intro-animation render delay |
  | Gharq case study, mobile | 90 | 100 | 100 | 100 | |

  CLS is 0 throughout.
- **Checked in a real browser at 1440×900 and 375×812:** hero reel and timecode, every Work layout, index filter and hover preview, pinned horizontal Process section, lightbox (keyboard ←/→/Esc, focus trap and restore), mobile menu (focus, Esc, scroll lock), contact form validation and mailto fallback, and case-study layouts.
- **Reduced motion** (Chrome `--force-prefers-reduced-motion`): no smooth scroll, no reveals, reel paused, all content visible immediately.
- **Gharq trailer:** no YouTube request before the click; clicking Play loads `youtube-nocookie.com/embed/dfrVc6EV4Mw` and the trailer plays.
- **Not tested:** Safari and Firefox, real iOS and Android devices, and a live form backend.

## 12. Known limitations

- Several images are low-res or phone screenshots (see §6). They are shown at constrained sizes, and low-res case-study covers render inset rather than full-bleed, but originals will raise the quality noticeably.
- Mobile Lighthouse performance is 90. The remaining gap is mostly the intentional intro animation; trimming the hero timeline further would push it higher.
- ETBrandEquity may hold more than the 20 articles listed. Add any extras to `src/content/writing.ts`.
