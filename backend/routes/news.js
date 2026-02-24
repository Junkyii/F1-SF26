const express = require('express');
const router = express.Router();

const news = [
  {
    id: 1,
    title: 'Hamilton Makes Historic Ferrari Debut',
    date: '2025-03-14',
    category: 'Team News',
    excerpt: 'Seven-time World Champion Lewis Hamilton completes his first laps in the Ferrari SF-25 during pre-season testing in Bahrain, marking the start of a historic new chapter for Scuderia Ferrari.',
    tag: 'Hot'
  },
  {
    id: 2,
    title: 'Leclerc Wins Monaco — A Dream Come True',
    date: '2024-05-26',
    category: 'Race Result',
    excerpt: 'Charles Leclerc finally conquers his home race, the Monaco Grand Prix, ending years of heartbreak with a dominant victory on the streets of Monte Carlo in front of his home crowd.',
    tag: 'Victory'
  },
  {
    id: 3,
    title: 'Ferrari 1-2 at Monza: The Tifosi Go Wild',
    date: '2024-09-01',
    category: 'Race Result',
    excerpt: 'Scuderia Ferrari delivers a stunning 1-2 finish at the Italian Grand Prix at Monza, with Leclerc leading Sainz home in front of the ecstatic Tifosi — a perfect result on home soil.',
    tag: 'Victory'
  },
  {
    id: 4,
    title: 'SF-25 Unveiled at Maranello',
    date: '2025-02-18',
    category: 'Car Launch',
    excerpt: 'Ferrari unveils the SF-25, the car that Lewis Hamilton and Charles Leclerc will race in the 2025 Formula 1 World Championship. A bold new livery signals Ferrari\'s championship intent.',
    tag: 'Launch'
  },
  {
    id: 5,
    title: 'Leclerc Signs Long-Term Ferrari Extension',
    date: '2024-07-12',
    category: 'Contract',
    excerpt: 'Charles Leclerc commits his future to Scuderia Ferrari by signing a new multi-year contract extension, cementing his long-term partnership with the Maranello-based team.',
    tag: 'Official'
  },
  {
    id: 6,
    title: 'Las Vegas Lights Up in Ferrari Red',
    date: '2024-11-23',
    category: 'Race Result',
    excerpt: 'Charles Leclerc triumphs at the Las Vegas Grand Prix under the neon lights of the Strip, delivering one of the most visually spectacular Ferrari victories in recent memory.',
    tag: 'Victory'
  }
];

router.get('/', (req, res) => {
  res.json({ success: true, data: news, total: news.length });
});

router.get('/:id', (req, res) => {
  const article = news.find(n => n.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ success: false, message: 'Article not found' });
  res.json({ success: true, data: article });
});

module.exports = router;
