# Portfolio site

Plain HTML/CSS/JS — no build step. Open `index.html` directly, or serve the
folder with any static file server.

## Structure

- `index.html` — Home page
- `projects.html` — Full project grid with filtering by tag
- `project.html?slug=...` — Project detail page (reads the slug from the URL and
  renders it from `js/data.js`)
- `cv.html` — CV / resume page
- `contact.html` — Contact page (form wired for Netlify Forms)
- `css/style.css` — All styling (dark theme)
- `js/data.js` — **Edit this to update your content.** Site info, projects,
  experience, skills, education all live here.
- `js/main.js` — Shared behaviour: nav toggle + rendering helpers
- `assets/` — Images, CV PDF, organized into subfolders (see below)

## Editing content

Everything you'd normally edit lives in [`js/data.js`](js/data.js):

- `SITE` — name, tagline, email, socials, path to your CV PDF, path to the
  home page showcase banner, and `photo` (your profile picture, shown in the
  Home page hero — falls back to an initials badge if left blank)
- `SKILL_AREAS` — the "what I bring" cards on the home page
- `PROJECTS` — each project's summary, role, year, tags, key points,
  collaborators, and a longer write-up. Add a new project by adding a new
  object to this array — it automatically joins the home page carousel, the
  projects grid, and gets its own detail page at `project.html?slug=your-slug`.
- `MISC_BUILDS` — standalone build screenshots that don't belong to a named
  project; shown as a simple captioned gallery at the bottom of the Projects
  page ("Additional builds"). Move an item's image into a project's `images`
  array (and delete it here) once you write a full project entry for it.
- `EXPERIENCE` / `EDUCATION` / `CV_SKILLS` / `LANGUAGES` — used on the CV page

## Current projects

Rebuilt from your CV (`TomRowland_CV_2026.pdf`) after a correction pass:

- **Block Wars** (`slug: blockwars`) — Capollo Media, Dec 2021 – Feb 2025. Its
  key points note that Twitch Rivals partnered with and sponsored Block Wars
  events after its success — Twitch Rivals is **not** a separate project.
  Links to the official site (blockwars.games) and Twitch Rivals; the
  Capollo Media collaborator chip links to capollomedia.com.
- **Lifesteal** (`slug: lifesteal`) — a 100-player finale arena for a public
  Lifesteal server, 2026. Uses all 4 photos in `images` (sketch → concept →
  2 wide shots), plus your `lifesteal.jpg` logo. No official site link —
  which specific public Lifesteal server this was for wasn't identified, so
  nothing was added rather than link to the wrong one; add it yourself under
  `links` if you want it.
- **HumanTechSupport** (`slug: human-tech-support`) — your tech support/
  recommendation service site, 2026. Uses your own screenshots: dark mode
  and light mode (browser chrome cropped off so they read as clean product
  shots), plus `mobile-pair.png` — your two mobile shots (`mobile.png` +
  `mobile-expanded.png`, kept in the folder as originals) composited side
  by side into one wide image, so the portrait mobile views fill the frame
  instead of sitting pillarboxed on their own. Links out to the live site.
  No logo yet — the site has its own laptop/keyboard mark in the header if
  you want to crop one out.
- **Checkpoint Studios** — Oct 2024 – Feb 2025. Uses a YouTube video
  thumbnail (`assets/checkpoint-studios/checkpoint-thumb.png`) as its image.
  Linked to checkpointmultiverse.com and the `@OfficialCheckpoint` YouTube
  channel — this is a **best-effort match** found by web search (a 4M+
  subscriber Minecraft creator whose content matches the CV description),
  not something I could independently confirm is the exact employer.
  Double-check before relying on it; there's a code comment on this entry in
  `js/data.js` too. Still no logo — the placeholder will show until you add
  one.
- **TBNR Productions** — Oct 2023 – Dec 2025. Uses a YouTube video thumbnail
  (`assets/tbnr/TBNR.png`) as its image, plus its existing logo. Linked to
  tbnr.work — high-confidence match (the name, Minecraft/creator-economy
  focus, and CV description all line up).
