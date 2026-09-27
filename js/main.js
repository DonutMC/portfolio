/**
 * Shared behaviour: mobile nav toggle + active link highlighting.
 * Page-specific rendering (projects grid, project detail, CV) lives in
 * inline <script> blocks at the bottom of each HTML page, reading from
 * the data in js/data.js.
 */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }

  // Highlight the current page in the nav
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  initLightbox();
});

// Click-to-enlarge preview for project photos (the stack on a project detail
// page) and the misc-build gallery tiles on the Projects page, with prev/
// next arrows to step through the rest of that same gallery. Uses one
// delegated click listener on `document` rather than binding to each image
// individually, so it keeps working for photos that get created later (the
// carousel builds every project's slide up front, and the stack shuffles
// images into slots over time) without needing to be re-run. Project card
// thumbnails are deliberately excluded — those stay a link through to the
// project's own page.
//
// A project's stack only ever renders 4 <img> elements at once (see
// initImageStack), even though it may have more photos than that (Block
// Wars has 11) — so the *full* ordered list for a given project is read
// from data-images on its .image-stack (set in project.html), not
// re-derived from whatever's currently in the DOM.
function initLightbox() {
  const overlay = el(
    "div",
    "lightbox",
    `<button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image">
       <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
     </button>
     <button type="button" class="lightbox-close" aria-label="Close preview">
       <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
     </button>
     <img alt="">
     <button type="button" class="lightbox-nav lightbox-next" aria-label="Next image">
       <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
     </button>`
  );
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector("img");
  const closeBtn = overlay.querySelector(".lightbox-close");
  const prevBtn = overlay.querySelector(".lightbox-prev");
  const nextBtn = overlay.querySelector(".lightbox-next");
  let lastFocused = null;
  let gallery = [];
  let index = 0;

  function render() {
    imgEl.src = gallery[index];
    const hasMultiple = gallery.length > 1;
    prevBtn.classList.toggle("is-hidden", !hasMultiple);
    nextBtn.classList.toggle("is-hidden", !hasMultiple);
  }

  function step(delta) {
    if (gallery.length < 2) return;
    index = (index + delta + gallery.length) % gallery.length;
    render();
  }

  function openLightbox(images, startIndex) {
    gallery = images;
    index = startIndex;
    lastFocused = document.activeElement;
    render();
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener("click", (e) => {
    const stackPhoto = e.target.closest(".image-stack .stack-photo:not(.empty)");
    if (stackPhoto) {
      const stack = stackPhoto.closest(".image-stack");
      let images = [];
      try {
        images = JSON.parse(stack.dataset.images || "[]");
      } catch {
        images = [];
      }
      const clickedSrc = stackPhoto.currentSrc || stackPhoto.src;
      if (!images.length) images = [clickedSrc];
      const startIndex = Math.max(0, images.findIndex((src) => clickedSrc.endsWith(src)));
      openLightbox(images, startIndex);
      return;
    }
    const miscImg = e.target.closest(".misc-tile img");
    if (miscImg) {
      const allMisc = Array.from(document.querySelectorAll(".misc-tile img"));
      openLightbox(allMisc.map((img) => img.currentSrc || img.src), allMisc.indexOf(miscImg));
    }
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    step(-1);
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    step(1);
  });
  closeBtn.addEventListener("click", closeLightbox);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });
}

// ---------- Helpers used by page-level scripts ----------

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

// Shared by cv.html's full timeline and the Home page's condensed CV
// section, so both stay in sync with a single render function.
function renderTimeline(containerId, items) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  items.forEach((item) => {
    const row = el("div", "timeline-item");
    row.appendChild(el("div", "timeline-date", item.date || ""));
    const right = el("div");
    right.appendChild(el("div", "timeline-role", item.role));
    right.appendChild(el("div", "timeline-org", item.org));
    if (item.bullets && item.bullets.length) {
      right.appendChild(el("ul", "timeline-bullets", item.bullets.map((b) => `<li>${b}</li>`).join("")));
    } else if (item.description) {
      right.appendChild(el("p", null, item.description));
    }
    row.appendChild(right);
    wrap.appendChild(row);
  });
}

// Color-coded skill tags: each tag name is deterministically mapped to one
// of a fixed palette (see .tag-color-* in css/style.css) so the same skill
// always gets the same color, without having to hand-map every tag.
const TAG_PALETTE = ["mint", "blue", "purple", "amber", "rose", "cyan", "lime", "orange"];

