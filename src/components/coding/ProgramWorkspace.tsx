import React, { useState, useEffect, useRef } from 'react';
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
  Trash2,
  ChevronUp,
  ChevronDown,
  Plus,
  GripVertical,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { Block, BlockType, ConditionType, Level, TurnDirection } from '../../types';

interface ProgramWorkspaceProps {
  program: Block[];
  level: Level;
  activeBlockId: string | null;
  onUpdateProgram: (newProgram: Block[]) => void;
  onAddChildToBlock: (parentId: string, type: BlockType) => void;
  onInsertBlockAt?: (index: number, type: BlockType) => void;
  disabled?: boolean;
}

export const ProgramWorkspace: React.FC<ProgramWorkspaceProps> = ({
  program,
  level,
  activeBlockId,
  onUpdateProgram,
  onAddChildToBlock,
  onInsertBlockAt,
  disabled = false
}) => {
  const [isDragOverMain, setIsDragOverMain] = useState(false);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const [isCompact, setIsCompact] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom smoothly when a block is added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [program.length]);

  // Count total blocks including nested
  const countBlocks = (list: Block[]): number => {
    let count = 0;
    for (const b of list) {
      count++;
      if (b.children) {
        count += countBlocks(b.children);
      }
    }
    return count;
  };

  const totalBlockCount = countBlocks(program);

  // Helper to remove block by ID
  const removeBlock = (list: Block[], id: string): Block[] => {
    return list
      .filter((b) => b.id !== id)
      .map((b) => ({
        ...b,
        children: b.children ? removeBlock(b.children, id) : undefined
      }));
  };

  // Helper to move block in list
  const moveBlock = (list: Block[], index: number, direction: 'up' | 'down'): Block[] => {
    const next = [...list];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= next.length) return list;
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    return next;
  };

  const handleUpdateRepeatCount = (blockId: string, count: number) => {
    const updateRecursive = (list: Block[]): Block[] => {
      return list.map((b) => {
        if (b.id === blockId) {
          return { ...b, repeatCount: count };
        }
        if (b.children) {
          return { ...b, children: updateRecursive(b.children) };
        }
        return b;
      });
    };
    onUpdateProgram(updateRecursive(program));
  };

  const handleUpdateCondition = (blockId: string, condition: ConditionType) => {
    const updateRecursive = (list: Block[]): Block[] => {
      return list.map((b) => {
        if (b.id === blockId) {
          return { ...b, condition };
        }
        if (b.children) {
          return { ...b, children: updateRecursive(b.children) };
        }
        return b;
      });
    };
    onUpdateProgram(updateRecursive(program));
  };

  // In-place turn direction toggle (A destra <-> A sinistra)
  const handleToggleTurnDirection = (blockId: string, newDir: TurnDirection) => {
    const updateRecursive = (list: Block[]): Block[] => {
      return list.map((b) => {
        if (b.id === blockId) {
          return {
            ...b,
            turnDirection: newDir,
            type: newDir === 'left' ? 'turn_left' : 'turn_right'
          };
        }
        if (b.children) {
          return { ...b, children: updateRecursive(b.children) };
        }
        return b;
      });
    };
    onUpdateProgram(updateRecursive(program));
  };

  // In-place turn angle update for geometry mode
  const handleUpdateTurnAngle = (blockId: string, angle: number) => {
    const updateRecursive = (list: Block[]): Block[] => {
      return list.map((b) => {
        if (b.id === blockId) {
          return { ...b, turnAngle: angle };
        }
        if (b.children) {
          return { ...b, children: updateRecursive(b.children) };
        }
        return b;
      });
    };
    onUpdateProgram(updateRecursive(program));
  };

  // Drag and Drop handlers
  const handleWorkspaceDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOverMain(true);
  };

  const handleWorkspaceDragLeave = () => {
    setIsDragOverMain(false);
    setDropTargetIndex(null);
  };

  const handleWorkspaceDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverMain(false);
    setDropTargetIndex(null);

    const rawData = e.dataTransfer.getData('application/json');
    if (!rawData) {
      // Fallback text
      const type = e.dataTransfer.getData('text/plain') as BlockType;
      if (type) {
        insertNewBlock(type, program.length);
      }
      return;
    }

    try {
      const data = JSON.parse(rawData);
      if (data.source === 'palette' && data.type) {
        insertNewBlock(data.type, dropTargetIndex !== null ? dropTargetIndex : program.length);
      } else if (data.source === 'workspace' && data.blockId) {
        // Reorder existing block
        reorderBlock(data.blockId, dropTargetIndex !== null ? dropTargetIndex : program.length);
      }
    } catch {
      // Ignore parse error
    }
  };

  const insertNewBlock = (type: BlockType, index: number) => {
    const newBlock: Block = {
      id: `blk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      turnDirection: type === 'turn_left' ? 'left' : type === 'turn_right' || type === 'turn' ? 'right' : undefined,
      turnAngle: type === 'turn' || type === 'turn_left' || type === 'turn_right' ? 90 : undefined,
      repeatCount: type === 'repeat' ? 2 : undefined,
      condition: type === 'if' ? 'front_clear' : undefined,
      children: type === 'repeat' || type === 'if' ? [] : undefined
    };

    if (onInsertBlockAt) {
      onInsertBlockAt(index, type);
    } else {
      const next = [...program];
      next.splice(index, 0, newBlock);
      onUpdateProgram(next);
    }
  };

  const reorderBlock = (blockId: string, targetIndex: number) => {
    const blockIndex = program.findIndex((b) => b.id === blockId);
    if (blockIndex === -1) return;
    const blockToMove = program[blockIndex];
    const next = program.filter((b) => b.id !== blockId);
    const adjustedIndex = blockIndex < targetIndex ? targetIndex - 1 : targetIndex;
    next.splice(Math.max(0, Math.min(adjustedIndex, next.length)), 0, blockToMove);
    onUpdateProgram(next);
  };

  return (
    <div
      onDragOver={handleWorkspaceDragOver}
      onDragLeave={handleWorkspaceDragLeave}
      onDrop={handleWorkspaceDrop}
      className={`bg-slate-900/95 border rounded-2xl p-3 flex flex-col h-full shadow-lg transition-colors overflow-hidden ${
        isDragOverMain
          ? 'border-cyan-400/80 bg-slate-900/80 ring-2 ring-cyan-500/30'
          : 'border-slate-800'
      }`}
    >
      {/* Header with Title, Compact Toggle & Block Count Gauge */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Sequenza Codice
            </h3>
            <p className="text-[11px] text-slate-400">
              Trascina o tocca per aggiungere
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Compact View Mode Switch */}
          <button
            type="button"
            onClick={() => setIsCompact(!isCompact)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold border flex items-center gap-1 transition-colors cursor-pointer ${
              isCompact
                ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Attiva la visualizzazione compatta per visualizzare più blocchi senza scorrere"
          >
            {isCompact ? (
              <>
                <Maximize2 className="w-3 h-3 text-cyan-400" />
                <span>Normale</span>
              </>
            ) : (
              <>
                <Minimize2 className="w-3 h-3 text-slate-400" />
                <span>Compatta</span>
              </>
            )}
          </button>

          {/* Block Counter Gauge */}
          <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-800 rounded-lg text-[11px] font-mono">
            <span
              className={`font-bold ${
                totalBlockCount <= level.maxBlocksRecommended
                  ? 'text-emerald-400'
                  : 'text-amber-400'
              }`}
            >
              {totalBlockCount}
            </span>
            <span className="text-slate-500">/{level.maxBlocksRecommended}</span>
          </div>
        </div>
      </div>

      {/* Program Blocks Container with max-height and custom scrollbar */}
      <div className={`flex-1 overflow-y-auto pr-1 ${isCompact ? 'space-y-1' : 'space-y-1.5'}`}>
        {program.length === 0 ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOverMain(true);
            }}
            className="h-36 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center text-center p-4 text-slate-500 hover:border-cyan-500/50 hover:bg-cyan-950/10 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center mb-1.5">
              <Plus className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs font-medium text-slate-300">
              Nessun blocco inserito
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 max-w-xs">
              Trascina o tocca le istruzioni a sinistra per creare il programma.
            </p>
          </div>
        ) : (
          <>
            {renderBlockList(
              program,
              activeBlockId,
              level,
              disabled,
              isCompact,
              (id) => onUpdateProgram(removeBlock(program, id)),
              (idx, dir) => onUpdateProgram(moveBlock(program, idx, dir)),
              handleUpdateRepeatCount,
              handleUpdateCondition,
              handleToggleTurnDirection,
              handleUpdateTurnAngle,
              onAddChildToBlock,
              (idx) => setDropTargetIndex(idx)
            )}
            <div ref={bottomRef} className="h-1" />
          </>
        )}
      </div>
    </div>
  );
};

function renderBlockList(
  list: Block[],
  activeBlockId: string | null,
  level: Level,
  disabled: boolean,
  isCompact: boolean,
  onDelete: (id: string) => void,
  onMove: (index: number, dir: 'up' | 'down') => void,
  onUpdateRepeat: (id: string, count: number) => void,
  onUpdateCondition: (id: string, cond: ConditionType) => void,
  onToggleTurn: (id: string, dir: TurnDirection) => void,
  onUpdateTurnAngle: (id: string, angle: number) => void,
  onAddChild: (parentId: string, type: BlockType) => void,
  onHoverIndex: (index: number) => void
) {
  return list.map((block, index) => {
    const isActive = activeBlockId === block.id;

    // Handle repeat loop container
    if (block.type === 'repeat') {
      return (
        <div
          key={block.id}
          draggable={!disabled}
          onDragStart={(e) => {
            e.dataTransfer.setData(
              'application/json',
              JSON.stringify({ source: 'workspace', blockId: block.id })
            );
          }}
          className={`rounded-xl border transition-all duration-200 overflow-hidden ${
            isActive
              ? 'ring-2 ring-yellow-400 border-yellow-300 shadow-lg shadow-amber-500/20'
              : 'border-amber-500/40 bg-amber-950/20'
          }`}
        >
          {/* Header of Repeat Container */}
          <div className={`bg-amber-600/90 text-white ${isCompact ? 'p-1.5' : 'p-2'} flex items-center justify-between`}>
            <div className="flex items-center gap-1.5">
              <GripVertical className="w-3 h-3 opacity-60 cursor-grab shrink-0" />
              <Repeat className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Ripeti</span>
              <select
                value={block.repeatCount || 2}
                disabled={disabled}
                onChange={(e) => onUpdateRepeat(block.id, Number(e.target.value))}
                className="bg-amber-800 text-white font-bold text-[11px] rounded px-1.5 py-0.5 border border-amber-400 cursor-pointer"
              >
                {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} volte
                  </option>
                ))}
              </select>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-0.5">
              <button
                disabled={disabled || index === 0}
                onClick={() => onMove(index, 'up')}
                className="p-1 hover:bg-black/20 rounded disabled:opacity-20 cursor-pointer"
                title="Sposta su"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                disabled={disabled || index === list.length - 1}
                onClick={() => onMove(index, 'down')}
                className="p-1 hover:bg-black/20 rounded disabled:opacity-20 cursor-pointer"
                title="Sposta giù"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
              <button
                disabled={disabled}
                onClick={() => onDelete(block.id)}
                className="p-1 hover:bg-red-600/50 rounded cursor-pointer text-amber-200 hover:text-white"
                title="Elimina ciclo"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Children container with indent */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const raw = e.dataTransfer.getData('application/json');
              if (raw) {
                try {
                  const data = JSON.parse(raw);
                  if (data.source === 'palette' && data.type) {
                    onAddChild(block.id, data.type);
                  }
                } catch {
                  // Ignore
                }
              }
            }}
            className={`${isCompact ? 'p-1.5 pl-3 my-0.5 space-y-1' : 'p-2 pl-4 my-1 space-y-1.5'} bg-slate-900/40 border-l-4 border-amber-500/60 ml-1.5`}
          >
            {(!block.children || block.children.length === 0) ? (
              <div className="text-[10px] text-amber-300/70 py-1.5 italic border border-dashed border-amber-500/30 rounded p-1.5 text-center">
                Trascina o tocca un&apos;istruzione da ripetere:
              </div>
            ) : (
              renderBlockList(
                block.children,
                activeBlockId,
                level,
                disabled,
                isCompact,
                onDelete,
                (idx, dir) => {
                  const updated = [...(block.children || [])];
                  const t = dir === 'up' ? idx - 1 : idx + 1;
                  if (t >= 0 && t < updated.length) {
                    const tmp = updated[idx];
                    updated[idx] = updated[t];
                    updated[t] = tmp;
                    block.children = updated;
                  }
                },
                onUpdateRepeat,
                onUpdateCondition,
                onToggleTurn,
                onUpdateTurnAngle,
                onAddChild,
                onHoverIndex
              )
            )}

            {/* Quick add buttons inside repeat */}
            <div className="flex flex-wrap gap-1 pt-0.5">
              {getAvailableChildTypes(level.allowedBlocks).map((childType) => (
                <button
                  key={childType}
                  disabled={disabled}
                  onClick={() => onAddChild(block.id, childType)}
                  className="px-1.5 py-0.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded text-[10px] font-medium flex items-center gap-1 cursor-pointer disabled:opacity-30"
                >
                  <Plus className="w-2.5 h-2.5" />
                  {getBlockLabel(childType)}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Handle if condition container
    if (block.type === 'if') {
      return (
        <div
          key={block.id}
          draggable={!disabled}
          onDragStart={(e) => {
            e.dataTransfer.setData(
              'application/json',
              JSON.stringify({ source: 'workspace', blockId: block.id })
            );
          }}
          className={`rounded-xl border transition-all duration-200 overflow-hidden ${
            isActive
              ? 'ring-2 ring-yellow-400 border-yellow-300 shadow-lg shadow-rose-500/20'
              : 'border-rose-500/40 bg-rose-950/20'
          }`}
        >
          {/* Header of If Container */}
          <div className={`bg-rose-600/90 text-white ${isCompact ? 'p-1.5' : 'p-2'} flex items-center justify-between`}>
            <div className="flex items-center gap-1.5 flex-wrap">
              <GripVertical className="w-3 h-3 opacity-60 cursor-grab shrink-0" />
              <GitBranch className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-wider">SE</span>
              <select
                value={block.condition || 'front_clear'}
                disabled={disabled}
                onChange={(e) => onUpdateCondition(block.id, e.target.value as ConditionType)}
                className="bg-rose-800 text-white font-bold text-[11px] rounded px-1.5 py-0.5 border border-rose-400 cursor-pointer"
              >
                {(level.conditionOptions || [
                  { id: 'front_clear', label: 'Davanti è libero' },
                  { id: 'has_battery', label: 'Oggetto raccolto' }
                ]).map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="text-[10px] font-bold uppercase">allora:</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-0.5">
              <button
                disabled={disabled || index === 0}
                onClick={() => onMove(index, 'up')}
                className="p-1 hover:bg-black/20 rounded disabled:opacity-20 cursor-pointer"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                disabled={disabled || index === list.length - 1}
                onClick={() => onMove(index, 'down')}
                className="p-1 hover:bg-black/20 rounded disabled:opacity-20 cursor-pointer"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
              <button
                disabled={disabled}
                onClick={() => onDelete(block.id)}
                className="p-1 hover:bg-red-600/50 rounded cursor-pointer text-rose-200 hover:text-white"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Children container with indent */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const raw = e.dataTransfer.getData('application/json');
              if (raw) {
                try {
                  const data = JSON.parse(raw);
                  if (data.source === 'palette' && data.type) {
                    onAddChild(block.id, data.type);
                  }
                } catch {
                  // Ignore
                }
              }
            }}
            className={`${isCompact ? 'p-1.5 pl-3 my-0.5 space-y-1' : 'p-2 pl-4 my-1 space-y-1.5'} bg-slate-900/40 border-l-4 border-rose-500/60 ml-1.5`}
          >
            {(!block.children || block.children.length === 0) ? (
              <div className="text-[10px] text-rose-300/70 py-1.5 italic border border-dashed border-rose-500/30 rounded p-1.5 text-center">
                Trascina qui le istruzioni condizionali:
              </div>
            ) : (
              renderBlockList(
                block.children,
                activeBlockId,
                level,
                disabled,
                isCompact,
                onDelete,
                (idx, dir) => {
                  const updated = [...(block.children || [])];
                  const t = dir === 'up' ? idx - 1 : idx + 1;
                  if (t >= 0 && t < updated.length) {
                    const tmp = updated[idx];
                    updated[idx] = updated[t];
                    updated[t] = tmp;
                    block.children = updated;
                  }
                },
                onUpdateRepeat,
                onUpdateCondition,
                onToggleTurn,
                onUpdateTurnAngle,
                onAddChild,
                onHoverIndex
              )
            )}

            {/* Quick add inside condition */}
            <div className="flex flex-wrap gap-1 pt-0.5">
              {getAvailableChildTypes(level.allowedBlocks).map((childType) => (
                <button
                  key={childType}
                  disabled={disabled}
                  onClick={() => onAddChild(block.id, childType)}
                  className="px-1.5 py-0.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded text-[10px] font-medium flex items-center gap-1 cursor-pointer disabled:opacity-30"
                >
                  <Plus className="w-2.5 h-2.5" />
                  {getBlockLabel(childType)}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Is this a Turn block (turn, turn_left, or turn_right)?
    const isTurnBlock =
      block.type === 'turn' ||
      block.type === 'turn_left' ||
      block.type === 'turn_right';

    const turnDir: TurnDirection =
      block.turnDirection ||
      (block.type === 'turn_left' ? 'left' : 'right');

    const info = getBlockVisualInfo(block.type, turnDir);

    return (
      <div
        key={block.id}
        draggable={!disabled}
        onDragStart={(e) => {
          e.dataTransfer.setData(
            'application/json',
            JSON.stringify({ source: 'workspace', blockId: block.id })
          );
        }}
        onDragOver={(e) => {
          e.preventDefault();
          onHoverIndex(index);
        }}
        className={`flex items-center justify-between ${
          isCompact ? 'py-1 px-2' : 'py-1.5 px-2.5'
        } rounded-xl border transition-all duration-200 select-none ${
          isActive
            ? 'ring-2 ring-yellow-400 border-yellow-300 bg-amber-400/20 shadow-md shadow-amber-500/20 text-yellow-100 scale-[1.01]'
            : info.style
        }`}
      >
        <div className="flex items-center gap-1.5 flex-wrap">
          <GripVertical className="w-3 h-3 opacity-60 cursor-grab shrink-0" />
          <div className="p-1 rounded-md bg-black/20 shrink-0">{info.icon}</div>

          {/* Turn block: direction selector + angle selector + 1-click invert */}
          {isTurnBlock ? (
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wide">Gira</span>
              <select
                value={turnDir}
                disabled={disabled}
                onChange={(e) =>
                  onToggleTurn(block.id, e.target.value as TurnDirection)
                }
                className="bg-indigo-900/90 hover:bg-indigo-800 text-indigo-100 text-[11px] font-bold rounded px-1.5 py-0.5 border border-indigo-400/50 cursor-pointer shadow-xs"
                title="Seleziona la direzione di svolta"
              >
                <option value="right">a destra ↷</option>
                <option value="left">a sinistra ↶</option>
              </select>

              {/* Angle selector for geometry exploration */}
              <select
                value={block.turnAngle || 90}
                disabled={disabled}
                onChange={(e) => onUpdateTurnAngle(block.id, Number(e.target.value))}
                className="bg-indigo-950 hover:bg-indigo-900 text-cyan-300 text-[10px] font-bold rounded px-1.5 py-0.5 border border-indigo-500/40 cursor-pointer"
                title="Angolo di rotazione geometrico"
              >
                <option value={45}>45°</option>
                <option value={60}>60°</option>
                <option value={90}>90°</option>
                <option value={120}>120°</option>
                <option value={135}>135°</option>
                <option value={180}>180°</option>
              </select>

              <button
                type="button"
                disabled={disabled}
                onClick={() => onToggleTurn(block.id, turnDir === 'left' ? 'right' : 'left')}
                className="px-1 py-0.5 bg-indigo-950/70 hover:bg-indigo-800 text-indigo-200 hover:text-white rounded text-[9px] font-bold border border-indigo-500/30 flex items-center gap-0.5 cursor-pointer transition-colors"
                title="Clicca per invertire verso (Destra ⇄ Sinistra)"
              >
                {turnDir === 'left' ? (
                  <RotateCw className="w-2.5 h-2.5 text-cyan-300" />
                ) : (
                  <RotateCcw className="w-2.5 h-2.5 text-cyan-300" />
                )}
                <span className="hidden sm:inline">Inverti</span>
              </button>
            </div>
          ) : (
            <span className="text-[11px] font-bold tracking-wide">{info.label}</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            disabled={disabled || index === 0}
            onClick={() => onMove(index, 'up')}
            className="p-1 hover:bg-black/20 rounded disabled:opacity-20 cursor-pointer"
            title="Sposta su"
          >
            <ChevronUp className="w-3 h-3" />
          </button>
          <button
            disabled={disabled || index === list.length - 1}
            onClick={() => onMove(index, 'down')}
            className="p-1 hover:bg-black/20 rounded disabled:opacity-20 cursor-pointer"
            title="Sposta giù"
          >
            <ChevronDown className="w-3 h-3" />
          </button>
          <button
            disabled={disabled}
            onClick={() => onDelete(block.id)}
            className="p-1 hover:bg-red-600/50 rounded cursor-pointer opacity-70 hover:opacity-100 text-red-200"
            title="Elimina"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  });
}

function getBlockLabel(type: BlockType): string {
  switch (type) {
    case 'forward':
      return 'Avanti';
    case 'turn_left':
      return 'Gira a sinistra';
    case 'turn_right':
    case 'turn':
      return 'Gira a destra';
    case 'arrow_up':
      return 'Su ⬆';
    case 'arrow_down':
      return 'Giù ⬇';
    case 'arrow_left':
      return 'Sinistra ⬅';
    case 'arrow_right':
      return 'Destra ➡';
    case 'collect':
      return 'Raccogli';
    case 'interact':
      return 'Interagisci';
    case 'repeat':
      return 'Ripeti';
    case 'if':
      return 'Se';
    default:
      return type;
  }
}

function getBlockVisualInfo(type: BlockType, turnDir?: TurnDirection) {
  if (type === 'turn' || type === 'turn_left' || type === 'turn_right') {
    const isLeft = turnDir === 'left';
    return {
      label: isLeft ? 'GIRA A SINISTRA' : 'GIRA A DESTRA',
      icon: isLeft ? (
        <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
      ) : (
        <RotateCw className="w-3.5 h-3.5 stroke-[2.5]" />
      ),
      style: 'bg-indigo-700/80 border-indigo-500/40 text-indigo-100'
    };
  }

  switch (type) {
    case 'forward':
      return {
        label: 'AVANTI',
        icon: <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />,
        style: 'bg-sky-700/80 border-sky-500/40 text-sky-100'
      };
    case 'arrow_up':
      return {
        label: 'SPOSTA SU (⬆)',
        icon: <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />,
        style: 'bg-emerald-700/80 border-emerald-500/40 text-emerald-100'
      };
    case 'arrow_down':
      return {
        label: 'SPOSTA GIÙ (⬇)',
        icon: <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />,
        style: 'bg-sky-700/80 border-sky-500/40 text-sky-100'
      };
    case 'arrow_left':
      return {
        label: 'SPOSTA SINISTRA (⬅)',
        icon: <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />,
        style: 'bg-amber-700/80 border-amber-500/40 text-amber-100'
      };
    case 'arrow_right':
      return {
        label: 'SPOSTA DESTRA (➡)',
        icon: <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />,
        style: 'bg-violet-700/80 border-violet-500/40 text-violet-100'
      };
    case 'collect':
      return {
        label: 'RACCOGLI',
        icon: <Gem className="w-3.5 h-3.5 stroke-[2.5]" />,
        style: 'bg-teal-700/80 border-teal-500/40 text-teal-100'
      };
    case 'interact':
      return {
        label: 'INTERAGISCI',
        icon: <Zap className="w-3.5 h-3.5 stroke-[2.5]" />,
        style: 'bg-purple-700/80 border-purple-500/40 text-purple-100'
      };
    default:
      return {
        label: type,
        icon: <ArrowUp className="w-3.5 h-3.5" />,
        style: 'bg-slate-700 border-slate-500 text-slate-100'
      };
  }
}

function getAvailableChildTypes(allowed: BlockType[]): BlockType[] {
  const result: BlockType[] = [];
  if (allowed.includes('forward')) result.push('forward');
  if (
    allowed.includes('arrow_up') ||
    allowed.includes('arrow_down') ||
    allowed.includes('arrow_left') ||
    allowed.includes('arrow_right')
  ) {
    result.push('arrow_up');
    result.push('arrow_down');
    result.push('arrow_left');
    result.push('arrow_right');
  }
  if (
    allowed.includes('turn_right') ||
    allowed.includes('turn_left') ||
    allowed.includes('turn')
  ) {
    result.push('turn_right');
    result.push('turn_left');
  }
  if (allowed.includes('collect')) result.push('collect');
  if (allowed.includes('interact')) result.push('interact');
  if (allowed.includes('trace')) result.push('trace');
  return result;
}
