import { Block, Collectible, Direction, Interactable, Level, Position } from '../types';
import { soundManager } from '../utils/audio';

export interface ExecutionState {
  pos: Position;
  dir: Direction;
  collectibles: Collectible[];
  interactables: Interactable[];
  drawnPoints: Position[];
  drawnLines: { from: Position; to: Position }[];
  status: 'idle' | 'running' | 'paused' | 'success' | 'failed';
  errorMessage: string | null;
  successMessage: string | null;
  activeBlockId: string | null;
  stepIndex: number;
  totalInstructionsExecuted: number;
}

export interface ExecutionStep {
  blockId: string;
  type: Block['type'];
  condition?: Block['condition'];
  turnDirection?: Block['turnDirection'];
  turnAngle?: number;
}

export const ALL_DIRECTIONS: Direction[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export function getInitialState(level: Level): ExecutionState {
  return {
    pos: { ...level.startPos },
    dir: level.startDir,
    collectibles: level.collectibles.map((c) => ({ ...c, collected: false })),
    interactables: level.interactables.map((i) => ({ ...i, activated: false })),
    drawnPoints: [{ ...level.startPos }],
    drawnLines: [],
    status: 'idle',
    errorMessage: null,
    successMessage: null,
    activeBlockId: null,
    stepIndex: 0,
    totalInstructionsExecuted: 0
  };
}

export function getNextPosition(pos: Position, dir: Direction): Position {
  switch (dir) {
    case 'N':
      return { x: pos.x, y: pos.y - 1 };
    case 'NE':
      return { x: pos.x + 1, y: pos.y - 1 };
    case 'E':
      return { x: pos.x + 1, y: pos.y };
    case 'SE':
      return { x: pos.x + 1, y: pos.y + 1 };
    case 'S':
      return { x: pos.x, y: pos.y + 1 };
    case 'SW':
      return { x: pos.x - 1, y: pos.y + 1 };
    case 'W':
      return { x: pos.x - 1, y: pos.y };
    case 'NW':
      return { x: pos.x - 1, y: pos.y - 1 };
    default:
      return { x: pos.x, y: pos.y };
  }
}

export function turnLeft(dir: Direction, angle: number = 90): Direction {
  const idx = ALL_DIRECTIONS.indexOf(dir);
  const currentIdx = idx >= 0 ? idx : 0;
  const steps = Math.max(1, Math.round(angle / 45));
  const nextIdx = (currentIdx - steps + ALL_DIRECTIONS.length * 10) % ALL_DIRECTIONS.length;
  return ALL_DIRECTIONS[nextIdx];
}

export function turnRight(dir: Direction, angle: number = 90): Direction {
  const idx = ALL_DIRECTIONS.indexOf(dir);
  const currentIdx = idx >= 0 ? idx : 0;
  const steps = Math.max(1, Math.round(angle / 45));
  const nextIdx = (currentIdx + steps) % ALL_DIRECTIONS.length;
  return ALL_DIRECTIONS[nextIdx];
}

export function isWalkable(level: Level, pos: Position): { walkable: boolean; reason?: string } {
  // Check bounds
  if (pos.x < 0 || pos.x >= level.gridWidth || pos.y < 0 || pos.y >= level.gridHeight) {
    return { walkable: false, reason: 'Sei uscito dai confini della mappa!' };
  }

  const cell = level.grid[pos.y]?.[pos.x];
  if (!cell) {
    return { walkable: false, reason: 'Casella non valida!' };
  }

  // Forest obstacles (Primary school adventure)
  if (level.adventureId === 'forest') {
    if (cell === 'T') {
      return { walkable: false, reason: 'Piko ha incontrato un grande albero del bosco!' };
    }
    if (cell === 'W') {
      return { walkable: false, reason: 'Attenzione al ruscello! Piko non sa nuotare lì.' };
    }
    if (cell === 'R') {
      return { walkable: false, reason: 'Un grosso masso blocca il sentiero!' };
    }
    return { walkable: true };
  }

  // Archipelago obstacles
  if (level.adventureId === 'archipelago') {
    if (cell === '~') {
      return { walkable: false, reason: 'Attenzione! Leo è caduto nell’acqua profonda.' };
    }
    if (cell === 'R') {
      return { walkable: false, reason: 'Hai urtato la scogliera aguzza!' };
    }
    if (cell === 'X') {
      return { walkable: false, reason: 'La roccia blocca il cammino!' };
    }
    return { walkable: true };
  }

  // Ice obstacles
  if (level.adventureId === 'ice') {
    if (cell === '#' || cell === 'X' || cell === 'R') {
      return { walkable: false, reason: 'Hai incontrato un blocco di ghiaccio insormontabile!' };
    }
    return { walkable: true };
  }

  // City obstacles
  if (level.adventureId === 'city') {
    if (cell === '#') {
      return { walkable: false, reason: 'Attenzione! Volt ha urtato un edificio.' };
    }
    if (cell === 'X') {
      return { walkable: false, reason: 'Strada bloccata dal cantiere stradale!' };
    }
    return { walkable: true };
  }

  // Space station obstacles (Expert adventure)
  if (level.adventureId === 'space') {
    if (cell === '#') {
      return { walkable: false, reason: 'Allarme! Sei uscito nel vuoto dello spazio profondo!' };
    }
    if (cell === 'X') {
      return { walkable: false, reason: 'Barriera laser quantistica attiva! Circuito bloccato.' };
    }
    return { walkable: true };
  }

  return { walkable: true };
}

/**
 * Checks geometry requirements for Adventure 2 (Ice & Trails)
 */
export function validateGeometry(level: Level, state: ExecutionState): { success: boolean; message: string } {
  const target = level.geometryTarget;
  if (!target) return { success: true, message: 'Obiettivo completato!' };

  const lines = state.drawnLines;
  if (lines.length === 0) {
    return { success: false, message: 'Non hai ancora tracciato alcuna scia luminosa!' };
  }

  // Count distinct straight sides
  const distinctSides = calculateDistinctSides(state.drawnPoints);

  if (target.mustClose) {
    const start = level.startPos;
    const end = state.pos;
    if (start.x !== end.x || start.y !== end.y) {
      return {
        success: false,
        message: 'La figura deve chiudersi: devi ritornare esattamente al punto di partenza!'
      };
    }
  }

  if (distinctSides < target.targetSides) {
    return {
      success: false,
      message: `Hai disegnato ${distinctSides} lati, ma la figura ne richiede almeno ${target.targetSides}. Prova a completare tutti i lati!`
    };
  }

  if (state.drawnPoints.length < target.minPoints) {
    return {
      success: false,
      message: `La figura richiede una lunghezza maggiore (${target.description}).`
    };
  }

  if (target.targetShapeType === 'square') {
    return {
      success: true,
      message: 'Magnifico! Hai disegnato un quadrato perfetto con 4 lati uguali e 4 angoli retti a 90°!'
    };
  } else if (target.targetShapeType === 'rectangle') {
    return {
      success: true,
      message: 'Ottimo lavoro! Rettangolo completato con lati opposti uguali e perimetro corretto!'
    };
  }

  return {
    success: true,
    message: `Splendido! Hai risvegliato il sigillo: ${target.name} completata con precisione geometrica!`
  };
}

function calculateDistinctSides(points: Position[]): number {
  if (points.length < 2) return 0;
  let sides = 1;
  let lastDir: string | null = null;

  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];
    let currentDir = '';
    if (p2.x > p1.x) currentDir = 'E';
    else if (p2.x < p1.x) currentDir = 'W';
    else if (p2.y > p1.y) currentDir = 'S';
    else if (p2.y < p1.y) currentDir = 'N';

    if (lastDir !== null && currentDir !== lastDir) {
      sides++;
    }
    lastDir = currentDir;
  }
  return sides;
}

