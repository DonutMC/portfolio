/**
 * Site content — edit this file to update projects, skills, and CV data.
 * No build step required; every page reads straight from these arrays.
 */

// ---------- Site-wide info ----------
const SITE = {
  name: "Tom Rowland",
  role: "Designer & Builder",
  tagline: "I design and build things — menus, games, maps and the logic behind them.",
  // From the "Profile" section of your CV — shown on the CV page.
  bio:
    "Passionate & competitive game design graduate who thrives in a creative environment — " +
    "thousands of hours put into passion projects that led to work with major brands and some " +
    "of the industry's largest influencers. Tech enthusiast & football fan who believes " +
    "collaboration, new ideas, and alternate perspectives shape the best finished products.",
  email: "tpfrowland@gmail.com",
  discord: "donut_tom",
  twitter: "https://twitter.com/Dynamitdoughnut",
  github: "", // add your GitHub URL
  linkedin: "", // add your LinkedIn URL
  // Not published on the site — your CV PDF also lists a phone number and a
  // reference contact. Both are left out of the public pages deliberately
  // (a phone number and someone else's email are more exposure than most
  // people want on a public website); add them yourself if you want them
  // visible, ideally the reference only with that person's OK.
  cvFile: "assets/cv.pdf", // drop your CV PDF in /assets and update this
  showcaseBanner: "assets/LongBanner.png", // wide "past skills" banner, shown on Home
  photo: "assets/me.jpg", // shown on the Home page hero
};

// ---------- Areas of experience (shown on Home) ----------
const SKILL_AREAS = [
  {
    title: "Level Design",
    description:
      "Designing levels that enhance a game's story and pacing, tailored to the intent of each project.",
  },
  {
    title: "Game Design",
    description:
      "Leading game design across a range of genres, with a strong grasp of what makes gameplay engaging.",
  },
  {
    title: "Media Production",
    description:
      "Producing thumbnails and video content for creator channels with a combined audience in the millions.",
  },
  {
    title: "UX Design",
    description:
      "Designing icons and interface elements that stay clear and consistent across a whole product.",
  },
  {
    title: "Web Design",
    description:
      "Building web tools and sites end-to-end, from layout and UI through to working front-end code.",
  },
  {
    title: "Problem Solving",
    description:
      "Finding pragmatic solutions to constraints across tools, pipelines, and team workflows — proactively, not just when asked.",
  },
];

