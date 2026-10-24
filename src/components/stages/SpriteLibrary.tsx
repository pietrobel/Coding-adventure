import React from 'react';

export type SpriteId =
  | 'scratch_cat'
  | 'cupcake'
  | 'wand'
  | 'robot'
  | 'dino'
  | 'penguin'
  | 'rocket'
  | 'bee'
  | 'wizard'
  | 'soccer'
  | 'piko'
  | 'leo'
  | 'bubble'
  | 'aria'
  | 'volt'
  | 'nova';

export interface SpriteDefinition {
  id: SpriteId;
  name: string;
  category: 'animali' | 'personaggi' | 'oggetti' | 'avventure';
  defaultScale: number;
  description: string;
  sound: 'cat' | 'pop' | 'magic' | 'beep' | 'cheer' | 'laser';
}

export const SPRITE_CATALOG: SpriteDefinition[] = [
  {
    id: 'scratch_cat',
    name: 'Micio Scratchy',
    category: 'animali',
    defaultScale: 1,
    description: 'Il simpatico gattino arancione, curioso e pieno di energia',
    sound: 'cat'
  },
  {
    id: 'cupcake',
    name: 'Dolcetto Party',
    category: 'oggetti',
    defaultScale: 1,
    description: 'Pasticcino festoso con glassa e ciliegina zuccherina',
    sound: 'pop'
  },
  {
    id: 'wand',
    name: 'Bacchetta Magica',
    category: 'oggetti',
    defaultScale: 1.1,
    description: 'Scettro stellare che emette scintille scintillanti',
    sound: 'magic'
  },
  {
    id: 'robot',
    name: 'Robo-X',
    category: 'personaggi',
    defaultScale: 1,
    description: 'Mini-robot con antenna e visore a led luminosi',
    sound: 'beep'
  },
  {
    id: 'dino',
    name: 'Rex Dinosauro',
    category: 'animali',
    defaultScale: 1.05,
    description: 'Cucciolo di tirannosauro verde, allegro e danzante',
    sound: 'cheer'
  },
  {
    id: 'penguin',
    name: 'Pinguino Pippo',
    category: 'animali',
    defaultScale: 1,
    description: 'Pinguino ballerino con panciotto bianco e becco arancione',
    sound: 'pop'
  },
  {
    id: 'rocket',
    name: 'Razzo Stellare',
    category: 'oggetti',
    defaultScale: 1.1,
    description: 'Navicella spaziale con razzi propulsori e oblò',
    sound: 'laser'
  },
  {
    id: 'bee',
    name: 'Ape Ronzina',
    category: 'animali',
    defaultScale: 0.95,
    description: 'Ape operosa con strisce dorate e ali traslucide',
    sound: 'pop'
  },
  {
    id: 'wizard',
    name: 'Mago Celestino',
    category: 'personaggi',
    defaultScale: 1.05,
    description: 'Mago delle costellazioni con cappello a punta e mantello',
    sound: 'magic'
  },
  {
    id: 'soccer',
    name: 'Pallone SuperStar',
    category: 'oggetti',
    defaultScale: 0.9,
    description: 'Pallone da gioco con strisce geometriche dinamiche',
    sound: 'pop'
  },
  {
    id: 'piko',
    name: 'Piko la Volpina',
    category: 'avventure',
    defaultScale: 1,
    description: 'Protagonista del Bosco Incantato',
    sound: 'pop'
  },
  {
    id: 'leo',
    name: 'Leo l’Esploratore',
    category: 'avventure',
    defaultScale: 1,
    description: 'Marinaio dell’Arcipelago delle Acque Magiche',
    sound: 'cheer'
  },
  {
    id: 'aria',
    name: 'Aria dei Ghiacci',
    category: 'avventure',
    defaultScale: 1,
    description: 'Sovrana della Geometria sul Ghiaccio',
    sound: 'magic'
  },
  {
    id: 'volt',
    name: 'Volt il Robot',
    category: 'avventure',
    defaultScale: 1,
    description: 'Robot corriere della Città del Futuro',
    sound: 'beep'
  },
  {
    id: 'nova',
    name: 'Nova l’Astronauta',
    category: 'avventure',
    defaultScale: 1,
    description: 'Esploratrice della Stazione Spaziale Nexus',
    sound: 'laser'
  }
];

