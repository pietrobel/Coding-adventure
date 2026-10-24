import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  Volume2
} from 'lucide-react';
import { CharacterAction, CharacterEmotion, CharacterId, DialogueLine, StoryScenario } from '../../types';
import { CharacterVisual } from '../stages/CharacterVisuals';
import { soundManager } from '../../utils/audio';

export const SCENARIOS: StoryScenario[] = [
  {
    id: 'scen_leo_volt',
    title: 'L’Incontro tra Leo e Volt',
    subtitle: 'Tecnologia antica e futuro',
    description: 'Leo l’esploratore approda con la sua barca nella metropoli del futuro e fa amicizia con Volt, il robot corriere!',
    actors: ['leo', 'volt'],
    background: 'city',
    initialLines: [
      {
        id: 'l1',
        speakerId: 'leo',
        text: 'Ciao! Mi chiamo Leo e vengo dall’Arcipelago delle Acque Magiche. Chi sei tu?',
        emotion: 'curioso',
        action: 'saluta'
      },
      {
        id: 'l2',
        speakerId: 'volt',
        text: '*Bip bip!* Salve Leo! Io sono Volt, il robot corriere di questa metropoli cibernetica!',
        emotion: 'felice',
        action: 'salta'
      },
      {
        id: 'l3',
        speakerId: 'leo',
        text: 'Fantastico! Guarda questo Cristallo di Luce che ho raccolto sulle isole. Ha tantissima energia!',
        emotion: 'sorpreso',
        action: 'parla'
      },
      {
        id: 'l4',
        speakerId: 'volt',
        text: 'Analisi sensori: energia quantica compatibile con le mie batterie! Possiamo collaborare per salvare la città!',
        emotion: 'determinato',
        action: 'luce'
      },
      {
        id: 'l5',
        speakerId: 'leo',
        text: 'Perfetto! Uniamo il pensiero computazionale e iniziamo la nostra missione insieme!',
        emotion: 'felice',
        action: 'saluta'
      }
    ]
  },
  {
    id: 'scen_aria_piko',
    title: 'Aria e la Volpina Piko',
    subtitle: 'Geometria nel bosco innevato',
    description: 'La maga del ghiaccio Aria insegna alla tenera volpina Piko come tracciare figure geometriche perfette sulla neve.',
    actors: ['piko', 'aria'],
    background: 'ice',
    initialLines: [
      {
        id: 'ap1',
        speakerId: 'piko',
        text: 'Brrr! Fa freddo qui nel Regno dei Ghiacci! Ma queste scie luminose sulla neve sono bellissime!',
        emotion: 'curioso',
        action: 'salta'
      },
      {
        id: 'ap2',
        speakerId: 'aria',
        text: 'Benvenuto piccolo Piko! Sono linee magiche: ogni volta che cammino e svolto di 90 gradi creo un angolo retto.',
        emotion: 'felice',
        action: 'parla'
      },
      {
        id: 'ap3',
        speakerId: 'piko',
        text: 'Un angolo retto? Significa che se faccio 4 passi uguali e giro 4 volte posso fare un quadrato?',
        emotion: 'sorpreso',
        action: 'parla'
      },
      {
        id: 'ap4',
        speakerId: 'aria',
        text: 'Esattamente! La formula segreta è un ciclo: RIPETI 4 VOLTE [ Avanza, Gira a destra ]!',
        emotion: 'determinato',
        action: 'luce'
      },
      {
        id: 'ap5',
        speakerId: 'piko',
        text: 'Evviva la geometria! Ora provo subito a disegnare la mia prima stella di ghiaccio!',
        emotion: 'felice',
        action: 'salta'
      }
    ]
  },
  {
    id: 'scen_nova_bubble',
    title: 'Allarme alla Stazione Orbitale',
    subtitle: 'Missione nello spazio profondo',
    description: 'Nova l’astronauta e il mini-drone Bubble-9 devono riparare il portale quantico della stazione spaziale!',
    actors: ['nova', 'bubble'],
    background: 'space',
    initialLines: [
      {
        id: 'nb1',
        speakerId: 'nova',
        text: 'Centrale Nexus qui Nova. Rilevata anomalia al reattore n. 4. Bubble, puoi verificare i sensori?',
        emotion: 'determinato',
        action: 'parla'
      },
      {
        id: 'nb2',
        speakerId: 'bubble',
        text: '*Whirrr-bip!* Scansione termica avviata: la via principale è bloccata da barriere laser!',
        emotion: 'pensieroso',
        action: 'luce'
      },
      {
        id: 'nb3',
        speakerId: 'nova',
        text: 'Dovremo usare un algoritmo condizionale: SE il percorso è libero avanza, ALTRIMENTI svolta nel condotto!',
        emotion: 'determinato',
        action: 'parla'
      },
      {
        id: 'nb4',
        speakerId: 'bubble',
        text: '*Bip bip urrà!* Rotta alternativa calcolata con successo. I nuclei quantistici sono al sicuro!',
        emotion: 'felice',
        action: 'salta'
      }
    ]
  }
];

