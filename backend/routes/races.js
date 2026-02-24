const express = require('express');
const router = express.Router();

const races = [
  { round: 1,  gp: 'Australian Grand Prix',        circuit: 'Albert Park Circuit',               country: '🇦🇺', location: 'Melbourne',         dates: '06–08 Mar 2026', status: 'upcoming' },
  { round: 2,  gp: 'Chinese Grand Prix',            circuit: 'Shanghai International Circuit',    country: '🇨🇳', location: 'Shanghai',          dates: '13–15 Mar 2026', status: 'upcoming' },
  { round: 3,  gp: 'Japanese Grand Prix',           circuit: 'Suzuka Circuit',                    country: '🇯🇵', location: 'Suzuka',            dates: '27–29 Mar 2026', status: 'upcoming' },
  { round: 4,  gp: 'Bahrain Grand Prix',            circuit: 'Bahrain International Circuit',     country: '🇧🇭', location: 'Sakhir',            dates: '10–12 Apr 2026', status: 'upcoming' },
  { round: 5,  gp: 'Saudi Arabian Grand Prix',      circuit: 'Jeddah Corniche Circuit',           country: '🇸🇦', location: 'Jeddah',            dates: '17–19 Apr 2026', status: 'upcoming' },
  { round: 6,  gp: 'Miami Grand Prix',              circuit: 'Miami International Autodrome',     country: '🇺🇸', location: 'Miami',             dates: '01–03 May 2026', status: 'upcoming' },
  { round: 7,  gp: 'Canadian Grand Prix',           circuit: 'Circuit Gilles Villeneuve',         country: '🇨🇦', location: 'Montreal',          dates: '22–24 May 2026', status: 'upcoming' },
  { round: 8,  gp: 'Monaco Grand Prix',             circuit: 'Circuit de Monaco',                 country: '🇲🇨', location: 'Monte Carlo',       dates: '05–07 Jun 2026', status: 'upcoming' },
  { round: 9,  gp: 'Barcelona-Catalunya Grand Prix',circuit: 'Circuit de Barcelona-Catalunya',    country: '🇪🇸', location: 'Barcelona',         dates: '12–14 Jun 2026', status: 'upcoming' },
  { round: 10, gp: 'Austrian Grand Prix',           circuit: 'Red Bull Ring',                     country: '🇦🇹', location: 'Spielberg',         dates: '26–28 Jun 2026', status: 'upcoming' },
  { round: 11, gp: 'British Grand Prix',            circuit: 'Silverstone Circuit',               country: '🇬🇧', location: 'Silverstone',       dates: '03–05 Jul 2026', status: 'upcoming' },
  { round: 12, gp: 'Belgian Grand Prix',            circuit: 'Circuit de Spa-Francorchamps',      country: '🇧🇪', location: 'Spa',               dates: '17–19 Jul 2026', status: 'upcoming' },
  { round: 13, gp: 'Hungarian Grand Prix',          circuit: 'Hungaroring',                       country: '🇭🇺', location: 'Budapest',          dates: '24–26 Jul 2026', status: 'upcoming' },
  { round: 14, gp: 'Dutch Grand Prix',              circuit: 'Circuit Zandvoort',                 country: '🇳🇱', location: 'Zandvoort',         dates: '21–23 Aug 2026', status: 'upcoming' },
  { round: 15, gp: 'Italian Grand Prix',            circuit: 'Autodromo Nazionale Monza',         country: '🇮🇹', location: 'Monza',             dates: '04–06 Sep 2026', status: 'upcoming' },
  { round: 16, gp: 'Spanish Grand Prix',            circuit: 'Circuito de Jerez',                 country: '🇪🇸', location: 'Spain',             dates: '11–13 Sep 2026', status: 'upcoming' },
  { round: 17, gp: 'Azerbaijan Grand Prix',         circuit: 'Baku City Circuit',                 country: '🇦🇿', location: 'Baku',              dates: '24–26 Sep 2026', status: 'upcoming' },
  { round: 18, gp: 'Singapore Grand Prix',          circuit: 'Marina Bay Street Circuit',         country: '🇸🇬', location: 'Singapore',         dates: '09–11 Oct 2026', status: 'upcoming' },
  { round: 19, gp: 'United States Grand Prix',      circuit: 'Circuit of the Americas',           country: '🇺🇸', location: 'Austin',            dates: '23–25 Oct 2026', status: 'upcoming' },
  { round: 20, gp: 'Mexico City Grand Prix',        circuit: 'Autodromo Hermanos Rodriguez',      country: '🇲🇽', location: 'Mexico City',       dates: '30 Oct–01 Nov 2026', status: 'upcoming' },
  { round: 21, gp: 'São Paulo Grand Prix',          circuit: 'Autodromo Jose Carlos Pace',        country: '🇧🇷', location: 'São Paulo',         dates: '06–08 Nov 2026', status: 'upcoming' },
  { round: 22, gp: 'Las Vegas Grand Prix',          circuit: 'Las Vegas Street Circuit',          country: '🇺🇸', location: 'Las Vegas',         dates: '19–21 Nov 2026', status: 'upcoming' },
  { round: 23, gp: 'Qatar Grand Prix',              circuit: 'Lusail International Circuit',      country: '🇶🇦', location: 'Lusail',            dates: '27–29 Nov 2026', status: 'upcoming' },
  { round: 24, gp: 'Abu Dhabi Grand Prix',          circuit: 'Yas Marina Circuit',                country: '🇦🇪', location: 'Abu Dhabi',         dates: '04–06 Dec 2026', status: 'upcoming' },
];

router.get('/', (req, res) => {
  res.json({ success: true, season: 2026, data: races, total_races: races.length });
});

module.exports = router;