// ---------- Projects ----------
// company: optional — shown next to role as "Role · Company" when your job
//   title and the project/brand name differ (e.g. Capollo Media / Block Wars).
// tags: short labels shown as pills (color-coded automatically), used for
//   filtering on the Projects page, and shown above the logo on the detail page.
// images: 1-4 screenshots/photos shown as an overlapping stack on the detail
//   page's left column, in the order given — the first one starts front-most
//   and the rest cycle into view behind it, so put them in whatever order
//   tells the story (e.g. sketch first, final shots last). The first image
//   also doubles as the card thumbnail. Leave empty for a placeholder.
// logos: 1+ PNGs (ideally transparent background) representing the
//   client(s)/sponsor(s), shown on the right-hand side of the detail page.
//   A single logo shows in a plain square card. 2-3 logos (e.g. a client
//   plus a sponsor, like Block Wars + Twitch Rivals) show as a small static
//   overlapping fan, styled like the photo stack but without any rotation
//   or timer — just a fixed layered look.
// keyPoints: bullet list of what the project demonstrates.
// collaborators: people/orgs you worked with, with an optional role/context
//   note and an optional `links` array (e.g. YouTube, Twitter, Twitch) shown
//   as small links inside their chip on the detail page.
// links: project/company-level links (official site, sponsor, etc.), shown
//   as buttons in the center column.
const PROJECTS = [
  {
    slug: "blockwars",
    title: "Block Wars",
    year: "Dec 2021 – Feb 2025",
    role: "Game Design Lead",
    company: "Capollo Media",
    summary:
      "Led game design for Capollo Media's Block Wars, taking new games from concept through to release on a monthly cycle.",
    tags: ["Game Design", "Level Design", "Leadership"],
    images: [
      "assets/blockwars/hub-wide.png",
      "assets/blockwars/hub-ferris-wheel.png",
      "assets/blockwars/arena-aerial.png",
      // These also live in MISC_BUILDS (the "Additional builds" gallery) —
      // they're shared between both, not moved out of misc.
      "assets/misc/forest-landscape.png",
      "assets/misc/watchtower.png",
      "assets/misc/colosseum-aerial.png",
      "assets/misc/colosseum-interior.png",
      "assets/misc/diamond-arena.jpg",
      "assets/misc/factory-sphere.png",
      "assets/misc/steampunk-city.png",
      "assets/misc/crystal-island.png",
    ],
    logos: ["assets/blockwars/logo.png", "assets/blockwars/twitch-rivals-sponsor-logo.png"],
    keyPoints: [
      "Led a team of 5 to concept, design, and test new games, mechanics, maps, and features on a monthly cycle",
      "Created 10+ unique games, iterating with game testers and public feedback",
      "Collaborated with brands to place advertisements and promotional material as in-game features and billboards",
      "Block Wars' success led Twitch Rivals to partner with and sponsor in-game community events",
    ],
    collaborators: [
      { name: "Capollo Media", note: "5-person design team", links: [{ label: "Website", url: "https://capollomedia.com/" }] },
    ],
    links: [
      { label: "Website", url: "https://blockwars.games/" },
      { label: "Twitch Rivals", url: "https://twitchrivals.com/" },
    ],
    // No write-up yet — the detail page shows an "I'm working on it" note
    // instead of placeholder text when body is left empty like this.
    body: "",
  },
  {
    slug: "human-tech-support",
    title: "HumanTechSupport",
    year: "2026",
    role: "Web Designer & Developer",
    summary:
      "A frictionless tech support and recommendation service for local businesses and people, built end-to-end.",
    tags: ["Web Design", "UX Design", "Branding"],
    images: [
      "assets/human-tech-support/desktop-dark.jpg",
      "assets/human-tech-support/desktop-light.jpg",
      "assets/human-tech-support/mobile-pair.png",
    ],
    logos: ["assets/human-tech-support/logo.png"],
    keyPoints: [
      "Designed the brand's logo — a monitor, keyboard, and mouse wrapped in a stethoscope cable — as a custom vector mark",
      "Built a live chat-style interface around three clear service tiers: free Tech Advice, paid Tech Support, and Tech Consulting",
      "Designed full light and dark mode support, down to a fully responsive mobile layout",
      "Focused the whole flow on frictionless, jargon-free access to help for local businesses and people",
    ],
    collaborators: [],
    links: [{ label: "Visit site", url: "https://humantechsupport.netlify.app/" }],
    body:
      "My goal for the project was to provide a frictionless tech support and recommendation service for local " +
      "businesses and people.",
  },
  {
    slug: "checkpoint-studios",
    title: "Checkpoint Studios",
    year: "Oct 2024 – Feb 2025",
    role: "Content Producer",
    summary:
      "Organised level design teams and artists to concept and commission assets to TV-quality production standards.",
    tags: ["Level Design", "Production", "Media Production"],
    images: ["assets/checkpoint-studios/checkpoint-thumb.png"],
    imageFit: "contain", // a YouTube thumbnail with its own title/view-count bar — don't crop it
    logos: ["assets/checkpoint-studios/logo.jpg"],
    keyPoints: [
      "Organised level design teams and artists to concept and commission assets to TV-quality production and storytelling standards",
      "Worked with developers to concept custom mechanics and features that best served the story, then personally QA'd them",
      "Aided in script re-writes where a story beat would otherwise strain the production pipeline",
    ],
    collaborators: [],
    // Best-match found via web search — Checkpoint (SteveCP), a Minecraft
    // creator with 4M+ subscribers whose content matches this role (TV-quality
    // production, level design teams). Not independently confirmed as the
    // exact employer — double-check before relying on this.
    links: [
      { label: "Website", url: "https://checkpointmultiverse.com/" },
      { label: "YouTube", url: "https://www.youtube.com/@OfficialCheckpoint" },
    ],
    body: "",
  },
  {
    slug: "tbnr",
    title: "TBNR Productions",
    year: "Oct 2023 – Dec 2025",
    role: "Content Producer",
    summary:
      "Guided creative and production teams to craft narratives efficiently for channels with millions of subscribers.",
    tags: ["Media Production", "Production"],
    images: ["assets/tbnr/TBNR.png"],
    imageFit: "contain", // a YouTube thumbnail with its own title/view-count bar — don't crop it
    logos: ["assets/tbnr/logo.jpg"],
    keyPoints: [
      "Worked between the creative and production teams, guiding narrative craft for the best efficiency and end product",
      "Stepped outside my core role when the team was stretched — e.g. covering level design work when that department fell behind",
    ],
    collaborators: [],
    links: [{ label: "Website", url: "https://tbnr.work/" }],
    body: "",
  },
  {
    slug: "creator-commissions",
    title: "Creator Commissions",
    year: "Various",
    role: "Freelance Level & Game Designer",
    summary:
      "Commission-based level and game design work for individual content creator channels, outside of full-time roles.",
    tags: ["Level Design", "Game Design", "Commission"],
    images: [
      "assets/creator-commissions/NicoCommision.png",
      "assets/creator-commissions/NicoCommision2.png",
      "assets/creator-commissions/PurpledCommision.png",
      "assets/creator-commissions/HouseCommision.png",
      "assets/creator-commissions/HouseTrialCommision.png",
      "assets/creator-commissions/MarioPartyCommision.png",
    ],
    // No single client/studio logo here — reuses the three creators' own
    // pfps in the overlapping fan, the same way Block Wars shows its logo +
    // the Twitch Rivals sponsor logo together. Separate images from the
    // smaller ones used in the "Worked with" chips below (assets/creators/).
    logos: [
      "assets/creator-commissions/ryguyrocky.jpg",
      "assets/creator-commissions/purpled.jpg",
      "assets/creator-commissions/smallant.jpg",
    ],
    keyPoints: [
      "Delivered level and game design work directly for individual creators on a commission basis",
      "Worked to each creator's own brief, timeline, and channel style rather than a studio pipeline",
    ],
    collaborators: [
      {
        name: "RyGuyRocky",
        note: "Commission — 3.4M YouTube",
        avatar: "assets/creators/ryguy.webp",
        links: [
          { label: "YouTube", url: "https://www.youtube.com/@ryguyrocky" },
          { label: "Twitter", url: "https://x.com/Ryguyrocky" },
        ],
      },
      {
        name: "Purpled",
        note: "Commission — 1M YouTube / 1.1M Twitch",
        avatar: "assets/creators/purpled.jpg",
        links: [
          { label: "YouTube", url: "https://www.youtube.com/@PurpledMC" },
          { label: "Twitch", url: "https://www.twitch.tv/purpled" },
          { label: "Twitter", url: "https://x.com/burpled" },
        ],
      },
      {
        name: "SmallAnt",
        note: "Commission — 3.1M YouTube / 1.4M Twitch",
        avatar: "assets/creators/smallant.jpg",
        links: [
          { label: "YouTube", url: "https://www.youtube.com/@Smallant" },
          { label: "Twitch", url: "https://www.twitch.tv/smallant" },
          { label: "Bluesky", url: "https://bsky.app/profile/smallant.live" },
        ],
      },
      {
        // Nico Polo / "NotNico" — Minecraft creator, confirmed via
        // youtube.com/@nico (the handle Tom gave). Only YouTube is linked —
        // couldn't confirm a Twitch/Twitter handle specifically belonging to
        // this Nico (there's a similarly-named "NicoB" on Twitch who is a
        // different person), so nothing was added there rather than risk
        // linking the wrong account.
        name: "Nico",
        note: "Commission — 4.7M YouTube",
        avatar: "assets/creator-commissions/nico.jpg",
        links: [{ label: "YouTube", url: "https://www.youtube.com/@nico" }],
      },
    ],
    links: [],
    body: "",
  },
  {
    slug: "lifesteal",
    title: "Lifesteal",
    year: "2026",
    role: "Level Designer",
    summary:
      "Designed the end-game arena for a public Lifesteal server, built to host a 100-player finale fight.",
    tags: ["Level Design", "Game Design"],
    // 03-wide-1 leads as the featured/thumbnail shot (used on the home page
    // carousel and the Projects grid) — a clear, finished aerial view reads
    // much better as a thumbnail than the rough sketch did. The rest follow
    // in their original sketch-to-finished order for the detail page stack.
    images: [
      "assets/lifesteal/03-wide-1.png",
      "assets/lifesteal/01-sketch.png",
      "assets/lifesteal/02-concept.png",
      "assets/lifesteal/04-wide-2.png",
    ],
    logos: ["assets/lifesteal/lifesteal.jpg"],
    keyPoints: [
      "Designed a symmetric five-island arena to host a 100-player finale fight",
      "Took the map from an initial concept sketch through to a fully built, playable space",
      "Built for a public Lifesteal server's live finale event",
    ],
    collaborators: [],
    links: [],
    body:
      "Designed as the climactic end-game location for a public Lifesteal server, built to host up to 100 " +
      "concurrent players in a single final fight. The map started as a rough top-down sketch — a symmetric " +
      "five-island cross layout — then was built out into a full arena, iterating on scale and sightlines " +
      "until it could comfortably hold a 100-player finale.",
  },
  {
    slug: "diploma-project",
    title: "Game Design Diploma Project",
    year: "Sep 2021 – Jun 2023",
    role: "Final Diploma Project",
    company: "Farnborough College of Technology",
    summary:
      "Capstone project for a Game Design Diploma (Distinction, Distinction, Merit), built in Unreal Engine 5.",
    tags: ["Game Design", "Level Design", "Unreal Engine 5"],
    images: [
      "assets/diploma-project/obstacle-course-wide.png",
      "assets/diploma-project/obstacle-course-close-1.png",
      "assets/diploma-project/obstacle-course-close-2.png",
    ],
    logos: ["assets/diploma-project/logo.jpg"],
    keyPoints: [
      "Built in Unreal Engine 5 as the final project for a Game Design Diploma",
      "Designed an obstacle-course level as part of the project",
    ],
    collaborators: [],
    links: [{ label: "Farnborough College", url: "https://www.farn-ct.ac.uk/" }],
    body: "",
  },
];