export const TheaterView: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<StoryScenario>(SCENARIOS[0]);
  const [dialogue, setDialogue] = useState<DialogueLine[]>(SCENARIOS[0].initialLines);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [typewriterText, setTypewriterText] = useState<string>('');
  const playTimerRef = useRef<number | null>(null);

  // When changing scenario, reset dialogue
  const handleSelectScenario = (scen: StoryScenario) => {
    stopPlay();
    setSelectedScenario(scen);
    setDialogue(scen.initialLines);
    setCurrentLineIndex(-1);
    setTypewriterText('');
  };

  const stopPlay = () => {
    if (playTimerRef.current) {
      clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }
    setIsPlaying(false);
  };

  // Typewriter effect on current line change
  useEffect(() => {
    if (currentLineIndex >= 0 && currentLineIndex < dialogue.length) {
      const line = dialogue[currentLineIndex];
      soundManager.playStep();
      setTypewriterText(line.text);
    } else {
      setTypewriterText('');
    }
  }, [currentLineIndex, dialogue]);

  // Playback scheduler
  const advanceLine = () => {
    setCurrentLineIndex((prev) => {
      const nextIdx = prev + 1;
      if (nextIdx >= dialogue.length) {
        stopPlay();
        soundManager.playSuccess();
        return prev;
      }
      return nextIdx;
    });
  };

  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = window.setTimeout(() => {
        advanceLine();
      }, 3500);
    }
    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, [isPlaying, currentLineIndex, dialogue.length]);

  const handleStartPlay = () => {
    if (dialogue.length === 0) return;
    if (currentLineIndex >= dialogue.length - 1) {
      setCurrentLineIndex(0);
    } else if (currentLineIndex === -1) {
      setCurrentLineIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    stopPlay();
  };

  const handleReset = () => {
    stopPlay();
    setCurrentLineIndex(-1);
    setTypewriterText('');
  };

  const handleStepForward = () => {
    stopPlay();
    if (currentLineIndex < dialogue.length - 1) {
      setCurrentLineIndex((prev) => prev + 1);
    }
  };

  // Dialogue Line Editing
  const handleAddLine = () => {
    const actor = selectedScenario.actors[dialogue.length % selectedScenario.actors.length];
    const newLine: DialogueLine = {
      id: `line_${Date.now()}`,
      speakerId: actor,
      text: 'Inserisci qui la battuta del personaggio...',
      emotion: 'felice',
      action: 'parla'
    };
    setDialogue([...dialogue, newLine]);
  };

  const handleUpdateLine = (id: string, updates: Partial<DialogueLine>) => {
    setDialogue(dialogue.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const handleDeleteLine = (id: string) => {
    setDialogue(dialogue.filter((l) => l.id !== id));
  };

  const handleMoveLine = (index: number, dir: 'up' | 'down') => {
    const next = [...dialogue];
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= next.length) return;
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;
    setDialogue(next);
  };

  const currentSpeaker = currentLineIndex >= 0 ? dialogue[currentLineIndex]?.speakerId : null;
  const currentAction = currentLineIndex >= 0 ? dialogue[currentLineIndex]?.action : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Laboratorio di Dialoghi & Interazioni Guidate</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Il Teatro dei Personaggi
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Fai dialogare e interagire i protagonisti delle tre avventure! Programma la sequenza
            delle battute, scegli le espressioni e le azioni per creare storie animate.
          </p>
        </div>

        {/* Guided Scenarios Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((scen) => (
            <button
              key={scen.id}
              onClick={() => handleSelectScenario(scen)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all border ${
                selectedScenario.id === scen.id
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-950/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {scen.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Zone Stage & Story Script Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: The Animated Interactive Theater Stage */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative w-full aspect-video rounded-3xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Thematic Background Backdrop */}
            {renderTheaterBackdrop(selectedScenario.background)}

            {/* Top Speech Bubble Display */}
            <div className="relative z-20 min-h-[90px] flex items-center justify-center">
              {currentLineIndex >= 0 && dialogue[currentLineIndex] ? (
                <div className="w-full max-w-xl bg-slate-900/95 backdrop-blur-md border-2 border-purple-400/80 rounded-2xl p-4 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-300">
                      {getCharacterName(dialogue[currentLineIndex].speakerId)}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 capitalize">
                      {dialogue[currentLineIndex].emotion}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white leading-relaxed">
                    "{typewriterText}"
                  </p>
                </div>
              ) : (
                <div className="text-center text-slate-400 text-xs italic bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
                  Premi "Avvia Spettacolo" o "Passo successivo" per iniziare il dialogo animato
                </div>
              )}
            </div>

            {/* Bottom Character Actors Stage */}
            <div className="relative z-20 flex items-end justify-around px-8 h-48">
              {selectedScenario.actors.map((actorId, idx) => {
                const isSpeaking = currentSpeaker === actorId;
                const isActorLeft = idx === 0;

                return (
                  <div
                    key={actorId}
                    className={`flex flex-col items-center transition-all duration-300 ${
                      isSpeaking ? 'scale-110 drop-shadow-[0_0_15px_rgba(168,85,247,0.7)]' : 'opacity-80'
                    }`}
                  >
                    {/* Character Emote Badge */}
                    {isSpeaking && (
                      <div className="mb-2 px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-[11px] font-bold animate-bounce shadow">
                        Parla!
                      </div>
                    )}

                    {/* Character SVG Sprite */}
                    <div
                      className={`w-28 h-28 ${
                        isSpeaking && currentAction === 'salta' ? 'animate-bounce' : ''
                      } ${isSpeaking && currentAction === 'ruota' ? 'animate-spin' : ''}`}
                    >
                      <CharacterVisual
                        characterId={actorId}
                        direction={isActorLeft ? 'E' : 'W'}
                        isMoving={isSpeaking}
                        scale={1.2}
                      />
                    </div>

                    <span className="text-xs font-bold text-slate-200 mt-2 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-700/60 shadow">
                      {getCharacterName(actorId)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Theater Playback Toolbar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2.5">
              {!isPlaying ? (
                <button
                  onClick={handleStartPlay}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Avvia Spettacolo</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pausa</span>
                </button>
              )}

              <button
                onClick={handleStepForward}
                disabled={isPlaying || currentLineIndex >= dialogue.length - 1}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700 cursor-pointer disabled:opacity-30 transition-all"
              >
                <span>Passo successivo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleReset}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 cursor-pointer transition-all"
                title="Ricomincia dall'inizio"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span>
                Battuta {currentLineIndex >= 0 ? currentLineIndex + 1 : 0} di {dialogue.length}
              </span>
            </div>
          </div>
        </div>

        {/* Right: The Dialogue Script Builder / Sequencer */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col h-[580px] shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Copione del Dialogo
              </h3>
              <p className="text-xs text-slate-400">
                Sequenza temporale delle battute
              </p>
            </div>
            <button
              onClick={handleAddLine}
              className="py-1.5 px-3 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Aggiungi battuta</span>
            </button>
          </div>

          {/* Dialogue Lines List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {dialogue.map((line, index) => {
              const isCurrent = currentLineIndex === index;

              return (
                <div
                  key={line.id}
                  className={`p-3 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-purple-950/40 border-purple-400 ring-2 ring-purple-500/30'
                      : 'bg-slate-950/70 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        #{index + 1}
                      </span>
                      {/* Speaker Selector */}
                      <select
                        value={line.speakerId}
                        onChange={(e) =>
                          handleUpdateLine(line.id, { speakerId: e.target.value as CharacterId })
                        }
                        className="bg-purple-900/80 hover:bg-purple-800 text-purple-100 font-bold text-xs rounded-lg px-2 py-1 border border-purple-500/40 cursor-pointer"
                      >
                        {selectedScenario.actors.map((act) => (
                          <option key={act} value={act}>
                            {getCharacterName(act)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Emotion & Action Pickers */}
                    <div className="flex items-center gap-1.5">
                      <select
                        value={line.emotion}
                        onChange={(e) =>
                          handleUpdateLine(line.id, { emotion: e.target.value as CharacterEmotion })
                        }
                        className="bg-slate-800 text-slate-200 text-[11px] rounded px-1.5 py-0.5 border border-slate-700 cursor-pointer capitalize"
                        title="Emozione"
                      >
                        <option value="felice">Felice</option>
                        <option value="curioso">Curioso</option>
                        <option value="sorpreso">Sorpreso</option>
                        <option value="determinato">Determinato</option>
                        <option value="pensieroso">Pensieroso</option>
                      </select>

                      <select
                        value={line.action}
                        onChange={(e) =>
                          handleUpdateLine(line.id, { action: e.target.value as CharacterAction })
                        }
                        className="bg-slate-800 text-slate-200 text-[11px] rounded px-1.5 py-0.5 border border-slate-700 cursor-pointer capitalize"
                        title="Azione animata"
                      >
                        <option value="parla">Parla</option>
                        <option value="saluta">Saluta</option>
                        <option value="salta">Salta</option>
                        <option value="luce">Emetti luce</option>
                        <option value="ruota">Gira su se stesso</option>
                      </select>

                      {/* Line controls */}
                      <button
                        onClick={() => handleMoveLine(index, 'up')}
                        disabled={index === 0}
                        className="p-1 hover:bg-slate-800 rounded disabled:opacity-20 cursor-pointer text-slate-400"
                        title="Sposta su"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveLine(index, 'down')}
                        disabled={index === dialogue.length - 1}
                        className="p-1 hover:bg-slate-800 rounded disabled:opacity-20 cursor-pointer text-slate-400"
                        title="Sposta giù"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteLine(line.id)}
                        className="p-1 hover:bg-red-950 rounded text-red-400 hover:text-red-300 cursor-pointer"
                        title="Elimina battuta"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Textarea for the dialogue speech */}
                  <textarea
                    rows={2}
                    value={line.text}
                    onChange={(e) => handleUpdateLine(line.id, { text: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2 text-xs text-slate-100 focus:outline-none focus:border-purple-400 resize-none font-sans"
                    placeholder="Scrivi qui cosa dice il personaggio..."
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

function getCharacterName(id: CharacterId): string {
  switch (id) {
    case 'piko':
      return 'Piko la Volpina';
    case 'leo':
      return 'Leo l’Esploratore';
    case 'bubble':
      return 'Drone Bubble-9';
    case 'aria':
      return 'Aria dei Ghiacci';
    case 'volt':
      return 'Volt il Robot';
    case 'nova':
      return 'Nova l’Astronauta';
    default:
      return id;
  }
}

function renderTheaterBackdrop(background: StoryScenario['background']) {
  if (background === 'forest') {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-950 pointer-events-none opacity-80" />
    );
  }
  if (background === 'ice') {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 pointer-events-none opacity-80" />
    );
  }
  if (background === 'space') {
    return (
      <div className="absolute inset-0 bg-radial from-purple-950/60 via-slate-950 to-black pointer-events-none opacity-90" />
    );
  }
  // City
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-950 pointer-events-none opacity-80" />
  );
}
