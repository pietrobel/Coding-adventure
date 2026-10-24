import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { HomeView } from './components/views/HomeView';
import { LevelSelectView } from './components/views/LevelSelectView';
import { GameView } from './components/views/GameView';
import { TheaterView } from './components/views/TheaterView';
import { ResetConfirmModal } from './components/modals/ResetConfirmModal';
import { getAdventure, getLevel } from './data/adventures';
import { AdventureId, GameProgress } from './types';
import { soundManager } from './utils/audio';
import { initialProgress, storageManager } from './utils/storage';

export default function App() {
  const [progress, setProgress] = useState<GameProgress>(initialProgress);
  const [currentView, setCurrentView] = useState<'home' | 'levels' | 'game' | 'theater'>('home');
  const [currentAdventureId, setCurrentAdventureId] = useState<AdventureId>('archipelago');
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [showResetModal, setShowResetModal] = useState(false);

  // Initialize progress from localStorage on client load
  useEffect(() => {
    const saved = storageManager.loadProgress();
    setProgress(saved);
    soundManager.setEnabled(saved.soundEnabled);
  }, []);

  const handleToggleSound = () => {
    const nextState = !progress.soundEnabled;
    soundManager.setEnabled(nextState);
    const updated = storageManager.setSoundEnabled(nextState);
    setProgress(updated);
  };

  const handleSelectAdventure = (id: AdventureId) => {
    setCurrentAdventureId(id);
    setCurrentView('levels');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLevel = (levelId: number) => {
    setCurrentLevelId(levelId);
    setCurrentView('game');
    storageManager.setLastPlayed(currentAdventureId, levelId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeLastPlayed = () => {
    if (progress.lastPlayed) {
      setCurrentAdventureId(progress.lastPlayed.adventureId);
      setCurrentLevelId(progress.lastPlayed.levelId);
      setCurrentView('game');
    } else {
      handleSelectAdventure('archipelago');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRecordLevelProgress = (
    adventureId: AdventureId,
    levelId: number,
    stars: number,
    blockCount: number,
    hintsUsed: number
  ) => {
    const updated = storageManager.recordLevelCompletion(
      adventureId,
      levelId,
      stars,
      blockCount,
      hintsUsed
    );
    setProgress(updated);
  };

  const handleNextLevel = () => {
    if (currentLevelId < 10) {
      handleSelectLevel(currentLevelId + 1);
    } else {
      setCurrentView('levels');
    }
  };

  const handleConfirmReset = () => {
    const reset = storageManager.resetAll();
    setProgress(reset);
    setShowResetModal(false);
    setCurrentView('home');
  };

  const activeLevel = getLevel(currentAdventureId, currentLevelId);
  const activeAdventure = getAdventure(currentAdventureId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Universal Top Header */}
      <Header
        currentView={currentView}
        currentAdventureId={currentAdventureId}
        progress={progress}
        onNavigateHome={() => setCurrentView('home')}
        onNavigateTheater={() => {
          setCurrentView('theater');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectAdventure={handleSelectAdventure}
        onToggleSound={handleToggleSound}
        onRequestReset={() => setShowResetModal(true)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            progress={progress}
            onSelectAdventure={handleSelectAdventure}
            onResumeLastPlayed={handleResumeLastPlayed}
            onNavigateTheater={() => {
              setCurrentView('theater');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'levels' && activeAdventure && (
          <LevelSelectView
            adventureId={currentAdventureId}
            progress={progress}
            onSelectLevel={handleSelectLevel}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'game' && activeLevel && (
          <GameView
            level={activeLevel}
            adventureId={currentAdventureId}
            progress={progress}
            onBackToLevelSelect={() => setCurrentView('levels')}
            onNextLevel={handleNextLevel}
            onRecordLevelProgress={handleRecordLevelProgress}
          />
        )}

        {currentView === 'theater' && (
          <TheaterView />
        )}
      </main>

      {/* Clean Pedagogical Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Coding Adventures</span>
            <span aria-hidden="true">·</span>
            <span>Didattica del pensiero computazionale per la scuola secondaria di primo grado</span>
          </div>
          <div className="text-slate-400">
            Funzionamento 100% offline · Nessun dato personale raccolto
          </div>
        </div>
      </footer>

      {/* Reset Confirmation Dialog */}
      {showResetModal && (
        <ResetConfirmModal
          onConfirm={handleConfirmReset}
          onCancel={() => setShowResetModal(false)}
        />
      )}
    </div>
  );
}
