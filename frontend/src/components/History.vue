<template>
  <section id="history" class="history-section">
    <div class="container">
      <div class="section-label">Since 1950</div>
      <h2 class="section-title">FERRARI <span>LEGACY</span></h2>
      <p class="section-sub">Seven decades of passion, speed, and glory. The most storied name in motorsport.</p>

      <div class="timeline">
        <div
          v-for="(item, i) in milestones"
          :key="item.year"
          class="timeline-item"
          :class="{ right: i % 2 === 1 }"
        >
          <div class="timeline-content">
            <div class="timeline-year">{{ item.year }}</div>
            <h3 class="timeline-title">{{ item.title }}</h3>
            <p class="timeline-text">{{ item.text }}</p>
            <div v-if="item.tag" class="timeline-tag" :class="`tag-${item.type}`">{{ item.tag }}</div>
          </div>
          <div class="timeline-dot">
            <div class="dot-inner"></div>
          </div>
          <div class="timeline-spacer"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const milestones = [
  {
    year: '1950',
    title: 'Born to Race',
    text: 'Scuderia Ferrari enters Formula 1 at the inaugural World Championship season. Alberto Ascari leads the charge in the iconic Ferrari 125 F1 — the beginning of a legend.',
    tag: 'FOUNDING', type: 'gold'
  },
  {
    year: '1952',
    title: 'First Championship',
    text: 'Alberto Ascari becomes Ferrari\'s first Formula 1 World Champion, dominating the 1952 season in the Ferrari 500. Ferrari also wins the Constructors\' title.',
    tag: 'CHAMPION', type: 'red'
  },
  {
    year: '1961',
    title: 'Phil Hill Makes History',
    text: 'Phil Hill becomes the first American F1 World Champion, driving the Ferrari 156 Sharknose — one of the most beautiful F1 cars ever built.',
    tag: 'CHAMPION', type: 'red'
  },
  {
    year: '1975',
    title: 'The Lauda Era Begins',
    text: 'Niki Lauda claims his first of two Ferrari championship titles, beginning one of the most celebrated driver-team partnerships in motorsport history.',
    tag: 'CHAMPION', type: 'red'
  },
  {
    year: '1979',
    title: 'Jody Scheckter Crowned',
    text: 'South African Jody Scheckter becomes World Champion in the Ferrari 312 T4, delivering Ferrari its last Drivers\' title for 21 years at that point.',
    tag: 'CHAMPION', type: 'red'
  },
  {
    year: '2000',
    title: 'Schumacher Dynasty',
    text: 'Michael Schumacher ends Ferrari\'s 21-year drought with a dramatic championship win in Indianapolis, kicking off the most dominant era in F1 history: 5 consecutive titles.',
    tag: 'DYNASTY', type: 'gold'
  },
  {
    year: '2004',
    title: 'Record-Breaking Season',
    text: 'Ferrari and Schumacher set records that still stand — 15 wins from 18 races. The F2004 is widely considered the greatest F1 car ever built.',
    tag: 'RECORD', type: 'gold'
  },
  {
    year: '2007',
    title: 'Räikkönen\'s Title',
    text: 'Kimi Räikkönen wins the most dramatic championship in F1 history, overturning a 17-point deficit in the final race to claim Ferrari\'s last Drivers\' Championship.',
    tag: 'CHAMPION', type: 'red'
  },
  {
    year: '2019',
    title: 'Leclerc Joins the Family',
    text: 'A 21-year-old Charles Leclerc joins Ferrari and immediately delivers back-to-back victories at Spa and Monza, announcing himself as the future of Ferrari.',
    tag: 'NEW ERA', type: 'future'
  },
  {
    year: '2024',
    title: 'Leclerc Conquers Monaco',
    text: 'Charles Leclerc finally wins his home race — the Monaco Grand Prix — ending years of heartbreak with a dominant win on the streets of Monte Carlo.',
    tag: 'VICTORY', type: 'red'
  },
  {
    year: '2025',
    title: 'Hamilton Arrives',
    text: 'Seven-time World Champion Lewis Hamilton makes his historic Ferrari debut, forming the most anticipated driver pairing in the history of the sport.',
    tag: 'HISTORIC', type: 'gold'
  },
  {
    year: '2026',
    title: 'SF-26 — The Future is Red',
    text: 'Ferrari unveils the SF-26 under all-new technical regulations, with 1200hp, active aerodynamics, and sustainable fuel. The championship is within reach.',
    tag: 'TODAY', type: 'future'
  },
]
</script>

