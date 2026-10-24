export type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export interface Position {
  x: number;
  y: number;
}

export type TurnDirection = 'left' | 'right';

export type BlockType = 
  | 'forward' 
  | 'turn' // Can be configured with turnDirection: 'left' | 'right' and turnAngle
  | 'turn_left' 
  | 'turn_right' 
  | 'arrow_up' // Primaria: orienta a Nord e avanza di 1
  | 'arrow_down' // Primaria: orienta a Sud e avanza di 1
  | 'arrow_left' // Primaria: orienta a Ovest e avanza di 1
  | 'arrow_right' // Primaria: orienta a Est e avanza di 1
  | 'collect' 
  | 'interact' 
  | 'trace' 
  | 'repeat' 
  | 'if';

export type ConditionType = 
  | 'front_clear' 
  | 'has_battery' 
  | 'on_package' 
  | 'on_target';

export interface Block {
  id: string;
  type: BlockType;
  turnDirection?: TurnDirection; // Toggleable direction for turn blocks ('left' or 'right')
  turnAngle?: number; // Angle in degrees for geometry mode: 45, 60, 90, 120, 135, 180 (default 90)
  repeatCount?: number; // For 'repeat' blocks (e.g. 2-8)
  children?: Block[]; // Nested blocks for loops and conditionals
  condition?: ConditionType; // For 'if' blocks
}

export type AdventureId = 'forest' | 'archipelago' | 'ice' | 'city' | 'space';

export type DifficultyLevel = 'Principiante' | 'Intermedio' | 'Esperto';

// Dialogue and Guided Theater Types
export type CharacterId = 'piko' | 'leo' | 'bubble' | 'aria' | 'volt' | 'nova';

export type CharacterEmotion = 'felice' | 'curioso' | 'sorpreso' | 'determinato' | 'pensieroso';

export type CharacterAction = 'parla' | 'saluta' | 'salta' | 'luce' | 'ruota';

export interface DialogueLine {
  id: string;
  speakerId: CharacterId;
  text: string;
  emotion: CharacterEmotion;
  action: CharacterAction;
}

export interface StoryScenario {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  actors: CharacterId[];
  background: 'forest' | 'archipelago' | 'ice' | 'city' | 'space';
  initialLines: DialogueLine[];
}

export interface Collectible {
  id: string;
  x: number;
  y: number;
  type: 'crystal' | 'shell' | 'battery' | 'package' | 'power_core';
  collected?: boolean;
}

export interface Interactable {
  id: string;
  x: number;
  y: number;
  type: 'lighthouse' | 'gate' | 'station' | 'terminal' | 'dropoff';
  label: string;
  activated?: boolean;
}

export interface GeometryTarget {
  name: string;
  description: string;
  targetSides: number; // e.g. 4 for square, 3 for triangle
  expectedAngles: number[]; // e.g. [90, 90, 90, 90]
  mustClose: boolean;
  minPoints: number;
  targetShapeType: 'line' | 'corner' | 'square' | 'rectangle' | 'cross' | 'star' | 'triangle' | 'polygon';
}

export interface Level {
  id: number;
  adventureId: AdventureId;
  title: string;
  subtitle: string;
  difficulty: DifficultyLevel;
  description: string; // Didactic challenge brief
  hints: [string, string, string]; // [General, Practical, Pinpoint]
  conceptExplanation: string; // Didactic teaching concept
  gridWidth: number;
  gridHeight: number;
  startPos: Position;
  startDir: Direction;
  targetPos?: Position;
  targetDir?: Direction;
  collectibles: Collectible[];
  interactables: Interactable[];
  grid: string[][]; // Matrix of terrain/tile codes
  allowedBlocks: BlockType[];
  maxBlocksRecommended: number; // For efficiency 3-star rating
  geometryTarget?: GeometryTarget;
  conditionOptions?: { id: ConditionType; label: string }[];
}

export interface Adventure {
  id: AdventureId;
  title: string;
  tagline: string;
  description: string;
  characterName: string;
  companionName?: string;
  themeColor: string;
  accentColor: string;
  badgeBg: string;
  skillsLearned: string[];
  totalLevels: number;
  levels: Level[];
}

export interface LevelProgress {
  completed: boolean;
  stars: number; // 1-3
  bestBlockCount: number;
  hintsUsed: number;
  completedAt?: string;
}

export interface GameProgress {
  completedLevels: Record<string, LevelProgress>; // key: `${adventureId}_${levelId}`
  lastPlayed: { adventureId: AdventureId; levelId: number } | null;
  soundEnabled: boolean;
  executionSpeed: 'slow' | 'normal' | 'fast';
}