interface SpriteSvgProps {
  id: SpriteId;
  emotion?: 'felice' | 'curioso' | 'sorpreso' | 'determinato' | 'buffo';
  isMoving?: boolean;
}

export const SpriteSvg: React.FC<SpriteSvgProps> = ({
  id,
  emotion = 'felice',
  isMoving = false
}) => {
  switch (id) {
    case 'scratch_cat':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id="catBody" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="85%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>
            <linearGradient id="catBelly" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="50" cy="94" rx="28" ry="5" fill="rgba(0,0,0,0.2)" />
          {/* Tail curving up */}
          <path
            d="M 68 70 C 88 65, 92 40, 80 32 C 74 28, 70 36, 75 44 C 78 50, 75 62, 64 68 Z"
            fill="#d97706"
            stroke="#92400e"
            strokeWidth="1.5"
          />
          {/* Body */}
          <ellipse cx="50" cy="68" rx="24" ry="20" fill="url(#catBody)" stroke="#92400e" strokeWidth="2" />
          <ellipse cx="50" cy="72" rx="15" ry="13" fill="url(#catBelly)" />
          {/* Little Paws */}
          <ellipse cx="38" cy="86" rx="7" ry="5" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
          <ellipse cx="62" cy="86" rx="7" ry="5" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
          {/* Left Ear */}
          <path d="M 28 34 L 20 10 L 42 22 Z" fill="#d97706" stroke="#92400e" strokeWidth="2" />
          <path d="M 30 30 L 25 15 L 40 22 Z" fill="#f43f5e" />
          {/* Right Ear */}
          <path d="M 72 34 L 80 10 L 58 22 Z" fill="#d97706" stroke="#92400e" strokeWidth="2" />
          <path d="M 70 30 L 75 15 L 60 22 Z" fill="#f43f5e" />
          {/* Head - facing UP/forward */}
          <ellipse cx="50" cy="38" rx="27" ry="23" fill="url(#catBody)" stroke="#92400e" strokeWidth="2" />
          {/* Cute Whiskers */}
          <path d="M 22 38 L 8 36 M 22 42 L 6 44 M 22 46 L 9 50" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 78 38 L 92 36 M 78 42 L 94 44 M 78 46 L 91 50" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
          {/* Cheerful Eyes */}
          <ellipse cx="39" cy="34" rx="5" ry="7" fill="#ffffff" />
          <ellipse cx="61" cy="34" rx="5" ry="7" fill="#ffffff" />
          <circle cx="40" cy="34" r="3.5" fill="#0f172a" />
          <circle cx="62" cy="34" r="3.5" fill="#0f172a" />
          <circle cx="41.5" cy="32" r="1.5" fill="#ffffff" />
          <circle cx="63.5" cy="32" r="1.5" fill="#ffffff" />
          {/* Pink Nose & Smile */}
          <polygon points="50,42 47,39 53,39" fill="#f43f5e" />
          <path d="M 46 44 Q 50 48 54 44" stroke="#78350f" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'cupcake':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="cupCup" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="frosting" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="94" rx="26" ry="5" fill="rgba(0,0,0,0.2)" />
          {/* Baking Cup */}
          <polygon points="28,58 72,58 66,90 34,90" fill="url(#cupCup)" stroke="#1e3a8a" strokeWidth="2" />
          {/* Cup Ribs */}
          <line x1="38" y1="58" x2="42" y2="90" stroke="#60a5fa" strokeWidth="1.5" />
          <line x1="50" y1="58" x2="50" y2="90" stroke="#60a5fa" strokeWidth="1.5" />
          <line x1="62" y1="58" x2="58" y2="90" stroke="#60a5fa" strokeWidth="1.5" />
          {/* Fluffy Frosting */}
          <path
            d="M 22 58 C 22 45, 34 40, 42 45 C 44 32, 56 30, 62 40 C 70 38, 78 45, 78 58 Z"
            fill="url(#frosting)"
            stroke="#9d174d"
            strokeWidth="2"
          />
          {/* Colorful Sprinkles */}
          <line x1="36" y1="46" x2="40" y2="44" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="58" y1="42" x2="62" y2="46" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="48" y1="50" x2="52" y2="52" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="68" y1="52" x2="72" y2="50" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Big Sparkly Cherry */}
          <circle cx="50" cy="24" r="9" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
          <circle cx="47" cy="21" r="2.5" fill="#fca5a5" />
          <path d="M 50 16 Q 56 8 62 10" stroke="#15803d" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'wand':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="wandStick" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
            <radialGradient id="starShine" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </radialGradient>
          </defs>
          {/* Wand Handle pointed up */}
          <rect x="46" y="38" width="8" height="54" rx="4" fill="url(#wandStick)" stroke="#312e81" strokeWidth="1.5" />
          {/* Gold Ribbons / Bands */}
          <rect x="45" y="44" width="10" height="4" rx="1" fill="#fef08a" />
          <rect x="45" y="70" width="10" height="4" rx="1" fill="#fef08a" />
          {/* Big Golden Magic Star on Top */}
          <polygon
            points="50,6 55,22 72,22 58,32 64,48 50,38 36,48 42,32 28,22 45,22"
            fill="url(#starShine)"
            stroke="#a16207"
            strokeWidth="2"
          />
          {/* Sparkling Orbitals */}
          <circle cx="22" cy="18" r="3" fill="#38bdf8" />
          <circle cx="78" cy="14" r="2.5" fill="#c084fc" />
          <circle cx="50" cy="2" r="2" fill="#fef08a" />
          <circle cx="50" cy="26" r="3" fill="#ffffff" />
        </svg>
      );

    case 'robot':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="roboMetal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="roboScreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="94" rx="26" ry="5" fill="rgba(0,0,0,0.2)" />
          {/* Antenna with red blinking light */}
          <line x1="50" y1="20" x2="50" y2="8" stroke="#cbd5e1" strokeWidth="3" />
          <circle cx="50" cy="6" r="4.5" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
          {/* Robot Head */}
          <rect x="25" y="20" width="50" height="34" rx="8" fill="url(#roboMetal)" stroke="#334155" strokeWidth="2" />
          {/* Ears / Bolts */}
          <rect x="18" y="30" width="7" height="14" rx="3" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
          <rect x="75" y="30" width="7" height="14" rx="3" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
          {/* Screen Visor */}
          <rect x="30" y="26" width="40" height="18" rx="4" fill="url(#roboScreen)" />
          {/* Glowing Eyes */}
          <circle cx="40" cy="35" r="4" fill="#38bdf8" />
          <circle cx="60" cy="35" r="4" fill="#38bdf8" />
          <circle cx="41.5" cy="33.5" r="1.5" fill="#ffffff" />
          <circle cx="61.5" cy="33.5" r="1.5" fill="#ffffff" />
          {/* Body */}
          <rect x="28" y="58" width="44" height="28" rx="6" fill="url(#roboMetal)" stroke="#334155" strokeWidth="2" />
          {/* Chest Gauges */}
          <circle cx="42" cy="70" r="4" fill="#10b981" />
          <circle cx="58" cy="70" r="4" fill="#f59e0b" />
          {/* Wheels / Tank Tracks */}
          <rect x="24" y="86" width="52" height="8" rx="4" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          <circle cx="32" cy="90" r="2.5" fill="#94a3b8" />
          <circle cx="50" cy="90" r="2.5" fill="#94a3b8" />
          <circle cx="68" cy="90" r="2.5" fill="#94a3b8" />
        </svg>
      );

    case 'dino':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id="dinoSkin" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="80%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#15803d" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="94" rx="28" ry="5" fill="rgba(0,0,0,0.2)" />
          {/* Cute Spikes on Back & Head */}
          <polygon points="50,6 45,16 55,16" fill="#f59e0b" />
          <polygon points="40,12 36,22 46,22" fill="#f59e0b" />
          <polygon points="60,14 54,24 66,24" fill="#f59e0b" />
          {/* Dino Head facing forward/up */}
          <ellipse cx="50" cy="34" rx="24" ry="20" fill="url(#dinoSkin)" stroke="#14532d" strokeWidth="2" />
          {/* Big Cute Dino Eyes */}
          <circle cx="38" cy="30" r="6" fill="#ffffff" />
          <circle cx="62" cy="30" r="6" fill="#ffffff" />
          <circle cx="39" cy="30" r="3.5" fill="#0f172a" />
          <circle cx="61" cy="30" r="3.5" fill="#0f172a" />
          <circle cx="41" cy="28" r="1.5" fill="#ffffff" />
          <circle cx="63" cy="28" r="1.5" fill="#ffffff" />
          {/* Dino Snout & Nostrils */}
          <ellipse cx="50" cy="40" rx="14" ry="8" fill="#86efac" />
          <circle cx="45" cy="39" r="1.5" fill="#15803d" />
          <circle cx="55" cy="39" r="1.5" fill="#15803d" />
          {/* Dino Body */}
          <ellipse cx="50" cy="68" rx="22" ry="18" fill="url(#dinoSkin)" stroke="#14532d" strokeWidth="2" />
          <ellipse cx="50" cy="72" rx="14" ry="12" fill="#bbf7d0" />
          {/* Little Feet */}
          <ellipse cx="36" cy="88" rx="8" ry="5" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
          <ellipse cx="64" cy="88" rx="8" ry="5" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
        </svg>
      );

    case 'penguin':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <ellipse cx="50" cy="94" rx="26" ry="5" fill="rgba(0,0,0,0.2)" />
          {/* Body */}
          <ellipse cx="50" cy="56" rx="26" ry="32" fill="#0f172a" stroke="#020617" strokeWidth="2" />
          {/* White Belly */}
          <ellipse cx="50" cy="62" rx="18" ry="24" fill="#ffffff" />
          {/* Flippers */}
          <ellipse cx="20" cy="58" rx="6" ry="16" transform="rotate(20 20 58)" fill="#0f172a" stroke="#020617" strokeWidth="1.5" />
          <ellipse cx="80" cy="58" rx="6" ry="16" transform="rotate(-20 80 58)" fill="#0f172a" stroke="#020617" strokeWidth="1.5" />
          {/* Orange Feet */}
          <ellipse cx="38" cy="88" rx="9" ry="5" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
          <ellipse cx="62" cy="88" rx="9" ry="5" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
          {/* Big Eyes */}
          <circle cx="42" cy="34" r="5" fill="#ffffff" />
          <circle cx="58" cy="34" r="5" fill="#ffffff" />
          <circle cx="43" cy="34" r="3" fill="#0f172a" />
          <circle cx="57" cy="34" r="3" fill="#0f172a" />
          <circle cx="44.5" cy="32.5" r="1.2" fill="#ffffff" />
          <circle cx="58.5" cy="32.5" r="1.2" fill="#ffffff" />
          {/* Orange Beak */}
          <polygon points="50,46 42,39 58,39" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
          {/* Cute Bowtie */}
          <polygon points="44,52 50,55 44,58" fill="#ef4444" />
          <polygon points="56,52 50,55 56,58" fill="#ef4444" />
          <circle cx="50" cy="55" r="2" fill="#b91c1c" />
        </svg>
      );

    case 'rocket':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="rocketHull" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="60%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="rocketFlames" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          {/* Thruster Flames at Bottom */}
          <polygon points="50,96 42,80 58,80" fill="url(#rocketFlames)" />
          <polygon points="50,90 45,80 55,80" fill="#fef08a" />
          {/* Side Fins */}
          <polygon points="32,60 18,80 32,76" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
          <polygon points="68,60 82,80 68,76" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
          {/* Rocket Fuselage pointing up */}
          <path
            d="M 50 6 C 36 28, 30 55, 32 80 L 68 80 C 70 55, 64 28, 50 6 Z"
            fill="url(#rocketHull)"
            stroke="#475569"
            strokeWidth="2"
          />
          {/* Red Nosecone */}
          <path d="M 50 6 C 44 16, 40 24, 39 30 L 61 30 C 60 24, 56 16, 50 6 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
          {/* Blue Glass Porthole */}
          <circle cx="50" cy="46" r="10" fill="#0284c7" stroke="#075985" strokeWidth="2.5" />
          <circle cx="50" cy="46" r="7.5" fill="#38bdf8" />
          <path d="M 46 41 A 5 5 0 0 1 54 41" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'bee':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <ellipse cx="50" cy="94" rx="22" ry="5" fill="rgba(0,0,0,0.2)" />
          {/* Delicate Wings */}
          <ellipse cx="32" cy="30" rx="14" ry="8" transform="rotate(-30 32 30)" fill="rgba(224,242,254,0.7)" stroke="#38bdf8" strokeWidth="1.5" />
          <ellipse cx="68" cy="30" rx="14" ry="8" transform="rotate(30 68 30)" fill="rgba(224,242,254,0.7)" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Striped Bee Body */}
          <ellipse cx="50" cy="56" rx="24" ry="28" fill="#facc15" stroke="#854d0e" strokeWidth="2" />
          {/* Black Stripes */}
          <path d="M 28 46 Q 50 52 72 46 L 73 54 Q 50 60 27 54 Z" fill="#1e293b" />
          <path d="M 30 62 Q 50 68 70 62 L 68 70 Q 50 76 32 70 Z" fill="#1e293b" />
          {/* Stinger */}
          <polygon points="50,88 47,84 53,84" fill="#1e293b" />
          {/* Antennae */}
          <path d="M 44 28 Q 38 16 34 18" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="34" cy="18" r="2.5" fill="#f59e0b" />
          <path d="M 56 28 Q 62 16 66 18" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="66" cy="18" r="2.5" fill="#f59e0b" />
          {/* Big Cheerful Eyes */}
          <circle cx="42" cy="36" r="4.5" fill="#0f172a" />
          <circle cx="58" cy="36" r="4.5" fill="#0f172a" />
          <circle cx="43.5" cy="34.5" r="1.5" fill="#ffffff" />
          <circle cx="59.5" cy="34.5" r="1.5" fill="#ffffff" />
          {/* Rosy Cheeks */}
          <circle cx="35" cy="42" r="3" fill="#f43f5e" opacity="0.6" />
          <circle cx="65" cy="42" r="3" fill="#f43f5e" opacity="0.6" />
        </svg>
      );

    case 'wizard':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <ellipse cx="50" cy="94" rx="26" ry="5" fill="rgba(0,0,0,0.2)" />
          {/* Purple Robe */}
          <polygon points="34,48 66,48 76,90 24,90" fill="#6366f1" stroke="#3730a3" strokeWidth="2" />
          <polygon points="50,48 50,90" stroke="#fef08a" strokeWidth="2" />
          {/* Face */}
          <circle cx="50" cy="40" r="13" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
          {/* Long White Beard */}
          <path d="M 40 44 C 40 64, 60 64, 60 44 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Eyes & Smile */}
          <circle cx="46" cy="38" r="2" fill="#0f172a" />
          <circle cx="54" cy="38" r="2" fill="#0f172a" />
          {/* Wizard Hat pointed up */}
          <polygon points="50,4 28,34 72,34" fill="#4338ca" stroke="#312e81" strokeWidth="2" />
          <ellipse cx="50" cy="34" rx="24" ry="6" fill="#3730a3" stroke="#312e81" strokeWidth="1.5" />
          {/* Golden Stars on Hat */}
          <polygon points="50,14 52,18 56,18 53,20 54,24 50,22 46,24 47,20 44,18 48,18" fill="#fef08a" />
          <circle cx="42" cy="26" r="2" fill="#fef08a" />
          <circle cx="58" cy="26" r="2" fill="#fef08a" />
        </svg>
      );

    case 'soccer':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <ellipse cx="50" cy="92" rx="22" ry="5" fill="rgba(0,0,0,0.2)" />
          <circle cx="50" cy="50" r="38" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          {/* Soccer pentagon and seams */}
          <polygon points="50,34 62,42 58,56 42,56 38,42" fill="#0f172a" />
          <line x1="50" y1="34" x2="50" y2="12" stroke="#0f172a" strokeWidth="2.5" />
          <line x1="62" y1="42" x2="82" y2="34" stroke="#0f172a" strokeWidth="2.5" />
          <line x1="58" y1="56" x2="74" y2="76" stroke="#0f172a" strokeWidth="2.5" />
          <line x1="42" y1="56" x2="26" y2="76" stroke="#0f172a" strokeWidth="2.5" />
          <line x1="38" y1="42" x2="18" y2="34" stroke="#0f172a" strokeWidth="2.5" />
          {/* Action sparkles */}
          <circle cx="20" cy="18" r="3" fill="#38bdf8" />
          <circle cx="82" cy="20" r="2.5" fill="#f59e0b" />
        </svg>
      );

    // Adventure heroes (Piko, Leo, Aria, Volt, Nova)
    case 'piko':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <ellipse cx="50" cy="90" rx="24" ry="5" fill="rgba(0,0,0,0.2)" />
          {/* Fox Tail */}
          <path d="M 66 60 C 84 55, 90 70, 78 80 C 70 86, 60 78, 62 68 Z" fill="#ea580c" stroke="#9a3412" strokeWidth="1.5" />
          {/* Fox Body & Head */}
          <ellipse cx="50" cy="65" rx="22" ry="18" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
          <ellipse cx="50" cy="70" rx="14" ry="12" fill="#f1f5f9" />
          {/* Fox Ears pointed up */}
          <path d="M 30 30 L 22 8 L 42 18 Z" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
          <path d="M 70 30 L 78 8 L 58 18 Z" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
          <ellipse cx="50" cy="35" rx="24" ry="20" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
          <path d="M 32 36 Q 50 48 68 36 L 50 52 Z" fill="#ffffff" />
          <circle cx="40" cy="32" r="3.5" fill="#0f172a" />
          <circle cx="60" cy="32" r="3.5" fill="#0f172a" />
          <circle cx="50" cy="46" r="2.5" fill="#0f172a" />
        </svg>
      );

    case 'leo':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <ellipse cx="50" cy="90" rx="24" ry="5" fill="rgba(0,0,0,0.2)" />
          {/* Sailor outfit */}
          <rect x="32" y="48" width="36" height="38" rx="8" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
          <circle cx="50" cy="35" r="16" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
          {/* Captain Hat */}
          <path d="M 30 26 Q 50 18 70 26 L 66 14 Q 50 10 34 14 Z" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <rect x="28" y="24" width="44" height="4" rx="2" fill="#f59e0b" />
          <circle cx="44" cy="34" r="2.5" fill="#0f172a" />
          <circle cx="56" cy="34" r="2.5" fill="#0f172a" />
        </svg>
      );

    case 'aria':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <ellipse cx="50" cy="90" rx="24" ry="5" fill="rgba(0,0,0,0.2)" />
          {/* Ice Queen Cape & Dress */}
          <polygon points="36,46 64,46 76,88 24,88" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <circle cx="50" cy="34" r="14" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
          {/* Ice Crystal Tiara */}
          <polygon points="50,10 54,20 62,14 58,22 66,22 56,26 50,22 44,26 34,22 42,22 38,14 46,20" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="45" cy="34" r="2.5" fill="#0369a1" />
          <circle cx="55" cy="34" r="2.5" fill="#0369a1" />
        </svg>
      );

    case 'volt':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <ellipse cx="50" cy="90" rx="24" ry="5" fill="rgba(0,0,0,0.2)" />
          <rect x="28" y="20" width="44" height="32" rx="6" fill="#10b981" stroke="#047857" strokeWidth="2" />
          <circle cx="40" cy="34" r="4" fill="#34d399" />
          <circle cx="60" cy="34" r="4" fill="#34d399" />
          <rect x="30" y="56" width="40" height="28" rx="6" fill="#047857" stroke="#065f46" strokeWidth="2" />
          <line x1="50" y1="20" x2="50" y2="8" stroke="#34d399" strokeWidth="3" />
          <circle cx="50" cy="6" r="4" fill="#facc15" />
        </svg>
      );

    case 'nova':
    default:
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <ellipse cx="50" cy="90" rx="24" ry="5" fill="rgba(0,0,0,0.2)" />
          {/* Astronaut Suit */}
          <rect x="30" y="48" width="40" height="38" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
          {/* Helmet */}
          <circle cx="50" cy="32" r="18" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
          <ellipse cx="50" cy="32" rx="13" ry="10" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
          <path d="M 44 26 A 6 6 0 0 1 54 26" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      );
  }
};
