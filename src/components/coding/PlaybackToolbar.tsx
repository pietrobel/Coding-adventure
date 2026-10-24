import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  Trash,
  Undo2,
  Gauge
} from 'lucide-react';

interface PlaybackToolbarProps {
  status: 'idle' | 'running' | 'paused' | 'success' | 'failed';
  speed: 'slow' | 'normal' | 'fast';
  hasBlocks: boolean;
  onRun: () => void;
  onPause: () => void;
  onResume: () => void;
  onStep: () => void;
  onReset: () => void;
  onClear: () => void;
  onRemoveLast: () => void;
  onChangeSpeed: (speed: 'slow' | 'normal' | 'fast') => void;
}

export const PlaybackToolbar: React.FC<PlaybackToolbarProps> = ({
  status,
  speed,
  hasBlocks,
  onRun,
  onPause,
  onResume,
  onStep,
  onReset,
  onClear,
  onRemoveLast,
  onChangeSpeed
}) => {
  const isRunning = status === 'running';
  const isPaused = status === 'paused';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-lg flex flex-wrap items-center justify-between gap-3">
      {/* Primary Execution Controls */}
      <div className="flex items-center gap-2">
        {!isRunning && !isPaused ? (
          <button
            onClick={onRun}
            disabled={!hasBlocks}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-md shadow-emerald-950/40 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Esegui</span>
          </button>
        ) : isRunning ? (
          <button
            onClick={onPause}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-md shadow-amber-950/40 cursor-pointer transition-all"
          >
            <Pause className="w-4 h-4 fill-current" />
            <span>Pausa</span>
          </button>
        ) : (
          <button
            onClick={onResume}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-md shadow-emerald-950/40 cursor-pointer transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Riprendi</span>
          </button>
        )}

        {/* Step-by-step single instruction */}
        <button
          onClick={onStep}
          disabled={!hasBlocks || isRunning}
          className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Esegui una singola istruzione"
        >
          <StepForward className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Passo singolo</span>
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-xl flex items-center gap-1.5 border border-slate-700 cursor-pointer transition-all"
          title="Ripristina la posizione iniziale"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Riparti</span>
        </button>
      </div>

      {/* Speed Selector & Clear tools */}
      <div className="flex items-center gap-2">
        {/* Speed Segmented Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <Gauge className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
          {(['slow', 'normal', 'fast'] as const).map((s) => (
            <button
              key={s}
              onClick={() => onChangeSpeed(s)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                speed === s
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s === 'slow' ? 'Lenta' : s === 'normal' ? 'Normale' : 'Veloce'}
            </button>
          ))}
        </div>

        {/* Program editing actions */}
        <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
          <button
            onClick={onRemoveLast}
            disabled={!hasBlocks || isRunning}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Rimuovi ultimo blocco"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClear}
            disabled={!hasBlocks || isRunning}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Svuota programma"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
