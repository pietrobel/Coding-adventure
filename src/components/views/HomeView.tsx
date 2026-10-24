import React from 'react';
import {
  Compass,
  Snowflake,
  Bot,
  Star,
  Play,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ADVENTURES } from '../../data/adventures';
import { AdventureId, GameProgress } from '../../types';

interface HomeViewProps {
  progress: GameProgress;
  onSelectAdventure: (id: AdventureId) => void;
  onResumeLastPlayed: () => void;
  onNavigateTheater: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  onSelectAdventure,
  onResumeLastPlayed,
  onNavigateTheater
}) => {
  // Aggregate stats across 5 adventures (50 levels total)
  const totalLevels = 50;
  const completedCount = Object.values(progress.completedLevels).filter(
    (l) => l.completed
  ).length;
  const totalStars = Object.values(progress.completedLevels).reduce(
    (acc, curr) => acc + (curr.stars || 0),
    0
  );
  const completionPercent = Math.round((completedCount / totalLevels) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Coding per la Scuola Secondaria di Primo Grado</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Coding Adventures
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">
              Tre mondi da programmare
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Impara a programmare giocando! Risolvi 50 sfide educative attraverso cinque
            mondi originali (dalla scuola primaria al livello esperto) e anima i personaggi
            nel nuovo Teatro dei Dialoghi!
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onSelectAdventure('forest')}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm rounded-xl flex items-center gap-2.5 shadow-lg shadow-emerald-950/40 cursor-pointer transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Inizia: Bosco di Piko</span>
            </button>

            <button
              onClick={onNavigateTheater}
              className="px-5 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-purple-950/40 cursor-pointer transition-all"
            >
              <span>🎭 Teatro dei Dialoghi</span>
            </button>

            {progress.lastPlayed && (
              <button
                onClick={onResumeLastPlayed}
                className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl flex items-center gap-2 border border-slate-700 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>Riprendi ultima</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Progress Bar Barometer */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 font-bold">
              {completionPercent}%
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Progresso Globale</span>
              <span className="text-sm font-bold text-white">
                {completedCount} di {totalLevels} livelli completati
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Stelle Guadagnate</span>
              <span className="text-sm font-bold text-white">
                {totalStars} su 90 stelle totali
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Stato di Salvataggio</span>
              <span className="text-sm font-bold text-white">
                Salvataggio locale automatico
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Adventures Showcase Cards */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Scegli la tua avventura
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Ogni mondo sviluppa specifiche abilità computazionali, con 10 livelli a difficoltà progressiva.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ADVENTURES.map((adv) => {
            const completedInAdv = adv.levels.filter(
              (l) => progress.completedLevels[`${adv.id}_${l.id}`]?.completed
            ).length;
            const starsInAdv = adv.levels.reduce(
              (acc, l) =>
                acc + (progress.completedLevels[`${adv.id}_${l.id}`]?.stars || 0),
              0
            );

            return (
              <div
                key={adv.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group"
              >
                <div className="space-y-4">
                  {/* Thematic Illustration Header */}
                  <div
                    className={`w-full h-40 rounded-2xl bg-gradient-to-br ${adv.themeColor} p-4 flex items-center justify-center relative overflow-hidden shadow-inner`}
                  >
                    {renderAdventureIllustration(adv.id)}
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg text-white text-[11px] font-bold tracking-wide">
                      {adv.characterName}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors">
                      {adv.title}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-300/90 mt-0.5">
                      {adv.tagline}
                    </p>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {adv.description}
                    </p>
                  </div>

                  {/* Skills Trained */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Abilità allenate:
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {adv.skillsLearned.slice(0, 3).map((skill, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Progress & Button */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    <span className="font-bold text-white block">
                      {completedInAdv} / {adv.totalLevels} completati
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 text-[11px] mt-0.5">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{starsInAdv} / 30 stelle</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectAdventure(adv.id)}
                    className="py-2.5 px-5 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
                  >
                    <span>Gioca</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Didactic Rules & Pedagogical Guidelines */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Guida Didattica & Regole di Gioco
            </h3>
            <p className="text-xs text-slate-400">
              Pensato per docenti e studenti della scuola secondaria di primo grado
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 pt-2">
          <div className="space-y-1.5">
            <span className="font-bold text-white block text-sm">
              1. Sequenza e Rotazione
            </span>
            <p className="leading-relaxed text-slate-400">
              Il computer esegue le istruzioni dall'alto verso il basso. Ricorda che girare a destra o a sinistra cambia solo l'orientamento di 90°, senza spostare il personaggio!
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-bold text-white block text-sm">
              2. Cicli RIPETI e Ottimizzazione
            </span>
            <p className="leading-relaxed text-slate-400">
              Quando una serie di azioni si ripete identica, racchiudila nel blocco RIPETI. Guadagni la seconda stella se risolvi il livello usando il numero ideale di blocchi.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-bold text-white block text-sm">
              3. Suggerimenti a 3 Livelli
            </span>
            <p className="leading-relaxed text-slate-400">
              Se ti trovi in difficoltà, usa il tasto Suggerimento: il primo indizio ti farà riflettere, il secondo fornirà un aiuto pratico e il terzo ti darà la direzione esatta.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

function renderAdventureIllustration(id: AdventureId) {
  if (id === 'forest') {
    return (
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-emerald-400/20 flex items-center justify-center text-3xl">
          🦊
        </div>
        <div className="text-left text-white drop-shadow">
          <span className="block text-base font-black">Bosco di Piko</span>
          <span className="block text-xs opacity-90">Scuola Primaria · Primi passi</span>
        </div>
      </div>
    );
  }
  if (id === 'archipelago') {
    return (
      <div className="flex items-center gap-3">
        <Compass className="w-16 h-16 text-cyan-200 stroke-[1.5]" />
        <div className="text-left text-white drop-shadow">
          <span className="block text-base font-black">Arcipelago Magico</span>
          <span className="block text-xs opacity-90">Leo & Robot Bubble-9</span>
        </div>
      </div>
    );
  }
  if (id === 'ice') {
    return (
      <div className="flex items-center gap-3">
        <Snowflake className="w-16 h-16 text-blue-200 stroke-[1.5]" />
        <div className="text-left text-white drop-shadow">
          <span className="block text-base font-black">Regno dei Ghiacci</span>
          <span className="block text-xs opacity-90">Aria & Brina · Geometria</span>
        </div>
      </div>
    );
  }
  if (id === 'city') {
    return (
      <div className="flex items-center gap-3">
        <Bot className="w-16 h-16 text-emerald-200 stroke-[1.5]" />
        <div className="text-left text-white drop-shadow">
          <span className="block text-base font-black">Città del Futuro</span>
          <span className="block text-xs opacity-90">Volt · Condizioni & Consegne</span>
        </div>
      </div>
    );
  }
  // Space
  return (
    <div className="flex items-center gap-3">
      <div className="w-16 h-16 rounded-2xl bg-purple-400/20 flex items-center justify-center text-3xl">
        🚀
      </div>
      <div className="text-left text-white drop-shadow">
        <span className="block text-base font-black">Stazione Spaziale</span>
        <span className="block text-xs opacity-90">Nova · Tutti Livelli Esperto</span>
      </div>
    </div>
  );
}
