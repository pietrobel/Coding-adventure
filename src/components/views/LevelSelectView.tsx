import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  Lock,
  Play,
  Award,
  GraduationCap
} from 'lucide-react';
import { getAdventure } from '../../data/adventures';
import { AdventureId, GameProgress } from '../../types';

interface LevelSelectViewProps {
  adventureId: AdventureId;
  progress: GameProgress;
  onSelectLevel: (levelId: number) => void;
  onBackToHome: () => void;
}

export const LevelSelectView: React.FC<LevelSelectViewProps> = ({
  adventureId,
  progress,
  onSelectLevel,
  onBackToHome
}) => {
  const adventure = getAdventure(adventureId);
  const [teacherMode, setTeacherMode] = useState(false);

  if (!adventure) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Breadcrumb & Adventure Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna alla schermata principale</span>
        </button>

        {/* Teacher Mode Toggle */}
        <button
          onClick={() => setTeacherMode(!teacherMode)}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors w-fit ${
            teacherMode
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
          title="Consente al docente di aprire qualsiasi livello durante la lezione"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Modalità Docente: {teacherMode ? 'Tutti i Livelli Sbloccati' : 'Progressione Normale'}</span>
        </button>
      </div>

      {/* Adventure Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-r ${adventure.themeColor} border border-white/10 shadow-2xl relative overflow-hidden`}
      >
        <div className="relative z-10 max-w-2xl text-white space-y-2">
          <div className="inline-block px-3 py-1 bg-black/30 backdrop-blur-md rounded-lg text-xs font-bold tracking-wide">
            {adventure.characterName}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {adventure.title}
          </h1>
          <p className="text-sm opacity-90 leading-relaxed">
            {adventure.description}
          </p>
        </div>
      </div>

      {/* Level Grid (1 to 10) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white tracking-tight">
            Seleziona un Livello (1 - 10)
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Tutti i livelli sono sbloccati: puoi giocare e riprendere da qualsiasi livello!</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {adventure.levels.map((level) => {
            const key = `${adventureId}_${level.id}`;
            const levelProgress = progress.completedLevels[key];
            const isCompleted = !!levelProgress?.completed;
            const stars = levelProgress?.stars || 0;

            // All levels are unlocked so students/teachers can play or resume any level freely
            const isUnlocked = true;

            return (
              <div
                key={level.id}
                className={`rounded-2xl border p-4 flex flex-col justify-between transition-all ${
                  isUnlocked
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-md group'
                    : 'bg-slate-950/60 border-slate-900 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      #{level.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        level.difficulty === 'Principiante'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : level.difficulty === 'Intermedio'
                          ? 'bg-sky-500/10 text-sky-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {level.difficulty}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {level.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {level.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  {/* Stars earned */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= stars
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Play / Lock Button */}
                  {isUnlocked ? (
                    <button
                      onClick={() => onSelectLevel(level.id)}
                      className={`p-2 rounded-xl text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                        isCompleted
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sm'
                      }`}
                      title="Gioca livello"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isCompleted ? 'Rigioca' : 'Gioca'}</span>
                    </button>
                  ) : (
                    <div className="p-2 text-slate-600">
                      <Lock className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
