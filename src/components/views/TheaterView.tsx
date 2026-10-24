import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  MessageSquare,
  RotateCw,
  Volume2,
  Layers,
  Move,
  HelpCircle,
  Lightbulb,
  Compass,
  Smile,
  RefreshCw,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SPRITE_CATALOG, SpriteDefinition, SpriteId, SpriteSvg } from '../stages/SpriteLibrary';
import { soundManager } from '../../utils/audio';

export type TheaterBlockAction =
  | 'say'
  | 'think'
  | 'move_forward'
  | 'turn_right'
  | 'turn_left'
  | 'point_direction'
  | 'go_to'
  | 'bounce'
  | 'play_sound'
  | 'change_emotion'
  | 'wait';

export interface TheaterBlock {
  id: string;
  action: TheaterBlockAction;
  text?: string;
  durationSec?: number;
  steps?: number;
  angle?: number;
  targetDirection?: number; // 0 = up, 90 = right, 180 = down, 270 = left
  targetX?: number;
  targetY?: number;
  soundName?: 'cat' | 'pop' | 'magic' | 'beep' | 'cheer' | 'laser';
  emotion?: 'felice' | 'curioso' | 'sorpreso' | 'determinato' | 'buffo';
}

export interface ActiveSprite {
  uid: string;
  spriteId: SpriteId;
  name: string;
  x: number; // -180 to 180
  y: number; // -120 to 120 (0 is center, positive is UP)
  rotation: number; // 0 is pointing UP (North)
  scale: number;
  emotion: 'felice' | 'curioso' | 'sorpreso' | 'determinato' | 'buffo';
  speechBubble: string | null;
  thoughtBubble: string | null;
  isBouncing: boolean;
  script: TheaterBlock[];
  onClickScript: TheaterBlock[];
}

export interface GuidedTutorialStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  initialSprite: SpriteId;
  targetGoal: string;
  hints: string[];
  initialBlocks: TheaterBlock[];
  requiredActions: TheaterBlockAction[];
  requiredCount?: number;
  expectedMinRotation?: number;
  expectedMinSteps?: number;
}

export const GUIDED_TUTORIALS: GuidedTutorialStep[] = [
  {
    id: 1,
    title: '1. Hello World! (Il Primo Saluto)',
    subtitle: 'Fai parlare il tuo sprite',
    description:
      'Benvenuto nel Teatro! Proprio come nei primi programmi di Code.org e Scratch, iniziamo con "Hello World": fai pronunciare allo sprite un saluto con un fumetto a fumetti per 2 secondi!',
    initialSprite: 'scratch_cat',
    targetGoal: 'Aggiungi il blocco "Dire" per far salutare Micio Scratchy con "Ciao Mondo!".',
    hints: [
      'Clicca sul pulsante "+ Dire: Ciao Mondo!" nella tavolozza blocchi a destra.',
      'Premi "Avvia Spettacolo" per guardare il fumetto apparire sopra la testa dello sprite!'
    ],
    initialBlocks: [],
    requiredActions: ['say']
  },
  {
    id: 2,
    title: '2. Primi Passi in Alto (Orientamento 0°)',
    subtitle: 'Movimento in avanti nella direzione dello sprite',
    description:
      'Tutti gli sprite sono orientati verso l’alto (0°)! Quando usi il blocco "Avanza di passi", lo sprite cammina dritto nella direzione in cui guarda. Fai muovere lo sprite verso l’alto!',
    initialSprite: 'scratch_cat',
    targetGoal: 'Aggiungi un blocco di movimento per far avanzare lo sprite di almeno 30 passi verso l’alto.',
    hints: [
      'Usa il blocco "Avanza di 30 passi".',
      'Puoi anche aggiungere un saluto prima o dopo il movimento per renderlo più allegro!'
    ],
    initialBlocks: [
      {
        id: 'tb_say1',
        action: 'say',
        text: 'Guarda come cammino verso l’alto!',
        durationSec: 1.5
      }
    ],
    requiredActions: ['move_forward'],
    expectedMinSteps: 20
  },
  {
    id: 3,
    title: '3. La Piroetta & la Rotazione Magica',
    subtitle: 'Ruota a destra o sinistra',
    description:
      'Ora impariamo a ruotare! Fai compiere allo sprite una rotazione a destra di 90° (o 180°) e fai risuonare un magico effetto sonoro!',
    initialSprite: 'wand',
    targetGoal: 'Fai ruotare la bacchetta magica e suona una nota magica!',
    hints: [
      'Aggiungi "Ruota a destra di 90°".',
      'Aggiungi poi il blocco "Suona Magia" per celebrare la piroetta!'
    ],
    initialBlocks: [],
    requiredActions: ['turn_right', 'play_sound'],
    expectedMinRotation: 45
  },
  {
    id: 4,
    title: '4. La Danza dello Sprite (Sequenza Ritmica)',
    subtitle: 'Rotazioni multiple, passi e salti',
    description:
      'Combina movimento, piroette e salti! Crea una vera coreografia ritmata con 4 o più istruzioni concatenate per far ballare il Dinosauro o il Pinguino.',
    initialSprite: 'dino',
    targetGoal: 'Crea una danza con almeno 4 blocchi (Avanza, Ruota, Salta, Suona).',
    hints: [
      'Aggiungi Ruota, Avanza, poi Salta, e infine un effetto sonoro!',
      'Puoi cambiare l’emozione dello sprite in "felice" o "buffo" durante la danza.'
    ],
    initialBlocks: [
      { id: 'tb_dan1', action: 'bounce' }
    ],
    requiredActions: ['turn_right', 'bounce'],
    requiredCount: 4
  },
  {
    id: 5,
    title: '5. Incontro e Dialogo a Due Sprite',
    subtitle: 'Conversazione teatrale sincrona',
    description:
      'Nello spettacolo teatrale compaiono due protagonisti! Fai salutare il primo sprite, attendi un momento e fai rispondere il secondo con un pasticcino di festa!',
    initialSprite: 'scratch_cat',
    targetGoal: 'Programma un dialogo dove Micio parla, poi il Dolcetto risponde festoso!',
    hints: [
      'Seleziona il secondo sprite nella barra in basso per programmare le sue battute!',
      'Usa il blocco "Attendi 1 sec" per coordinare le risposte a turno.'
    ],
    initialBlocks: [
      {
        id: 'tb_cat_greet',
        action: 'say',
        text: 'Evviva! Che bella festa di compleanno!',
        durationSec: 2
      }
    ],
    requiredActions: ['say']
  },
  {
    id: 6,
    title: '6. Clicca e Interagisci! (Eventi)',
    subtitle: 'Quando si tocca questo sprite',
    description:
      'Programma un’azione reattiva! Quando lo studente clicca sullo sprite sul palco, questo deve girare su se stesso, saltare e gridare "Urrà!".',
    initialSprite: 'robot',
    targetGoal: 'Aggiungi istruzioni nella sezione "Quando si clicca sullo sprite".',
    hints: [
      'Apri la sezione arancione "Quando si clicca su questo sprite".',
      'Aggiungi "Salta", "Suona Beep" e "Dire: Urrà!". Clicca poi sullo sprite durante l’anteprima!'
    ],
    initialBlocks: [
      {
        id: 'tb_clk_start',
        action: 'say',
        text: 'Cliccami sul palcoscenico per farmi ballare!',
        durationSec: 2
      }
    ],
    requiredActions: ['bounce']
  }
];

