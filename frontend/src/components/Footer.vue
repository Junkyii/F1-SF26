<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-brand">
            <div class="footer-logo">
              <div class="logo-box">SF</div>
              <div class="logo-words">
                <span class="logo-s">SCUDERIA</span>
                <span class="logo-f">FERRARI</span>
              </div>
            </div>
            <p class="footer-tagline">The most iconic name in motorsport. Racing since 1950.</p>
            <div class="footer-socials">
              <a href="https://www.instagram.com/scuderiaferrari" target="_blank" class="social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
              </a>
              <a href="https://twitter.com/ScuderiaFerrari" target="_blank" class="social-btn" aria-label="Twitter/X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.youtube.com/scuderiaferrari" target="_blank" class="social-btn" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor"/></svg>
              </a>
              <a href="https://www.ferrari.com" target="_blank" class="social-btn" aria-label="Official Site">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-links">
            <h4 class="footer-col-title">Explore</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#drivers">Our Drivers</a></li>
              <li><a href="#car">Ferrari SF-26</a></li>
              <li><a href="#races">Race Results</a></li>
              <li><a href="#history">Team History</a></li>
              <li><a href="#news">Latest News</a></li>
            </ul>
          </div>

          <!-- Drivers -->
          <div class="footer-links">
            <h4 class="footer-col-title">2026 Lineup</h4>
            <ul>
              <li>
                <a href="#drivers">
                  <span class="driver-num">16</span> Charles Leclerc
                </a>
              </li>
              <li>
                <a href="#drivers">
                  <span class="driver-num">44</span> Lewis Hamilton
                </a>
              </li>
            </ul>
            <h4 class="footer-col-title" style="margin-top:1.5rem;">The Car</h4>
            <ul>
              <li><a href="#car">Ferrari SF-26</a></li>
              <li><a href="#car">Technical Specs</a></li>
              <li><a href="#car">Active Aerodynamics</a></li>
            </ul>
          </div>

          <!-- Stats -->
          <div class="footer-stats">
            <h4 class="footer-col-title">Ferrari F1 Records</h4>
            <div class="footer-stat-list">
              <div class="f-stat" v-for="s in stats" :key="s.label">
                <span class="f-stat-val">{{ s.val }}</span>
                <span class="f-stat-label">{{ s.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Red divider -->
    <div class="footer-divider"></div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-inner">
          <p class="footer-copy">© 2026 Scuderia Ferrari. All rights reserved. Fan Site — Not officially affiliated with Ferrari S.p.A.</p>
          <div class="footer-badges">
            <span class="badge">Vue 3</span>
            <span class="badge">Node.js</span>
            <span class="badge">Express</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const stats = [
  { val: '16×',  label: 'Constructors Championships' },
  { val: '15×',  label: 'Drivers Championships' },
  { val: '243',  label: 'Race Victories' },
  { val: '255',  label: 'Pole Positions' },
  { val: '1950', label: 'First Season in F1' },
]
</script>

<style scoped>
.footer {
  background: #0a0a0a;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.footer-top { padding: 4rem 0 3rem; }

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
}

/* Brand */
.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 1rem;
}

.logo-box {
  width: 42px; height: 42px;
  background: #DC0000;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem; font-weight: 900; color: white;
}

.logo-words { display: flex; flex-direction: column; line-height: 1; }
.logo-s { font-family: 'Barlow Condensed', sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: #666; }
.logo-f { font-family: 'Barlow Condensed', sans-serif; font-size: 1.25rem; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; color: white; }

.footer-tagline {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.35);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 280px;
}

.footer-socials { display: flex; gap: 0.75rem; }

.social-btn {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: rgba(255,255,255,0.5);
  transition: all 0.3s ease;
}
.social-btn:hover {
  background: rgba(220,0,0,0.15);
  border-color: rgba(220,0,0,0.3);
  color: #DC0000;
  transform: translateY(-2px);
}

/* Links columns */
.footer-col-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.65rem; font-weight: 800;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-bottom: 1rem;
}

.footer-links ul {
  list-style: none;
  display: flex; flex-direction: column; gap: 0.5rem;
}

.footer-links a {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.55);
  display: flex; align-items: center; gap: 0.5rem;
  transition: color 0.2s ease;
}
.footer-links a:hover { color: #DC0000; }

.driver-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem; font-weight: 900;
  color: #DC0000;
}

/* Footer stats */
.footer-stat-list {
  display: flex; flex-direction: column; gap: 0.75rem;
}

.f-stat { display: flex; flex-direction: column; }
.f-stat-val   { font-family: 'Barlow Condensed', sans-serif; font-size: 1.4rem; font-weight: 900; color: #DC0000; line-height: 1; }
.f-stat-label { font-size: 0.7rem; color: rgba(255,255,255,0.35); }

/* Divider */
.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(220,0,0,0.5), transparent);
}

/* Bottom */
.footer-bottom { padding: 1.25rem 0; }
.footer-bottom-inner { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
.footer-copy { font-size: 0.72rem; color: rgba(255,255,255,0.25); }

.footer-badges { display: flex; gap: 0.5rem; }
.badge {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.62rem; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  color: rgba(255,255,255,0.3);
}

@media (max-width: 900px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .footer-brand { grid-column: span 2; }
}
@media (max-width: 580px) {
  .footer-grid { grid-template-columns: 1fr; }
  .footer-brand { grid-column: span 1; }
}
</style>
