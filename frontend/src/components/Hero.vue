<template>
  <section id="home" class="hero">

    <div class="hero-content container">
      <!-- Left: editorial text -->
      <div class="hero-left">
        <div class="hero-eyebrow">
          <span class="ey-year">2026</span>
          <span class="ey-sep"></span>
          <span class="ey-team">Scuderia Ferrari HP</span>
        </div>

        <h1 class="hero-title">
          <span class="ht-line ht-light">The</span>
          <span class="ht-line ht-accent">Future</span>
          <span class="ht-line ht-outline">Is Red</span>
        </h1>

        <p class="hero-desc">
          Ferrari SF-26 — engineered for the 2026 Formula&nbsp;1 era.
          1,200&nbsp;hp · Active aerodynamics · 100% sustainable fuel.
          Driven by Charles&nbsp;Leclerc &amp; Lewis&nbsp;Hamilton.
        </p>

        <div class="hero-cta">
          <a href="#car" @click.prevent="scrollTo('car')" class="btn btn-primary">
            Explore SF-26
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#drivers" @click.prevent="scrollTo('drivers')" class="btn btn-outline">
            Our Drivers
          </a>
        </div>

        <!-- Driver chips -->
        <div class="hero-drivers">
          <div class="driver-chip">
            <span class="dc-num">16</span>
            <div class="dc-info">
              <span class="dc-name">Leclerc</span>
              <span class="dc-flag">🇲🇨</span>
            </div>
          </div>
          <div class="driver-chip">
            <span class="dc-num">44</span>
            <div class="dc-info">
              <span class="dc-name">Hamilton</span>
              <span class="dc-flag">🇬🇧</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Team photo — elegant static display -->
      <div class="hero-right">
        <div class="photo-frame">
          <!-- Decorative corner accents -->
          <span class="corner c-tl"></span>
          <span class="corner c-tr"></span>
          <span class="corner c-bl"></span>
          <span class="corner c-br"></span>

          <img
            src="/team.png"
            alt="Scuderia Ferrari HP — Charles Leclerc & Lewis Hamilton with the SF-26"
            class="team-photo"
            :class="{ loaded: imgLoaded }"
            @load="imgLoaded = true"
          />
          <div class="photo-overlay"></div>

          <!-- Caption bar -->
          <div class="photo-caption">
            <span class="caption-text">Scuderia Ferrari HP · SF-26 · 2026</span>
            <span class="caption-drivers">Leclerc & Hamilton</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats bar -->
    <div class="hero-stats">
      <div class="container">
        <div class="stats-row">
          <div class="stat-item" v-for="s in stats" :key="s.label">
            <span class="stat-val">{{ s.value }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const imgLoaded = ref(false)

const stats = [
  { value: '16×',    label: 'Constructors Titles' },
  { value: '15×',    label: 'Drivers Championships' },
  { value: '243',    label: 'Race Victories' },
  { value: '1,200+', label: 'Horsepower (SF-26)' },
  { value: '1950',   label: 'First F1 Season' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #000;
}

/* ── Content Layout ── */
.hero-content {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  align-items: center;
  gap: 4rem;
  padding-top: 7rem;
  padding-bottom: 3rem;
  position: relative;
  z-index: 1;
}

/* ── LEFT ── */
.hero-eyebrow {
  display: flex; align-items: center; gap: 0.875rem;
  margin-bottom: 2rem;
}
.ey-year {
  font-family: var(--font-body);
  font-size: 0.68rem; font-weight: 700;
  letter-spacing: 0.22em; color: var(--red);
  background: rgba(220,0,0,0.08);
  border: 1px solid rgba(220,0,0,0.22);
  padding: 0.25rem 0.65rem; border-radius: 4px;
}
.ey-sep { width: 3px; height: 3px; background: rgba(255,255,255,0.18); border-radius: 50%; }
.ey-team {
  font-family: var(--font-body);
  font-size: 0.65rem; font-weight: 500;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(255,255,255,0.35);
}

/* Title */
.hero-title {
  display: flex; flex-direction: column;
  margin-bottom: 1.75rem;
}
.ht-line {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 6vw, 7rem);
  font-weight: 700; font-style: italic;
  line-height: 0.95; letter-spacing: -0.02em;
  display: block;
}
.ht-light   { color: white; }
.ht-accent  { color: var(--red); font-style: normal; }
.ht-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.28);
}

.hero-desc {
  font-family: var(--font-body);
  font-size: 0.88rem; line-height: 1.8;
  color: rgba(255,255,255,0.45);
  max-width: 420px;
  margin-bottom: 2.25rem;
}

/* CTA */
.hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.5rem; }

