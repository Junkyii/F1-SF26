const express = require('express');
const router = express.Router();

const drivers = [
  {
    id: 1,
    number: 16,
    name: 'Charles Leclerc',
    nationality: 'Monégasque',
    flag: '🇲🇨',
    dob: '16 October 1997',
    birthplace: 'Monte Carlo, Monaco',
    championship_wins: 0,
    race_wins: 8,
    podiums: 47,
    poles: 26,
    fastest_laps: 12,
    team_joined: 2019,
    career_start: 2018,
    photo: '/leclerc.png',
    bio_short: 'Charles Marc Hervé Perceval Leclerc is a Monégasque racing driver who competes in Formula 1 for Scuderia Ferrari HP. Known for his exceptional qualifying pace and precise racecraft, Leclerc is regarded as one of the finest talents of his generation.',
    biography: [
      {
        heading: 'Early Life & Career',
        text: 'Charles Marc Hervé Perceval Leclerc was born on 16 October 1997 in Monte Carlo, Monaco — the city whose streets would later become the backdrop for his most celebrated victory. The son of rally and Formula 3 driver Hervé Leclerc, Charles was immersed in motorsport from birth. He is godson of Ferrari legend Michael Schumacher, a relationship that foreshadowed his eventual path to Maranello. Leclerc began karting at the age of six, showing prodigious natural talent. He climbed rapidly through the junior formulae under the patronage of Jules Bianchi, a close family friend and Ferrari protégé whose tragic 2014 accident deeply affected him.'
      },
      {
        heading: 'Formula 2 & Ferrari Academy',
        text: 'After dominating Formula 3 (champion in 2016) and Formula 2 (champion in 2017), Leclerc joined the Ferrari Driver Academy and made his Formula 1 debut with Alfa Romeo Sauber in 2018. Despite driving a midfield car, he outscored his more experienced teammate Marcus Ericsson and was swiftly elevated to Ferrari for 2019 — one of the sport\'s most storied seats — at just 21 years old.'
      },
      {
        heading: 'Ferrari Career',
        text: 'In his debut Ferrari season (2019), Leclerc delivered two consecutive victories at the Belgian (Spa) and Italian (Monza) Grands Prix — the latter in front of the Tifosi who had already adopted him as one of their own. He scored a further seven pole positions that season, outqualifying four-time champion Sebastian Vettel and announcing himself as a genuine championship contender. After several seasons hampered by reliability failures and strategic errors, Leclerc finally claimed his elusive home victory at the 2024 Monaco Grand Prix — an emotional triumph that moved him and the watching world to tears. He followed it with a dominant Las Vegas Grand Prix win under the neon lights. Having signed a long-term contract extension with Ferrari, Leclerc now leads the team into the new 2026 regulations era alongside seven-time champion Lewis Hamilton, a partnership that has electrified the motorsport world.'
      },
      {
        heading: 'Driving Style',
        text: 'Leclerc is renowned for his extraordinary ability to extract maximum performance in a single qualifying lap — many engineers cite him as the finest qualifier of his generation. His smooth, precise inputs through high-speed corners are complemented by aggressive, committed moves in the heat of wheel-to-wheel racing. He is particularly celebrated for his mastery of street circuits, having taken pole and victory at Monaco, Baku, and Las Vegas.'
      }
    ]
  },
  {
    id: 2,
    number: 44,
    name: 'Lewis Hamilton',
    nationality: 'British',
    flag: '🇬🇧',
    dob: '7 January 1985',
    birthplace: 'Stevenage, Hertfordshire, England',
    championship_wins: 7,
    race_wins: 103,
    podiums: 197,
    poles: 104,
    fastest_laps: 67,
    team_joined: 2025,
    career_start: 2007,
    photo: '/hamilton.png',
    bio_short: 'Sir Lewis Carl Davidson Hamilton MBE is a British racing driver and seven-time Formula One World Champion — the most decorated driver in the history of the sport. In 2025, he made the most anticipated transfer in motorsport history, joining Scuderia Ferrari HP alongside Charles Leclerc.',
    biography: [
      {
        heading: 'Early Life & Karting',
        text: 'Sir Lewis Carl Davidson Hamilton was born on 7 January 1985 in Stevenage, Hertfordshire, England. Raised by his father Anthony Hamilton after his parents separated, Lewis began karting at age eight. His father worked multiple jobs to fund his racing and, famously, approached McLaren team principal Ron Dennis at an awards dinner when Lewis was just ten years old, asking Ron to consider him for a future drive. Dennis noted the encounter in a notebook and true to his word, Hamilton joined the McLaren and Mercedes-Benz young driver programme in 1998 at the age of thirteen.'
      },
      {
        heading: 'Junior Career & F1 Debut',
        text: 'Hamilton dominated every category he entered: Formula Renault (champion 2003), Formula Three Euroseries (champion 2005), and GP2 Series (champion 2006 with ART Grand Prix). He made his Formula 1 debut with McLaren in 2007 alongside reigning world champion Fernando Alonso, almost immediately winning races and challenging for the title as a rookie — something no driver had ever done. He finished second in the championship by a single point. In 2008, Hamilton became World Champion at the final corner of the final lap of the season in Brazil — the most dramatic title conclusion in F1 history.'
      },
      {
        heading: 'Championship Dynasty',
        text: 'After a transitional period with McLaren, Hamilton joined Mercedes-AMG Petronas in 2013 — a move that would define an era. He won six further World Championships (2014, 2015, 2017, 2018, 2019, 2020) in a period of historic dominance. His 2020 title, won during a global pandemic and a season he dedicated to racial justice advocacy, saw him equal Michael Schumacher\'s record of seven World Championships. He has set records for the most wins (103), most pole positions (104), most podiums (197), and most points scored in F1 history. In recognition of his achievements on and off the track, he was knighted by King Charles III in 2021.'
      },
      {
        heading: 'Move to Ferrari',
        text: 'In February 2024, Ferrari announced that Lewis Hamilton would join Scuderia Ferrari for the 2025 season — a move that stunned the motorsport world and created the most anticipated driver pairing in generations. Hamilton had long expressed a desire to drive for Ferrari, calling it a childhood dream. His partnership with Charles Leclerc, combined with Ferrari\'s renewed competitiveness and the arrival of the all-new SF-26 under 2026 regulations, places the scarlet team as one of the strongest championship contenders in over a decade.'
      },
      {
        heading: 'Legacy & Activism',
        text: 'Beyond his unmatched racing achievements, Hamilton has been a powerful voice for diversity, inclusion, and environmental sustainability in Formula 1 and beyond. He established the Hamilton Commission to improve diversity in motorsport and regularly uses his platform to advocate for social justice. He is widely considered the greatest Formula 1 driver of all time.'
      }
    ]
  }
];

router.get('/', (req, res) => {
  res.json({ success: true, data: drivers });
});

router.get('/:id', (req, res) => {
  const driver = drivers.find(d => d.id === parseInt(req.params.id));
  if (!driver) return res.status(404).json({ success: false, message: 'Driver not found' });
  res.json({ success: true, data: driver });
});

module.exports = router;
