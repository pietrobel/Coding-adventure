import React from 'react';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  RotateCcw,
  Gem,
  Zap,
  Repeat,
  GitBranch,
  Plus,
  GripVertical
} from 'lucide-react';
import { BlockType, Level } from '../../types';

interface BlockPaletteProps {
  level: Level;
  onAddBlock: (type: BlockType) => void;
  disabled?: boolean;
}

export const BlockPalette: React.FC<BlockPaletteProps> = ({
  level,
  onAddBlock,
  disabled = false
}) => {
  const allowed = level.allowedBlocks;
  const isForest = level.adventureId === 'forest';

  const handleDragStart = (e: React.DragEvent, type: BlockType) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ source: 'palette', type }));
    e.dataTransfer.setData('text/plain', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-3 flex flex-col h-full shadow-lg overflow-hidden">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 shrink-0">
        <div>
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
            Tavolozza Blocchi
          </h3>
          <p className="text-[11px] text-slate-400">
            Tocca o trascina nel programma
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 overflow-y-auto pr-1 flex-1">
        {/* Primary School Directional Arrow System (Su, Giù, Sinistra, Destra) */}
        {(isForest || allowed.includes('arrow_up') || allowed.includes('arrow_right')) && (
          <div className="space-y-1 pb-1 mb-1 border-b border-slate-800/80">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
              Frecce Direzionali (Ruota e Avanza)
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <PaletteButton
                type="arrow_up"
                label="Su ⬆"
                description="Verso Nord"
                color="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white border-emerald-400/40"
                icon={<ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />}
                onClick={() => onAddBlock('arrow_up')}
                onDragStart={(e) => handleDragStart(e, 'arrow_up')}
                disabled={disabled}
              />
              <PaletteButton
                type="arrow_down"
                label="Giù ⬇"
                description="Verso Sud"
                color="bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white border-sky-400/40"
                icon={<ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />}
                onClick={() => onAddBlock('arrow_down')}
                onDragStart={(e) => handleDragStart(e, 'arrow_down')}
                disabled={disabled}
              />
              <PaletteButton
                type="arrow_left"
                label="Sinistra ⬅"
                description="Verso Ovest"
                color="bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white border-amber-400/40"
                icon={<ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />}
                onClick={() => onAddBlock('arrow_left')}
                onDragStart={(e) => handleDragStart(e, 'arrow_left')}
                disabled={disabled}
              />
              <PaletteButton
                type="arrow_right"
                label="Destra ➡"
                description="Verso Est"
                color="bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white border-violet-400/40"
                icon={<ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />}
                onClick={() => onAddBlock('arrow_right')}
                onDragStart={(e) => handleDragStart(e, 'arrow_right')}
                disabled={disabled}
              />
            </div>
          </div>
        )}

        {allowed.includes('forward') && (
          <PaletteButton
            type="forward"
            label="Avanti"
            description="Sposta avanti di 1 casella"
            color="bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white border-sky-400/40"
            icon={<ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />}
            onClick={() => onAddBlock('forward')}
            onDragStart={(e) => handleDragStart(e, 'forward')}
            disabled={disabled}
          />
        )}

        {(allowed.includes('turn_left') || allowed.includes('turn_right') || allowed.includes('turn')) && (
          <>
            <PaletteButton
              type="turn_right"
              label="Gira a destra"
              description="Ruota l'orientamento a destra (↷)"
              color="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white border-indigo-400/40"
              icon={<RotateCw className="w-3.5 h-3.5 stroke-[2.5]" />}
              onClick={() => onAddBlock('turn_right')}
              onDragStart={(e) => handleDragStart(e, 'turn_right')}
              disabled={disabled}
            />
            <PaletteButton
              type="turn_left"
              label="Gira a sinistra"
              description="Ruota l'orientamento a sinistra (↶)"
              color="bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 text-white border-indigo-400/40"
              icon={<RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />}
              onClick={() => onAddBlock('turn_left')}
              onDragStart={(e) => handleDragStart(e, 'turn_left')}
              disabled={disabled}
            />
          </>
        )}

        {allowed.includes('collect') && (
          <PaletteButton
            type="collect"
            label="Raccogli"
            description="Prendi oggetto nella casella"
            color="bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white border-teal-400/40"
            icon={<Gem className="w-3.5 h-3.5 stroke-[2.5]" />}
            onClick={() => onAddBlock('collect')}
            onDragStart={(e) => handleDragStart(e, 'collect')}
            disabled={disabled}
          />
        )}

        {allowed.includes('interact') && (
          <PaletteButton
            type="interact"
            label="Interagisci"
            description="Attiva stazione o consegna"
            color="bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white border-purple-400/40"
            icon={<Zap className="w-3.5 h-3.5 stroke-[2.5]" />}
            onClick={() => onAddBlock('interact')}
            onDragStart={(e) => handleDragStart(e, 'interact')}
            disabled={disabled}
          />
        )}

        {allowed.includes('repeat') && (
          <PaletteButton
            type="repeat"
            label="Ripeti N volte"
            description="Esegue un ciclo di istruzioni"
            color="bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white border-amber-400/40"
            icon={<Repeat className="w-3.5 h-3.5 stroke-[2.5]" />}
            onClick={() => onAddBlock('repeat')}
            onDragStart={(e) => handleDragStart(e, 'repeat')}
            disabled={disabled}
          />
        )}

        {allowed.includes('if') && (
          <PaletteButton
            type="if"
            label="Se ... allora"
            description="Condizione sui sensori"
            color="bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white border-rose-400/40"
            icon={<GitBranch className="w-3.5 h-3.5 stroke-[2.5]" />}
            onClick={() => onAddBlock('if')}
            onDragStart={(e) => handleDragStart(e, 'if')}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};

interface PaletteButtonProps {
  type: BlockType;
  label: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
  disabled?: boolean;
}

const PaletteButton: React.FC<PaletteButtonProps> = ({
  label,
  description,
  color,
  icon,
  onClick,
  onDragStart,
  disabled
}) => {
  return (
    <div
      draggable={!disabled}
      onDragStart={onDragStart}
      onClick={onClick}
      className={`group relative flex items-center justify-between p-2 rounded-xl border text-left transition-all duration-150 cursor-grab active:cursor-grabbing disabled:opacity-40 disabled:cursor-not-allowed shadow-xs select-none ${color}`}
    >
      <div className="flex items-center gap-1.5 min-w-0">
        <GripVertical className="w-3 h-3 opacity-50 group-hover:opacity-100 shrink-0" />
        <div className="p-1 rounded-md bg-black/20 shrink-0">{icon}</div>
        <div className="min-w-0">
          <span className="block text-xs font-bold tracking-wide truncate">{label}</span>
          <span className="block text-[10px] opacity-80 font-normal leading-tight truncate">
            {description}
          </span>
        </div>
      </div>
      <Plus className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
    </div>
  );
};