// ---------- Additional level design / build showcase ----------
// Standalone builds and studies that don't belong to a single named client
// project — shown as a simple gallery on the Projects page, below the main
// project cards. Add a new one by adding an object here; remove this whole
// section (and its gallery on projects.html) if you'd rather fold these into
// full projects later.
const MISC_BUILDS = [
  { image: "assets/misc/spire-landscape.png", caption: "Landscape study — mountain spire island" },
  { image: "assets/misc/forest-landscape.png", caption: "Landscape study — forested valley" },
  { image: "assets/misc/teal-shrine.png", caption: "Landscape study — shrine terrain" },
  { image: "assets/misc/watchtower.png", caption: "Forest watchtower" },
  { image: "assets/misc/colosseum-aerial.png", caption: "Colosseum arena — aerial" },
  { image: "assets/misc/colosseum-interior.png", caption: "Colosseum arena — interior" },
  { image: "assets/misc/diamond-arena.jpg", caption: "Symmetric competitive arena layout" },
  { image: "assets/misc/floating-obby.png", caption: "Floating obstacle course islands" },
  { image: "assets/misc/factory-sphere.png", caption: "Industrial factory sphere" },
  { image: "assets/misc/steampunk-city.png", caption: "Steampunk riverside city" },
  { image: "assets/misc/crystal-island.png", caption: "Sci-fi crystal biome" },
  { image: "assets/misc/space-station.png", caption: "Orbital space station" },
];

