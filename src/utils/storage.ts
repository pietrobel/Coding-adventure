import { GameProgress, AdventureId, LevelProgress } from '../types';

const STORAGE_KEY = 'coding_adventures_progresso_scuola_v1';

export const initialProgress: GameProgress = {
  completedLevels: {},
  lastPlayed: null,
  soundEnabled: true,
  executionSpeed: 'normal'
};

export const storageManager = {
  loadProgress: (): GameProgress => {
    if (typeof window === 'undefined') return initialProgress;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return initialProgress;
      const parsed = JSON.parse(data);
      return {
        ...initialProgress,
        ...parsed,
        completedLevels: parsed.completedLevels || {}
      };
    } catch {
      return initialProgress;
    }
  },

  saveProgress: (progress: GameProgress) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore quota error
    }
  },

  recordLevelCompletion: (
    adventureId: AdventureId,
    levelId: number,
    stars: number,
    blockCount: number,
    hintsUsed: number
  ): GameProgress => {
    const current = storageManager.loadProgress();
    const key = `${adventureId}_${levelId}`;
    const prev = current.completedLevels[key];

    const updatedLevel: LevelProgress = {
      completed: true,
      stars: Math.max(prev?.stars || 0, stars),
      bestBlockCount: prev ? Math.min(prev.bestBlockCount, blockCount) : blockCount,
      hintsUsed: prev ? Math.min(prev.hintsUsed, hintsUsed) : hintsUsed,
      completedAt: new Date().toISOString()
    };

    const nextProgress: GameProgress = {
      ...current,
      completedLevels: {
        ...current.completedLevels,
        [key]: updatedLevel
      },
      lastPlayed: { adventureId, levelId }
    };

    storageManager.saveProgress(nextProgress);
    return nextProgress;
  },

  setLastPlayed: (adventureId: AdventureId, levelId: number) => {
    const current = storageManager.loadProgress();
    const nextProgress: GameProgress = {
      ...current,
      lastPlayed: { adventureId, levelId }
    };
    storageManager.saveProgress(nextProgress);
    return nextProgress;
  },

  setSoundEnabled: (enabled: boolean) => {
    const current = storageManager.loadProgress();
    const next = { ...current, soundEnabled: enabled };
    storageManager.saveProgress(next);
    return next;
  },

  setExecutionSpeed: (speed: 'slow' | 'normal' | 'fast') => {
    const current = storageManager.loadProgress();
    const next = { ...current, executionSpeed: speed };
    storageManager.saveProgress(next);
    return next;
  },

  resetAll: (): GameProgress => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore
      }
    }
    return initialProgress;
  }
};