/**
 * Checks overall win conditions when program stops
 */
export function checkCompletion(level: Level, state: ExecutionState): { success: boolean; message: string } {
  // 1. Collectibles
  const uncollected = state.collectibles.filter((c) => !c.collected);
  if (uncollected.length > 0) {
    const missingName =
      level.adventureId === 'archipelago'
        ? 'cristalli'
        : level.adventureId === 'city'
        ? 'batterie o pacchi'
        : 'gemme di ghiaccio';
    return {
      success: false,
      message: `Non hai raccolto tutti i ${missingName}! Ne mancano ancora ${uncollected.length}.`
    };
  }

  // 2. Interactables
  const unactivated = state.interactables.filter((i) => !i.activated);
  if (unactivated.length > 0) {
    return {
      success: false,
      message: `Devi attivare ${unactivated[0].label} con l'istruzione INTERAGISCI!`
    };
  }

  // 3. Geometry (Adventure 2)
  if (level.geometryTarget) {
    const geomRes = validateGeometry(level, state);
    if (!geomRes.success) {
      return geomRes;
    }
  }

  // 4. Target position (if specified and not closed geometry)
  if (level.targetPos && !level.geometryTarget?.mustClose) {
    if (state.pos.x !== level.targetPos.x || state.pos.y !== level.targetPos.y) {
      return {
        success: false,
        message: 'Il programma è terminato, ma non sei ancora arrivato alla casella di destinazione!'
      };
    }
  }

  // Win!
  return {
    success: true,
    message: 'Livello completato con successo! Ottimo ragionamento computazionale!'
  };
}

