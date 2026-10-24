import React from 'react';
import { ExecutionState } from '../../engine/interpreter';
import { Level } from '../../types';
import { CharacterVisual } from './CharacterVisuals';

interface SpaceStageProps {
  level: Level;
  state: ExecutionState;
  isExecuting: boolean;
}

export const SpaceStage: React.FC<SpaceStageProps> = ({
  level,
  state,
  isExecuting
}) => {
  const { gridWidth, gridHeight, grid, targetPos } = level;

  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto bg-slate-950 rounded-2xl p-3 shadow-2xl border border-purple-900/40 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Starfield Nebula */}
      <div className="absolute inset-0 bg-radial from-purple-950/40 via-slate-950 to-black pointer-events-none" />

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
            const interactable = state.interactables.find(
              (i) => i.x === x && i.y === y
            );

            return (
              <div
                key={`${x}-${y}`}
                className="relative rounded-lg overflow-hidden flex items-center justify-center transition-all select-none"
              >
                {/* Terrain Tile Background */}
                {renderSpaceTile(cell)}

                {/* Warp Portal / Destination Pad */}
                {isTargetHere && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-8 h-8 rounded-full bg-purple-500/30 border-2 border-purple-400 flex items-center justify-center animate-pulse shadow-[0_0_12px_rgba(168,85,247,0.8)]">
                      <div className="w-3.5 h-3.5 rounded-full bg-purple-300" />
                    </div>
                  </div>
                )}

                {/* Collectibles: Quantum Cores */}
                {collectible && (
                  <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none animate-pulse">
                    <div className="w-8 h-8 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]">
                      <svg viewBox="0 0 32 32" className="w-full h-full">
                        <circle cx="16" cy="16" r="10" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="4 2" />
                        <circle cx="16" cy="16" r="5" fill="#a855f7" />
                        <circle cx="16" cy="16" r="2.5" fill="#ffffff" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Interactables: Quantum Terminal */}
                {interactable && (
                  <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                    <div className="w-8 h-8 relative">
                      <svg viewBox="0 0 32 32" className="w-full h-full">
                        <rect x="4" y="6" width="24" height="20" rx="3" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                        <rect x="8" y="10" width="16" height="8" rx="1" fill={interactable.activated ? '#4ade80' : '#312e81'} />
                        <circle cx="16" cy="22" r="2" fill={interactable.activated ? '#4ade80' : '#f43f5e'} />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Character: Nova the Cyber-Astronaut */}
                {isCharacterHere && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center transition-all duration-300">
                    <CharacterVisual
                      characterId="nova"
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

function renderSpaceTile(cell: string) {
  switch (cell) {
    case '#':
      // Deep Space Void (Star dots)
      return (
        <div className="w-full h-full bg-slate-950 flex items-center justify-center relative">
          <div className="w-1 h-1 rounded-full bg-white opacity-40" />
        </div>
      );
    case 'X':
      // Quantum Laser Forcefield Barrier
      return (
        <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
          <div className="w-full h-1.5 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)] animate-pulse" />
        </div>
      );
    case 'P':
      // Launch / Teleport Pad
      return (
        <div className="w-full h-full bg-slate-800 border-2 border-purple-500/60 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full border border-dashed border-purple-400" />
        </div>
      );
    case '.':
    default:
      // High-Tech Metal Floor Plate
      return (
        <div className="w-full h-full bg-slate-900 border border-slate-800 relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-xs bg-slate-800 border border-slate-700" />
        </div>
      );
  }
}
