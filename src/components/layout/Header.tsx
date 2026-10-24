import React from 'react';
import { Volume2, VolumeX, RotateCcw, Compass, Snowflake, Bot, Home } from 'lucide-react';
import { AdventureId, GameProgress } from '../../types';

interface HeaderProps {
  currentView: 'home' | 'levels' | 'game' | 'theater';
  currentAdventureId: AdventureId | null;
  progress: GameProgress;
  onNavigateHome: () => void;
  onNavigateTheater: () => void;
  onSelectAdventure: (id: AdventureId) => void;
  onToggleSound: () => void;
  onRequestReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  currentAdventureId,
  progress,
  onNavigateHome,
  onNavigateTheater,
  onSelectAdventure,
  onToggleSound,
  onRequestReset
}) => {
  // Calculate total stars
  const totalStars = Object.values(progress.completedLevels).reduce(
    (acc, curr) => acc + (curr.stars || 0),
    0
  );
  const totalCompleted = Object.values(progress.completedLevels).filter(
    (l) => l.completed
  ).length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left text-slate-100 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-emerald-500 flex items-center justify-center shadow-md shadow-blue-950/40">
            <span className="text-white font-black text-lg">C</span>
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight block leading-tight whitespace-nowrap">
              Coding Adventures
            </span>
            <span className="text-[10px] text-slate-400 block tracking-wider uppercase font-semibold whitespace-nowrap">
              Tre mondi da programmare + Teatro
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-400">
          <button
            onClick={onNavigateHome}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              currentView === 'home'
                ? 'text-white border-b-2 border-cyan-400 pb-0.5'
                : 'hover:text-slate-200'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => onSelectAdventure('forest')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              currentAdventureId === 'forest' && currentView !== 'home' && currentView !== 'theater'
                ? 'text-emerald-400 border-b-2 border-emerald-400 pb-0.5'
                : 'hover:text-emerald-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Primaria (Piko)</span>
          </button>

          <button
            onClick={() => onSelectAdventure('archipelago')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              currentAdventureId === 'archipelago' && currentView !== 'home' && currentView !== 'theater'
                ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5'
                : 'hover:text-cyan-300'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Acque Magiche</span>
          </button>

          <button
            onClick={() => onSelectAdventure('ice')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              currentAdventureId === 'ice' && currentView !== 'home' && currentView !== 'theater'
                ? 'text-blue-400 border-b-2 border-blue-400 pb-0.5'
                : 'hover:text-blue-300'
            }`}
          >
            <Snowflake className="w-3.5 h-3.5 text-blue-400" />
            <span>Regno dei Ghiacci</span>
          </button>

          <button
            onClick={() => onSelectAdventure('city')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              currentAdventureId === 'city' && currentView !== 'home' && currentView !== 'theater'
                ? 'text-emerald-400 border-b-2 border-emerald-400 pb-0.5'
                : 'hover:text-emerald-300'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>Città del Futuro</span>
          </button>

          <button
            onClick={() => onSelectAdventure('space')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              currentAdventureId === 'space' && currentView !== 'home' && currentView !== 'theater'
                ? 'text-purple-400 border-b-2 border-purple-400 pb-0.5'
                : 'hover:text-purple-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Spazio (Esperto)</span>
          </button>

          <button
            onClick={onNavigateTheater}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              currentView === 'theater'
                ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5'
                : 'hover:text-amber-300'
            }`}
          >
            <span className="text-amber-400 font-bold">🎭</span>
            <span>Teatro Dialoghi</span>
          </button>
        </nav>

        {/* Zone 3: Audio, Progress summary, Reset */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Progress pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono">
            <span className="text-amber-400">★ {totalStars}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">{totalCompleted}/30</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              progress.soundEnabled
                ? 'bg-slate-800 border-slate-700 text-sky-400 hover:text-white'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={progress.soundEnabled ? 'Disattiva audio' : 'Attiva audio'}
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Reset progress */}
          <button
            onClick={onRequestReset}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Azzera progressi"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
