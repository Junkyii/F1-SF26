<template>
  <section id="drivers" class="drivers-section">
    <div class="section-top-rule"></div>
    <div class="container">

      <!-- Header -->
      <div class="section-header">
        <div class="section-label">Meet the Team</div>
        <h2 class="section-title">Our <span>Drivers</span></h2>
        <p class="section-sub">Two legends. One iconic team. The most storied driver pairing in Formula 1 history.</p>
      </div>

      <!-- Loading skeletons -->
      <div v-if="loading" class="drivers-stack">
        <div v-for="i in 2" :key="i" class="skeleton" style="height:280px; border-radius:16px;"></div>
      </div>

      <!-- Driver panels -->
      <div v-else class="drivers-stack">
        <div
          v-for="driver in drivers"
          :key="driver.id"
          class="driver-panel"
          :class="{ open: expandedId === driver.id }"
        >
          <!-- ── Top: Identity & Stats ── -->
          <div class="panel-top">
            <!-- Number watermark -->
            <div class="panel-number">{{ driver.number }}</div>

            <!-- Identity -->
            <div class="panel-identity">
              <div class="identity-badge">
                <span class="badge-flag">{{ driver.flag }}</span>
                <span class="badge-nat">{{ driver.nationality }}</span>
              </div>
              <h3 class="driver-name">{{ driver.name }}</h3>
              <p class="driver-bio-short">{{ driver.bio_short }}</p>
            </div>

            <!-- Quick stats -->
            <div class="panel-stats">
              <div class="stat-block" v-if="driver.championship_wins > 0">
                <span class="sb-val gold">{{ driver.championship_wins }}</span>
                <span class="sb-label">WDC Titles</span>
              </div>
              <div class="stat-block">
                <span class="sb-val">{{ driver.race_wins }}</span>
                <span class="sb-label">Wins</span>
              </div>
              <div class="stat-block">
                <span class="sb-val">{{ driver.podiums }}</span>
                <span class="sb-label">Podiums</span>
              </div>
              <div class="stat-block">
                <span class="sb-val">{{ driver.poles }}</span>
                <span class="sb-label">Poles</span>
              </div>
              <div class="stat-block">
                <span class="sb-val">{{ driver.fastest_laps }}</span>
                <span class="sb-label">Fast Laps</span>
              </div>
            </div>

            <!-- Meta row -->
            <div class="panel-meta">
              <div class="meta-pill">
                <span class="meta-key">Ferrari Since</span>
                <span class="meta-val">{{ driver.team_joined }}</span>
              </div>
              <div class="meta-pill">
                <span class="meta-key">F1 Debut</span>
                <span class="meta-val">{{ driver.career_start }}</span>
              </div>
              <div class="meta-pill">
                <span class="meta-key">DOB</span>
                <span class="meta-val">{{ driver.dob }}</span>
              </div>
              <div class="meta-pill">
                <span class="meta-key">Born</span>
                <span class="meta-val">{{ driver.birthplace }}</span>
              </div>
            </div>

            <!-- Toggle -->
            <button class="bio-toggle" @click="toggleBio(driver.id)">
              <span>{{ expandedId === driver.id ? 'Hide Biography' : 'Read Full Biography' }}</span>
              <svg class="toggle-chevron" :class="{ rotated: expandedId === driver.id }"
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>

          <!-- ── Biography (expandable) ── -->
          <div class="panel-bio" :class="{ 'bio-visible': expandedId === driver.id }">
            <div class="bio-inner">
              <div class="bio-divider">
                <span class="divider-line"></span>
                <span class="divider-label">Biography — Source: Wikipedia</span>
                <span class="divider-line"></span>
              </div>

              <div class="bio-sections">
                <div
                  v-for="section in driver.biography"
                  :key="section.heading"
                  class="bio-section"
                >
                  <h4 class="bio-heading">{{ section.heading }}</h4>
                  <p class="bio-text">{{ section.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const drivers = ref([])
const loading = ref(true)
const expandedId = ref(null)

function toggleBio(id) {
  expandedId.value = expandedId.value === id ? null : id
}

async function fetchDrivers() {
  try {
    const res = await axios.get('http://localhost:3001/api/drivers')
    drivers.value = res.data.data
  } catch {
    drivers.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchDrivers)
</script>

<style scoped>
.drivers-section {
  background: var(--dark);
  padding: 7rem 0;
  position: relative;
}

.section-top-rule {
  position: absolute; top:0; left:0; right:0; height:1px;
  background: linear-gradient(90deg, transparent, rgba(220,0,0,0.4), transparent);
}

/* Header */
.section-header { margin-bottom: 3.5rem; }

.section-label {
  font-family: var(--font-body);
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.22em;
  text-transform: uppercase; color: var(--red);
  display: flex; align-items: center; gap: 0.875rem; margin-bottom: 0.6rem;
}
.section-label::before { content:''; display:block; width:28px; height:1.5px; background:var(--red); flex-shrink:0; }

.section-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 5.5vw, 5.5rem);
  font-weight: 700; font-style: italic; color: white; line-height: 1;
  margin-bottom: 0.75rem;
}
.section-title span { color: var(--red); font-style: normal; }

.section-sub {
  font-size: 0.88rem; color: var(--text-muted);
  font-family: var(--font-body); max-width: 520px; line-height: 1.65;
}

/* Stack layout — one panel per driver */
.drivers-stack { display: flex; flex-direction: column; gap: 1.25rem; }

/* ── Driver Panel ── */
.driver-panel {
  background: var(--dark-2);
  border: 1px solid var(--border);
  border-radius: 18px;
  /* NO overflow: hidden — it clips the expanded biography */
  transition: border-color 0.35s var(--ease), box-shadow 0.35s var(--ease);
  position: relative;
}
.driver-panel:hover,
.driver-panel.open {
  border-color: var(--border-red);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

/* Top section */
.panel-top {
  position: relative;
  padding: 2.5rem 2.5rem 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto auto;
  gap: 0 3rem;
  align-items: start;
}

/* ── Big watermark number ── */
.panel-number {
  position: absolute;
  top: -0.75rem; right: 2rem;
  font-family: var(--font-display);
  font-size: clamp(6rem, 10vw, 10rem);
  font-weight: 700; font-style: italic;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(220,0,0,0.08);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

/* Identity (name + short bio) — left col, rows 1-2 */
.panel-identity { grid-column: 1; grid-row: 1 / 3; }

.identity-badge {
  display: flex; align-items: center; gap: 0.5rem;
  margin-bottom: 0.7rem;
}
.badge-flag { font-size: 1.1rem; }
.badge-nat {
  font-family: var(--font-body);
  font-size: 0.65rem; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(255,255,255,0.35);
}

.driver-name {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 700; font-style: italic;
  color: white; line-height: 1;
  margin-bottom: 1rem;
}

.driver-bio-short {
  font-family: var(--font-body);
  font-size: 0.84rem; line-height: 1.8;
  color: rgba(255,255,255,0.5);
  max-width: 680px;
}

/* Stats — right col, row 1 */
.panel-stats {
  grid-column: 2; grid-row: 1;
  display: flex; flex-direction: column; gap: 0.75rem;
  min-width: 130px;
}

.stat-block {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--border);
}
.stat-block:last-child { border-bottom: none; padding-bottom: 0; }

.sb-val {
  font-family: var(--font-display);
  font-size: 1.6rem; font-weight: 700; font-style: italic;
  color: var(--red); line-height: 1;
}
.sb-val.gold { color: var(--gold); }

.sb-label {
  font-family: var(--font-body);
  font-size: 0.6rem; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  white-space: nowrap;
}

/* Meta row — full width, row 3 */
.panel-meta {
  grid-column: 1 / -1; grid-row: 3;
  display: flex; flex-wrap: wrap; gap: 0.625rem;
  margin-top: 1.5rem;
}

.meta-pill {
  display: flex; align-items: center; gap: 0.45rem;
  padding: 0.35rem 0.75rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 6px;
}
.meta-key {
  font-family: var(--font-body);
  font-size: 0.6rem; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(255,255,255,0.28);
}
.meta-val {
  font-family: var(--font-mono);
  font-size: 0.72rem; color: rgba(255,255,255,0.65);
}

/* Toggle button — full width, row 4 */
.bio-toggle {
  grid-column: 1 / -1; grid-row: 4;
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 0.7rem;
  background: rgba(220,0,0,0.06);
  border: 1px solid rgba(220,0,0,0.18);
  border-radius: 10px;
  color: var(--red);
  font-family: var(--font-body);
  font-size: 0.72rem; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s var(--ease);
  width: 100%;
}
.bio-toggle:hover { background: rgba(220,0,0,0.12); }

.toggle-chevron {
  transition: transform 0.35s var(--ease);
  flex-shrink: 0;
}
.toggle-chevron.rotated { transform: rotate(180deg); }

/* ── Biography Section ── */
.panel-bio {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.panel-bio.bio-visible {
  max-height: 2000px; /* large enough to show all content */
}
.bio-inner {
  padding: 0 2.5rem 2.5rem;
  border-top: 1px solid var(--border);
}

.bio-divider {
  display: flex; align-items: center; gap: 1rem;
  margin-bottom: 2.5rem;
}
.divider-line { flex: 1; height: 1px; background: var(--border); }
.divider-label {
  font-family: var(--font-body);
  font-size: 0.62rem; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(255,255,255,0.2);
  white-space: nowrap;
}

.bio-sections {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem 3rem;
}

/* bio-section uses inherited styles */

.bio-heading {
  font-family: var(--font-display);
  font-size: 1.1rem; font-weight: 700; font-style: italic;
  color: var(--red); line-height: 1.2;
  margin-bottom: 0.75rem;
}

.bio-text {
  font-family: var(--font-body);
  font-size: 0.83rem; line-height: 1.85;
  color: rgba(255,255,255,0.52);
}

/* (transition handled by max-height on .panel-bio) */

/* Loading skeleton */
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.skeleton {
  background: linear-gradient(90deg,#1e1e1e 25%,#242424 50%,#1e1e1e 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@media (max-width: 900px) {
  .panel-top { grid-template-columns: 1fr; grid-template-rows: auto; }
  .panel-identity { grid-row: 1; }
  .panel-stats {
    grid-column: 1; grid-row: 2;
    flex-direction: row; flex-wrap: wrap; gap: 0.5rem;
    min-width: unset;
  }
  .stat-block { flex-direction: column; border-bottom: none; padding-bottom: 0; align-items: center; min-width: 70px; }
  .panel-meta { grid-row: 3; }
  .bio-toggle { grid-row: 4; }
  .bio-sections { grid-template-columns: 1fr; }
  .panel-number { font-size: 5rem; right: 1rem; }
}
@media (max-width: 480px) {
  .panel-top, .panel-bio { padding-left: 1.25rem; padding-right: 1.25rem; }
  .bio-sections { gap: 1.5rem; }
}
</style>
