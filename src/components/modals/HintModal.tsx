import React from 'react';
import { Lightbulb, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Level } from '../../types';

interface HintModalProps {
  level: Level;
  unlockedHintCount: number;
  onUnlockNextHint: () => void;
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  level,
  unlockedHintCount,
  onUnlockNextHint,
  onClose
}) => {
  const hints = level.hints;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Lightbulb className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Suggerimenti Didattici
              </h3>
              <p className="text-xs text-slate-400">
                Livello {level.id}: {level.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hints progression */}
        <div className="my-5 space-y-3.5">
          {hints.map((hintText, idx) => {
            const isUnlocked = idx < unlockedHintCount;
            const labels = [
              '1. Indizio generale sul ragionamento',
              '2. Aiuto pratico sui blocchi',
              '3. Consiglio mirato sul percorso'
            ];

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-amber-950/20 border-amber-500/40 text-amber-100'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400/90">
                    {labels[idx]}
                  </span>
                  {isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500">Bloccato</span>
                  )}
                </div>

                {isUnlocked ? (
                  <p className="text-xs leading-relaxed text-slate-200">
                    {hintText}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Usa il pulsante in basso se ti serve un aiuto più specifico.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer with Unlock Next button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            Aperti: {unlockedHintCount} di 3
          </span>

          <div className="flex gap-2">
            {unlockedHintCount < 3 && (
              <button
                onClick={onUnlockNextHint}
                className="py-2 px-3.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
              >
                <span>Sblocca prossimo aiuto</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer transition-colors"
            >
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
