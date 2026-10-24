import React from 'react';
import { ExecutionState } from '../../engine/interpreter';
import { Level } from '../../types';
import { CharacterVisual } from './CharacterVisuals';

interface ForestStageProps {
  level: Level;
  state: ExecutionState;
  isExecuting: boolean;
}

export const ForestStage: React.FC<ForestStageProps> = ({
  level,
  state,
  isExecuting
}) => {
  const { gridWidth, gridHeight, grid, targetPos } = level;

  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto bg-emerald-950 rounded-2xl p-3 shadow-2xl border border-emerald-800/40 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Forest Glow */}
      <div className="absolute inset-0 bg-radial from-emerald-900/40 to-slate-950 pointer-events-none" />

      {/* Grid container */}
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

            return (
              <div
                key={`${x}-${y}`}
                className="relative rounded-lg overflow-hidden flex items-center justify-center transition-all select-none"
              >
                {/* Terrain Tile Background */}
                {renderForestTile(cell)}

                {/* Target Cozy Fox Den / Den Flag */}
                {isTargetHere && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center animate-pulse shadow-md">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-300 fill-current">
                        <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 4.5l5 4.5v6H7v-6l5-4.5z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Collectibles: Berries & Golden Acorns */}
                {collectible && (
                  <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none animate-bounce">
                    {collectible.type === 'battery' ? (
                      // Energy berry
                      <div className="w-7 h-7 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
                        <svg viewBox="0 0 32 32" className="w-full h-full">
                          <circle cx="16" cy="18" r="9" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />
                          <circle cx="13" cy="15" r="2.5" fill="#ffffff" />
                          <path d="M 16 9 Q 18 5 21 6" stroke="#15803d" strokeWidth="2" fill="none" />
                        </svg>
                      </div>
                    ) : (
                      // Golden Acorn
                      <div className="w-7 h-7 filter drop-shadow-md">
                        <svg viewBox="0 0 32 32" className="w-full h-full">
                          <ellipse cx="16" cy="12" rx="9" ry="5" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
                          <path d="M 16 7 L 16 3" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
                          <path
                            d="M 8 13 C 8 23, 24 23, 24 13 Z"
                            fill="#d97706"
                            stroke="#78350f"
                            strokeWidth="1.5"
                          />
                          <circle cx="13" cy="16" r="1.5" fill="#fde68a" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}

                {/* Character: Piko the Cute Fox */}
                {isCharacterHere && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center transition-all duration-300">
                    <CharacterVisual
                      characterId="piko"
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

function renderForestTile(cell: string) {
  switch (cell) {
    case 'T':
      // Big Forest Tree Obstacle
      return (
        <div className="w-full h-full bg-emerald-950 flex items-center justify-center relative">
          <div className="w-8 h-8">
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <polygon points="16,3 27,24 5,24" fill="#047857" stroke="#065f46" strokeWidth="1.5" />
              <polygon points="16,10 24,25 8,25" fill="#059669" />
              <rect x="14" y="24" width="4" height="6" fill="#78350f" />
            </svg>
          </div>
        </div>
      );
    case 'W':
      // Gentle Forest Stream
      return (
        <div className="w-full h-full bg-sky-800 border border-sky-700/60 relative">
          <div className="absolute inset-0 opacity-40">
            <svg viewBox="0 0 30 30" className="w-full h-full text-sky-300">
              <path d="M 3 15 Q 10 10 18 15 Q 24 20 28 15" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      );
    case 'R':
      // Boulder
      return (
        <div className="w-full h-full bg-emerald-900/60 flex items-center justify-center">
          <circle cx="16" cy="16" r="10" fill="#64748b" stroke="#475569" strokeWidth="2" />
        </div>
      );
    case '.':
    default:
      // Soft Moss & Flower Grass Tile
      return (
        <div className="w-full h-full bg-emerald-700/90 border border-emerald-600/40 relative">
          <div className="absolute inset-0 opacity-25 flex items-center justify-around p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
          </div>
        </div>
      );
  }
}