<style scoped>
.history-section {
  background: var(--black);
  padding: 6rem 0;
  position: relative;
}

.section-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em;
  text-transform: uppercase; color: #DC0000;
  display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;
}
.section-label::before { content:''; display:block; width:32px; height:2px; background:#DC0000; flex-shrink:0; }

.section-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.8rem, 5vw, 4.5rem); font-weight: 900;
  text-transform: uppercase; color: white; line-height: 1; margin-bottom: 0.75rem;
}
.section-title span { color: #DC0000; }
.section-sub { color: rgba(255,255,255,0.45); font-size: 0.9rem; margin-bottom: 4rem; }

/* Timeline */
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #DC0000, rgba(220,0,0,0.3) 80%, transparent);
  transform: translateX(-50%);
}

.timeline-item {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  align-items: start;
  gap: 0;
  padding: 1.5rem 0;
}

.timeline-item .timeline-content { grid-column: 1; text-align: right; padding-right: 2rem; }
.timeline-item .timeline-dot     { grid-column: 2; display: flex; justify-content: center; align-items: flex-start; padding-top: 0.5rem; }
.timeline-item .timeline-spacer  { grid-column: 3; }

.timeline-item.right .timeline-content { grid-column: 3; text-align: left; padding-right: 0; padding-left: 2rem; order: 3; }
.timeline-item.right .timeline-dot     { grid-column: 2; order: 2; }
.timeline-item.right .timeline-spacer  { grid-column: 1; order: 1; }

.timeline-content {
  background: #1a1a1a;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}
.timeline-content:hover {
  border-color: rgba(220,0,0,0.25);
  transform: scale(1.02);
  box-shadow: 0 12px 36px rgba(0,0,0,0.4);
}

.timeline-year {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  color: #DC0000;
  line-height: 1;
  margin-bottom: 0.3rem;
}

.timeline-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  text-transform: uppercase;
  color: white;
  letter-spacing: 0.04em;
  margin-bottom: 0.6rem;
}

.timeline-text {
  font-size: 0.82rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.55);
  margin-bottom: 0.875rem;
}

.timeline-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: 4px;
}
.tag-red    { background: rgba(220,0,0,0.2);     color: #DC0000;  border: 1px solid rgba(220,0,0,0.3); }
.tag-gold   { background: rgba(255,215,0,0.12);  color: #FFD700;  border: 1px solid rgba(255,215,0,0.3); }
.tag-future { background: rgba(100,200,255,0.1); color: #64C8FF;  border: 1px solid rgba(100,200,255,0.2); }

.timeline-dot {
  position: relative;
  z-index: 1;
}

.dot-inner {
  width: 16px; height: 16px;
  background: #DC0000;
  border-radius: 50%;
  border: 3px solid #0a0a0a;
  box-shadow: 0 0 12px rgba(220,0,0,0.6);
  animation: pulseDot 2s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% { box-shadow: 0 0 8px rgba(220,0,0,0.5); }
  50%       { box-shadow: 0 0 20px rgba(220,0,0,0.9); }
}

@media (max-width: 768px) {
  .timeline::before { left: 20px; }

  .timeline-item,
  .timeline-item.right {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
  }

  .timeline-item .timeline-dot,
  .timeline-item.right .timeline-dot     { order: 1; flex-shrink: 0; }
  .timeline-item .timeline-content,
  .timeline-item.right .timeline-content { order: 2; text-align: left; padding: 1.25rem; padding-left: 1.25rem; }
  .timeline-item .timeline-spacer,
  .timeline-item.right .timeline-spacer  { display: none; }
}
</style>
