import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  Lightbulb,
  BookOpen,
  AlertCircle,
  HelpCircle,
  Award
} from 'lucide-react';
import { ForestStage } from '../stages/ForestStage';
import { ArchipelagoStage } from '../stages/ArchipelagoStage';
import { IceTracesStage } from '../stages/IceTracesStage';
import { FutureCityStage } from '../stages/FutureCityStage';
import { SpaceStage } from '../stages/SpaceStage';
import { BlockPalette } from '../coding/BlockPalette';
import { ProgramWorkspace } from '../coding/ProgramWorkspace';
import { PlaybackToolbar } from '../coding/PlaybackToolbar';
import { VictoryModal } from '../modals/VictoryModal';
import { HintModal } from '../modals/HintModal';
import { ExampleModal } from '../modals/ExampleModal';
import {
  checkCompletion,
  createProgramGenerator,
  executeStep,
  ExecutionState,
  ExecutionStep,
  getInitialState
} from '../../engine/interpreter';
import { AdventureId, Block, BlockType, GameProgress, Level } from '../../types';
import { soundManager } from '../../utils/audio';

interface GameViewProps {
  level: Level;
  adventureId: AdventureId;
  progress: GameProgress;
  onBackToLevelSelect: () => void;
  onNextLevel: () => void;
  onRecordLevelProgress: (
    adventureId: AdventureId,
    levelId: number,
    stars: number,
    blockCount: number,
    hintsUsed: number
  ) => void;
}

