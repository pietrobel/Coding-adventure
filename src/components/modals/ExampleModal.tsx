import React from 'react';
import { BookOpen, X, CheckCircle2 } from 'lucide-react';
import { Level } from '../../types';

interface ExampleModalProps {
  level: Level;
  onClose: () => void;
}

export const ExampleModal: React.FC<ExampleModalProps> = ({ level, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Concetto Didattico
              </h3>
              <p className="text-xs text-slate-400">
                Spiegazione del principio computazionale
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

        <div className="my-5 space-y-4">
          <div className="p-4 bg-sky-950/30 border border-sky-800/40 rounded-2xl">
            <h4 className="text-sm font-bold text-sky-300 mb-1.5">
              {level.title}
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              {level.conceptExplanation}
            </p>
          </div>

          {/* Example pattern comparison */}
          {level.allowedBlocks.includes('repeat') ? (
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-red-400 block mb-1">
                  Senza ciclo (Lungo):
                </span>
                <p className="font-mono text-slate-400 text-[11px] leading-tight space-y-0.5">
                  Avanti<br />Avanti<br />Avanti<br />Avanti
                </p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30">
                <span className="font-bold text-emerald-400 block mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Con ciclo (Elegante):
                </span>
                <p className="font-mono text-emerald-300 text-[11px] leading-tight">
                  Ripeti 4 volte:<br />
                  &nbsp;&nbsp;Avanti
                </p>
              </div>
            </div>
          ) : level.allowedBlocks.includes('if') ? (
            <div className="p-3 bg-slate-950 rounded-xl border border-rose-500/30 text-xs">
              <span className="font-bold text-rose-300 block mb-1">
                Esempio di Regola Condizionale:
              </span>
              <p className="font-mono text-rose-200 text-[11px]">
                SE strada davanti è libera ALLORA:<br />
                &nbsp;&nbsp;Avanza di 1 casella<br />
                (Se invece c'è un ostacolo, il robot non andrà a sbattere!)
              </p>
            </div>
          ) : (
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-slate-200 block">Regola d'oro:</span>
              <p>
                1. "Avanti" muove sempre il personaggio di 1 casella verso dove è girato.<br />
                2. "Gira a destra / sinistra" non sposta il personaggio, cambia solo la sua direzione di 90 gradi.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="py-2 px-5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl cursor-pointer transition-colors"
          >
            Ho capito, fammi provare!
          </button>
        </div>
      </div>
    </div>
  );
};
