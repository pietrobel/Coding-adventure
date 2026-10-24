import React from 'react';
import { ExecutionState } from '../../engine/interpreter';
import { Level } from '../../types';
import { CharacterVisual } from './CharacterVisuals';

interface FutureCityStageProps {
  level: Level;
  state: ExecutionState;
  isExecuting: boolean;
}

export const FutureCityStage: React.FC<FutureCityStageProps> = ({
  level,
  state,
  isExecuting
}) => {
  const { gridWidth, gridHeight, grid, targetPos } = level;

  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto bg-slate-950 rounded-2xl p-3 shadow-2xl border border-emerald-900/40 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Cyber Grid Lines */}
      <div className="absolute inset-0 bg-radial from-emerald-950/40 to-slate-950 pointer-events-none" />

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
                {renderCityTile(cell)}

                {/* Target Depot / Final Dock */}
                {isTargetHere && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center animate-pulse shadow-lg">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                )}

                {/* Collectibles: Batteries, Packages, Power Cores */}
                {collectible && (
                  <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                    {collectible.type === 'package' ? (
                      <div className="w-8 h-8 filter drop-shadow-md animate-bounce">
                        <svg viewBox="0 0 32 32" className="w-full h-full">
                          <rect x="6" y="8" width="20" height="18" rx="2" fill="#d97706" stroke="#b45309" strokeWidth="2" />
                          <line x1="16" y1="8" x2="16" y2="26" stroke="#fbbf24" strokeWidth="2.5" />
                          <line x1="6" y1="16" x2="26" y2="16" stroke="#fbbf24" strokeWidth="2.5" />
                        </svg>
                      </div>
                    ) : collectible.type === 'power_core' ? (
                      <div className="w-8 h-8 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.9)] animate-pulse">
                        <svg viewBox="0 0 32 32" className="w-full h-full">
                          <polygon points="16,2 28,14 16,30 4,14" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
                          <polygon points="16,8 22,14 16,24 10,14" fill="#fef08a" />
                        </svg>
                      </div>
                    ) : (
                      // Battery
                      <div className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse">
                        <svg viewBox="0 0 32 32" className="w-full h-full">
                          <rect x="10" y="8" width="12" height="18" rx="2" fill="#047857" stroke="#10b981" strokeWidth="1.5" />
                          <rect x="13" y="4" width="6" height="4" rx="1" fill="#10b981" />
                          {/* Lightning bolt inside */}
                          <polygon points="17,10 12,17 16,17 14,24 20,16 16,16" fill="#fef08a" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}

                {/* Interactables: Delivery Hub, Power Station, Cyber Tower */}
                {interactable && (
                  <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                    <div className="w-9 h-9 relative">
                      {interactable.type === 'station' ? (
                        <svg viewBox="0 0 36 36" className="w-full h-full">
                          <rect x="4" y="8" width="28" height="24" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                          <circle cx="18" cy="18" r="7" fill={interactable.activated ? '#10b981' : '#334155'} />
                          {interactable.activated && (
                            <circle cx="18" cy="18" r="12" fill="none" stroke="#34d399" strokeWidth="2" className="animate-ping" />
                          )}
                          <polygon points="19,13 15,18 18,18 16,23 21,17 18,17" fill="#ffffff" />
                        </svg>
                      ) : (
                        // Delivery Locker / Terminal
                        <svg viewBox="0 0 36 36" className="w-full h-full">
                          <rect x="6" y="6" width="24" height="26" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                          <rect x="10" y="10" width="16" height="8" rx="1" fill="#0c4a6e" />
                          <line x1="18" y1="20" x2="18" y2="30" stroke="#38bdf8" strokeWidth="1.5" />
                          {interactable.activated && (
                            <circle cx="18" cy="14" r="3" fill="#4ade80" />
                          )}
                        </svg>
                      )}
                    </div>
                  </div>
                )}

                {/* Character (Volt the Robot) */}
                {isCharacterHere && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center transition-all duration-300">
                    <CharacterVisual
                      adventureId="city"
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

function renderCityTile(cell: string) {
  switch (cell) {
    case '#':
      // Skyscraper / Cyber Building - deep impenetrable dark structure
      return (
        <div className="w-full h-full bg-slate-950/95 border border-slate-800/80 flex flex-col justify-between p-1 shadow-inner rounded-xs">
          <div className="grid grid-cols-2 gap-0.5 opacity-60">
            <div className="h-1.5 bg-cyan-600/30 rounded-xs" />
            <div className="h-1.5 bg-emerald-600/30 rounded-xs" />
            <div className="h-1.5 bg-cyan-600/30 rounded-xs" />
            <div className="h-1.5 bg-emerald-600/30 rounded-xs" />
          </div>
          <div className="h-0.5 bg-slate-800 rounded-xs" />
        </div>
      );
    case 'X':
      // Construction Barrier - clearly blocked with warning barricade & label
      return (
        <div className="w-full h-full bg-amber-950/50 border-2 border-dashed border-amber-500/80 flex flex-col items-center justify-center relative rounded-sm p-0.5">
          <div className="w-6 h-6 shrink-0">
            <svg viewBox="0 0 32 32" className="w-full h-full filter drop-shadow">
              <rect x="2" y="10" width="28" height="12" rx="2" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
              <line x1="6" y1="10" x2="12" y2="22" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="14" y1="10" x2="20" y2="22" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="22" y1="10" x2="28" y2="22" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="7" y1="22" x2="5" y2="28" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
              <line x1="25" y1="22" x2="27" y2="28" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[7px] font-black tracking-tight text-amber-300 uppercase leading-none mt-0.5">
            Chiuso
          </span>
        </div>
      );
    case 'D':
    case 'T':
    case 'S':
      // Station / Terminal Pad
      return (
        <div className="w-full h-full bg-slate-800 border-2 border-emerald-400/60 flex items-center justify-center rounded-sm">
          <div className="w-3/4 h-3/4 rounded border border-dashed border-emerald-300/60 bg-emerald-950/30" />
        </div>
      );
    case '.':
    default:
      // Asphalt Cyber Road: clearly walkable street with center lane mark
      return (
        <div className="w-full h-full bg-slate-800/90 border border-cyan-500/30 relative flex items-center justify-center rounded-sm shadow-xs">
          <div className="w-2.5 h-1 rounded-full bg-cyan-400/60" />
        </div>
      );
  }
}