- **Creator Commissions** (`slug: creator-commissions`) — RyGuyRocky, Purpled,
  and SmallAnt, all on a **commission** basis per your answer. No part-time
  creator work was identified, so there's no separate part-time entry — add
  one if you have other creators to split out that way. Each collaborator
  now links to their YouTube (and Twitch/Twitter/Bluesky where they have an
  active one — SmallAnt moved off X to Bluesky in Nov 2024, so that's what's
  linked instead).
- **Game Design Diploma Project** (`slug: diploma-project`) — your Unreal
  Engine 5 diploma capstone (Farnborough College, Sep 2021 – Jun 2023).
  Links to farn-ct.ac.uk. Includes the 3 obstacle-course photos
  (`assets/diploma-project/`) —
  these were originally (incorrectly) filed under Block Wars since they came
  bundled with the Twitch Rivals logo in your upload; moved here per your
  correction. No logo yet.

Checkpoint Studios, Creator Commissions, and the Diploma Project still need
logos, and Creator Commissions still needs an image — the placeholders will
show until you add them.

## Home page hero + project carousel

The Home page hero shows the full showcase banner (`SITE.showcaseBanner`)
at the top, up to `max-height: 460px`, only lightly darkened
(`brightness(0.8)`) with a short fade confined to its bottom edge — the
banner is never covered by anything, so it reads clearly at full size.
Right below it (not overlapping) sits an identity row: your photo, a one-line
tagline, and your name, set via `SITE.photo` (currently `assets/me.jpg`) —
falls back to an initials badge (derived from `SITE.name`) if left blank. On
narrow screens the row just stacks (photo above the text) instead of sitting
side by side.

Right below the hero (before "Areas of experience"), "Projects" is a ring
carousel — 3 cards visible at full size (left/center/right, center only
modestly larger and sharper than the sides so the size jump stays gentle),
with more peeking through the narrow gaps behind them, dimmed and lightly
blurred, hinting that there's more to cycle through. The section runs wider
than the rest of the page (`.project-ring-section` caps at 1400px instead of
the usual 1120px) and the cards themselves are 300px wide, so the ring uses
much more of the available width on a normal desktop screen.

It's built with `initProjectCarousel()` in `js/main.js`, and every project
gets its own **permanent** slot in the DOM — nothing's content ever gets
swapped out. Each tick just moves every slot one step around a circular
position track; how far a slot's position sits from the center determines
its look (center largest+sharp, 1 step out smaller+clear, 2 steps out
smaller still and blurred — peeking through the gaps between the foreground
three), and anything further out is faded to fully invisible (still
positioned, just `opacity: 0`) rather than removed, so it fades back in as
its turn approaches. This works the same way regardless of how many projects
there are — 3 projects means everyone's visible at once with nothing hidden;
20 would mean most sit invisibly off to the sides until their turn. Because a
project's slot is never recreated, a project with no image yet (just the
muted "Add project image" placeholder) still reads as a card at the blurred
distance instead of disappearing into the page background — Creator
Commissions is the one this still matters for until it gets a real image.
Reuses the same ring-timer indicator (~8s per project, click to
jump to the next one early) as the photo stack on each project's detail
page. On screens ≤860px it collapses to just the center card, no ring.
There's still an "All projects →" link next to it to the full filterable
grid on `projects.html` for anyone who wants to see everything at once
instead of waiting for the carousel.

The section order on the Home page is: hero → CTA buttons → Projects
carousel → Areas of experience — the carousel sits high enough that its top
edge is visible without scrolling on most screens, per how the hero banner
height and section padding are tuned above.

## Adding project images & logos

Each project detail page shows an overlapping stack of up to 4 photos on the
left, and client/sponsor logo(s) on the right. Set these fields on a project
in `js/data.js`:

- `images: ["assets/yourproject/photo-1.jpg", "assets/yourproject/photo-2.jpg"]`
  — 1–4 photos for the stack (the first also becomes the card thumbnail).
  **Order matters**: the first photo starts front-most, and every ~8s (or
  on a click of the small ring indicator) the stack shuffles forward through
  the rest — so list them in whatever order tells the story, e.g. an early
  sketch first through to final shots last (see the Lifesteal project). A
  project can list more than 4 — only 4 render at once, and the rest queue
  in as the stack cycles, swapping into the back-most (least visible) slot
  each time (see the Block Wars project, which has 11). Each photo renders
  at its own natural size/aspect ratio (no cropping, no forced uniform box)
  — see the HumanTechSupport project, which mixes wide desktop shots and a
  tall mobile pair in the same stack.
