<template>
  <div id="app">
    <Navbar />
    <main>
      <Hero />
      <Drivers />
      <Car />
      <Races />
      <History />
      <News />
    </main>
    <Footer />
    <!-- Scroll to top button -->
    <button
      v-show="showScrollTop"
      @click="scrollToTop"
      class="scroll-top-btn"
      aria-label="Scroll to top"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar  from './components/Navbar.vue'
import Hero    from './components/Hero.vue'
import Drivers from './components/Drivers.vue'
import Car     from './components/Car.vue'
import Races   from './components/Races.vue'
import History from './components/History.vue'
import News    from './components/News.vue'
import Footer  from './components/Footer.vue'

const showScrollTop = ref(false)

function onScroll() {
  showScrollTop.value = window.scrollY > 600
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style>
/* Import global styles */
@import './style.css';

#app {
  min-height: 100vh;
  background: var(--black);
}

/* Scroll to top button */
.scroll-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  width: 46px;
  height: 46px;
  background: var(--red);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(220, 0, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: fadeUp 0.3s ease;
}

.scroll-top-btn:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 32px rgba(220, 0, 0, 0.5);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
