import React from 'react';
import { ExecutionState } from '../../engine/interpreter';
import { Level } from '../../types';
import { CharacterVisual } from './CharacterVisuals';

interface IceTracesStageProps {
  level: Level;
  state: ExecutionState;
  isExecuting: boolean;
}

export const IceTracesStage: React.FC<IceTracesStageProps> = ({
  level,
  state,
  isExecuting
}) => {
  const { gridWidth, gridHeight, grid, geometryTarget } = level;

  // Calculate cell center percentage for SVG line coordinates
  const getCellCenterPercent = (x: number, y: number) => {
    const cx = ((x + 0.5) / gridWidth) * 100;
    const cy = ((y + 0.5) / gridHeight) * 100;
    return { cx, cy };
  };

  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto bg-slate-900 rounded-2xl p-3 shadow-2xl border border-blue-900/50 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Frost Texture & Snow Glow */}
      <div className="absolute inset-0 bg-radial from-blue-950/50 to-slate-950 pointer-events-none" />

      {/* Grid container */}
      <div
        className="grid gap-1 w-full h-full relative z-10"
        style={{
          gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridHeight}, minmax(0, 1fr))`
        }}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => {
            const isCharacterHere = state.pos.x === x && state.pos.y === y;
            const isStart = level.startPos.x === x && level.startPos.y === y;
            const isTarget = level.targetPos && level.targetPos.x === x && level.targetPos.y === y;
            const collectible = state.collectibles.find(
              (c) => c.x === x && c.y === y && !c.collected
            );

            return (
              <div
                key={`${x}-${y}`}
                className="relative rounded-lg overflow-hidden flex items-center justify-center transition-all bg-slate-800/80 border border-slate-700/40 select-none"
              >
                {/* Subtle Snow Crystals on tiles */}
                <div className="absolute inset-0 opacity-15 flex items-center justify-center pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                </div>

                {/* Start Flag / Portal */}
                {isStart && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
                    <div className="w-5 h-5 rounded-full border border-blue-400/50 bg-blue-500/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                    </div>
                  </div>
                )}

                {/* Target Destination if specified and not closed */}
                {isTarget && !geometryTarget?.mustClose && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-7 h-7 rounded-full bg-indigo-500/20 border-2 border-indigo-400 flex items-center justify-center animate-pulse">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-indigo-300 fill-current">
                        <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Collectibles */}
                {collectible && (
                  <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none animate-pulse">
                    <div className="w-7 h-7 filter drop-shadow-[0_0_8px_rgba(147,197,253,0.9)]">
                      <svg viewBox="0 0 32 32" className="w-full h-full">
                        <polygon
                          points="16,2 26,10 26,22 16,30 6,22 6,10"
                          fill="#60a5fa"
                          stroke="#bfdbfe"
                          strokeWidth="2"
                        />
                        <polygon points="16,6 22,12 22,20 16,26 10,20 10,12" fill="#93c5fd" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Character (Aria & Brina) */}
                {isCharacterHere && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center transition-all duration-300">
                    <CharacterVisual
                      adventureId="ice"
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

      {/* Real-time SVG Luminous Geometric Line Overlay */}
      <svg className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] pointer-events-none z-12">
        <defs>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Drawn glowing trails */}
        {state.drawnLines.map((line, idx) => {
          const fromCenter = getCellCenterPercent(line.from.x, line.from.y);
          const toCenter = getCellCenterPercent(line.to.x, line.to.y);
          return (
            <g key={idx}>
              {/* Outer soft glow line */}
              <line
                x1={`${fromCenter.cx}%`}
                y1={`${fromCenter.cy}%`}
                x2={`${toCenter.cx}%`}
                y2={`${toCenter.cy}%`}
                stroke="#38bdf8"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.45"
                filter="url(#neonGlow)"
              />
              {/* Core bright neon laser line */}
              <line
                x1={`${fromCenter.cx}%`}
                y1={`${fromCenter.cy}%`}
                x2={`${toCenter.cx}%`}
                y2={`${toCenter.cy}%`}
                stroke="#e0f2fe"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>
          );
        })}

        {/* Vertex points on corners */}
        {state.drawnPoints.map((pt, idx) => {
          const c = getCellCenterPercent(pt.x, pt.y);
          return (
            <circle
              key={idx}
              cx={`${c.cx}%`}
              cy={`${c.cy}%`}
              r="4.5"
              fill="#38bdf8"
              stroke="#ffffff"
              strokeWidth="2"
              className="animate-pulse"
            />
          );
        })}
      </svg>

      {/* Geometry Target Status Pill */}
      {geometryTarget && (
        <div className="absolute top-4 left-4 right-4 z-25 flex items-center justify-between px-3 py-1.5 bg-slate-900/90 backdrop-blur-md rounded-lg border border-blue-500/30 text-xs">
          <div className="flex items-center gap-2 text-blue-200">
            <span className="font-semibold text-blue-400">Sigillo:</span>
            <span>{geometryTarget.name}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
            <span>Segmenti: {state.drawnLines.length}</span>
            {geometryTarget.mustClose && (
              <span className={state.pos.x === level.startPos.x && state.pos.y === level.startPos.y && state.drawnLines.length > 0 ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                {state.pos.x === level.startPos.x && state.pos.y === level.startPos.y && state.drawnLines.length > 0 ? 'Chiuso ✓' : 'Aperto'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