function tagColorClass(tag) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  }
  return `tag-color-${TAG_PALETTE[hash % TAG_PALETTE.length]}`;
}

function tagPill(tag) {
  return `<span class="tag ${tagColorClass(tag)}">${tag}</span>`;
}

function projectCard(project) {
  const card = el("a", "project-card");
  card.href = `project.html?slug=${encodeURIComponent(project.slug)}`;

  // 2+ images: show a small overlapping fan (same visual language as the
  // photo/logo stacks on the detail page) instead of a single flat crop, so
  // a card hints there's more than one shot to see. A single image keeps
  // the plain full-bleed crop — a fan of one card would look like a mistake.
  const images = (project.images || []).slice(0, 3);
  const fitClass = project.imageFit === "contain" ? " fit-contain" : "";
  let mediaHtml;
  if (images.length >= 2) {
    const posClasses = ["pos-1", "pos-2", "pos-3"];
    mediaHtml = `<div class="project-card-stack">${images
      .map((src, i) => `<img class="stack-tile ${posClasses[i]}" src="${src}" alt="${project.title}">`)
      .join("")}</div>`;
  } else if (images.length === 1) {
    mediaHtml = `<img src="${images[0]}" alt="${project.title}" class="${fitClass.trim()}">`;
  } else {
    mediaHtml = "Add project image";
  }
  const media = el("div", "project-card-media", mediaHtml);

  // 2+ logos (e.g. a client plus a sponsor): a small cascading stack in the
  // corner — each chip nudged down and rotated slightly more than the last —
  // instead of just showing the first and hiding the rest. A single logo
  // keeps the plain flat badge.
  const logos = (project.logos || []).slice(0, 3);
  if (logos.length >= 2) {
    const logoStackHtml = logos
      .map((src) => `<div class="project-card-logo-chip"><img src="${src}" alt="${project.title} logo"></div>`)
      .join("");
    media.appendChild(el("div", "project-card-logo-stack", logoStackHtml));
  } else if (logos.length === 1) {
    media.appendChild(el("div", "project-card-logo", `<img src="${logos[0]}" alt="${project.title} logo">`));
  }

  const body = el("div", "project-card-body");
  body.appendChild(el("span", "project-year", project.year));
  body.appendChild(el("h3", null, project.title));
  body.appendChild(el("p", null, project.summary));

  const tagRow = el("div", "tag-row", project.tags.map(tagPill).join(""));
  body.appendChild(tagRow);

  card.appendChild(media);
  card.appendChild(body);
  return card;
}

// Overlapping photo stack (project detail page): rotates which photo sits
// front/mid/back(/further back) on a timer, shown as a fill ring on the small
// indicator button. Clicking the indicator shuffles immediately and restarts
// the timer. Photos never move in the DOM — only their pos-N class changes,
// so the fan positions in CSS stay exactly where they're defined. Works with
// 2-4 photos (however many pos-N slots CSS defines and the page renders);
// the photo in pos-1 when the page loads is whichever one is first in the
// project's `images` array, so that order controls what's seen first.
//
// `allImages` (optional) is the project's *full* image list, which may have
// more entries than there are DOM slots (only the first 4 are rendered as
// actual <img> elements). Any extra images are queued in: each time a photo
// finishes its move to the back-most slot — least visible, mid-shuffle — its
// `src` is swapped to the next queued image, so a project with more than 4
// photos still cycles through all of them, not just the first 4.
function initImageStack(stackEl, allImages) {
  if (!stackEl) return;

  const indicatorBtn = stackEl.querySelector(".stack-indicator");
  const photos = Array.from(stackEl.querySelectorAll(".stack-photo:not(.empty)"));

  if (photos.length < 2) {
    if (indicatorBtn) indicatorBtn.remove();
    return;
  }
  if (!indicatorBtn) return;

  const CYCLE_MS = 8000;
  const MOVE_MS = 650; // just past the 0.6s CSS position transition
  const posClasses = ["pos-1", "pos-2", "pos-3", "pos-4"].slice(0, photos.length);
  let assignment = photos.map((_, i) => posClasses[i]);
  let timer = null;

  // Cycles through the *entire* image list forever, not just the tail
  // beyond the rendered slots — each time a photo reaches the back-most
  // slot, its src swaps to the next image in line, wrapping around via
  // modulo. Walking the full list (rather than a queue of only the images
  // past the first 4) means the ones shown up front initially come back
  // around too, instead of getting permanently evicted the first time
  // their slot is overwritten — which was leaving only the last couple of
  // images in rotation once everything cycled once.
  const images = allImages || [];
  const hasExtra = images.length > photos.length;
  let nextIndex = photos.length;

  function applyAssignment() {
    photos.forEach((photo, i) => {
      posClasses.forEach((c) => photo.classList.remove(c));
      photo.classList.add(assignment[i]);
    });
  }

  // Rotate: whichever photo is at the front moves to the back, and every
  // other photo shifts one slot toward the front.
  function shuffle() {
    assignment = assignment.map((cls) => {
      const idx = posClasses.indexOf(cls);
      const nextIdx = idx === 0 ? posClasses.length - 1 : idx - 1;
      return posClasses[nextIdx];
    });
    applyAssignment();

    if (hasExtra) {
      const backClass = posClasses[posClasses.length - 1];
      const backPhoto = photos[assignment.indexOf(backClass)];
      const nextSrc = images[nextIndex % images.length];
      nextIndex++;
      // Swap the src only once it's settled at the back, so the change
      // isn't visible mid-slide.
      setTimeout(() => {
        backPhoto.src = nextSrc;
      }, MOVE_MS);
    }
  }

  const progressRing = indicatorBtn.querySelector(".indicator-progress");

  function restartCycle() {
    if (timer) clearInterval(timer);
    timer = setInterval(shuffle, CYCLE_MS);
    if (progressRing) {
      // Restart the CSS fill animation from empty by toggling the class
      // with a forced reflow in between.
      progressRing.classList.remove("running");
      void progressRing.getBoundingClientRect();
      progressRing.classList.add("running");
    }
  }

  indicatorBtn.addEventListener("click", () => {
    shuffle();
    restartCycle();
  });

  applyAssignment();
  restartCycle();
}