.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.8rem 1.75rem;
  font-family: var(--font-body);
  font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase;
  border-radius: 8px; border: 1.5px solid transparent;
  cursor: pointer; text-decoration: none;
  transition: all 0.35s var(--ease);
}
.btn-primary { background: var(--red); color: white; border-color: var(--red); box-shadow: 0 4px 24px rgba(220,0,0,0.2); }
.btn-primary:hover { background: transparent; color: var(--red); transform: translateY(-2px); box-shadow: 0 10px 40px rgba(220,0,0,0.3); }
.btn-outline  { background: transparent; color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.18); }
.btn-outline:hover  { border-color: var(--red); color: var(--red); transform: translateY(-2px); }

/* Driver chips */
.hero-drivers { display: flex; gap: 0.75rem; }
.driver-chip {
  display: flex; align-items: center; gap: 0.65rem;
  padding: 0.6rem 1rem;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  transition: all 0.3s var(--ease);
}
.driver-chip:hover { border-color: rgba(220,0,0,0.28); background: rgba(220,0,0,0.05); }

.dc-num {
  font-family: var(--font-display);
  font-size: 1.4rem; font-weight: 700; font-style: italic;
  color: var(--red); line-height: 1;
}
.dc-info { display: flex; flex-direction: column; gap: 0.05rem; }
.dc-name {
  font-family: var(--font-body);
  font-size: 0.72rem; font-weight: 600;
  letter-spacing: 0.07em; color: white; line-height: 1;
}
.dc-flag { font-size: 0.8rem; line-height: 1; }

/* ── RIGHT — Team Photo Frame ── */
.hero-right {
  display: flex; align-items: center; justify-content: center;
  position: relative;
}

/* Editorial photo frame with corner accents */
.photo-frame {
  position: relative;
  width: 100%;
  max-width: 620px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow:
    0 40px 80px rgba(0,0,0,0.7),
    0 0 0 1px rgba(255,255,255,0.05);
}

/* Decorative corners — editorial flourish */
.corner {
  position: absolute;
  width: 24px; height: 24px;
  z-index: 3;
  pointer-events: none;
}
.c-tl { top: 12px;  left: 12px;  border-top: 2px solid var(--red); border-left: 2px solid var(--red); }
.c-tr { top: 12px;  right: 12px; border-top: 2px solid var(--red); border-right: 2px solid var(--red); }
.c-bl { bottom: 12px; left: 12px;  border-bottom: 2px solid rgba(220,0,0,0.5); border-left: 2px solid rgba(220,0,0,0.5); }
.c-br { bottom: 12px; right: 12px; border-bottom: 2px solid rgba(220,0,0,0.5); border-right: 2px solid rgba(220,0,0,0.5); }

/* The photo — elegant, static */
.team-photo {
  width: 100%;
  display: block;
  aspect-ratio: 16/10;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  transition: opacity 1s ease;
  /* No animation, no motion — just elegant reveal on load */
}
.team-photo.loaded { opacity: 1; }

/* Subtle gradient overlay at bottom */
.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0,0,0,0.7) 100%
  );
  pointer-events: none;
}

/* Caption */
.photo-caption {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 2;
}
.caption-text {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
}
.caption-drivers {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  font-style: italic;
  color: rgba(255,255,255,0.7);
}

/* ── Stats Bar ── */
.hero-stats {
  position: relative; z-index: 1;
  border-top: 1px solid rgba(255,255,255,0.04);
  background: rgba(0,0,0,0.85);
  padding: 1.5rem 0;
}
.stats-row {
  display: flex; justify-content: space-between;
  gap: 1rem; flex-wrap: wrap;
}
.stat-item {
  display: flex; flex-direction: column;
  align-items: center; gap: 0.2rem;
}
.stat-val {
  font-family: var(--font-display);
  font-size: 1.8rem; font-weight: 700; font-style: italic;
  color: var(--red); line-height: 1;
}
.stat-label {
  font-family: var(--font-body);
  font-size: 0.58rem; font-weight: 600;
  letter-spacing: 0.17em; text-transform: uppercase;
  color: rgba(255,255,255,0.32);
}

/* ── Responsive ── */
@media (max-width: 960px) {
  .hero-content { grid-template-columns: 1fr; padding-top: 6rem; text-align: center; }
  .hero-right   { order: -1; max-width: 540px; margin: 0 auto; width: 100%; }
  .hero-drivers { justify-content: center; }
  .hero-cta     { justify-content: center; }
  .hero-desc    { margin-inline: auto; }
  .stats-row    { justify-content: center; gap: 1.5rem; }
}
@media (max-width: 480px) {
  .ht-line  { font-size: 3rem; }
  .photo-frame { border-radius: 2px; }
  .stats-row { gap: 1rem; }
}
</style>
