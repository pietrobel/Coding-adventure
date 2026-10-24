import React from 'react';
import { ExecutionState } from '../../engine/interpreter';
import { Level } from '../../types';
import { CharacterVisual } from './CharacterVisuals';

interface ArchipelagoStageProps {
  level: Level;
  state: ExecutionState;
  isExecuting: boolean;
}

export const ArchipelagoStage: React.FC<ArchipelagoStageProps> = ({
  level,
  state,
  isExecuting
}) => {
  const { gridWidth, gridHeight, grid, targetPos } = level;

  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto bg-sky-950 rounded-2xl p-3 shadow-2xl border border-sky-800/50 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Water Ambient Waves */}
      <div className="absolute inset-0 bg-radial from-cyan-900/30 to-slate-950 pointer-events-none" />

      {/* Grid Container */}
      <div
        className="grid gap-1.5 w-full h-full relative z-10"
        style={{
          gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridHeight}, minmax(0, 1fr))`
        }}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => {
            const isCharacterHere = state.pos.x === x && state.pos.y === y;
            const isTargetHere = targetPos && targetPos.x === x && targetPos.y === y;
            const collectible = state.collectibles.find(
              (c) => c.x === x && c.y === y && !c.collected
            );
            const interactable = state.interactables.find(
              (i) => i.x === x && i.y === y
            );

            return (
              <div
                key={`${x}-${y}`}
                className="relative rounded-lg overflow-hidden flex items-center justify-center transition-all select-none"
              >
                {/* Terrain Tile Background */}
                {renderTerrainTile(cell)}

                {/* Target Flag / Goal dock */}
                {isTargetHere && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center animate-pulse shadow-lg">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-300 fill-current">
                        <path d="M4 2v20h2v-7h11l-2-5 2-5H6V2H4z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Collectibles (Crystals / Shells) */}
                {collectible && (
                  <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                    {collectible.type === 'shell' ? (
                      <div className="w-7 h-7 filter drop-shadow-md animate-bounce">
                        <svg viewBox="0 0 32 32" className="w-full h-full">
                          <path
                            d="M 16 4 Q 28 8 28 20 Q 28 28 16 28 Q 4 28 4 20 Q 4 8 16 4 Z"
                            fill="#fef08a"
                            stroke="#ca8a04"
                            strokeWidth="2"
                          />
                          <path d="M 16 4 L 16 28 M 16 4 L 8 22 M 16 4 L 24 22" stroke="#eab308" strokeWidth="1.5" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse">
                        <svg viewBox="0 0 32 32" className="w-full h-full">
                          <polygon
                            points="16,3 27,11 22,29 10,29 5,11"
                            fill="#38bdf8"
                            stroke="#e0f2fe"
                            strokeWidth="2"
                          />
                          <polygon points="16,3 20,12 16,28 12,12" fill="#7dd3fc" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}

                {/* Interactable: Lighthouse */}
                {interactable && interactable.type === 'lighthouse' && (
                  <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                    <div className="w-9 h-9 relative">
                      <svg viewBox="0 0 40 40" className="w-full h-full">
                        {/* Lighthouse Base */}
                        <polygon points="12,36 28,36 24,14 16,14" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
                        <line x1="14" y1="28" x2="26" y2="28" stroke="#ffffff" strokeWidth="3" />
                        <line x1="15" y1="20" x2="25" y2="20" stroke="#ffffff" strokeWidth="3" />
                        {/* Lantern room */}
                        <rect x="15" y="8" width="10" height="6" fill={interactable.activated ? '#fef08a' : '#64748b'} />
                        <polygon points="13,8 27,8 20,2" fill="#dc2626" />
                        {/* Light rays if activated */}
                        {interactable.activated && (
                          <circle cx="20" cy="11" r="14" fill="rgba(254, 240, 138, 0.35)" className="animate-ping" />
                        )}
                      </svg>
                    </div>
                  </div>
                )}

                {/* Character (Leo + Drone) */}
                {isCharacterHere && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center transition-all duration-300">
                    <CharacterVisual
                      adventureId="archipelago"
                      direction={state.dir}
                      isMoving={isExecuting}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

function renderTerrainTile(cell: string) {
  switch (cell) {
    case '~':
      // Deep Water with animated waves
      return (
        <div className="w-full h-full bg-cyan-900/90 border border-cyan-800/40 relative">
          <div className="absolute inset-0 opacity-25">
            <svg viewBox="0 0 40 40" className="w-full h-full text-cyan-400">
              <path d="M 4 12 Q 12 8 20 12 Q 28 16 36 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M 4 28 Q 12 24 20 28 Q 28 32 36 28" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        </div>
      );
    case 'G':
      // Island Grass Shore
      return (
        <div className="w-full h-full bg-emerald-600 border border-emerald-500/50 shadow-inner relative">
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 30 30" className="w-full h-full text-emerald-300">
              <circle cx="8" cy="8" r="1.5" fill="currentColor" />
              <circle cx="22" cy="18" r="1.5" fill="currentColor" />
              <circle cx="14" cy="24" r="1" fill="currentColor" />
            </svg>
          </div>
        </div>
      );
    case 'B':
      // Wooden Bridge Planks
      return (
        <div className="w-full h-full bg-amber-700 border-x-2 border-amber-900/80 flex flex-col justify-around py-0.5 shadow-sm">
          <div className="w-full h-1 bg-amber-600 opacity-60" />
          <div className="w-full h-1 bg-amber-800 opacity-80" />
          <div className="w-full h-1 bg-amber-600 opacity-60" />
        </div>
      );
    case 'R':
      // Reef Rocks / Corals
      return (
        <div className="w-full h-full bg-cyan-950 flex items-center justify-center relative">
          <div className="w-8 h-8">
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <polygon points="6,26 12,12 20,18 26,26" fill="#475569" stroke="#334155" strokeWidth="1.5" />
              <polygon points="12,12 16,6 20,18" fill="#64748b" />
              <circle cx="16" cy="18" r="3" fill="#f43f5e" opacity="0.8" />
            </svg>
          </div>
        </div>
      );
    case 'F':
      // Lighthouse Platform
      return <div className="w-full h-full bg-slate-700 border border-slate-600/70" />;
    default:
      return <div className="w-full h-full bg-emerald-700/80 border border-emerald-600/40" />;
  }
}
