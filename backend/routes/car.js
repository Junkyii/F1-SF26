const express = require('express');
const router = express.Router();

const car = {
  model: 'SF-26',
  year: 2026,
  tagline: 'THE FUTURE IS RED',
  chassis: 'Full carbon fibre monocoque with advanced composite structure',
  engine: {
    name: 'Ferrari 066/14',
    type: 'V6 Turbocharged Hybrid — New 2026 Power Unit Regulations',
    displacement: '1.6L',
    power: '1200+ hp (combined ICE + ERS under 2026 regs)',
    rpm_limit: '15,000 RPM',
    ers_power: '350 kW (up from 120 kW under 2022 regs)',
    fuel_type: '100% Sustainable Fuel'
  },
  dimensions: {
    length: '5,400 mm (shorter per 2026 regulations)',
    width: '1,900 mm (narrower per 2026 regulations)',
    height: '950 mm',
    wheelbase: '3,400 mm (approx)'
  },
  weight: {
    minimum: '768 kg (reduced for 2026 regs)',
    ballast: 'Adjustable'
  },
  aerodynamics: {
    concept: 'Active Aerodynamics — moveable front & rear wing elements',
    downforce: '50% reduction vs 2022 cars (designed for high-speed efficiency)',
    drag_reduction: 'Active aero system replaces traditional DRS',
    front_wing: 'Simplified multi-element active carbon fibre',
    rear_wing: 'Active rear wing with automated angle adjustment',
    underfloor: 'Venturi tunnel ground effect — primary downforce source'
  },
  transmission: {
    gearbox: '8-speed semi-automatic longitudinal',
    gear_change: '< 40 milliseconds',
    paddle_shift: true
  },
  tyres: {
    supplier: 'Pirelli',
    size: '18-inch — Reduced contact patch per 2026 regulations',
    compounds: ['C1 (Hard)', 'C2 (Medium Hard)', 'C3 (Medium)', 'C4 (Soft)', 'C5 (Super Soft)']
  },
  performance: {
    top_speed: '380+ km/h',
    zero_to_100: '2.2 seconds',
    g_force_cornering: '5.5 G',
    g_force_braking: '6.5 G',
    fuel_consumption: '100% Sustainable Fuel — net zero target'
  },
  drivers: ['Charles Leclerc (#16)', 'Lewis Hamilton (#44)'],
  color: 'Rosso Corsa — Ferrari Racing Red with black carbon livery accents',
  highlights: [
    'First Ferrari under 2026 technical regulations',
    'Paired with new 1200hp hybrid power unit',
    'Active aerodynamics replacing traditional DRS',
    '100% Sustainable Fuel compliance',
    'Narrower, lighter chassis for agility',
    'Hamilton and Leclerc dream driver pairing'
  ]
};

router.get('/', (req, res) => {
  res.json({ success: true, data: car });
});

module.exports = router;