/**
 * Flattens the hierarchical block tree into an executable stream of instructions.
 * Resolves loops and checks conditions dynamically against the runtime simulator.
 */
export function* createProgramGenerator(
  blocks: Block[],
  level: Level,
  getState: () => ExecutionState
): Generator<ExecutionStep, void, void> {
  const MAX_TOTAL_STEPS = 300; // Protection against infinite loops
  let totalSteps = 0;

  function* processBlocks(list: Block[]): Generator<ExecutionStep, void, void> {
    for (const block of list) {
      if (totalSteps >= MAX_TOTAL_STEPS) {
        return;
      }

      if (block.type === 'repeat') {
        const count = block.repeatCount || 2;
        const children = block.children || [];
        for (let r = 0; r < count; r++) {
          yield { blockId: block.id, type: 'repeat' };
          totalSteps++;
          for (const step of processBlocks(children)) {
            yield step;
          }
        }
      } else if (block.type === 'if') {
        yield { blockId: block.id, type: 'if', condition: block.condition };
        totalSteps++;
        const currentState = getState();
        const conditionMet = evaluateCondition(block.condition, currentState, level);
        if (conditionMet) {
          const children = block.children || [];
          for (const step of processBlocks(children)) {
            yield step;
          }
        }
      } else {
        totalSteps++;
        yield {
          blockId: block.id,
          type: block.type,
          turnDirection: block.turnDirection,
          turnAngle: block.turnAngle
        };
      }
    }
  }

  yield* processBlocks(blocks);
}

function evaluateCondition(cond: Block['condition'], state: ExecutionState, level: Level): boolean {
  if (!cond || cond === 'front_clear') {
    const nextPos = getNextPosition(state.pos, state.dir);
    const walkCheck = isWalkable(level, nextPos);
    return walkCheck.walkable;
  }
  if (cond === 'has_battery') {
    const collectedCount = state.collectibles.filter((c) => c.collected).length;
    return collectedCount > 0;
  }
  if (cond === 'on_package') {
    return state.collectibles.some((c) => c.x === state.pos.x && c.y === state.pos.y && !c.collected);
  }
  if (cond === 'on_target') {
    return level.targetPos ? state.pos.x === level.targetPos.x && state.pos.y === level.targetPos.y : false;
  }
  return true;
}

/**
 * Executes a single step on the current state and returns updated state.
 */
