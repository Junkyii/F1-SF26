<template>
  <section id="car" class="car-section">
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

      <!-- Car Gallery Carousel -->
      <div class="car-gallery-wrap">
        <button 
          class="nav-btn prev" 
          @click="prevImg" 
          aria-label="Previous image"
          v-if="car.images && car.images.length > 1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div class="car-photo-container">
          <transition name="photo-fade" mode="out-in">
            <div class="car-photo-wrap" :key="currentImg">
              <img
                :src="currentImg"
                :alt="`Ferrari SF-26 — Image ${currentImgIndex + 1}`"
                class="car-photo"
                @load="onImgLoad"
                :class="{ visible: imgLoaded }"
              />

              <!-- Floating info chips (only show for main SF-26 image if desired, or all) -->
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
          </transition>
        </div>

        <button 
          class="nav-btn next" 
          @click="nextImg" 
          aria-label="Next image"
          v-if="car.images && car.images.length > 1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <!-- Indicators -->
        <div class="gallery-indicators" v-if="car.images && car.images.length > 1">
          <button 
            v-for="(_, i) in car.images" 
            :key="i"
            class="indicator-dot"
            :class="{ active: i === currentImgIndex }"
            @click="setImg(i)"
            :aria-label="`Go to image ${i + 1}`"
          ></button>
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
const currentImgIndex = ref(0)

const currentImg = computed(() => {
  if (car.value.images && car.value.images.length > 0) {
    return car.value.images[currentImgIndex.value]
  }
  return '/sf26.png'
})

function onImgLoad() {
  imgLoaded.value = true
}

function nextImg() {
  if (!car.value.images) return
  imgLoaded.value = false
  currentImgIndex.value = (currentImgIndex.value + 1) % car.value.images.length
}

function prevImg() {
  if (!car.value.images) return
  imgLoaded.value = false
  currentImgIndex.value = (currentImgIndex.value - 1 + car.value.images.length) % car.value.images.length
}

function setImg(index) {
  imgLoaded.value = false
  currentImgIndex.value = index
}

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
    const res = await axios.get('/api/car')
    car.value = res.data.data
  } catch {
    car.value = {
      model: 'SF-26', year: 2026,
      tagline: 'THE FUTURE IS RED',
      images: ['/sf26.png', '/1.png', '/2.png', '/3.png'],
      engine: { name: 'Ferrari 066/14', type: 'V6 Turbo Hybrid', displacement: '1.6L', power: '1,200+ hp', rpm_limit: '15,000 RPM', ers_power: '350 kW', fuel_type: '100% Sustainable Fuel' },
      aerodynamics: { concept: 'Active Aerodynamics', front_wing: 'Active multi-element carbon', rear_wing: 'Active automated angle wing', underfloor: 'Venturi tunnel ground effect', drag_reduction: 'Active aero system' },
      dimensions: { length: '5,400 mm', width: '1,900 mm' },
      weight: { minimum: '768 kg' },
      chassis: 'Full carbon fibre monocoque',
      transmission: { gearbox: '8-speed semi-auto' },
      tyres: { supplier: 'Pirelli', size: '18-inch' },
      performance: { top_speed: '380+ km/h', zero_to_100: '2.2 s' },
      highlights: ['First Ferrari under 2026 regs', '1,200hp hybrid power unit', 'Active aerodynamics', '100% Sustainable Fuel', 'Narrower lighter chassis', 'Hamilton & Leclerc']
    }
  }
}

onMounted(fetchCar)
</script>

<style scoped>
.car-section {
  background: #000;
  padding: 7rem 0 5rem;
  position: relative;
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

/* ── Car Gallery ── */
.car-gallery-wrap {
  position: relative;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.car-photo-container {
  flex: 1;
  max-width: 900px;
  position: relative;
  min-height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.car-photo-wrap {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn {
  background: rgba(10,10,10,0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.08);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s var(--ease);
  flex-shrink: 0;
  z-index: 5;
}
.nav-btn:hover {
  background: var(--red);
  border-color: var(--red);
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(220,0,0,0.2);
}

.car-photo {
  width: 100%;
  max-width: 850px;
  max-height: 440px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  opacity: 0;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.6));
  transition: opacity 0.5s ease;
}
.car-photo.visible {
  opacity: 1;
}

/* Indicators */
.gallery-indicators {
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.6rem;
  z-index: 5;
}

.indicator-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  border: none;
  cursor: pointer;
  transition: all 0.4s var(--ease);
  padding: 0;
}
.indicator-dot.active {
  background: var(--red);
  width: 24px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(220,0,0,0.3);
}

/* Transitions */
.photo-fade-enter-active,
.photo-fade-leave-active {
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
}
.photo-fade-enter-from {
  opacity: 0;
  transform: scale(0.98);
}
.photo-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
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
  pointer-events: auto;
}
.chip:hover { border-color: var(--border-red); transform: scale(1.05); }

.chip-tl { top: -1rem; left: 0; }
.chip-tr { top: -1rem; right: 0; }
.chip-bl { bottom: -1rem; left: 0; }
.chip-br { bottom: -1rem; right: 0; }

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
  .nav-btn { width: 40px; height: 40px; }
}
@media (max-width: 580px) {
  .car-photo-container { min-height: 220px; }
  .chip-tl, .chip-tr { display: none; }
  .perf-strip { grid-template-columns: repeat(2,1fr); }
  .highlights-grid { grid-template-columns: 1fr; }
  .car-gallery-wrap { gap: 0.5rem; }
}
</style>
