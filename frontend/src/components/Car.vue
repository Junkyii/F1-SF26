<template>
  <section id="car" class="car-section">
    <div class="car-bg-accent"></div>

    <div class="container">
      <!-- Header -->
      <div class="car-header">
        <div>
          <div class="section-label">2026 Machine</div>
          <h2 class="section-title">Ferrari <span>SF-26</span></h2>
          <p class="section-tagline">{{ car.tagline }}</p>
        </div>
        <div class="car-badge">
          <span class="badge-year">2026</span>
          <span class="badge-reg">New Regulations</span>
        </div>
      </div>

      <!-- Real SF-26 photograph -->
      <div class="car-photo-wrap">
        <div class="photo-glow-left"></div>
        <div class="photo-glow-right"></div>
        <img
          src="/sf26.png"
          alt="Ferrari SF-26 — 2026 Formula 1 car"
          class="car-photo"
          @load="imgLoaded = true"
          :class="{ visible: imgLoaded }"
        />
        <div class="photo-reflection"></div>

        <!-- Floating info chips -->
        <div class="chip chip-tl">
          <span class="chip-val">1,200+</span>
          <span class="chip-label">Horsepower</span>
        </div>
        <div class="chip chip-tr">
          <span class="chip-val">768 kg</span>
          <span class="chip-label">Min Weight</span>
        </div>
        <div class="chip chip-bl">
          <span class="chip-val">#16 · #44</span>
          <span class="chip-label">Drivers</span>
        </div>
        <div class="chip chip-br">
          <span class="chip-val">Active</span>
          <span class="chip-label">Aerodynamics</span>
        </div>
      </div>

      <!-- Stats strip -->
      <div class="perf-strip">
        <div class="perf-item" v-for="p in perfItems" :key="p.label">
          <span class="perf-val">{{ p.val }}</span>
          <span class="perf-label">{{ p.label }}</span>
        </div>
      </div>

      <!-- Spec cards -->
      <div v-if="car.engine" class="spec-grid">
        <div class="spec-card" v-for="group in specGroups" :key="group.title">
          <div class="spec-card-header">
            <span class="spec-icon" v-html="group.icon"></span>
            <h4 class="spec-card-title">{{ group.title }}</h4>
          </div>
          <ul class="spec-list">
            <li v-for="s in group.specs" :key="s.k" class="spec-row">
              <span class="spec-key">{{ s.k }}</span>
              <span class="spec-val">{{ s.v }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Highlights -->
      <div class="highlights-bar">
        <h4 class="highlights-heading">KEY INNOVATIONS</h4>
        <div class="highlights-grid">
          <div class="highlight-item" v-for="h in car.highlights" :key="h">
            <span class="hi-dot"></span>
            <span>{{ h }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const car = ref({})
const imgLoaded = ref(false)

const perfItems = computed(() => car.value.performance ? [
  { val: car.value.performance.top_speed,    label: 'Top Speed'   },
  { val: car.value.performance.zero_to_100,  label: '0–100 km/h'  },
  { val: car.value.engine?.power,            label: 'Power Output' },
  { val: car.value.aerodynamics?.concept?.split(' — ')[0] || 'Active Aero', label: 'Aero Concept' },
  { val: car.value.weight?.minimum,          label: 'Min. Weight'  },
  { val: car.value.engine?.fuel_type?.split(' ')[0] + ' Fuel', label: 'Fuel Type' },
] : [])

const specGroups = computed(() => car.value.engine ? [
  {
    title: 'Power Unit',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC0000" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    specs: [
      { k: 'Engine',       v: car.value.engine.name },
      { k: 'Type',         v: car.value.engine.type },
      { k: 'Displacement', v: car.value.engine.displacement },
      { k: 'Max RPM',      v: car.value.engine.rpm_limit },
      { k: 'ERS Power',    v: car.value.engine.ers_power },
      { k: 'Fuel',         v: car.value.engine.fuel_type },
    ]
  },
  {
    title: 'Aerodynamics',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC0000" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    specs: [
      { k: 'Concept',      v: car.value.aerodynamics.concept },
      { k: 'Front Wing',   v: car.value.aerodynamics.front_wing },
      { k: 'Rear Wing',    v: car.value.aerodynamics.rear_wing },
      { k: 'Floor',        v: car.value.aerodynamics.underfloor },
      { k: 'DRS Replace',  v: car.value.aerodynamics.drag_reduction },
    ]
  },
  {
    title: 'Chassis & Dimensions',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC0000" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>',
    specs: [
      { k: 'Chassis',    v: car.value.chassis },
      { k: 'Length',     v: car.value.dimensions?.length },
      { k: 'Width',      v: car.value.dimensions?.width },
      { k: 'Min Weight', v: car.value.weight?.minimum },
      { k: 'Gearbox',    v: car.value.transmission?.gearbox },
      { k: 'Tyres',      v: car.value.tyres?.supplier + ' · ' + car.value.tyres?.size },
    ]
  },
] : [])