// ---------- CV: experience timeline ----------
// `bullets` (an array) is preferred and renders as a list, matching the CV
// PDF; a plain `description` string still works for a single-line entry.
const EXPERIENCE = [
  {
    date: "Oct 2024 – Feb 2025",
    role: "Content Producer",
    org: "Checkpoint Studios",
    bullets: [
      "Organised level design teams and artists to concept and commission assets to TV-quality production and storytelling standards",
      "Worked with developers to concept custom mechanics and features that best served the story, then personally QA'd them",
      "Aided in script re-writes where a story beat would otherwise strain the production pipeline",
    ],
  },
  {
    date: "Dec 2021 – Feb 2025",
    role: "Game Design Lead",
    org: "Capollo Media (Block Wars)",
    bullets: [
      "Led a team of 5 to concept, design, and test new games, mechanics, maps, and features on a monthly cycle",
      "Created 10+ unique games, iterating with game testers and public feedback",
      "Collaborated with brands to place advertisements and promotional material as in-game features and billboards",
    ],
  },
  {
    date: "Oct 2023 – Dec 2025",
    role: "Content Producer",
    org: "TBNR Productions",
    bullets: [
      "Worked between the creative and production teams, guiding narrative craft for the best efficiency and end product for channels with millions of subscribers",
      "Stepped outside my core role when the team was stretched — e.g. covering level design work when that department fell behind",
    ],
  },
];

// ---------- CV: skills ----------
const CV_SKILLS = [
  "Media Production",
  "Problem Solving",
  "Game Design",
  "Creative Thinking",
  "Data Analysis",
  "Level Design",
  "UX Design",
  "Collaborative",
  "Adaptability",
  "AI Literate",
];

// ---------- CV: languages ----------
const LANGUAGES = [
  { name: "English", level: "Fluent" },
  { name: "German", level: "Novice" },
];

// ---------- CV: education ----------
const EDUCATION = [
  {
    date: "Sep 2021 – Jun 2023",
    role: "Game Design Diploma (Distinction, Distinction, Merit)",
    org: "Farnborough College of Technology",
    description: "Includes an Unreal Engine 5 game design diploma project.",
  },
  {
    date: "Sep 2015 – Jun 2020",
    role: "GCSEs",
    org: "Salesian College",
    description:
      "RE 8; Business 7; Combined Science 7/6; Maths 7; English 6/6; Computer Science 6; Art 6; French 5.",
  },
];