export function executeStep(
  step: ExecutionStep,
  state: ExecutionState,
  level: Level
): ExecutionState {
  const next = { ...state, activeBlockId: step.blockId };

  if (step.type === 'repeat' || step.type === 'if') {
    // Pure control flow step (highlighting the container)
    return next;
  }

  // Primary school directional arrows: orient to target direction AND advance 1 step
  if (
    step.type === 'arrow_up' ||
    step.type === 'arrow_down' ||
    step.type === 'arrow_left' ||
    step.type === 'arrow_right'
  ) {
    const targetDir: Direction =
      step.type === 'arrow_up'
        ? 'N'
        : step.type === 'arrow_down'
        ? 'S'
        : step.type === 'arrow_right'
        ? 'E'
        : 'W';

    const targetPos = getNextPosition(next.pos, targetDir);
    const check = isWalkable(level, targetPos);

    if (!check.walkable) {
      soundManager.playError();
      return {
        ...next,
        dir: targetDir,
        status: 'failed',
        errorMessage: check.reason || 'Movimento non consentito: c’è un ostacolo in quella direzione!'
      };
    }

    const from = { ...next.pos };
    const to = { ...targetPos };
    const updatedLines = [...next.drawnLines, { from, to }];
    const updatedPoints = [...next.drawnPoints, to];

    soundManager.playStep();

    return {
      ...next,
      pos: to,
      dir: targetDir,
      drawnLines: updatedLines,
      drawnPoints: updatedPoints,
      totalInstructionsExecuted: next.totalInstructionsExecuted + 1
    };
  }

  if (step.type === 'forward') {
    const targetPos = getNextPosition(next.pos, next.dir);
    const check = isWalkable(level, targetPos);

    if (!check.walkable) {
      soundManager.playError();
      return {
        ...next,
        status: 'failed',
        errorMessage: check.reason || 'Movimento non consentito: ostacolo rilevato!'
      };
    }

    // Valid forward move
    const from = { ...next.pos };
    const to = { ...targetPos };
    const updatedLines = [...next.drawnLines, { from, to }];
    const updatedPoints = [...next.drawnPoints, to];

    if (level.adventureId === 'ice') {
      soundManager.playDraw();
    } else {
      soundManager.playStep();
    }

    return {
      ...next,
      pos: to,
      drawnLines: updatedLines,
      drawnPoints: updatedPoints,
      totalInstructionsExecuted: next.totalInstructionsExecuted + 1
    };
  }

  if (step.type === 'turn_left' || step.type === 'turn_right' || step.type === 'turn') {
    soundManager.playTurn();
    const effectiveDir = step.turnDirection
      ? step.turnDirection
      : step.type === 'turn_right'
      ? 'right'
      : 'left';
    const angle = step.turnAngle || 90;
    const newDir = effectiveDir === 'left' ? turnLeft(next.dir, angle) : turnRight(next.dir, angle);
    return {
      ...next,
      dir: newDir,
      totalInstructionsExecuted: next.totalInstructionsExecuted + 1
    };
  }

  if (step.type === 'collect') {
    const itemIndex = next.collectibles.findIndex(
      (c) => c.x === next.pos.x && c.y === next.pos.y && !c.collected
    );

    if (itemIndex >= 0) {
      soundManager.playCollect();
      const updated = [...next.collectibles];
      updated[itemIndex] = { ...updated[itemIndex], collected: true };
      return {
        ...next,
        collectibles: updated,
        totalInstructionsExecuted: next.totalInstructionsExecuted + 1
      };
    } else {
      // Friendly notice: nothing to pick up here
      return {
        ...next,
        errorMessage: 'Nessun oggetto da raccogliere in questa posizione!',
        totalInstructionsExecuted: next.totalInstructionsExecuted + 1
      };
    }
  }

  if (step.type === 'interact') {
    const targetIdx = next.interactables.findIndex(
      (i) => i.x === next.pos.x && i.y === next.pos.y
    );

    if (targetIdx >= 0) {
      soundManager.playInteract();
      const updated = [...next.interactables];
      updated[targetIdx] = { ...updated[targetIdx], activated: true };
      return {
        ...next,
        interactables: updated,
        totalInstructionsExecuted: next.totalInstructionsExecuted + 1
      };
    } else {
      return {
        ...next,
        errorMessage: 'Nessun dispositivo con cui interagire qui!',
        totalInstructionsExecuted: next.totalInstructionsExecuted + 1
      };
    }
  }

  return next;
}
