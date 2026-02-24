<template>
  <section id="races" class="races-section">
    <div class="container">
      <div class="section-header">
        <div>
          <div class="section-label">Official F1 Calendar</div>
          <h2 class="section-title">2026 <span>Season</span></h2>
          <p class="section-sub">24 Grands Prix across 5 continents — the full official 2026 FIA Formula One World Championship calendar.</p>
        </div>
        <div class="season-badge">
          <span class="sb-num">24</span>
          <span class="sb-label">Rounds</span>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="calendar-grid">
        <div v-for="i in 8" :key="i" class="skeleton" style="height:140px; border-radius:14px;"></div>
      </div>

      <!-- Calendar grid -->
      <div v-else class="calendar-grid">
        <div
          v-for="race in races"
          :key="race.round"
          class="race-card"
          :class="{ 'race-next': race.round === 1 }"
        >
          <!-- Round badge -->
          <div class="race-round">
            <span v-if="race.round === 1" class="round-label next-tag">NEXT RACE</span>
            <span v-else class="round-label">ROUND</span>
            <span class="round-num">{{ race.round }}</span>
          </div>

          <!-- Country & GP name -->
          <div class="race-info">
            <span class="race-flag">{{ race.country }}</span>
            <div>
              <h3 class="race-name">{{ shortGPName(race.gp) }}</h3>
              <p class="race-circuit">{{ race.circuit }}</p>
            </div>
          </div>

          <!-- Dates -->
          <div class="race-dates">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>{{ race.dates }}</span>
          </div>

          <!-- Hover glow bar -->
          <div class="race-card-bar"></div>
        </div>
      </div>

      <!-- Legend -->
      <div class="calendar-footer">
        <div class="legend-item">
          <span class="legend-dot red"></span>
          <span>Next Race</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot white"></span>
          <span>Upcoming</span>
        </div>
        <span class="legend-source">Source: formula1.com/en/racing/2026</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const races = ref([])
const loading = ref(true)

function shortGPName(fullName) {
  return fullName
    .replace(' Grand Prix', ' GP')
    .replace('Barcelona-Catalunya', 'Barcelona')
}

async function fetchRaces() {
  try {
    const res = await axios.get('http://localhost:3001/api/races')
    races.value = res.data.data
  } catch {
    races.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchRaces)
</script>

<style scoped>
.races-section {
  background: var(--dark);
  padding: 7rem 0;
  position: relative;
}
.races-section::before {
  content: ''; position: absolute; top:0; left:0; right:0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(220,0,0,0.4), transparent);
}

/* Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

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
  font-weight: 700; font-style: italic;
  color: white; line-height: 1; margin-bottom: 0.5rem;
}
.section-title span { color: var(--red); font-style: normal; }

.section-sub {
  font-family: var(--font-body);
  font-size: 0.85rem; color: var(--text-muted); max-width: 520px; line-height: 1.6;
}

/* Season badge */
.season-badge {
  display: flex; flex-direction: column; align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(220,0,0,0.06);
  border: 1px solid var(--border-red);
  border-radius: var(--radius);
  flex-shrink: 0;
}
.sb-num {
  font-family: var(--font-display);
  font-size: 3rem; font-weight: 700; font-style: italic;
  color: var(--red); line-height: 1;
}
.sb-label {
  font-family: var(--font-body);
  font-size: 0.58rem; font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--text-muted);
}

/* ── Calendar Grid ── */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.race-card {
  position: relative;
  background: var(--dark-2);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1.25rem 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow: hidden;
  transition: all 0.35s var(--ease);
  cursor: default;
}

.race-card:hover {
  border-color: var(--border-red);
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.45);
}

.race-card.race-next {
  border-color: rgba(220,0,0,0.35);
  background: linear-gradient(135deg, rgba(220,0,0,0.07) 0%, var(--dark-2) 60%);
}

/* Top bar on hover and next race */
.race-card-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--red), rgba(220,0,0,0.3));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s var(--ease);
}
.race-card:hover .race-card-bar { transform: scaleX(1); }
.race-card.race-next .race-card-bar { transform: scaleX(1); }

/* Round */
.race-round {
  display: flex; align-items: center; justify-content: space-between;
}
.round-label {
  font-family: var(--font-body);
  font-size: 0.58rem; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--text-muted);
}
.next-tag {
  color: var(--red);
  background: rgba(220,0,0,0.12);
  border: 1px solid rgba(220,0,0,0.25);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-size: 0.55rem;
}
.round-num {
  font-family: var(--font-display);
  font-size: 2rem; font-weight: 700; font-style: italic;
  color: rgba(255,255,255,0.12); line-height: 1;
}

/* GP info */
.race-info {
  display: flex; align-items: flex-start; gap: 0.75rem;
  flex: 1;
}
.race-flag { font-size: 1.5rem; line-height: 1; flex-shrink: 0; margin-top: 0.1rem; }

.race-name {
  font-family: var(--font-display);
  font-size: 1.05rem; font-weight: 700; font-style: italic;
  color: white; line-height: 1.15; margin-bottom: 0.25rem;
  letter-spacing: -0.01em;
}
.race-circuit {
  font-family: var(--font-body);
  font-size: 0.68rem; color: var(--text-muted); line-height: 1.3;
}

/* Dates */
.race-dates {
  display: flex; align-items: center; gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.68rem; color: rgba(220,0,0,0.7);
  margin-top: auto;
}
.race-dates svg { opacity: 0.6; flex-shrink: 0; }

/* Footer */
.calendar-footer {
  display: flex; align-items: center; gap: 1.5rem;
  flex-wrap: wrap;
}
.legend-item {
  display: flex; align-items: center; gap: 0.4rem;
  font-family: var(--font-body);
  font-size: 0.72rem; color: var(--text-muted);
}
.legend-dot {
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
}
.legend-dot.red   { background: var(--red); }
.legend-dot.white { background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.15); }

.legend-source {
  margin-left: auto;
  font-family: var(--font-body);
  font-size: 0.65rem; color: rgba(255,255,255,0.2);
  font-style: italic;
}

/* Skeleton */
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.skeleton { background: linear-gradient(90deg,#1e1e1e 25%,#242424 50%,#1e1e1e 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }

@media (max-width: 1100px) { .calendar-grid { grid-template-columns: repeat(3,1fr); } }
@media (max-width: 780px)  { .calendar-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 480px)  { .calendar-grid { grid-template-columns: 1fr; } }
</style>