// Home page project carousel: a ring with one *permanent* slot per project —
// nothing ever gets its content swapped out. Each tick just moves every slot
// one step around a circular position track (0..count-1); how far a slot's
// position sits from the center position determines its look: center is
// largest and sharp, 1 step out is smaller and clear, 2 steps out is smaller
// still and blurred (peeking through the gaps between the foreground three),
// anything further is faded to fully invisible (still positioned, just
// opacity 0) rather than removed, so it can fade back in as its turn
// approaches. Because a project's slot is never recreated, a project with no
// image yet (just the "Add project image" placeholder) still reads as a
// card at the blurred distance instead of vanishing into the page
// background. Reuses the same .stack-indicator ring/timer control (CYCLE_MS,
// restart-on-click, running-class animation) as the photo stack above. Works
// the same way for any project count — 3 projects means everyone's visible
// at once with no hidden slots; 20 means most sit invisibly off to the sides
// until their turn.
function initProjectCarousel(containerEl, projects) {
  if (!containerEl || !projects || !projects.length) return;

  const count = projects.length;
  const center = Math.floor(count / 2);

  const slots = projects.map((project) => {
    const slot = el("div", "ring-card-slot");
    slot.appendChild(projectCard(project));
    containerEl.appendChild(slot);
    return slot;
  });

  // order[i] = the position (0..count-1, left to right) slots[i] currently
  // holds. Starts with project 0 centered and the rest fanned out in order,
  // so clicking "next" reveals projects 0, 1, 2, ... in the order they're
  // listed in js/data.js.
  let order = slots.map((_, i) => (center + i) % count);

  // Card size and ring spread both scale together with however much width
  // the section actually has — 340px cards and 380/290px offsets were tuned
  // for a ~1120px container, and above that the whole ring grows
  // proportionally so it fills much more of the screen on wide viewports
  // instead of sitting in a fixed-width band in the middle (capped so cards
  // don't balloon absurdly on ultra-wide monitors). Below 1120px there's no
  // floor on the scale-down either — unlike a floor at 1x, which left the
  // ring's real pixel size fixed while its container kept shrinking, and cut
  // the ±1/±2 peeking cards off at the container edge, letting scale track
  // width all the way down keeps the whole ring (peeks included) inside
  // whatever width it's actually given, so nothing is ever clipped.
  const BASE_WIDTH = 1120;
  const MAX_SCALE = 1.8;
  let scale = 1;
  let cardWidth = 340;
  let dist1 = 380;
  let dist2 = 290;

  // Below 861px the ring collapses to just the center card (see the
  // ≤860px rule in css/style.css), which sizes the container by its own
  // content via `height: auto` — an inline height here would override that
  // (inline styles always beat stylesheet rules) and break the collapse, so
  // it's only ever set above that breakpoint, and explicitly cleared below it.
  const COLLAPSE_WIDTH = 860;

  function updateMetrics() {
    scale = Math.min(MAX_SCALE, containerEl.clientWidth / BASE_WIDTH);
    cardWidth = 340 * scale;
    dist1 = 380 * scale;
    dist2 = 290 * scale;
    slots.forEach((slot) => {
      slot.style.width = `${cardWidth}px`;
    });
    containerEl.style.height = window.innerWidth > COLLAPSE_WIDTH ? `${500 * scale}px` : "";
  }

  function styleForPosition(pos) {
    const role = pos - center;
    const side = Math.sign(role);
    const dist = Math.abs(role);
    if (dist === 0) return { scale: 1.1, offset: 0, opacity: 1, blur: 0, z: 5, role: "center" };
    if (dist === 1) return { scale: 0.85, offset: side * dist1, opacity: 0.85, blur: 0, z: 4, role: side < 0 ? "left" : "right" };
    if (dist === 2) return { scale: 0.65, offset: side * dist2, opacity: 0.5, blur: 3, z: 1, role: side < 0 ? "far-left" : "far-right" };
    return { scale: 0.5, offset: side * dist2, opacity: 0, blur: 0, z: 0, role: "hidden" };
  }

  function applyOrder() {
    slots.forEach((slot, i) => {
      const { scale: cardScale, offset, opacity, blur, z, role } = styleForPosition(order[i]);
      slot.style.transform = `translate(-50%, -50%) translateX(${offset}px) scale(${cardScale})`;
      slot.style.opacity = opacity;
      slot.style.filter = blur ? `blur(${blur}px)` : "none";
      slot.style.zIndex = z;
      slot.dataset.role = role;
    });
  }
  updateMetrics();
  applyOrder();

  let metricsResizeTimer = null;
  window.addEventListener("resize", () => {
    if (metricsResizeTimer) clearTimeout(metricsResizeTimer);
    metricsResizeTimer = setTimeout(() => {
      updateMetrics();
      applyOrder();
    }, 150);
  });

  if (count < 2) return;

  const indicatorBtn = el(
    "button",
    "stack-indicator",
    `<svg viewBox="0 0 36 36">
       <circle class="indicator-track" cx="18" cy="18" r="14"></circle>
       <circle class="indicator-progress" cx="18" cy="18" r="14"></circle>
     </svg>`
  );
  indicatorBtn.type = "button";
  indicatorBtn.setAttribute("aria-label", "Show next project");
  indicatorBtn.title = "Next project";
  containerEl.appendChild(indicatorBtn);

  const CYCLE_MS = 8000;

  // direction 1 = next (the same way the auto-cycle and indicator always
  // moved); -1 = previous, reversing that same per-slot shift.
  function rotate(direction = 1) {
    order = order.map((pos) => {
      if (direction < 0) return pos === count - 1 ? 0 : pos + 1;
      return pos === 0 ? count - 1 : pos - 1;
    });
    applyOrder();
  }

  const progressRing = indicatorBtn.querySelector(".indicator-progress");

  function restartCycle() {
    if (timer) clearInterval(timer);
    timer = setInterval(rotate, CYCLE_MS);
    if (progressRing) {
      progressRing.classList.remove("running");
      void progressRing.getBoundingClientRect();
      progressRing.classList.add("running");
    }
  }

  let timer = null;
  indicatorBtn.addEventListener("click", () => {
    rotate(1);
    restartCycle();
  });

  // Arrow buttons — same left/right-of-the-carousel pattern as the project
  // detail page's prev/next, just anchored to this smaller boxed carousel
  // instead of the viewport (see .ring-nav-btn in css/style.css). They're
  // siblings of containerEl in the markup (index.html), not children of it.
  const navHost = containerEl.parentElement;
  const prevBtn = navHost ? navHost.querySelector(".ring-nav-btn.prev") : null;
  const nextBtn = navHost ? navHost.querySelector(".ring-nav-btn.next") : null;
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      rotate(-1);
      restartCycle();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      rotate(1);
      restartCycle();
    });
  }

  restartCycle();
}