export const GameView: React.FC<GameViewProps> = ({
  level,
  adventureId,
  progress,
  onBackToLevelSelect,
  onNextLevel,
  onRecordLevelProgress
}) => {
  // Coding Program State
  const [program, setProgram] = useState<Block[]>([]);
  const [executionState, setExecutionState] = useState<ExecutionState>(() =>
    getInitialState(level)
  );

  // Playback control
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>(
    progress.executionSpeed || 'normal'
  );
  const executionGeneratorRef = useRef<Generator<ExecutionStep, void, void> | null>(null);
  const timerRef = useRef<number | null>(null);

  // Modals state
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [showExampleModal, setShowExampleModal] = useState(false);
  const [unlockedHintCount, setUnlockedHintCount] = useState(0);

  // Computed block count
  const countBlocks = (list: Block[]): number => {
    let count = 0;
    for (const b of list) {
      count++;
      if (b.children) count += countBlocks(b.children);
    }
    return count;
  };
  const totalBlocks = countBlocks(program);

  // Reset simulator state when level changes
  useEffect(() => {
    stopExecution();
    setExecutionState(getInitialState(level));
    setProgram([]);
    setUnlockedHintCount(0);
    setShowVictoryModal(false);
  }, [level]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const stopExecution = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    executionGeneratorRef.current = null;
  }, []);

  const handleReset = useCallback(() => {
    stopExecution();
    setExecutionState(getInitialState(level));
  }, [level, stopExecution]);

  // Execute a single step
  const executeSingleStep = useCallback(() => {
    if (executionState.status === 'success') return;

    if (!executionGeneratorRef.current) {
      // Initialize generator
      executionGeneratorRef.current = createProgramGenerator(
        program,
        level,
        () => executionState
      );
    }

    const next = executionGeneratorRef.current.next();

    if (next.done) {
      // Generator finished: check win conditions!
      stopExecution();
      const outcome = checkCompletion(level, executionState);

      if (outcome.success) {
        soundManager.playSuccess();
        const stars = calculateStars(totalBlocks, level.maxBlocksRecommended, unlockedHintCount);
        setExecutionState((prev) => ({
          ...prev,
          status: 'success',
          activeBlockId: null,
          successMessage: outcome.message
        }));
        onRecordLevelProgress(adventureId, level.id, stars, totalBlocks, unlockedHintCount);
        setShowVictoryModal(true);
      } else {
        soundManager.playError();
        setExecutionState((prev) => ({
          ...prev,
          status: 'failed',
          activeBlockId: null,
          errorMessage: outcome.message
        }));
      }
      return;
    }

    // Process the step
    const step = next.value;
    setExecutionState((prev) => {
      const updated = executeStep(step, prev, level);
      if (updated.status === 'failed') {
        stopExecution();
      }
      return updated;
    });
  }, [
    executionState,
    program,
    level,
    stopExecution,
    totalBlocks,
    unlockedHintCount,
    adventureId,
    onRecordLevelProgress
  ]);

  // Interval execution for Run
  const getSpeedDelay = () => {
    switch (speed) {
      case 'slow':
        return 800;
      case 'fast':
        return 200;
      case 'normal':
      default:
        return 450;
    }
  };

  const runLoop = useCallback(() => {
    if (!executionGeneratorRef.current) {
      executionGeneratorRef.current = createProgramGenerator(
        program,
        level,
        () => executionState
      );
    }

    const next = executionGeneratorRef.current.next();

    if (next.done) {
      stopExecution();
      setExecutionState((current) => {
        const outcome = checkCompletion(level, current);
        if (outcome.success) {
          soundManager.playSuccess();
          const stars = calculateStars(totalBlocks, level.maxBlocksRecommended, unlockedHintCount);
          onRecordLevelProgress(adventureId, level.id, stars, totalBlocks, unlockedHintCount);
          setShowVictoryModal(true);
          return {
            ...current,
            status: 'success',
            activeBlockId: null,
            successMessage: outcome.message
          };
        } else {
          soundManager.playError();
          return {
            ...current,
            status: 'failed',
            activeBlockId: null,
            errorMessage: outcome.message
          };
        }
      });
      return;
    }

    const step = next.value;
    setExecutionState((prev) => {
      const updated = executeStep(step, prev, level);
      if (updated.status === 'failed') {
        stopExecution();
        return updated;
      }
      // Schedule next step if still running
      timerRef.current = window.setTimeout(runLoop, getSpeedDelay());
      return updated;
    });
  }, [
    program,
    level,
    executionState,
    stopExecution,
    totalBlocks,
    unlockedHintCount,
    adventureId,
    onRecordLevelProgress,
    speed
  ]);

  const handleRun = () => {
    if (program.length === 0) return;
    // If previously failed or finished, reset position first
    if (executionState.status === 'failed' || executionState.status === 'success') {
      const freshState = getInitialState(level);
      setExecutionState({ ...freshState, status: 'running' });
      executionGeneratorRef.current = createProgramGenerator(
        program,
        level,
        () => freshState
      );
    } else {
      setExecutionState((prev) => ({ ...prev, status: 'running', errorMessage: null }));
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(runLoop, 150);
  };

  const handlePause = () => {
    stopExecution();
    setExecutionState((prev) => ({ ...prev, status: 'paused' }));
  };

  const handleResume = () => {
    setExecutionState((prev) => ({ ...prev, status: 'running' }));
    timerRef.current = window.setTimeout(runLoop, getSpeedDelay());
  };

  // Program block manipulation
  const handleAddBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: `blk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      turnDirection: type === 'turn_left' ? 'left' : type === 'turn_right' || type === 'turn' ? 'right' : undefined,
      repeatCount: type === 'repeat' ? 2 : undefined,
      condition: type === 'if' ? 'front_clear' : undefined,
      children: type === 'repeat' || type === 'if' ? [] : undefined
    };
    setProgram((prev) => [...prev, newBlock]);
  };

  const handleInsertBlockAt = (index: number, type: BlockType) => {
    const newBlock: Block = {
      id: `blk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      turnDirection: type === 'turn_left' ? 'left' : type === 'turn_right' || type === 'turn' ? 'right' : undefined,
      repeatCount: type === 'repeat' ? 2 : undefined,
      condition: type === 'if' ? 'front_clear' : undefined,
      children: type === 'repeat' || type === 'if' ? [] : undefined
    };
    const next = [...program];
    next.splice(index, 0, newBlock);
    setProgram(next);
  };

  const handleAddChildToBlock = (parentId: string, type: BlockType) => {
    const newChild: Block = {
      id: `blk_child_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      turnDirection:
        type === 'turn_left'
          ? 'left'
          : type === 'turn_right' || type === 'turn'
          ? 'right'
          : undefined
    };

    const addToTree = (list: Block[]): Block[] => {
      return list.map((b) => {
        if (b.id === parentId) {
          return {
            ...b,
            children: [...(b.children || []), newChild]
          };
        }
        if (b.children) {
          return { ...b, children: addToTree(b.children) };
        }
        return b;
      });
    };

    setProgram((prev) => addToTree(prev));
  };

  const handleClearProgram = () => {
    handleReset();
    setProgram([]);
  };

  const handleRemoveLastBlock = () => {
    if (program.length === 0) return;
    setProgram((prev) => prev.slice(0, -1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Level Nav Bar & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLevelSelect}
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-white cursor-pointer transition-colors"
            title="Torna alla mappa dei livelli"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800/40">
                Livello {level.id}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {level.difficulty}
              </span>
            </div>
            <h1 className="text-xl font-black text-white tracking-tight mt-0.5">
              {level.title}
            </h1>
          </div>
        </div>

        {/* Hints and Example Didactic Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (unlockedHintCount === 0) setUnlockedHintCount(1);
              setShowHintModal(true);
            }}
            className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Suggerimento</span>
            {unlockedHintCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-200 text-[10px] font-mono">
                {unlockedHintCount}/3
              </span>
            )}
          </button>

          <button
            onClick={() => setShowExampleModal(true)}
            className="px-3.5 py-2 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>Esempio</span>
          </button>
        </div>
      </div>

      {/* Level Objective Callout */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 flex flex-col gap-2.5 shadow-md">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 mt-0.5 shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block mb-0.5">Obiettivo della missione:</span>
            <p className="text-slate-300 leading-relaxed">{level.description}</p>
          </div>
        </div>

        {level.grid.some((row) => row.some((cell) => cell === 'X' || cell === 'R')) && (
          <div className="text-xs text-amber-300 bg-amber-950/40 border border-amber-500/30 rounded-xl p-2.5 flex items-center gap-2">
            <span className="font-bold shrink-0">💡 Regola di coding:</span>
            <span>
              Le barriere e i cantieri stradali (X) sono ostacoli non attraversabili. La soluzione consiste
              nell&apos;<strong>aggirarli individuando la deviazione</strong> lungo le strade aperte!
            </span>
          </div>
        )}
      </div>

      {/* Main Two-Zone Responsive Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: The Interactive Stage & Live Progress */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Stage Viewport */}
          {adventureId === 'forest' && (
            <ForestStage
              level={level}
              state={executionState}
              isExecuting={executionState.status === 'running'}
            />
          )}

          {adventureId === 'archipelago' && (
            <ArchipelagoStage
              level={level}
              state={executionState}
              isExecuting={executionState.status === 'running'}
            />
          )}

          {adventureId === 'ice' && (
            <IceTracesStage
              level={level}
              state={executionState}
              isExecuting={executionState.status === 'running'}
            />
          )}

          {adventureId === 'city' && (
            <FutureCityStage
              level={level}
              state={executionState}
              isExecuting={executionState.status === 'running'}
            />
          )}

          {adventureId === 'space' && (
            <SpaceStage
              level={level}
              state={executionState}
              isExecuting={executionState.status === 'running'}
            />
          )}

          {/* Error Message Diagnostic Box */}
          {executionState.errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-2.5 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <div className="leading-snug">
                <span className="font-bold block">Attenzione:</span>
                {executionState.errorMessage}
              </div>
            </div>
          )}

          {/* Success Box */}
          {executionState.successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in duration-150">
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="leading-snug">
                <span className="font-bold block">Ottimo lavoro!</span>
                {executionState.successMessage}
              </div>
            </div>
          )}

          {/* Mission Objective Checklist */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block mb-1">
              Stato Obiettivi:
            </span>
            {level.collectibles.length > 0 && (
              <div className="flex items-center justify-between text-slate-300">
                <span>Oggetti raccolti:</span>
                <span className="font-mono font-bold text-cyan-400">
                  {executionState.collectibles.filter((c) => c.collected).length} /{' '}
                  {level.collectibles.length}
                </span>
              </div>
            )}
            {level.interactables.length > 0 && (
              <div className="flex items-center justify-between text-slate-300">
                <span>{level.interactables[0].label}:</span>
                <span className="font-mono font-bold text-purple-400">
                  {executionState.interactables.filter((i) => i.activated).length > 0
                    ? 'Attivato ✓'
                    : 'In attesa'}
                </span>
              </div>
            )}
            {level.targetPos && !level.geometryTarget?.mustClose && (
              <div className="flex items-center justify-between text-slate-300">
                <span>Destinazione finale:</span>
                <span
                  className={`font-mono font-bold ${
                    executionState.pos.x === level.targetPos.x &&
                    executionState.pos.y === level.targetPos.y
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }`}
                >
                  {executionState.pos.x === level.targetPos.x &&
                  executionState.pos.y === level.targetPos.y
                    ? 'Raggiunta ✓'
                    : 'Non ancora'}
                </span>
              </div>
            )}
            {level.geometryTarget && (
              <div className="flex items-center justify-between text-slate-300">
                <span>Tracciamento geometrico:</span>
                <span className="font-mono font-bold text-blue-400">
                  {executionState.drawnLines.length} segmenti
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Zone: Block Palette & Program Workspace & Toolbar */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Playback Controls Toolbar */}
          <PlaybackToolbar
            status={executionState.status}
            speed={speed}
            hasBlocks={program.length > 0}
            onRun={handleRun}
            onPause={handlePause}
            onResume={handleResume}
            onStep={executeSingleStep}
            onReset={handleReset}
            onClear={handleClearProgram}
            onRemoveLast={handleRemoveLastBlock}
            onChangeSpeed={(newSpeed) => setSpeed(newSpeed)}
          />

          {/* Palette & Workspace Side-by-side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[440px]">
            {/* Block Palette */}
            <div className="md:col-span-5 h-full">
              <BlockPalette
                level={level}
                onAddBlock={handleAddBlock}
                disabled={executionState.status === 'running'}
              />
            </div>

            {/* Program Workspace */}
            <div className="md:col-span-7 h-full">
              <ProgramWorkspace
                program={program}
                level={level}
                activeBlockId={executionState.activeBlockId}
                onUpdateProgram={(newP) => {
                  setProgram(newP);
                  handleReset();
                }}
                onAddChildToBlock={handleAddChildToBlock}
                onInsertBlockAt={handleInsertBlockAt}
                disabled={executionState.status === 'running'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showVictoryModal && (
        <VictoryModal
          level={level}
          stars={calculateStars(totalBlocks, level.maxBlocksRecommended, unlockedHintCount)}
          blockCount={totalBlocks}
          hintsUsed={unlockedHintCount}
          isLastLevel={level.id >= 10}
          onNextLevel={() => {
            setShowVictoryModal(false);
            onNextLevel();
          }}
          onReplay={() => {
            setShowVictoryModal(false);
            handleReset();
          }}
          onBackToMap={() => {
            setShowVictoryModal(false);
            onBackToLevelSelect();
          }}
        />
      )}

      {showHintModal && (
        <HintModal
          level={level}
          unlockedHintCount={unlockedHintCount}
          onUnlockNextHint={() =>
            setUnlockedHintCount((prev) => Math.min(3, prev + 1))
          }
          onClose={() => setShowHintModal(false)}
        />
      )}

      {showExampleModal && (
        <ExampleModal level={level} onClose={() => setShowExampleModal(false)} />
      )}
    </div>
  );
};

function calculateStars(
  blockCount: number,
  recommendedMax: number,
  hintsUsed: number
): number {
  let stars = 1; // Completed
  if (blockCount <= recommendedMax) {
    stars += 1; // Efficient
  }
  if (hintsUsed === 0) {
    stars += 1; // Autonomous
  }
  return stars;
}
