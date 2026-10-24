import React from 'react';
import { Star, ArrowRight, RotateCcw, Grid, Award } from 'lucide-react';
import { Level } from '../../types';

interface VictoryModalProps {
  level: Level;
  stars: number;
  blockCount: number;
  hintsUsed: number;
  isLastLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  onBackToMap: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  level,
  stars,
  blockCount,
  hintsUsed,
  isLastLevel,
  onNextLevel,
  onReplay,
  onBackToMap
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Victory Header & Star Burst */}
        <div className="text-center pb-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-3 shadow-lg">
            <Award className="w-8 h-8 stroke-[2.2]" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Livello Completato!
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            {level.title} · {level.subtitle}
          </p>

          {/* 3-Star Rating Animation */}
          <div className="flex items-center justify-center gap-3 my-5">
            {[1, 2, 3].map((starNum) => {
              const filled = starNum <= stars;
              return (
                <div
                  key={starNum}
                  className={`transition-all duration-500 ${
                    filled ? 'scale-110 text-amber-400' : 'text-slate-700'
                  }`}
                >
                  <Star
                    className="w-10 h-10 filter drop-shadow-md"
                    fill={filled ? 'currentColor' : 'none'}
                    strokeWidth={1.8}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Evaluation Breakdown */}
        <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800 space-y-2.5 text-xs text-slate-300">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span> Obiettivo raggiunto
            </span>
            <span className="font-semibold text-white">1 Stella</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className={blockCount <= level.maxBlocksRecommended ? 'text-emerald-400' : 'text-slate-600'}>
                {blockCount <= level.maxBlocksRecommended ? '✓' : '○'}
              </span>{' '}
              Efficienza blocchi ({blockCount} / {level.maxBlocksRecommended})
            </span>
            <span className={`font-semibold ${blockCount <= level.maxBlocksRecommended ? 'text-amber-400' : 'text-slate-500'}`}>
              {blockCount <= level.maxBlocksRecommended ? '+1 Stella' : '—'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className={hintsUsed === 0 ? 'text-emerald-400' : 'text-slate-600'}>
                {hintsUsed === 0 ? '✓' : '○'}
              </span>{' '}
              Completato senza suggerimenti
            </span>
            <span className={`font-semibold ${hintsUsed === 0 ? 'text-amber-400' : 'text-slate-500'}`}>
              {hintsUsed === 0 ? '+1 Stella' : '—'}
            </span>
          </div>
        </div>

        {/* Didactic Takeaway */}
        <div className="mt-4 p-3.5 bg-blue-950/40 border border-blue-800/40 rounded-xl text-xs text-blue-200">
          <span className="font-bold text-blue-300 block mb-1">Cosa hai imparato:</span>
          {level.conceptExplanation}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          {!isLastLevel ? (
            <button
              onClick={onNextLevel}
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
            >
              <span>Prossimo livello</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onBackToMap}
              className="flex-1 py-3 px-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
            >
              <span>Avventura Conclusa! Mappa</span>
              <Award className="w-4 h-4" />
            </button>
          )}

          <div className="flex gap-2">
            <button
              onClick={onReplay}
              className="py-3 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl flex items-center justify-center border border-slate-700 cursor-pointer transition-colors"
              title="Rigioca livello"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onBackToMap}
              className="py-3 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl flex items-center justify-center border border-slate-700 cursor-pointer transition-colors"
              title="Torna alla mappa dei livelli"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