async function fetchCar() {
  try {
    const res = await axios.get('http://localhost:3001/api/car')
    car.value = res.data.data
  } catch {
    car.value = {
      model: 'SF-26', year: 2026,
      tagline: 'THE FUTURE IS RED',
      engine: { name: 'Ferrari 066/14', type: 'V6 Turbo Hybrid', displacement: '1.6L', power: '1,200+ hp', rpm_limit: '15,000 RPM', ers_power: '350 kW', fuel_type: '100% Sustainable Fuel' },
      aerodynamics: { concept: 'Active Aerodynamics', front_wing: 'Active multi-element carbon', rear_wing: 'Active automated angle wing', underfloor: 'Venturi tunnel ground effect', drag_reduction: 'Active aero system' },
      dimensions: { length: '5,400 mm', width: '1,900 mm' },
      weight: { minimum: '768 kg' },
      chassis: 'Full carbon fibre monocoque',
      transmission: { gearbox: '8-speed semi-auto' },
      tyres: { supplier: 'Pirelli', size: '18-inch' },
      performance: { top_speed: '380+ km/h', zero_to_100: '2.2 s' },
      highlights: ['First Ferrari under 2026 regs','1,200hp hybrid power unit','Active aerodynamics','100% Sustainable Fuel','Narrower lighter chassis','Hamilton & Leclerc']
    }
  }
}

onMounted(fetchCar)
</script>

<style scoped>
.car-section {
  background: var(--black);
  padding: 7rem 0 5rem;
  position: relative;
  overflow: hidden;
}

.car-bg-accent {
  position: absolute;
  top: 10%; right: -10%;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(220,0,0,0.04) 0%, transparent 65%);
  pointer-events: none;
}

/* Header */
.car-header {
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
  color: white; line-height: 1; margin-bottom: 0.4rem;
}
.section-title span { color: var(--red); font-style: normal; }

.section-tagline {
  font-family: var(--font-body);
  font-size: 0.65rem; font-weight: 600;
  letter-spacing: 0.35em; text-transform: uppercase;
  color: rgba(255,255,255,0.28);
}

.car-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0.875rem 1.25rem;
  background: rgba(220,0,0,0.06);
  border: 1px solid var(--border-red);
  border-radius: var(--radius);
}
.badge-year {
  font-family: var(--font-display);
  font-size: 2.5rem; font-weight: 700; font-style: italic;
  color: var(--red); line-height: 1;
}
.badge-reg {
  font-family: var(--font-body);
  font-size: 0.6rem; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(255,255,255,0.3);
}

/* ── Car Photo ── */
.car-photo-wrap {
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 380px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(220,0,0,0.04) 0%, transparent 60%);
  border: 1px solid rgba(255,255,255,0.04);
  overflow: visible;
}

