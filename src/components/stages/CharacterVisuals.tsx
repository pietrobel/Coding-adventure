import React from 'react';
import { AdventureId, CharacterId, Direction } from '../../types';

interface CharacterVisualsProps {
  adventureId?: AdventureId;
  characterId?: CharacterId;
  direction?: Direction;
  isMoving?: boolean;
  scale?: number;
}

export const CharacterVisual: React.FC<CharacterVisualsProps> = ({
  adventureId,
  characterId,
  direction = 'N',
  isMoving = false,
  scale = 1
}) => {
  // Determine which character to render
  const resolvedChar: CharacterId =
    characterId ||
    (adventureId === 'forest'
      ? 'piko'
      : adventureId === 'archipelago'
      ? 'leo'
      : adventureId === 'ice'
      ? 'aria'
      : adventureId === 'city'
      ? 'volt'
      : adventureId === 'space'
      ? 'nova'
      : 'leo');

  const getRotation = () => {
    switch (direction) {
      case 'N':
        return 0;
      case 'NE':
        return 45;
      case 'E':
        return 90;
      case 'SE':
        return 135;
      case 'S':
        return 180;
      case 'SW':
        return 225;
      case 'W':
        return 270;
      case 'NW':
        return 315;
      default:
        return 0;
    }
  };

  const rot = getRotation();

  return (
    <div
      className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
      style={{ transform: `rotate(${rot}deg) scale(${scale})` }}
    >
      {renderCharacterSvg(resolvedChar, isMoving)}
    </div>
  );
};

