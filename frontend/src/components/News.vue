<template>
  <section id="news" class="news-section">
    <div class="container">
      <div class="section-label">Latest Updates</div>
      <h2 class="section-title">FERRARI <span>NEWS</span></h2>
      <p class="section-sub">Stay informed with the latest from Maranello and the pit lane.</p>

      <div v-if="loading" class="news-grid">
        <div v-for="i in 6" :key="i" class="skeleton" style="height:220px; border-radius:12px;"></div>
      </div>

      <div v-else class="news-grid">
        <article
          v-for="(article, i) in news"
          :key="article.id"
          class="news-card"
          :class="{ featured: i === 0 }"
        >
          <div class="news-card-top">
            <div class="news-meta">
              <span class="news-tag" :class="`tag-${tagClass(article.tag)}`">{{ article.tag }}</span>
              <span class="news-cat">{{ article.category }}</span>
            </div>
            <span class="news-date">{{ formatDate(article.date) }}</span>
          </div>

          <div class="news-card-body">
            <h3 class="news-title">{{ article.title }}</h3>
            <p class="news-excerpt">{{ article.excerpt }}</p>
          </div>

          <div class="news-card-footer">
            <button class="news-read-btn">
              Read More
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <!-- Featured accent -->
          <div v-if="i === 0" class="featured-badge">FEATURED</div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const news = ref([])
const loading = ref(true)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

function tagClass(tag) {
  const map = { 'Hot': 'red', 'Victory': 'red', 'Launch': 'gold', 'Official': 'gold', 'Historic': 'future' }
  return map[tag] || 'dark'
}

async function fetchNews() {
  try {
    const res = await axios.get('http://localhost:3001/api/news')
    news.value = res.data.data
  } catch {
    news.value = [
      { id:1, title:'Hamilton Makes Historic Ferrari Debut', date:'2025-03-14', category:'Team News', excerpt:'Lewis Hamilton completes first laps in the Ferrari SF-25.', tag:'Hot' },
      { id:2, title:'Leclerc Wins Monaco', date:'2024-05-26', category:'Race Result', excerpt:'Charles Leclerc conquers his home race.', tag:'Victory' },
      { id:3, title:'Ferrari 1-2 at Monza', date:'2024-09-01', category:'Race Result', excerpt:'A stunning 1-2 finish at the Italian Grand Prix.', tag:'Victory' },
    ]
  } finally {
    loading.value = false
  }
}

onMounted(fetchNews)
</script>

<style scoped>
.news-section {
  background: var(--dark);
  padding: 6rem 0;
  position: relative;
}
.news-section::before {
  content:''; position:absolute; top:0; left:0; right:0;
  height:1px; background: linear-gradient(90deg, transparent, rgba(220,0,0,0.5), transparent);
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
.section-sub { color: rgba(255,255,255,0.45); font-size: 0.9rem; margin-bottom: 2.5rem; }

/* Grid */
.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.news-card {
  background: #1a1a1a;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
}

.news-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(220,0,0,0.5), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.news-card:hover {
  border-color: rgba(220,0,0,0.25);
  transform: translateY(-5px);
  box-shadow: 0 20px 48px rgba(0,0,0,0.5);
}
.news-card:hover::before { opacity: 1; }

/* Featured card */
.news-card.featured {
  grid-column: span 2;
  border-color: rgba(220,0,0,0.2);
  background: linear-gradient(135deg, #1f1010 0%, #1a1a1a 50%);
}
.news-card.featured .news-title { font-size: 1.3rem; }

.featured-badge {
  position: absolute;
  top: 1rem; right: 1rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #FFD700;
  background: rgba(255,215,0,0.1);
  border: 1px solid rgba(255,215,0,0.3);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

/* Card sections */
.news-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-meta { display: flex; align-items: center; gap: 0.6rem; }

.news-tag {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.62rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
  padding: 0.15rem 0.5rem; border-radius: 4px;
}
.tag-red    { background: rgba(220,0,0,0.2);     color: #DC0000;  border: 1px solid rgba(220,0,0,0.3); }
.tag-gold   { background: rgba(255,215,0,0.12);  color: #FFD700;  border: 1px solid rgba(255,215,0,0.3); }
.tag-future { background: rgba(100,200,255,0.1); color: #64C8FF;  border: 1px solid rgba(100,200,255,0.2); }
.tag-dark   { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.1); }

.news-cat {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(255,255,255,0.35);
}

.news-date {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.3);
}

.news-card-body { flex: 1; }

.news-title {
  font-family: var(--font-display);
  font-size: 1.2rem; font-weight: 700;
  font-style: italic; letter-spacing: -0.01em;
  color: white; line-height: 1.2;
  margin-bottom: 0.6rem;
}

.news-excerpt {
  font-family: var(--font-body);
  font-size: 0.8rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.5);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card-footer { margin-top: auto; }

.news-read-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
  color: #DC0000;
  background: none; border: none; cursor: pointer; padding: 0;
  transition: gap 0.2s ease;
}
.news-read-btn:hover { gap: 0.7rem; }

/* Skeleton */
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.skeleton { background: linear-gradient(90deg,#222 25%,#2a2a2a 50%,#222 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }

@media (max-width: 900px) {
  .news-grid           { grid-template-columns: 1fr 1fr; }
  .news-card.featured  { grid-column: span 2; }
}
@media (max-width: 600px) {
  .news-grid           { grid-template-columns: 1fr; }
  .news-card.featured  { grid-column: span 1; }
}
</style>