.photo-glow-left {
  position: absolute;
  left: 5%; top: 20%;
  width: 300px; height: 200px;
  background: radial-gradient(ellipse, rgba(220,0,0,0.15) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
}
.photo-glow-right {
  position: absolute;
  right: 5%; top: 20%;
  width: 300px; height: 200px;
  background: radial-gradient(ellipse, rgba(220,0,0,0.12) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
}

.car-photo {
  width: 100%;
  max-width: 900px;
  max-height: 460px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
  filter: drop-shadow(0 30px 60px rgba(220,0,0,0.3));
  animation: carFloat 5s ease-in-out infinite;
}
.car-photo.visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes carFloat {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}

/* Reflection under car */
.photo-reflection {
  position: absolute;
  bottom: -20px; left: 10%; right: 10%;
  height: 60px;
  background: radial-gradient(ellipse at center, rgba(220,0,0,0.12) 0%, transparent 70%);
  filter: blur(20px);
  pointer-events: none;
}

/* Floating chips */
.chip {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.6rem 1rem;
  background: rgba(10,10,10,0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px;
  gap: 0.1rem;
  transition: var(--transition);
}
.chip:hover { border-color: var(--border-red); transform: scale(1.05); }

.chip-tl { top: 2rem; left: 2rem; }
.chip-tr { top: 2rem; right: 2rem; }
.chip-bl { bottom: 2rem; left: 2rem; }
.chip-br { bottom: 2rem; right: 2rem; }

.chip-val {
  font-family: var(--font-display);
  font-size: 1.15rem; font-weight: 700; font-style: italic;
  color: white; line-height: 1;
}
.chip-label {
  font-family: var(--font-body);
  font-size: 0.58rem; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: rgba(255,255,255,0.35);
}

/* ── Perf Strip ── */
.perf-strip {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1px;
  background: var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 2.5rem;
  border: 1px solid var(--border);
}

.perf-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 1.5rem 0.75rem;
  background: var(--dark-2);
  transition: background 0.2s ease;
}
.perf-item:hover { background: rgba(220,0,0,0.06); }

.perf-val {
  font-family: var(--font-display);
  font-size: 1.5rem; font-weight: 700; font-style: italic;
  color: var(--red); line-height: 1;
}
.perf-label {
  font-family: var(--font-body);
  font-size: 0.58rem; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--text-muted);
}

/* ── Spec Grid ── */
.spec-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.spec-card {
  background: var(--dark-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  transition: var(--transition);
}
.spec-card:hover {
  border-color: var(--border-red);
  transform: translateY(-3px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.4);
}

.spec-card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}
.spec-icon { display: flex; }
.spec-card-title {
  font-family: var(--font-body);
  font-size: 0.68rem; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--text);
}

.spec-list { display: flex; flex-direction: column; gap: 0.65rem; list-style: none; }
.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.8rem;
  line-height: 1.4;
}
.spec-key { color: var(--text-muted); flex-shrink: 0; font-size: 0.76rem; }
.spec-val  { color: var(--text); text-align: right; font-weight: 500; font-size: 0.78rem; }

/* ── Highlights ── */
.highlights-bar {
  background: linear-gradient(135deg, rgba(220,0,0,0.05), rgba(220,0,0,0.02));
  border: 1px solid var(--border-red);
  border-radius: var(--radius);
  padding: 2rem 2.5rem;
}
.highlights-heading {
  font-family: var(--font-body);
  font-size: 0.65rem; font-weight: 700;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--red); margin-bottom: 1.25rem;
}
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.875rem;
}
.highlight-item {
  display: flex; align-items: flex-start; gap: 0.6rem;
  font-size: 0.83rem; color: var(--text-dim); line-height: 1.4;
}
.hi-dot {
  width: 5px; height: 5px;
  background: var(--red); border-radius: 50%; flex-shrink: 0; margin-top: 0.45rem;
}

@media (max-width: 900px) {
  .spec-grid { grid-template-columns: 1fr; }
  .perf-strip { grid-template-columns: repeat(3,1fr); }
  .highlights-grid { grid-template-columns: repeat(2,1fr); }
  .chip-bl, .chip-br { display: none; }
}
@media (max-width: 580px) {
  .car-photo-wrap { min-height: 220px; }
  .chip-tl, .chip-tr { display: none; }
  .perf-strip { grid-template-columns: repeat(2,1fr); }
  .highlights-grid { grid-template-columns: 1fr; }
}
</style>