function renderCharacterSvg(char: CharacterId, isMoving: boolean) {
  const bounceClass = isMoving ? 'animate-bounce' : '';

  // 1. PIKO LA VOLPINA (Primary School Adventure)
  if (char === 'piko') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`w-11/12 h-11/12 filter drop-shadow-lg ${bounceClass}`}
      >
        <defs>
          <radialGradient id="foxFur" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="70%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" />
          </radialGradient>
          <linearGradient id="whiteFur" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
        </defs>

        {/* Soft Ground Shadow */}
        <ellipse cx="50" cy="88" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />

        {/* Fluffy Fox Tail with White Tip */}
        <path
          d="M 68 62 C 84 56, 92 72, 80 82 C 72 88, 62 80, 64 70 Z"
          fill="url(#foxFur)"
          stroke="#9a3412"
          strokeWidth="1.5"
        />
        <path
          d="M 80 82 C 88 78, 92 68, 86 64 C 82 72, 76 76, 80 82 Z"
          fill="url(#whiteFur)"
        />

        {/* Hind Legs & Body */}
        <ellipse cx="50" cy="64" rx="20" ry="18" fill="url(#foxFur)" stroke="#9a3412" strokeWidth="1.5" />
        <ellipse cx="50" cy="68" rx="13" ry="12" fill="url(#whiteFur)" />

        {/* Cyber-Explorer Collar */}
        <rect x="36" y="52" width="28" height="6" rx="3" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
        <circle cx="50" cy="55" r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
        <circle cx="50" cy="55" r="1.5" fill="#fef08a" />

        {/* Paws */}
        <ellipse cx="36" cy="74" rx="6" ry="5" fill="#78350f" />
        <ellipse cx="64" cy="74" rx="6" ry="5" fill="#78350f" />
        <ellipse cx="43" cy="76" rx="5" ry="4" fill="#78350f" />
        <ellipse cx="57" cy="76" rx="5" ry="4" fill="#78350f" />

        {/* Large Fox Ears with Cyber Ear-tips */}
        <polygon points="26,16 38,36 18,34" fill="url(#foxFur)" stroke="#9a3412" strokeWidth="1.5" />
        <polygon points="27,20 35,34 22,33" fill="#fecdd3" />
        <polygon points="74,16 82,34 62,36" fill="url(#foxFur)" stroke="#9a3412" strokeWidth="1.5" />
        <polygon points="73,20 78,33 65,34" fill="#fecdd3" />

        {/* Head */}
        <ellipse cx="50" cy="38" rx="22" ry="17" fill="url(#foxFur)" stroke="#9a3412" strokeWidth="1.5" />
        {/* White Cheeks */}
        <path d="M 28 42 Q 38 48 44 40 L 40 32 Z" fill="url(#whiteFur)" />
        <path d="M 72 42 Q 62 48 56 40 L 60 32 Z" fill="url(#whiteFur)" />

        {/* Expressive Big Eyes */}
        <ellipse cx="41" cy="36" rx="3.5" ry="5" fill="#0f172a" />
        <ellipse cx="59" cy="36" rx="3.5" ry="5" fill="#0f172a" />
        {/* Eye Sparkles */}
        <circle cx="39.5" cy="34" r="1.5" fill="#ffffff" />
        <circle cx="42" cy="38" r="0.8" fill="#ffffff" />
        <circle cx="57.5" cy="34" r="1.5" fill="#ffffff" />
        <circle cx="60" cy="38" r="0.8" fill="#ffffff" />

        {/* Little Cute Snout & Nose */}
        <ellipse cx="50" cy="44" rx="5" ry="3.5" fill="url(#whiteFur)" />
        <polygon points="48,42 52,42 50,44.5" fill="#0f172a" />
        <path d="M 48 45 Q 50 47 52 45" stroke="#0f172a" strokeWidth="1" fill="none" />

        {/* Forward Direction Arrow */}
        <polygon points="50,4 44,12 56,12" fill="#38bdf8" />
      </svg>
    );
  }

  // 2. LEO & BUBBLE-9 (The Archipelago of Magic Waters)
  if (char === 'leo' || char === 'bubble') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`w-11/12 h-11/12 filter drop-shadow-lg ${bounceClass}`}
      >
        <defs>
          <linearGradient id="leoJacket" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="40%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="leoHat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <radialGradient id="droneGlow" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="70%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>
        </defs>

        {/* Ground Shadow */}
        <ellipse cx="50" cy="88" rx="28" ry="7" fill="rgba(0,0,0,0.3)" />

        {/* Explorer Backpack with Straps */}
        <rect x="34" y="58" width="32" height="20" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
        <rect x="40" y="62" width="20" height="7" rx="2" fill="#0284c7" />
        <line x1="38" y1="58" x2="38" y2="76" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="62" y1="58" x2="62" y2="76" stroke="#38bdf8" strokeWidth="1.5" />

        {/* Explorer Jacket & Shoulders */}
        <ellipse cx="50" cy="56" rx="22" ry="22" fill="url(#leoJacket)" stroke="#0c4a6e" strokeWidth="1.5" />
        {/* Belt & Gold Buckle */}
        <line x1="30" y1="64" x2="70" y2="64" stroke="#0f172a" strokeWidth="3" />
        <rect x="45" y="61" width="10" height="6" rx="1.5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />

        {/* Arms and Marine Compass */}
        <circle cx="28" cy="54" r="7" fill="#0284c7" />
        <circle cx="72" cy="54" r="7" fill="#0284c7" />
        {/* Brass Compass in Right Hand */}
        <g transform="translate(68, 42)">
          <circle cx="6" cy="6" r="6" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
          <circle cx="6" cy="6" r="4.5" fill="#fef3c7" />
          <polygon points="6,3 7.5,6 6,7 4.5,6" fill="#ef4444" />
          <polygon points="6,9 7.5,6 6,5 4.5,6" fill="#3b82f6" />
        </g>

        {/* Head */}
        <circle cx="50" cy="38" r="16" fill="#fed7aa" stroke="#fbcfe8" strokeWidth="0.5" />
        {/* Eyes with friendly shine */}
        <circle cx="44" cy="36" r="2.5" fill="#0f172a" />
        <circle cx="43" cy="35" r="1" fill="#ffffff" />
        <circle cx="56" cy="36" r="2.5" fill="#0f172a" />
        <circle cx="55" cy="35" r="1" fill="#ffffff" />
        {/* Warm Smile & Cheeks */}
        <circle cx="40" cy="41" r="2.5" fill="#fda4af" opacity="0.6" />
        <circle cx="60" cy="41" r="2.5" fill="#fda4af" opacity="0.6" />
        <path d="M 45 42 Q 50 46 55 42" stroke="#0f172a" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Explorer Safari Hat with Compass Ribbon */}
        <ellipse cx="50" cy="28" rx="27" ry="11" fill="url(#leoHat)" stroke="#0c4a6e" strokeWidth="1.5" />
        <ellipse cx="50" cy="23" rx="19" ry="12" fill="#0369a1" />
        <rect x="34" y="22" width="32" height="4" fill="#38bdf8" />
        <circle cx="50" cy="24" r="2" fill="#f59e0b" />

        {/* Bubble-9 the Aquatic Companion Drone (orbiting) */}
        <g transform="translate(14, 12)">
          <circle cx="10" cy="10" r="9" fill="url(#droneGlow)" stroke="#ffffff" strokeWidth="1.5" />
          {/* Drone Visor Eye */}
          <ellipse cx="10" cy="10" rx="5" ry="4" fill="#0f172a" />
          <circle cx="10" cy="10" r="2" fill="#38bdf8" />
          <circle cx="9" cy="9" r="0.8" fill="#ffffff" />
          {/* Antenna */}
          <line x1="10" y1="1" x2="10" y2="4" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="1" r="2" fill="#f59e0b" />
          {/* Propellers */}
          <ellipse cx="10" cy="1" rx="5" ry="1" fill="#bae6fd" opacity="0.8" />
        </g>

        {/* Forward Arrow */}
        <polygon points="50,4 43,13 57,13" fill="#38bdf8" />
      </svg>
    );
  }

  // 3. ARIA & BRINA (The Kingdom of Ice and Trails)
  if (char === 'aria') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`w-11/12 h-11/12 filter drop-shadow-lg ${bounceClass}`}
      >
        <defs>
          <linearGradient id="iceCloak" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <radialGradient id="frostAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Blue Frost Mist Shadow */}
        <ellipse cx="50" cy="86" rx="27" ry="8" fill="rgba(37,99,235,0.25)" />

        {/* Luminous Ice Halo */}
        <circle cx="50" cy="48" r="38" fill="url(#frostAura)" opacity="0.4" />

        {/* Royal Winter Cloak with Silver Trim */}
        <path
          d="M 26 78 Q 50 86 74 78 L 68 46 Q 50 42 32 46 Z"
          fill="url(#iceCloak)"
          stroke="#93c5fd"
          strokeWidth="1.5"
        />
        {/* Fluffy Snow Fur Collar */}
        <ellipse cx="50" cy="44" rx="22" ry="8" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1" />

        {/* Head */}
        <circle cx="50" cy="33" r="15" fill="#fde68a" opacity="0.2" />
        <circle cx="50" cy="33" r="15" fill="#fed7aa" />
        {/* Crystal Eyes */}
        <ellipse cx="44" cy="32" rx="2.8" ry="4" fill="#1e3a8a" />
        <circle cx="43" cy="31" r="1.2" fill="#ffffff" />
        <ellipse cx="56" cy="32" rx="2.8" ry="4" fill="#1e3a8a" />
        <circle cx="55" cy="31" r="1.2" fill="#ffffff" />
        {/* Cheerful Expression */}
        <path d="M 46 38 Q 50 42 54 38" stroke="#1e3a8a" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Winter Crown & Braided Hair */}
        <path
          d="M 32 32 Q 34 14 50 14 Q 66 14 68 32 Q 68 44 65 48 Q 50 46 35 48 Z"
          fill="#1e40af"
          stroke="#60a5fa"
          strokeWidth="1.5"
        />
        {/* Snowflake Diadem */}
        <circle cx="50" cy="20" r="4" fill="#e0f2fe" stroke="#60a5fa" strokeWidth="1.5" />
        <line x1="50" y1="13" x2="50" y2="27" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="43" y1="20" x2="57" y2="20" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="45" y1="15" x2="55" y2="25" stroke="#ffffff" strokeWidth="1" />
        <line x1="45" y1="25" x2="55" y2="15" stroke="#ffffff" strokeWidth="1" />

        {/* Ice Wand / Crystal Scepter for drawing traces */}
        <g transform="translate(64, 30)">
          <line x1="0" y1="18" x2="12" y2="-8" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
          <polygon points="12,-10 17,-4 12,-3 7,-8" fill="#67e8f9" stroke="#ffffff" strokeWidth="1" />
          <circle cx="12" cy="-6" r="2.5" fill="#ffffff" className="animate-ping" />
        </g>

        {/* Direction Arrow */}
        <polygon points="50,3 44,11 56,11" fill="#60a5fa" />
      </svg>
    );
  }

  // 4. VOLT (The Robot and the Future City)
  if (char === 'volt') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`w-11/12 h-11/12 filter drop-shadow-lg ${bounceClass}`}
      >
        <defs>
          <linearGradient id="voltChassis" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="treadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="50" cy="88" rx="27" ry="7" fill="rgba(0,0,0,0.35)" />

        {/* Heavy Duty Tank Treads */}
        <rect x="20" y="34" width="14" height="48" rx="6" fill="url(#treadGrad)" stroke="#0f172a" strokeWidth="2" />
        <rect x="66" y="34" width="14" height="48" rx="6" fill="url(#treadGrad)" stroke="#0f172a" strokeWidth="2" />
        {/* Tread links and wheels */}
        {[42, 52, 62, 72].map((y) => (
          <React.Fragment key={y}>
            <line x1="20" y1={y} x2="34" y2={y} stroke="#10b981" strokeWidth="1.5" />
            <line x1="66" y1={y} x2="80" y2={y} stroke="#10b981" strokeWidth="1.5" />
          </React.Fragment>
        ))}

        {/* Cargo Compartment / Battery Backpack */}
        <rect x="30" y="58" width="40" height="22" rx="5" fill="#047857" stroke="#10b981" strokeWidth="2" />
        <rect x="38" y="63" width="24" height="11" rx="3" fill="#065f46" />
        {/* Battery Charge Gauge 3 segments */}
        <rect x="41" y="65" width="5" height="7" rx="1" fill="#34d399" />
        <rect x="48" y="65" width="5" height="7" rx="1" fill="#34d399" />
        <rect x="55" y="65" width="5" height="7" rx="1" fill="#34d399" />

        {/* Main Body Chassis */}
        <rect x="28" y="28" width="44" height="36" rx="9" fill="url(#voltChassis)" stroke="#10b981" strokeWidth="2.5" />

        {/* LED Cyber Screen Visor */}
        <rect x="34" y="34" width="32" height="16" rx="5" fill="#022c22" stroke="#34d399" strokeWidth="1.5" />
        {/* Visor Animated Happy Eyes */}
        <ellipse cx="43" cy="42" rx="4" ry="4.5" fill="#10b981" />
        <ellipse cx="57" cy="42" rx="4" ry="4.5" fill="#10b981" />
        <circle cx="44.5" cy="40" r="1.5" fill="#ecfdf5" />
        <circle cx="58.5" cy="40" r="1.5" fill="#ecfdf5" />

        {/* Antenna with Blinking Beacon */}
        <line x1="50" y1="28" x2="50" y2="12" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="11" r="5" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />
        <circle cx="48" cy="9" r="1.5" fill="#ffffff" />

        {/* Forward Direction Arrow */}
        <polygon points="50,2 43,10 57,10" fill="#10b981" />
      </svg>
    );
  }

  // 5. NOVA (The Orbital Space Station - Expert Adventure)
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-11/12 h-11/12 filter drop-shadow-lg ${bounceClass}`}
    >
      <defs>
        <linearGradient id="spaceSuit" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="60%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="goldVisor" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="50" cy="88" rx="27" ry="7" fill="rgba(0,0,0,0.4)" />

      {/* Thruster Jetpack */}
      <rect x="26" y="52" width="12" height="26" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
      <rect x="62" y="52" width="12" height="26" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
      {/* Blue Plasma Thruster Flame */}
      <polygon points="28,78 36,78 32,88" fill="#38bdf8" opacity="0.85" />
      <polygon points="64,78 72,78 68,88" fill="#38bdf8" opacity="0.85" />

      {/* Cyber Astronaut Torso */}
      <ellipse cx="50" cy="56" rx="22" ry="24" fill="url(#spaceSuit)" stroke="#94a3b8" strokeWidth="2" />
      {/* Life Support Chest Module */}
      <rect x="40" y="54" width="20" height="14" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="45" cy="61" r="2" fill="#34d399" />
      <circle cx="55" cy="61" r="2" fill="#38bdf8" />

      {/* Shoulders & Gauntlets */}
      <circle cx="28" cy="52" r="8" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="72" cy="52" r="8" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Hologram Wristpad on Left Arm */}
      <rect x="23" y="48" width="6" height="4" rx="1" fill="#38bdf8" />

      {/* Astronaut Space Helmet */}
      <circle cx="50" cy="34" r="18" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      {/* Golden Mirrored Visor */}
      <ellipse cx="50" cy="34" rx="13" ry="11" fill="url(#goldVisor)" stroke="#78350f" strokeWidth="1" />
      {/* Visor Glare / Reflection */}
      <path d="M 42 27 Q 48 25 54 27 Q 48 30 42 27 Z" fill="#ffffff" opacity="0.8" />

      {/* Direction Arrow */}
      <polygon points="50,4 43,12 57,12" fill="#a855f7" />
    </svg>
  );
}
