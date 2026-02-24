<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-inner">
      <!-- Logo -->
      <a href="#home" class="nav-logo" @click.prevent="scrollTo('home')">
        <div class="logo-icon">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Prancing Horse Silhouette (simplified) -->
            <rect width="40" height="40" rx="4" fill="#DC0000" />
            <text
              x="50%"
              y="57%"
              dominant-baseline="middle"
              text-anchor="middle"
              font-family="Arial"
              font-size="22"
              font-weight="900"
              fill="white"
            >
              SF
            </text>
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-scuderia">SCUDERIA</span>
          <span class="logo-ferrari">FERRARI</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <ul class="nav-links">
        <li v-for="item in navItems" :key="item.id">
          <a
            :href="`#${item.id}`"
            @click.prevent="scrollTo(item.id)"
            :class="{ active: activeSection === item.id }"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- CTA -->
      <div class="nav-actions">
        <span class="nav-season">2026 SEASON</span>
        <button
          class="nav-menu-btn"
          @click="menuOpen = !menuOpen"
          :class="{ open: menuOpen }"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <ul>
        <li v-for="item in navItems" :key="item.id">
          <a :href="`#${item.id}`" @click.prevent="mobileNav(item.id)">{{
            item.label
          }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);
const activeSection = ref("home");
const menuOpen = ref(false);

const navItems = [
  { id: "home", label: "Home" },
  { id: "drivers", label: "Drivers" },
  { id: "car", label: "SF-26 Car" },
  { id: "races", label: "Races" },
  { id: "history", label: "History" },
  { id: "news", label: "News" },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  menuOpen.value = false;
}

function mobileNav(id) {
  scrollTo(id);
  menuOpen.value = false;
}

function onScroll() {
  isScrolled.value = window.scrollY > 60;
  // Section highlight
  const sections = navItems
    .map((i) => document.getElementById(i.id))
    .filter(Boolean);
  let current = "home";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  activeSection.value = current;
}

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.2rem 2rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: transparent;
}

.navbar.scrolled {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(220, 0, 0, 0.2);
  padding: 0.8rem 2rem;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.5);
}

.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  text-decoration: none;
}

.logo-icon svg {
  width: 38px;
  height: 38px;
  border-radius: 6px;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-scuderia {
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #999;
}

.logo-ferrari {
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
}

/* Nav Links */
.nav-links {
  display: flex;
  list-style: none;
  gap: 0.25rem;
}

.nav-links a {
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  padding: 0.5rem 0.875rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a:hover,
.nav-links a.active {
  color: white;
  background: rgba(255, 255, 255, 0.06);
}

.nav-links a.active::after {
  content: "";
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 2px;
  background: #dc0000;
  border-radius: 2px;
}

/* Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.nav-season {
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #dc0000;
  border: 1px solid rgba(220, 0, 0, 0.4);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
}

/* Hamburger */
.nav-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.nav-menu-btn span {
  display: block;
  width: 24px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.nav-menu-btn.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.nav-menu-btn.open span:nth-child(2) {
  opacity: 0;
}
.nav-menu-btn.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.mobile-menu.open {
  max-height: 400px;
}

.mobile-menu ul {
  list-style: none;
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 1rem;
}

.mobile-menu a {
  display: block;
  padding: 0.75rem 0;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

@media (max-width: 900px) {
  .nav-links {
    display: none;
  }
  .nav-season {
    display: none;
  }
  .nav-menu-btn {
    display: flex;
  }
  .mobile-menu {
    display: block;
  }
  .navbar {
    padding: 1rem 1.25rem;
  }
}
</style>