- `imageFit: "contain"` (optional) — the card thumbnail (home page + Projects
  grid) normally crops the first image to fill its 16:9 box, which is fine
  for an ordinary screenshot. Set this when that crop would cut off content
  that matters — e.g. Checkpoint Studios and TBNR Productions use YouTube
  video thumbnails with the title and view count baked in along the bottom,
  so cropping to 16:9 sliced that text off; `imageFit: "contain"` shows the
  full image instead, letterboxed against the card's own background. Leave
  it unset for a normal screenshot — cropping to fill the box looks better
  there than a letterboxed image would.
- `logos: ["assets/yourproject/logo.png"]` — ideally transparent PNGs.
  - **1 logo** shows in a plain square card.
  - **2–3 logos** (e.g. a client plus a sponsor) show as a small overlapping
    fan — visually the same style as the photo stack, but static: no
    rotation, no timer, no indicator. See the Block Wars project, which
    shows its own logo plus the Twitch Rivals sponsor logo this way.
- `company` (optional) — shown as "Role · Company" when your job title and
  the project/brand name differ (e.g. `role: "Game Design Lead"`,
  `company: "Capollo Media"` for the Block Wars project)
- `links: [{ label: "Website", url: "https://..." }]` — project/company-level
  links (official site, sponsor, etc.), shown as buttons under the body text.
- `collaborators: [{ name, note, links: [{ label, url }] }]` — the `links`
  array is optional per person; when present it shows as small clickable
  links (YouTube, Twitter, Twitch, Bluesky, whatever's relevant) inside
  their chip. See the Creator Commissions project for an example with
  multiple links per person.

Skill tags (`tags` on each project) are colored automatically and
consistently — the same tag name always gets the same color, wherever it
appears (project cards, filters, the detail page).

The first `logos` entry also shows as a small 44×44 badge in the top-right
corner of every project card (home page + Projects grid) — no logo means no
badge, not a placeholder, so it's easy to see at a glance which projects
still need one.

## Asset folder layout

```
assets/
  xxl-showcase.png     — wide "past skills" banner (Home page)
  cv.pdf                — your CV
  blockwars/             — Block Wars photos + logo, plus the former
                            Twitch Rivals sponsor round photos + logo
                            (sponsored-round-*.png, twitch-rivals-sponsor-logo.png)
  tbnr/                  — TBNR Productions logo (no photos matched yet)
  misc/                  — unassigned build screenshots (→ MISC_BUILDS)
  creators/               — creator avatars (Purpled, SmallAnt, RyGuyRocky) —
                            not wired into a page yet; useful if you want to
                            show avatars next to the "worked with" chips later
  logos/                 — extra client logos not yet tied to a project
                            (e.g. Team Helix — add a project for it, or leave
                            it here until you do)
```

A few things surfaced while sorting the uploaded screenshots that aren't
reflected in the site yet, worth a follow-up pass:

- The showcase banner references named projects — **Extraction**,
  **Trailblazers**, and **Human Tech Support** — that aren't in `PROJECTS`
  yet. No screenshots for these came through in the upload, so nothing was
  invented; add entries for them when you have the details.
- `assets/logos/team-helix.jpg` is a client logo with no matching screenshots
  found — likely its own project once you have images/details for it.
- Your CV PDF also lists a phone number and a reference contact (name +
  email). Neither is published on the site — see the comment on `SITE` in
  `js/data.js` if you want to add either yourself.

## Deploying

**Netlify**: drag-and-drop the folder onto Netlify, or connect the repo.
The contact form is already wired for Netlify Forms (no config needed).

**Vercel**: connect the repo, no build command needed (static site). The
contact form will need a service like [Formspree](https://formspree.io) —
see the comment in `contact.html` for what to change.

## Adding your CV PDF

Put your CV at `assets/cv.pdf` (or update `SITE.cvFile` in `js/data.js` to
point elsewhere). The "Download PDF" button on the CV page links there.