export const TheaterView: React.FC = () => {
  // Mode: 'tutorial' (step by step) or 'sandbox' (free stage)
  const [mode, setMode] = useState<'tutorial' | 'sandbox'>('tutorial');
  const [currentTutorialIndex, setCurrentTutorialIndex] = useState(0);

  // Stage Background
  const [stageBackdrop, setStageBackdrop] = useState<'theatre' | 'forest' | 'space' | 'ice' | 'city' | 'classroom'>('theatre');

  // Sprites on stage
  const [sprites, setSprites] = useState<ActiveSprite[]>(() => [
    createInitialSprite('scratch_cat', 0, 0, 0)
  ]);
  const [selectedSpriteUid, setSelectedSpriteUid] = useState<string>(sprites[0]?.uid || '');

  // Script target tab: 'main' (Green Flag / Play) or 'onclick' (When Clicked)
  const [scriptTargetTab, setScriptTargetTab] = useState<'main' | 'onclick'>('main');

  // Playback execution state
  const [isPlaying, setIsPlaying] = useState(false);
  const [executionStepIndex, setExecutionStepIndex] = useState(-1);
  const playTimerRef = useRef<number | null>(null);

  // Tutorial completion feedback
  const [tutorialPassed, setTutorialPassed] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  // Load tutorial step
  useEffect(() => {
    if (mode === 'tutorial') {
      const tut = GUIDED_TUTORIALS[currentTutorialIndex];
      const newSp = createInitialSprite(tut.initialSprite, 0, 0, 0);
      newSp.script = [...tut.initialBlocks];
      setSprites([newSp]);
      setSelectedSpriteUid(newSp.uid);
      setTutorialPassed(false);
      setIsPlaying(false);
      setExecutionStepIndex(-1);
    }
  }, [mode, currentTutorialIndex]);

  const currentTutorial = GUIDED_TUTORIALS[currentTutorialIndex];
  const selectedSprite = sprites.find((s) => s.uid === selectedSpriteUid) || sprites[0];

  // Stop playback safely
  const stopPlay = () => {
    if (playTimerRef.current) {
      clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }
    setIsPlaying(false);
  };

  // Reset stage positions and bubbles
  const handleResetStage = () => {
    stopPlay();
    setExecutionStepIndex(-1);
    setSprites((prev) =>
      prev.map((s, idx) => ({
        ...s,
        x: idx === 0 ? 0 : idx === 1 ? -60 : 60,
        y: 0,
        rotation: 0,
        speechBubble: null,
        thoughtBubble: null,
        isBouncing: false
      }))
    );
  };

  // Add block to current sprite's active script
  const handleAddBlock = (block: Omit<TheaterBlock, 'id'>) => {
    if (!selectedSprite) return;
    const newBlock: TheaterBlock = {
      ...block,
      id: `tb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
    };

    setSprites((prev) =>
      prev.map((s) => {
        if (s.uid !== selectedSprite.uid) return s;
        if (scriptTargetTab === 'onclick') {
          return { ...s, onClickScript: [...s.onClickScript, newBlock] };
        }
        return { ...s, script: [...s.script, newBlock] };
      })
    );
    soundManager.playPop();
  };

  const handleRemoveBlock = (blockId: string) => {
    if (!selectedSprite) return;
    setSprites((prev) =>
      prev.map((s) => {
        if (s.uid !== selectedSprite.uid) return s;
        if (scriptTargetTab === 'onclick') {
          return { ...s, onClickScript: s.onClickScript.filter((b) => b.id !== blockId) };
        }
        return { ...s, script: s.script.filter((b) => b.id !== blockId) };
      })
    );
  };

  const handleUpdateBlock = (blockId: string, updates: Partial<TheaterBlock>) => {
    if (!selectedSprite) return;
    setSprites((prev) =>
      prev.map((s) => {
        if (s.uid !== selectedSprite.uid) return s;
        const updateList = (list: TheaterBlock[]) =>
          list.map((b) => (b.id === blockId ? { ...b, ...updates } : b));
        if (scriptTargetTab === 'onclick') {
          return { ...s, onClickScript: updateList(s.onClickScript) };
        }
        return { ...s, script: updateList(s.script) };
      })
    );
  };

  const handleMoveBlock = (index: number, dir: 'up' | 'down') => {
    if (!selectedSprite) return;
    setSprites((prev) =>
      prev.map((s) => {
        if (s.uid !== selectedSprite.uid) return s;
        const list = scriptTargetTab === 'onclick' ? [...s.onClickScript] : [...s.script];
        const target = dir === 'up' ? index - 1 : index + 1;
        if (target < 0 || target >= list.length) return s;
        const temp = list[index];
        list[index] = list[target];
        list[target] = temp;
        if (scriptTargetTab === 'onclick') {
          return { ...s, onClickScript: list };
        }
        return { ...s, script: list };
      })
    );
  };

  // Add new sprite from catalog (up to 4 in sandbox, 2 in tutorial)
  const handleAddNewSprite = (spriteId: SpriteId) => {
    if (sprites.length >= 4) return;
    const cat = SPRITE_CATALOG.find((c) => c.id === spriteId);
    const newSp = createInitialSprite(
      spriteId,
      sprites.length * 50 - 60,
      -20,
      0,
      cat ? cat.name : 'Nuovo Sprite'
    );
    setSprites([...sprites, newSp]);
    setSelectedSpriteUid(newSp.uid);
    soundManager.playMagic();
  };

  const handleDeleteSelectedSprite = (uid: string) => {
    if (sprites.length <= 1) return;
    const next = sprites.filter((s) => s.uid !== uid);
    setSprites(next);
    setSelectedSpriteUid(next[0].uid);
  };

  // Execution engine: run block step
  const executeBlock = (spUid: string, block: TheaterBlock) => {
    setSprites((prev) =>
      prev.map((s) => {
        if (s.uid !== spUid) return s;
        const updated = { ...s };

        switch (block.action) {
          case 'say':
            updated.speechBubble = block.text || 'Ciao!';
            updated.thoughtBubble = null;
            break;
          case 'think':
            updated.thoughtBubble = block.text || 'Mmmh...';
            updated.speechBubble = null;
            break;
          case 'move_forward': {
            const steps = block.steps || 30;
            // 0 deg is UP (y increases), 90 deg is RIGHT (x increases), 180 deg is DOWN (y decreases), 270 deg is LEFT
            const rad = ((updated.rotation - 90) * Math.PI) / 180;
            // standard trigonometry where 0 is up:
            const radUp = (updated.rotation * Math.PI) / 180;
            const dx = Math.sin(radUp) * steps;
            const dy = Math.cos(radUp) * steps;
            updated.x = Math.max(-170, Math.min(170, Math.round(updated.x + dx)));
            updated.y = Math.max(-110, Math.min(110, Math.round(updated.y + dy)));
            soundManager.playStep();
            break;
          }
          case 'turn_right': {
            const ang = block.angle || 90;
            updated.rotation = (updated.rotation + ang) % 360;
            soundManager.playTurn();
            break;
          }
          case 'turn_left': {
            const ang = block.angle || 90;
            updated.rotation = (updated.rotation - ang + 360) % 360;
            soundManager.playTurn();
            break;
          }
          case 'point_direction': {
            updated.rotation = (block.targetDirection ?? 0) % 360;
            soundManager.playTurn();
            break;
          }
          case 'bounce':
            updated.isBouncing = true;
            soundManager.playPop();
            setTimeout(() => {
              setSprites((curr) =>
                curr.map((item) => (item.uid === spUid ? { ...item, isBouncing: false } : item))
              );
            }, 600);
            break;
          case 'change_emotion':
            updated.emotion = block.emotion || 'felice';
            break;
          case 'play_sound':
            playSpriteSound(block.soundName || 'pop');
            break;
          case 'go_to':
            updated.x = block.targetX ?? 0;
            updated.y = block.targetY ?? 0;
            break;
          case 'wait':
            // just idle
            break;
        }

        return updated;
      })
    );
  };

  // Play a sprite specific sound
  const playSpriteSound = (soundName: string) => {
    switch (soundName) {
      case 'cat':
        soundManager.playCat();
        break;
      case 'magic':
        soundManager.playMagic();
        break;
      case 'laser':
        soundManager.playLaser();
        break;
      case 'cheer':
        soundManager.playCheer();
        break;
      case 'beep':
        soundManager.playBeep();
        break;
      case 'pop':
      default:
        soundManager.playPop();
        break;
    }
  };

  // Run script playback
  const handleStartPlay = () => {
    stopPlay();
    handleResetStage();
    setIsPlaying(true);
    setExecutionStepIndex(0);
  };

  // Playback scheduler step by step
  useEffect(() => {
    if (!isPlaying) return;

    // Find the maximum script length among sprites
    const maxScriptLength = Math.max(...sprites.map((s) => s.script.length), 0);

    if (maxScriptLength === 0) {
      stopPlay();
      return;
    }

    if (executionStepIndex >= maxScriptLength) {
      stopPlay();
      // Check if tutorial requirements were satisfied!
      checkTutorialSuccess();
      return;
    }

    // Execute the current step for all sprites simultaneously
    sprites.forEach((sp) => {
      if (executionStepIndex < sp.script.length) {
        executeBlock(sp.uid, sp.script[executionStepIndex]);
      }
    });

    playTimerRef.current = window.setTimeout(() => {
      setExecutionStepIndex((prev) => prev + 1);
    }, 1400);

    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, [isPlaying, executionStepIndex, sprites]);

  // Click on stage sprite interaction (event: when sprite clicked)
  const handleSpriteStageClick = (spUid: string) => {
    const sp = sprites.find((s) => s.uid === spUid);
    if (!sp) return;

    if (sp.onClickScript.length > 0) {
      sp.onClickScript.forEach((blk) => executeBlock(spUid, blk));
    } else {
      // Default playful bounce and meow/sound
      soundManager.playPop();
      setSprites((prev) =>
        prev.map((s) =>
          s.uid === spUid
            ? {
                ...s,
                isBouncing: true,
                speechBubble: s.speechBubble ? null : `Ciao! Sono ${s.name}!`
              }
            : s
        )
      );
      setTimeout(() => {
        setSprites((curr) =>
          curr.map((item) => (item.uid === spUid ? { ...item, isBouncing: false } : item))
        );
      }, 500);
    }

    if (mode === 'tutorial' && currentTutorial.id === 6) {
      setTutorialPassed(true);
      soundManager.playSuccess();
    }
  };

  // Check tutorial objectives
  const checkTutorialSuccess = () => {
    if (mode !== 'tutorial') return;
    const tut = currentTutorial;
    const allActions = selectedSprite ? selectedSprite.script.map((b) => b.action) : [];

    let passed = tut.requiredActions.every((act) => allActions.includes(act));

    if (tut.expectedMinRotation) {
      const hasRot = selectedSprite.script.some(
        (b) => (b.action === 'turn_right' || b.action === 'turn_left') && (b.angle || 0) >= tut.expectedMinRotation!
      );
      if (!hasRot) passed = false;
    }

    if (tut.expectedMinSteps) {
      const hasSteps = selectedSprite.script.some(
        (b) => b.action === 'move_forward' && (b.steps || 0) >= tut.expectedMinSteps!
      );
      if (!hasSteps) passed = false;
    }

    if (tut.requiredCount) {
      if (selectedSprite.script.length < tut.requiredCount) passed = false;
    }

    if (passed) {
      setTutorialPassed(true);
      soundManager.playSuccess();
    }
  };

  const handleNextTutorial = () => {
    if (currentTutorialIndex < GUIDED_TUTORIALS.length - 1) {
      setCurrentTutorialIndex((prev) => prev + 1);
    } else {
      setMode('sandbox');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner Navigation & Mode Switch */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Teatro degli Sprite & Laboratorio Storie Guidato</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>Il Teatro dei Personaggi</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
              Stile Scratch & Hello World
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Scegli tra un’ampia gamma di sprite orientati verso l’alto, programmali a muoversi,
            ruotare a qualsiasi angolo, parlare e reagire al clic sul palcoscenico!
          </p>
        </div>

        {/* Mode Selector Segmented Bar */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-2xl w-fit">
          <button
            onClick={() => setMode('tutorial')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'tutorial'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-950/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Tutorial Passo-Passo ({currentTutorialIndex + 1}/6)</span>
          </button>
          <button
            onClick={() => setMode('sandbox')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'sandbox'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-950/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Palcoscenico Libero (Sandbox)</span>
          </button>
        </div>
      </div>

      {/* Guided Tutorial Step Objective Header */}
      {mode === 'tutorial' && (
        <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border-2 border-purple-500/40 rounded-2xl p-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-purple-500/30 text-purple-200">
                  PASSO {currentTutorial.id} DI 6
                </span>
                <h2 className="text-base font-bold text-white">{currentTutorial.title}</h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                {currentTutorial.description}
              </p>
              <div className="text-xs text-amber-300 font-semibold flex items-center gap-1.5 pt-0.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Obiettivo: {currentTutorial.targetGoal}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {tutorialPassed && (
                <button
                  onClick={handleNextTutorial}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 cursor-pointer animate-bounce transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>Prossimo Passo!</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Interactive Stage on Left (7 cols), Coding Palette & Script on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: The 2D Interactive Stage */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Stage Viewport */}
          <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-3xl bg-slate-950 border-2 border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between p-4 select-none">
            {/* Thematic Backdrop */}
            {renderStageBackdrop(stageBackdrop)}

            {/* Stage Top Bar: Controls & Coordinates Indicator */}
            <div className="relative z-20 flex items-center justify-between">
              {/* Backdrop Picker */}
              <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700/80 text-[11px] text-slate-300">
                <span className="font-semibold text-slate-400">Sfondo:</span>
                <select
                  value={stageBackdrop}
                  onChange={(e) => setStageBackdrop(e.target.value as any)}
                  className="bg-transparent text-white font-bold cursor-pointer focus:outline-none"
                >
                  <option value="theatre">Teatro a Tenda Rossa</option>
                  <option value="forest">Bosco Incantato</option>
                  <option value="space">Spazio Profondo</option>
                  <option value="ice">Regno dei Ghiacci</option>
                  <option value="city">Città del Futuro</option>
                  <option value="classroom">Aula Scolastica</option>
                </select>
              </div>

              {/* Coordinates & Orientation Badge for Selected Sprite */}
              {selectedSprite && (
                <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700/80 text-[11px] font-mono text-purple-300">
                  <span>X: {selectedSprite.x}</span>
                  <span>Y: {selectedSprite.y}</span>
                  <span className="flex items-center gap-1 text-amber-300">
                    <RotateCw className="w-3 h-3" />
                    <span>{selectedSprite.rotation}°</span>
                  </span>
                </div>
              )}
            </div>

            {/* The Stage Coordinates Plane (-180..+180 x, -120..+120 y) */}
            <div className="relative z-20 w-full flex-1 flex items-center justify-center overflow-hidden">
              {sprites.map((sp) => {
                const isSelected = sp.uid === selectedSprite?.uid;
                // Convert (x, y) to CSS pixel offsets
                const pixelX = sp.x * 1.5;
                const pixelY = -sp.y * 1.2; // positive Y moves up on the canvas

                return (
                  <div
                    key={sp.uid}
                    onClick={() => {
                      setSelectedSpriteUid(sp.uid);
                      handleSpriteStageClick(sp.uid);
                    }}
                    style={{
                      transform: `translate(${pixelX}px, ${pixelY}px)`
                    }}
                    className={`absolute cursor-pointer transition-transform duration-300 ease-out flex flex-col items-center group ${
                      sp.isBouncing ? 'animate-bounce' : ''
                    }`}
                  >
                    {/* Speech / Thought Comic Bubble */}
                    {sp.speechBubble && (
                      <div className="mb-2 max-w-[200px] bg-white text-slate-900 px-3 py-1.5 rounded-2xl shadow-2xl border-2 border-purple-500 font-sans text-xs font-bold leading-snug animate-in zoom-in-90 duration-150 relative">
                        {sp.speechBubble}
                        <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-purple-500" />
                        <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-white" />
                      </div>
                    )}

                    {sp.thoughtBubble && (
                      <div className="mb-2 max-w-[180px] bg-amber-50 text-slate-900 px-3 py-1.5 rounded-full shadow-2xl border-2 border-amber-400 font-sans text-xs italic font-medium leading-snug animate-in zoom-in-90 duration-150 relative">
                        💭 "{sp.thoughtBubble}"
                      </div>
                    )}

                    {/* Sprite Graphic - Oriented UP by default (0 deg) with smooth rotation */}
                    <div
                      style={{
                        transform: `rotate(${sp.rotation}deg) scale(${sp.scale})`
                      }}
                      className={`w-20 h-20 sm:w-24 sm:h-24 relative transition-transform duration-300 ${
                        isSelected ? 'drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]' : 'drop-shadow-md'
                      }`}
                    >
                      <SpriteSvg id={sp.spriteId} emotion={sp.emotion} isMoving={sp.isBouncing} />

                      {/* Direction Pointer Arrow in Edit Mode */}
                      {isSelected && (
                        <div
                          className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-500 rounded-full border border-white flex items-center justify-center text-[8px] text-white font-bold"
                          title={`Orientamento: ${sp.rotation}°`}
                        >
                          ▲
                        </div>
                      )}
                    </div>

                    {/* Sprite Name Tag */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 transition-colors ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow'
                          : 'bg-slate-900/80 text-slate-300 border border-slate-700/60'
                      }`}
                    >
                      {sp.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Stage Bottom Helper Hint */}
            <div className="relative z-20 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
              <span>💡 Clicca su uno sprite sul palco per selezionarlo o testare l'evento di clic!</span>
              <span className="font-mono text-slate-500">Orientamento default: 0° (In Alto)</span>
            </div>
          </div>

          {/* Playback & Quick Stage Control Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              {!isPlaying ? (
                <button
                  onClick={handleStartPlay}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Avvia Spettacolo (Bandiera Verde)</span>
                </button>
              ) : (
                <button
                  onClick={stopPlay}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pausa</span>
                </button>
              )}

              <button
                onClick={handleResetStage}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 cursor-pointer transition-all"
                title="Ricomincia dall’inizio (Resetta posizioni)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Rotate & Point Sliders for Selected Sprite */}
            {selectedSprite && (
              <div className="flex items-center gap-2 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 font-medium">Rotazione manuale:</span>
                <button
                  onClick={() =>
                    setSprites((prev) =>
                      prev.map((s) =>
                        s.uid === selectedSprite.uid
                          ? { ...s, rotation: (s.rotation - 45 + 360) % 360 }
                          : s
                      )
                    )
                  }
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono text-[11px] cursor-pointer"
                  title="Ruota di -45°"
                >
                  ↺ -45°
                </button>
                <button
                  onClick={() =>
                    setSprites((prev) =>
                      prev.map((s) =>
                        s.uid === selectedSprite.uid
                          ? { ...s, rotation: (s.rotation + 45) % 360 }
                          : s
                      )
                    )
                  }
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono text-[11px] cursor-pointer"
                  title="Ruota di +45°"
                >
                  ↻ +45°
                </button>
                <button
                  onClick={() =>
                    setSprites((prev) =>
                      prev.map((s) => (s.uid === selectedSprite.uid ? { ...s, rotation: 0 } : s))
                    )
                  }
                  className="px-2 py-1 bg-purple-900/60 hover:bg-purple-800 text-purple-200 rounded font-bold text-[11px] cursor-pointer"
                  title="Punta in Alto (0°)"
                >
                  ⬆ 0° (In alto)
                </button>
              </div>
            )}
          </div>

          {/* Sprites Roster Selector Carousel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Sprite sul Palcoscenico ({sprites.length}/4)</span>
              </span>

              {/* Add sprite button (opens catalog) */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Aggiungi sprite:</span>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddNewSprite(e.target.value as SpriteId);
                      e.target.value = '';
                    }
                  }}
                  className="bg-purple-900/80 hover:bg-purple-800 text-purple-200 text-xs font-bold px-2 py-1 rounded-lg border border-purple-500/40 cursor-pointer"
                >
                  <option value="">+ Scegli dal catalogo...</option>
                  {SPRITE_CATALOG.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* List of active sprites */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {sprites.map((sp) => {
                const isSelected = sp.uid === selectedSprite?.uid;
                return (
                  <div
                    key={sp.uid}
                    onClick={() => setSelectedSpriteUid(sp.uid)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-950/60 border-purple-400 ring-2 ring-purple-500/30'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center p-0.5">
                        <SpriteSvg id={sp.spriteId} />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold text-white block truncate">
                          {sp.name}
                        </span>
                        <span className="text-[10px] text-purple-300 font-mono">
                          {sp.script.length} blocchi
                        </span>
                      </div>
                    </div>

                    {sprites.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSelectedSprite(sp.uid);
                        }}
                        className="p-1 text-slate-500 hover:text-red-400 cursor-pointer"
                        title="Rimuovi sprite dal palco"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Coding Blocks Palette & Sprite Script Sequencer */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col h-[700px] shadow-2xl overflow-hidden">
          {/* Header with Sprite Name & Target Tab */}
          <div className="pb-3 mb-3 border-b border-slate-800 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span>Programma di:</span>
                  <span className="text-purple-400">{selectedSprite?.name}</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Tocca i blocchi per aggiungerli alla sequenza
                </p>
              </div>

              {/* Script Event Switcher: Green Flag vs Clicked */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
                <button
                  onClick={() => setScriptTargetTab('main')}
                  className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                    scriptTargetTab === 'main'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All'avvio ▶
                </button>
                <button
                  onClick={() => setScriptTargetTab('onclick')}
                  className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                    scriptTargetTab === 'onclick'
                      ? 'bg-amber-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Al clic 🖱
                </button>
              </div>
            </div>
          </div>

          {/* Quick Blocks Palette (Categorized: Movimento, Aspetto, Suono, Azioni) */}
          <div className="space-y-2 pb-3 mb-3 border-b border-slate-800 shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Tavolozza Blocchi Ispirata a Scratch / Code.org:
            </span>

            <div className="grid grid-cols-2 gap-1.5">
              {/* Say speech block */}
              <button
                onClick={() =>
                  handleAddBlock({
                    action: 'say',
                    text: 'Ciao a tutti!',
                    durationSec: 2
                  })
                }
                className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer text-left"
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Dire "Ciao!"</span>
              </button>

              {/* Move forward block */}
              <button
                onClick={() =>
                  handleAddBlock({
                    action: 'move_forward',
                    steps: 30
                  })
                }
                className="px-2.5 py-1.5 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer text-left"
              >
                <Move className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Avanza di 30 passi</span>
              </button>

              {/* Turn right block */}
              <button
                onClick={() =>
                  handleAddBlock({
                    action: 'turn_right',
                    angle: 90
                  })
                }
                className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer text-left"
              >
                <RotateCw className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Ruota ↻ di 90°</span>
              </button>

              {/* Turn left block */}
              <button
                onClick={() =>
                  handleAddBlock({
                    action: 'turn_left',
                    angle: 90
                  })
                }
                className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer text-left"
              >
                <RotateCw className="w-3.5 h-3.5 -scale-x-100 shrink-0" />
                <span className="truncate">Ruota ↺ di 90°</span>
              </button>

              {/* Point direction Up (0 deg) */}
              <button
                onClick={() =>
                  handleAddBlock({
                    action: 'point_direction',
                    targetDirection: 0
                  })
                }
                className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer text-left"
              >
                <Compass className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Punta in alto (0°)</span>
              </button>

              {/* Bounce / Dance jump */}
              <button
                onClick={() => handleAddBlock({ action: 'bounce' })}
                className="px-2.5 py-1.5 bg-pink-600 hover:bg-pink-500 active:bg-pink-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer text-left"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Salta / Balla</span>
              </button>

              {/* Play sound block */}
              <button
                onClick={() =>
                  handleAddBlock({
                    action: 'play_sound',
                    soundName: 'magic'
                  })
                }
                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer text-left"
              >
                <Volume2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Suona Magia</span>
              </button>

              {/* Change Emotion block */}
              <button
                onClick={() =>
                  handleAddBlock({
                    action: 'change_emotion',
                    emotion: 'felice'
                  })
                }
                className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer text-left"
              >
                <Smile className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Emozione Felice</span>
              </button>
            </div>
          </div>

          {/* Active Sprite Script Sequencer Container */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-2">
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                {scriptTargetTab === 'main'
                  ? 'Sequenza principale (Quando si clicca Avvia)'
                  : 'Sequenza reattiva (Quando si clicca sullo sprite)'}
              </span>
              <span className="text-[10px] font-mono text-purple-300">
                {scriptTargetTab === 'main'
                  ? selectedSprite?.script.length || 0
                  : selectedSprite?.onClickScript.length || 0}{' '}
                blocchi
              </span>
            </div>

            {((scriptTargetTab === 'main' ? selectedSprite?.script : selectedSprite?.onClickScript) || []).length === 0 ? (
              <div className="h-40 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center p-4 text-slate-500">
                <Plus className="w-6 h-6 text-slate-600 mb-1" />
                <span className="text-xs font-medium text-slate-400">
                  Nessun blocco inserito per questo sprite
                </span>
                <span className="text-[10px] text-slate-600 mt-0.5">
                  Tocca i blocchi colorati in alto per iniziare il programma!
                </span>
              </div>
            ) : (
              ((scriptTargetTab === 'main' ? selectedSprite?.script : selectedSprite?.onClickScript) || []).map(
                (block, index) => {
                  const isCurrent = isPlaying && executionStepIndex === index;

                  return (
                    <div
                      key={block.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                        isCurrent
                          ? 'bg-purple-950/80 border-purple-400 ring-2 ring-purple-500/50 shadow-md'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1 overflow-hidden">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          #{index + 1}
                        </span>

                        {/* Block Action Controls */}
                        {block.action === 'say' && (
                          <div className="flex items-center gap-1.5 flex-1">
                            <span className="text-xs font-bold text-purple-400 shrink-0">Dire:</span>
                            <input
                              type="text"
                              value={block.text || ''}
                              onChange={(e) => handleUpdateBlock(block.id, { text: e.target.value })}
                              className="bg-slate-900 border border-slate-700 text-white rounded px-2 py-0.5 text-xs flex-1 focus:outline-none focus:border-purple-400"
                            />
                          </div>
                        )}

                        {block.action === 'move_forward' && (
                          <div className="flex items-center gap-1.5 flex-1">
                            <span className="text-xs font-bold text-sky-400 shrink-0">Avanza di:</span>
                            <select
                              value={block.steps || 30}
                              onChange={(e) =>
                                handleUpdateBlock(block.id, { steps: Number(e.target.value) })
                              }
                              className="bg-slate-900 border border-slate-700 text-white rounded px-2 py-0.5 text-xs font-mono"
                            >
                              <option value="15">15 passi</option>
                              <option value="30">30 passi</option>
                              <option value="45">45 passi</option>
                              <option value="60">60 passi</option>
                            </select>
                          </div>
                        )}

                        {(block.action === 'turn_right' || block.action === 'turn_left') && (
                          <div className="flex items-center gap-1.5 flex-1">
                            <span className="text-xs font-bold text-indigo-400 shrink-0">
                              {block.action === 'turn_right' ? 'Ruota ↻ di:' : 'Ruota ↺ di:'}
                            </span>
                            <select
                              value={block.angle || 90}
                              onChange={(e) =>
                                handleUpdateBlock(block.id, { angle: Number(e.target.value) })
                              }
                              className="bg-slate-900 border border-slate-700 text-white rounded px-2 py-0.5 text-xs font-mono"
                            >
                              <option value="15">15°</option>
                              <option value="30">30°</option>
                              <option value="45">45°</option>
                              <option value="60">60°</option>
                              <option value="90">90° (Angolo Retto)</option>
                              <option value="120">120°</option>
                              <option value="180">180° (Mezzo Giro)</option>
                            </select>
                          </div>
                        )}

                        {block.action === 'point_direction' && (
                          <div className="flex items-center gap-1.5 flex-1">
                            <span className="text-xs font-bold text-blue-400 shrink-0">Punta verso:</span>
                            <select
                              value={block.targetDirection ?? 0}
                              onChange={(e) =>
                                handleUpdateBlock(block.id, {
                                  targetDirection: Number(e.target.value)
                                })
                              }
                              className="bg-slate-900 border border-slate-700 text-white rounded px-2 py-0.5 text-xs font-mono"
                            >
                              <option value="0">0° (In Alto / Nord)</option>
                              <option value="90">90° (A Destra / Est)</option>
                              <option value="180">180° (In Basso / Sud)</option>
                              <option value="270">270° (A Sinistra / Ovest)</option>
                            </select>
                          </div>
                        )}

                        {block.action === 'bounce' && (
                          <span className="text-xs font-bold text-pink-400">
                            Salta & Festeggia con animazione
                          </span>
                        )}

                        {block.action === 'play_sound' && (
                          <div className="flex items-center gap-1.5 flex-1">
                            <span className="text-xs font-bold text-emerald-400 shrink-0">Suona:</span>
                            <select
                              value={block.soundName || 'magic'}
                              onChange={(e) =>
                                handleUpdateBlock(block.id, { soundName: e.target.value as any })
                              }
                              className="bg-slate-900 border border-slate-700 text-white rounded px-2 py-0.5 text-xs font-mono capitalize"
                            >
                              <option value="magic">Magia Stellare</option>
                              <option value="cat">Miao del Gatto</option>
                              <option value="pop">Pop Festoso</option>
                              <option value="beep">Beep Robotico</option>
                              <option value="cheer">Applauso & Urrà</option>
                              <option value="laser">Laser Spaziale</option>
                            </select>
                          </div>
                        )}

                        {block.action === 'change_emotion' && (
                          <div className="flex items-center gap-1.5 flex-1">
                            <span className="text-xs font-bold text-amber-400 shrink-0">Emozione:</span>
                            <select
                              value={block.emotion || 'felice'}
                              onChange={(e) =>
                                handleUpdateBlock(block.id, { emotion: e.target.value as any })
                              }
                              className="bg-slate-900 border border-slate-700 text-white rounded px-2 py-0.5 text-xs font-mono capitalize"
                            >
                              <option value="felice">Felice</option>
                              <option value="curioso">Curioso</option>
                              <option value="sorpreso">Sorpreso</option>
                              <option value="determinato">Determinato</option>
                              <option value="buffo">Buffo</option>
                            </select>
                          </div>
                        )}
                      </div>

                      {/* Block Controls (Move up, Move down, Delete) */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleMoveBlock(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveBlock(index, 'down')}
                          disabled={
                            index ===
                            ((scriptTargetTab === 'main'
                              ? selectedSprite?.script
                              : selectedSprite?.onClickScript) || []).length -
                              1
                          }
                          className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveBlock(block.id)}
                          className="p-1 text-slate-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                }
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to create initial active sprite
function createInitialSprite(
  spriteId: SpriteId,
  x = 0,
  y = 0,
  rotation = 0,
  customName?: string
): ActiveSprite {
  const cat = SPRITE_CATALOG.find((c) => c.id === spriteId);
  return {
    uid: `asp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    spriteId,
    name: customName || cat?.name || 'Sprite',
    x,
    y,
    rotation, // 0 deg is UP (North)
    scale: cat?.defaultScale || 1,
    emotion: 'felice',
    speechBubble: null,
    thoughtBubble: null,
    isBouncing: false,
    script: [],
    onClickScript: []
  };
}

// Visual Backdrops for the stage
function renderStageBackdrop(backdrop: 'theatre' | 'forest' | 'space' | 'ice' | 'city' | 'classroom') {
  switch (backdrop) {
    case 'theatre':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Classic Red Theater Curtains */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-950 via-slate-950 to-slate-950 opacity-90" />
          {/* Side drape curtains */}
          <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-red-900 to-transparent opacity-80" />
          <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-red-900 to-transparent opacity-80" />
          {/* Wooden Stage Floor at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-950/80 via-amber-900/40 to-transparent border-t border-amber-600/30" />
          {/* Spotlight Shine */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
        </div>
      );

    case 'forest':
      return (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-950 opacity-90">
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-emerald-900/40 border-t border-emerald-500/20" />
        </div>
      );

    case 'space':
      return (
        <div className="absolute inset-0 pointer-events-none bg-radial from-purple-950/60 via-slate-950 to-black opacity-95">
          {/* Twinkling star dots */}
          <div className="absolute top-8 left-12 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
          <div className="absolute top-20 right-24 w-2 h-2 bg-purple-300 rounded-full opacity-90 blur-xs" />
          <div className="absolute bottom-16 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-80" />
          <div className="absolute top-1/3 right-12 w-1 h-1 bg-white rounded-full opacity-70" />
        </div>
      );

    case 'ice':
      return (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-sky-950 via-slate-900 to-slate-950 opacity-90">
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-sky-900/30 border-t border-sky-400/20" />
        </div>
      );

    case 'city':
      return (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-950 opacity-90">
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-slate-900 border-t border-indigo-500/30" />
        </div>
      );

    case 'classroom':
    default:
      return (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 opacity-90">
          {/* Subtle grid coordinates texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415515_1px,transparent_1px),linear-gradient(to_bottom,#33415515_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      );
  }
}