// Project detail page carousel: every project renders as its own permanent
// ".project-slide" (see renderProjectSlide in project.html) inside a
// horizontally-scrolling, scroll-snapped track. That gets native touch/
// trackpad swipe for free — this function only has to handle the prev/next
// buttons, keep the URL/title/active-dimming in sync with whichever slide is
// centered (however it got there — button, swipe, or browser back/forward),
// and start each slide's own photo-stack timer.
function initProjectDetailCarousel(root, projects, initialSlug) {
  const viewport = root.querySelector(".project-carousel-viewport");
  const track = root.querySelector(".project-carousel-track");
  const slides = track ? Array.from(track.querySelectorAll(".project-slide")) : [];
  const prevBtn = root.querySelector(".carousel-nav.prev");
  const nextBtn = root.querySelector(".carousel-nav.next");
  if (!viewport || !slides.length) return;

  const count = projects.length;
  // With 2+ projects, project.html prepends a clone of the last project and
  // appends a clone of the first (see renderProjectSlide's isClone), so the
  // first project always has something to peek at on its left and the last
  // on its right — the carousel loops visually at both ends. Everything
  // below tracks two coordinate spaces: "DOM index" (position in `slides`,
  // clones included) for scrolling, and "project index" (position in
  // `projects`, no duplicates) for title/URL/data.
  const hasClones = slides.length === count + 2;

  function domIndexForProject(pIndex) {
    return hasClones ? pIndex + 1 : pIndex;
  }
  function projectIndexForDom(dIndex) {
    if (!hasClones) return dIndex;
    if (dIndex === 0) return count - 1;
    if (dIndex === slides.length - 1) return 0;
    return dIndex - 1;
  }

  slides.forEach((slide, domIdx) => {
    const project = projects[projectIndexForDom(domIdx)];
    initImageStack(slide.querySelector(".image-stack"), project.images || []);
  });

  let activeDomIndex = domIndexForProject(Math.max(0, projects.findIndex((p) => p.slug === initialSlug)));

  // Any scroll event while this is true is ignored by the "settle" listener
  // below — otherwise the browser's own scroll-snap re-alignment (which
  // fires plain 'scroll' events, e.g. while a viewport resize is still
  // changing every slide's width, or right after silently snapping a clone
  // back to its real counterpart) gets misread as the user swiping to a
  // different project. Time-boxed as a backstop in case something forgets
  // to clear it.
  let suppressSettle = false;
  let suppressSettleTimer = null;
  function setSuppressSettle(on, maxMs) {
    suppressSettle = on;
    if (suppressSettleTimer) clearTimeout(suppressSettleTimer);
    if (on && maxMs) suppressSettleTimer = setTimeout(() => { suppressSettle = false; }, maxMs);
  }

  function markActiveDom(domIndex) {
    activeDomIndex = domIndex;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === domIndex));
  }

  function syncProject(domIndex, { push }) {
    markActiveDom(domIndex);
    const project = projects[projectIndexForDom(domIndex)];
    document.title = `${project.title} — Tom Rowland`;
    if (push) {
      const url = `${window.location.pathname}?slug=${encodeURIComponent(project.slug)}`;
      history.pushState({ slug: project.slug }, "", url);
    }
  }

  // Computes the exact scrollLeft that would center the given slide, from
  // its current (already reflowed) geometry.
  function centeredScrollLeftFor(domIndex) {
    const slideRect = slides[domIndex].getBoundingClientRect();
    const vpRect = viewport.getBoundingClientRect();
    return viewport.scrollLeft + (slideRect.left - vpRect.left) - (vpRect.width - slideRect.width) / 2;
  }

  // Centers the given slide immediately, no animation.
  function jumpInstantly(domIndex) {
    viewport.scrollLeft = centeredScrollLeftFor(domIndex);
  }

  // Animates to center the given slide over `duration`ms, driven entirely
  // by our own requestAnimationFrame loop rather than scrollIntoView or CSS
  // scroll-behavior. This sidesteps a real mess: with CSS scroll-snap
  // active, scrollIntoView's "smooth" animation interacts with the
  // browser's own snap re-alignment in ways that turned out to vary by
  // exactly how/when it was triggered — sometimes the animation got cut
  // short with a visible snap partway through, sometimes it skipped the
  // animation almost entirely. Disabling scroll-snap-type for the duration
  // and moving scrollLeft ourselves, frame by frame, removes that
  // interaction completely — there's nothing left to race against.
  let cancelAnimation = null;
  function animateSmoothTo(domIndex, duration = 500) {
    if (cancelAnimation) cancelAnimation();
    const startLeft = viewport.scrollLeft;
    const targetLeft = centeredScrollLeftFor(domIndex);
    const distance = targetLeft - startLeft;
    const prevSnapType = viewport.style.scrollSnapType;
    viewport.style.scrollSnapType = "none";
    setSuppressSettle(true, duration + 400);

    if (Math.abs(distance) < 1) {
      viewport.style.scrollSnapType = prevSnapType;
      setSuppressSettle(false);
      return;
    }

    const startTime = performance.now();
    let rafId = null;
    function ease(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
    }
    function finish() {
      cancelAnimation = null;
      viewport.style.scrollSnapType = prevSnapType;
      setSuppressSettle(false);
    }
    function step(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      viewport.scrollLeft = startLeft + distance * ease(progress);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        finish();
      }
    }
    cancelAnimation = () => {
      if (rafId) cancelAnimationFrame(rafId);
      finish();
    };
    rafId = requestAnimationFrame(step);
  }

  // If we've landed on a clone (only possible at the very first or very
  // last DOM slide — e.g. after a swipe that's already come to rest there),
  // silently jump to its real counterpart — same visual content, so the
  // jump is imperceptible — freeing that clone up to be stepped onto again
  // next time.
  function fixCloneNow() {
    if (!hasClones || (activeDomIndex !== 0 && activeDomIndex !== slides.length - 1)) return;
    const realDomIndex = activeDomIndex === 0 ? slides.length - 2 : 1;
    setSuppressSettle(true, 300);
    jumpInstantly(realDomIndex);
    markActiveDom(realDomIndex);
  }

  // Initial position: land directly on the right slide, no scroll animation
  // and no history entry (the URL already points here).
  jumpInstantly(activeDomIndex);
  syncProject(activeDomIndex, { push: false });

  if (!hasClones && slides.length < 2) {
    if (prevBtn) prevBtn.remove();
    if (nextBtn) nextBtn.remove();
    return;
  }

  function goTo(rawDomIndex) {
    let domIndex = Math.max(0, Math.min(slides.length - 1, rawDomIndex));

    // Wrapping past either end: rather than animating onto the clone and
    // fixing up afterward, reframe instantly onto the *other* end's clone
    // first — identical content to the real slide we're currently centered
    // on, so the swap is imperceptible — then animate a completely
    // ordinary single step from there straight onto the real target. The
    // visible animation is always a normal one-step move onto a real slide.
    if (hasClones && (domIndex === 0 || domIndex === slides.length - 1)) {
      const wrappingToStart = domIndex === 0;
      jumpInstantly(wrappingToStart ? slides.length - 1 : 0);
      domIndex = wrappingToStart ? slides.length - 2 : 1;
    }

    syncProject(domIndex, { push: true });
    animateSmoothTo(domIndex);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goTo(activeDomIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(activeDomIndex + 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(activeDomIndex - 1);
    else if (e.key === "ArrowRight") goTo(activeDomIndex + 1);
  });

  // Covers native swipe/trackpad scrolling, which never calls goTo() — once
  // scrolling settles, find whichever slide sits nearest the viewport
  // center and sync state to it (skipped while a programmatic move above is
  // still settling — see suppressSettle).
  let settleTimer = null;
  viewport.addEventListener("scroll", () => {
    if (settleTimer) clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      if (suppressSettle) return;
      const center = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      slides.forEach((s, i) => {
        const rect = s.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      if (closest !== activeDomIndex) {
        syncProject(closest, { push: true });
        fixCloneNow();
      }
    }, 150);
  });

  // Slide widths are viewport-relative, so a resize changes every slide's
  // size — the browser's own scroll-snap engine tends to re-snap mid-resize
  // to whatever slide is nearest given the *old* scroll position, which is
  // usually the wrong one. Settle-syncing is hard-gated off for the entire
  // resize (not just time-boxed) so none of that native re-snapping gets
  // misread as a real navigation, and the active slide is force-centered
  // once layout has actually settled.
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    // Scroll-snap disabled for the duration: with it active, the browser
    // can decide on its own to re-snap mid-resize (to whatever it judges
    // nearest given the *old* scroll position), fighting our own centering
    // below. With it off, scrollLeft only ever moves when we move it.
    viewport.style.scrollSnapType = "none";
    setSuppressSettle(true, 2000);
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      jumpInstantly(activeDomIndex);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          viewport.style.scrollSnapType = "";
          setSuppressSettle(false);
        })
      );
    }, 150);
  });

  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(window.location.search);
    const pIndex = projects.findIndex((p) => p.slug === params.get("slug"));
    if (pIndex < 0) return;
    const domIndex = domIndexForProject(pIndex);
    if (domIndex !== activeDomIndex) {
      syncProject(domIndex, { push: false });
      animateSmoothTo(domIndex);
    }
  });
}
