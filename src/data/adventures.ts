import { Adventure, AdventureId } from '../types';

export const ADVENTURES: Adventure[] = [
  // =========================================================================
  // AVVENTURA PER LA PRIMARIA: IL BOSCO INCANTATO DI PIKO
  // =========================================================================
  {
    id: 'forest',
    title: 'Il bosco incantato di Piko',
    tagline: 'Avventura per la scuola primaria: primi passi, ghiande e sentieri facili',
    description:
      'Accompagna la simpatica volpina robotica Piko nel bosco fiorito! Un percorso morbidissimo e super intuitivo per iniziare a programmare senza alcuna difficoltà.',
    characterName: 'Piko la Volpina',
    companionName: 'Lucciola Luma',
    themeColor: 'from-emerald-500 to-teal-600',
    accentColor: '#059669',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    skillsLearned: [
      'Primi passi lineari (1 e 2 caselle)',
      'Raccolta di ghiande e bacche',
      'Svolte semplici a destra e a sinistra',
      'Orientamento intuitivo nel bosco',
      'Primi cicli guidati per contare'
    ],
    totalLevels: 10,
    levels: [
      // Livello 1
      {
        id: 1,
        adventureId: 'forest',
        title: 'Un piccolo passo',
        subtitle: 'Un solo passo per iniziare',
        difficulty: 'Principiante',
        description: 'Piko deve fare un solo passetto in avanti per raggiungere la sua tana profumata!',
        hints: [
          'Guarda Piko: è già rivolta verso la sua tana!',
          'Basta inserire un solo blocco "Avanti".',
          'Premi "Esegui" per far camminare la volpina.'
        ],
        conceptExplanation:
          'Iniziamo dal comando più semplice: "Avanti" fa compiere esattamente un passo in avanti.',
        gridWidth: 5,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 2, y: 2 },
        collectibles: [],
        interactables: [],
        grid: [
          ['T', 'T', 'T', 'T', 'T'],
          ['T', '.', '.', '.', 'T'],
          ['T', '.', '.', '.', 'T'],
          ['T', '.', '.', '.', 'T'],
          ['T', 'T', 'T', 'T', 'T']
        ],
        allowedBlocks: ['forward'],
        maxBlocksRecommended: 1
      },
      // Livello 2
      {
        id: 2,
        adventureId: 'forest',
        title: 'Due passi sul prato',
        subtitle: 'Contare i passi',
        difficulty: 'Principiante',
        description: 'La tana è un pochino più lontana: aiuta Piko a fare 2 passi in avanti sul prato verde!',
        hints: [
          'Conta le caselle: una, due!',
          'Metti due blocchi "Avanti" uno sotto l\'altro.',
          'Piko camminerà dritta fino al traguardo.'
        ],
        conceptExplanation:
          'Per andare più lontano, uniamo più istruzioni "Avanti" in fila (sequenza).',
        gridWidth: 5,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 3, y: 2 },
        collectibles: [],
        interactables: [],
        grid: [
          ['T', 'T', 'T', 'T', 'T'],
          ['T', '.', '.', '.', 'T'],
          ['T', '.', '.', '.', 'T'],
          ['T', '.', '.', '.', 'T'],
          ['T', 'T', 'T', 'T', 'T']
        ],
        allowedBlocks: ['forward'],
        maxBlocksRecommended: 2
      },
      // Livello 3
      {
        id: 3,
        adventureId: 'forest',
        title: 'La ghianda dorata',
        subtitle: 'Cammina e raccogli',
        difficulty: 'Principiante',
        description: 'Sul sentiero c\'è una deliziosa ghianda dorata! Fai un passo, raccoglila e fai un altro passo.',
        hints: [
          'Fai un passo avanti per arrivare sopra la ghianda.',
          'Usa il blocco "Raccogli" per metterla nel cestino!',
          'Fai un ultimo passo per entrare nella tana.'
        ],
        conceptExplanation:
          'Il comando "Raccogli" funziona quando ti trovi sulla stessa casella dell\'oggetto!',
        gridWidth: 5,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 3, y: 2 },
        collectibles: [{ id: 'ac1', x: 2, y: 2, type: 'battery' }],
        interactables: [],
        grid: [
          ['T', 'T', 'T', 'T', 'T'],
          ['T', '.', '.', '.', 'T'],
          ['T', '.', '.', '.', 'T'],
          ['T', '.', '.', '.', 'T'],
          ['T', 'T', 'T', 'T', 'T']
        ],
        allowedBlocks: ['forward', 'collect'],
        maxBlocksRecommended: 3
      },
      // Livello 4
      {
        id: 4,
        adventureId: 'forest',
        title: 'La curva fiorita',
        subtitle: 'La prima svolta a destra',
        difficulty: 'Principiante',
        description: 'Il sentiero piega verso il basso! Avanza di 1 passo, gira a destra e fai 1 passo fino alla tana.',
        hints: [
          'Piko guarda a Est: girando a destra guarderà verso il basso.',
          'Puoi anche usare il menu a tendina sul blocco "Gira" per scegliere destra o sinistra!',
          'Sequenza: Avanti, Gira a destra, Avanti.'
        ],
        conceptExplanation:
          'Girare non fa camminare: orienta solo Piko nella direzione giusta per la prossima mossa.',
        gridWidth: 5,
        gridHeight: 5,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 2, y: 2 },
        collectibles: [],
        interactables: [],
        grid: [
          ['T', 'T', 'T', 'T', 'T'],
          ['T', '.', '.', 'T', 'T'],
          ['T', 'T', '.', 'T', 'T'],
          ['T', 'T', 'T', 'T', 'T'],
          ['T', 'T', 'T', 'T', 'T']
        ],
        allowedBlocks: ['forward', 'turn_right', 'turn_left'],
        maxBlocksRecommended: 3
      },
      // Livello 5
      {
        id: 5,
        adventureId: 'forest',
        title: 'Il ruscello limpido',
        subtitle: 'Svolta a sinistra',
        difficulty: 'Principiante',
        description: 'Piko guarda verso il basso: falla girare a sinistra per superare la curva e raggiungere la casetta!',
        hints: [
          'Guarda verso il basso, poi gira a sinistra per guardare verso destra dello schermo.',
          'Attenzione a non finire nel ruscello blu!',
          'Avanza, gira a sinistra, avanza 2 volte.'
        ],
        conceptExplanation:
          'La sinistra e la destra dipendono sempre da dove sta guardando la volpina.',
        gridWidth: 6,
        gridHeight: 5,
        startPos: { x: 1, y: 1 },
        startDir: 'S',
        targetPos: { x: 3, y: 2 },
        collectibles: [],
        interactables: [],
        grid: [
          ['T', 'T', 'T', 'T', 'T', 'T'],
          ['T', '.', 'W', 'W', 'T', 'T'],
          ['T', '.', '.', '.', 'T', 'T'],
          ['T', 'T', 'W', 'W', 'T', 'T'],
          ['T', 'T', 'T', 'T', 'T', 'T']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right'],
        maxBlocksRecommended: 4
      },
      // Livello 6
      {
        id: 6,
        adventureId: 'forest',
        title: 'Due bacche nel bosco',
        subtitle: 'Raccolta multipla',
        difficulty: 'Principiante',
        description: 'Ci sono due gustose bacche rosse! Raccoglile entrambe prima di arrivare alla cuccia.',
        hints: [
          'Avanza e raccogli la prima bacca.',
          'Avanza ancora e raccogli la seconda!',
          'Fai l\'ultimo passo per entrare nella cuccia.'
        ],
        conceptExplanation:
          'Possiamo raccogliere quanti oggetti vogliamo durante il viaggio, basta usare "Raccogli" sopra ciascuno.',
        gridWidth: 6,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 4, y: 2 },
        collectibles: [
          { id: 'b1', x: 2, y: 2, type: 'battery' },
          { id: 'b2', x: 3, y: 2, type: 'battery' }
        ],
        interactables: [],
        grid: [
          ['T', 'T', 'T', 'T', 'T', 'T'],
          ['T', 'T', 'T', 'T', 'T', 'T'],
          ['T', '.', '.', '.', '.', 'T'],
          ['T', 'T', 'T', 'T', 'T', 'T'],
          ['T', 'T', 'T', 'T', 'T', 'T']
        ],
        allowedBlocks: ['forward', 'collect'],
        maxBlocksRecommended: 5
      },
      // Livello 7
      {
        id: 7,
        adventureId: 'forest',
        title: 'Il sentiero a scaletta',
        subtitle: 'Curve alternate dolci',
        difficulty: 'Principiante',
        description: 'Un sentiero a zig-zag tra gli alberelli! Gira a destra, poi a sinistra per trovare la via.',
        hints: [
          'Fai un passo avanti, gira a destra per scendere, fai un passo, poi gira a sinistra per tornare dritta.',
          'Puoi cambiare il verso di rotazione direttamente con la freccia nel blocco!',
          'Procedi un passetto alla volta.'
        ],
        conceptExplanation:
          'Alternando destra e sinistra possiamo aggirare qualsiasi piccolo ostacolo.',
        gridWidth: 6,
        gridHeight: 5,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 3, y: 3 },
        collectibles: [{ id: 'ac_scale', x: 2, y: 2, type: 'battery' }],
        interactables: [],
        grid: [
          ['T', 'T', 'T', 'T', 'T', 'T'],
          ['T', '.', '.', 'T', 'T', 'T'],
          ['T', 'T', '.', '.', 'T', 'T'],
          ['T', 'T', 'T', '.', '.', 'T'],
          ['T', 'T', 'T', 'T', 'T', 'T']
        ],
        allowedBlocks: ['forward', 'turn_right', 'turn_left', 'collect'],
        maxBlocksRecommended: 7
      },
      // Livello 8
      {
        id: 8,
        adventureId: 'forest',
        title: 'Il grande prato',
        subtitle: 'I primi passi lunghi',
        difficulty: 'Principiante',
        description: 'Un bel vialetto lungo con 4 passi dritti! Metti 4 volte "Avanti" per attraversarlo tutto.',
        hints: [
          'Conta le caselle: 1, 2, 3, 4 passi!',
          'Se hai a disposizione il blocco "Ripeti", puoi usarlo per fare prima!',
          'Raccogli la bacca dorata a metà strada.'
        ],
        conceptExplanation:
          'Quando dobbiamo fare la stessa cosa tante volte, possiamo già iniziare a pensare ai cicli!',
        gridWidth: 7,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 5, y: 2 },
        collectibles: [{ id: 'long_b', x: 3, y: 2, type: 'battery' }],
        interactables: [],
        grid: [
          ['T', 'T', 'T', 'T', 'T', 'T', 'T'],
          ['T', 'T', 'T', 'T', 'T', 'T', 'T'],
          ['T', '.', '.', '.', '.', '.', 'T'],
          ['T', 'T', 'T', 'T', 'T', 'T', 'T'],
          ['T', 'T', 'T', 'T', 'T', 'T', 'T']
        ],
        allowedBlocks: ['forward', 'collect', 'repeat'],
        maxBlocksRecommended: 4
      },
      // Livello 9
      {
        id: 9,
        adventureId: 'forest',
        title: 'Il trucco della ripetizione',
        subtitle: 'Usa RIPETI per la prima volta!',
        difficulty: 'Principiante',
        description: '3 ghiande in fila! Invece di scrivere tante volte Avanti e Raccogli, usa "RIPETI 3 VOLTE"!',
        hints: [
          'Trascina dentro a "Ripeti 3 volte" i blocchi: Avanti e Raccogli.',
          'Il computer farà tutto da solo per 3 volte di fila!',
          'È come una magia che ti fa risparmiare un sacco di tempo.'
        ],
        conceptExplanation:
          'Il blocco "Ripeti" ripete tutte le istruzioni che metti al suo interno per il numero di volte che scegli!',
        gridWidth: 6,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 4, y: 2 },
        collectibles: [
          { id: 'rep_f1', x: 2, y: 2, type: 'battery' },
          { id: 'rep_f2', x: 3, y: 2, type: 'battery' },
          { id: 'rep_f3', x: 4, y: 2, type: 'battery' }
        ],
        interactables: [],
        grid: [
          ['T', 'T', 'T', 'T', 'T', 'T'],
          ['T', 'T', 'T', 'T', 'T', 'T'],
          ['T', '.', '.', '.', '.', 'T'],
          ['T', 'T', 'T', 'T', 'T', 'T'],
          ['T', 'T', 'T', 'T', 'T', 'T']
        ],
        allowedBlocks: ['forward', 'collect', 'repeat'],
        maxBlocksRecommended: 3
      },
      // Livello 10
      {
        id: 10,
        adventureId: 'forest',
        title: 'La grande festa di Piko',
        subtitle: 'Il diploma dei piccoli programmatori!',
        difficulty: 'Principiante',
        description: 'Raccogli il super-frutto magico della foresta e torna felice alla tana grande!',
        hints: [
          'Avanza di 2 passi, gira a destra per prendere il frutto.',
          'Poi gira per raggiungere la tana fiorita.',
          'Hai imparato a guidare Piko in tutto il bosco!'
        ],
        conceptExplanation:
          'Bravissimo! Ora conosci i comandi Avanti, Girare a Destra, Girare a Sinistra, Raccogliere e Ripetere!',
        gridWidth: 6,
        gridHeight: 6,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 4, y: 4 },
        collectibles: [{ id: 'party_fruit', x: 3, y: 1, type: 'battery' }],
        interactables: [],
        grid: [
          ['T', 'T', 'T', 'T', 'T', 'T'],
          ['T', '.', '.', '.', 'T', 'T'],
          ['T', 'T', 'T', '.', 'T', 'T'],
          ['T', 'T', 'T', '.', '.', 'T'],
          ['T', 'T', 'T', 'T', '.', 'T'],
          ['T', 'T', 'T', 'T', 'T', 'T']
        ],
        allowedBlocks: ['forward', 'turn_right', 'turn_left', 'collect', 'repeat'],
        maxBlocksRecommended: 7
      }
    ]
  },
  // =========================================================================
  // AVVENTURA 2: L'ARCIPELAGO DELLE ACQUE MAGICHE
  // =========================================================================
  {
    id: 'archipelago',
    title: "L'arcipelago delle acque magiche",
    tagline: 'Esplora isole incantate e riaccendi il Faro Antico',
    description:
      'Accompagna il giovane esploratore Leo e il suo robot acquatico Bubble attraverso le isole tropicali. Raccogli i cristalli di luce ed evita le correnti impetuose!',
    characterName: 'Leo l’Esploratore',
    companionName: 'Robot Bubble-9',
    themeColor: 'from-cyan-500 to-blue-600',
    accentColor: '#0284c7',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    skillsLearned: [
      'Sequenza ordinata di istruzioni',
      'Rotazioni destra / sinistra a 90°',
      'Raccolta di oggetti (cristalli)',
      'Aggiramento ostacoli e scogli',
      'Ottimizzazione con cicli RIPETI'
    ],
    totalLevels: 10,
    levels: [
      // Livello 1
      {
        id: 1,
        adventureId: 'archipelago',
        title: 'Il primo tuffo',
        subtitle: 'Sequenza lineare di base',
        difficulty: 'Principiante',
        description: 'Aiuta Leo a camminare dritto sul molo di legno per raggiungere la spiaggia della prima isola.',
        hints: [
          'Osserva in quale direzione guarda Leo: è già rivolto verso la spiaggia!',
          'Conta quante caselle vuote ci sono tra Leo e la conchiglia traguardo.',
          'Usa 2 blocchi "Avanti" per raggiungere la spiaggia.'
        ],
        conceptExplanation:
          'Il computer esegue le istruzioni nell\'ordine esatto in cui le disponi, dall\'alto verso il basso (esecuzione sequenziale).',
        gridWidth: 6,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 3, y: 2 },
        collectibles: [],
        interactables: [],
        grid: [
          ['~', '~', '~', '~', '~', '~'],
          ['~', '~', 'G', 'G', '~', '~'],
          ['~', 'B', 'B', 'G', 'G', '~'],
          ['~', '~', 'G', 'G', '~', '~'],
          ['~', '~', '~', '~', '~', '~']
        ],
        allowedBlocks: ['forward'],
        maxBlocksRecommended: 2
      },
      // Livello 2
      {
        id: 2,
        adventureId: 'archipelago',
        title: 'La conchiglia luminosa',
        subtitle: 'Raggiungi e raccogli',
        difficulty: 'Principiante',
        description: 'Cammina fino alla conchiglia magica, raccoglila con l\'istruzione apposita e prosegui fino all\'approdo.',
        hints: [
          'Devi prima raggiungere la casella della conchiglia prima di poterla raccogliere.',
          'Quando ti trovi sopra la conchiglia, inserisci il blocco "Raccogli".',
          'Dopo aver raccolto la conchiglia, fai un altro passo in avanti verso il traguardo.'
        ],
        conceptExplanation:
          'Le istruzioni di interazione come "Raccogli" hanno effetto solo quando il personaggio si trova esattamente nella stessa casella dell\'oggetto.',
        gridWidth: 6,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 4, y: 2 },
        collectibles: [{ id: 'c1', x: 2, y: 2, type: 'shell' }],
        interactables: [],
        grid: [
          ['~', '~', '~', '~', '~', '~'],
          ['~', 'G', 'G', 'G', 'G', '~'],
          ['~', 'G', 'G', 'G', 'G', '~'],
          ['~', 'G', 'G', 'G', 'G', '~'],
          ['~', '~', '~', '~', '~', '~']
        ],
        allowedBlocks: ['forward', 'collect'],
        maxBlocksRecommended: 4
      },
      // Livello 3
      {
        id: 3,
        adventureId: 'archipelago',
        title: 'Il bivio delle correnti',
        subtitle: 'Imparare a girare a 90°',
        difficulty: 'Principiante',
        description: 'La spiaggia curva verso sud! Avanza, gira a destra e raggiungi l\'approdo riparato.',
        hints: [
          'Attenzione all\'orientamento: quando Leo guarda verso Est, girare a destra significa guardare verso il basso (Sud).',
          'Girare non sposta il personaggio: cambia solo la direzione verso cui è orientato!',
          'Sequenza: Avanti, Gira a destra, Avanti, Avanti.'
        ],
        conceptExplanation:
          'Ruotare sul posto è un\'istruzione che modifica la direzione del personaggio (angolo di 90°), ma lascia inalterata la sua posizione nella griglia.',
        gridWidth: 6,
        gridHeight: 6,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 3, y: 4 },
        collectibles: [],
        interactables: [],
        grid: [
          ['~', '~', '~', '~', '~', '~'],
          ['~', 'G', 'G', 'G', '~', '~'],
          ['~', '~', '~', 'G', '~', '~'],
          ['~', '~', '~', 'G', '~', '~'],
          ['~', '~', '~', 'G', 'G', '~'],
          ['~', '~', '~', '~', '~', '~']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right'],
        maxBlocksRecommended: 5
      },
      // Livello 4
      {
        id: 4,
        adventureId: 'archipelago',
        title: 'Il ponte di legno',
        subtitle: 'Attraversare un passaggio stretto',
        difficulty: 'Intermedio',
        description: 'Un lungo ponte di assi collega due isolette. Attraversalo facendo attenzione all\'acqua profonda ai lati.',
        hints: [
          'Conta con attenzione i passi sul ponte di legno: sono 4 caselle di fila!',
          'Se cadi in acqua il programma si interrompe.',
          'Avanza dritto di 4 passi, poi gira a sinistra e fai l\'ultimo passo.'
        ],
        conceptExplanation:
          'Controllare i vincoli ambientali (come baratri o acque profonde) è fondamentale nel testing del codice per evitare errori di collisione (bug).',
        gridWidth: 7,
        gridHeight: 5,
        startPos: { x: 1, y: 3 },
        startDir: 'N',
        targetPos: { x: 5, y: 1 },
        collectibles: [],
        interactables: [],
        grid: [
          ['~', '~', '~', '~', 'G', 'G', '~'],
          ['~', 'G', 'B', 'B', 'B', 'G', '~'],
          ['~', 'G', '~', '~', '~', '~', '~'],
          ['~', 'G', '~', '~', '~', '~', '~'],
          ['~', '~', '~', '~', '~', '~', '~']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right'],
        maxBlocksRecommended: 6
      },
      // Livello 5
      {
        id: 5,
        adventureId: 'archipelago',
        title: 'Il cristallo nascosto',
        subtitle: 'Deviazione e raccolta',
        difficulty: 'Intermedio',
        description: 'Un cristallo di luce azzurra si trova su una lingua di sabbia. Raccoglilo e raggiungi la barca.',
        hints: [
          'Dovrai svoltare verso l\'alto per prendere il cristallo, poi girare per tornare verso la barca.',
          'Non dimenticare di usare il blocco "Raccogli" sopra al cristallo.',
          'Pianifica il percorso dividendo il tragitto in due tappe: 1) al cristallo, 2) alla barca.'
        ],
        conceptExplanation:
          'Decomposizione del problema: dividere un obiettivo complesso in sotto-obiettivi più piccoli e verificabili.',
        gridWidth: 7,
        gridHeight: 6,
        startPos: { x: 1, y: 3 },
        startDir: 'E',
        targetPos: { x: 5, y: 3 },
        collectibles: [{ id: 'c_hid', x: 3, y: 1, type: 'crystal' }],
        interactables: [],
        grid: [
          ['~', '~', '~', '~', '~', '~', '~'],
          ['~', '~', '~', 'G', '~', '~', '~'],
          ['~', '~', '~', 'G', '~', '~', '~'],
          ['~', 'G', 'G', 'G', 'G', 'G', '~'],
          ['~', '~', '~', '~', '~', '~', '~'],
          ['~', '~', '~', '~', '~', '~', '~']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect'],
        maxBlocksRecommended: 9
      },
      // Livello 6
      {
        id: 6,
        adventureId: 'archipelago',
        title: 'L’isola degli scogli',
        subtitle: 'Evitare gli ostacoli',
        difficulty: 'Intermedio',
        description: 'Gli scogli aguzzi e i coralli bloccano il sentiero diretto. Trova una rotta sicura per aggirarli!',
        hints: [
          'La via diretta è bloccata dagli scogli (R): devi aggirarli passando dalla spiaggia superiore o inferiore.',
          'Verifica bene le rotazioni a ogni curva.',
          'Procedi passo dopo passo testando con il tasto "Passo singolo".'
        ],
        conceptExplanation:
          'Il debug passo-passo (Step-by-step execution) consente di osservare lo stato del sistema istruzione per istruzione.',
        gridWidth: 7,
        gridHeight: 6,
        startPos: { x: 1, y: 4 },
        startDir: 'E',
        targetPos: { x: 5, y: 1 },
        collectibles: [{ id: 'c_reef', x: 3, y: 4, type: 'crystal' }],
        interactables: [],
        grid: [
          ['~', '~', '~', '~', '~', '~', '~'],
          ['~', '~', 'G', 'G', 'G', 'G', '~'],
          ['~', 'G', 'G', 'R', 'R', 'G', '~'],
          ['~', 'G', 'R', 'R', 'G', 'G', '~'],
          ['~', 'G', 'G', 'G', 'G', '~', '~'],
          ['~', '~', '~', '~', '~', '~', '~']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect'],
        maxBlocksRecommended: 9
      },
      // Livello 7
      {
        id: 7,
        adventureId: 'archipelago',
        title: 'La raccolta completa',
        subtitle: 'Pianificazione multi-obiettivo',
        difficulty: 'Intermedio',
        description: 'Sull\'atollo ci sono ben 3 cristalli energetici. Raccoglili tutti prima di approdare all\'uscita!',
        hints: [
          'Se arrivi al traguardo senza aver raccolto tutti e 3 i cristalli, il livello non sarà completato.',
          'Pensa a un percorso a ferro di cavallo per visitare tutte e tre le posizioni.',
          'Usa "Raccogli" ogni volta che Leo calpesta un cristallo.'
        ],
        conceptExplanation:
          'Condizioni multiple di successo: un algoritmo è corretto solo se soddisfa tutte le condizioni previste (post-condizioni).',
        gridWidth: 7,
        gridHeight: 6,
        startPos: { x: 1, y: 1 },
        startDir: 'S',
        targetPos: { x: 5, y: 1 },
        collectibles: [
          { id: 'c1', x: 1, y: 3, type: 'crystal' },
          { id: 'c2', x: 3, y: 4, type: 'crystal' },
          { id: 'c3', x: 5, y: 3, type: 'crystal' }
        ],
        interactables: [],
        grid: [
          ['~', '~', '~', '~', '~', '~', '~'],
          ['~', 'G', 'G', '~', 'G', 'G', '~'],
          ['~', 'G', '~', '~', '~', 'G', '~'],
          ['~', 'G', 'G', '~', 'G', 'G', '~'],
          ['~', '~', 'G', 'G', 'G', '~', '~'],
          ['~', '~', '~', '~', '~', '~', '~']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect'],
        maxBlocksRecommended: 12
      },
      // Livello 8
      {
        id: 8,
        adventureId: 'archipelago',
        title: 'Il canale tortuoso',
        subtitle: 'Percorso lungo a serpentina',
        difficulty: 'Esperto',
        description: 'Un lungo sentiero a zig-zag tra le lagune. Guida Leo con precisione fino al pontile terminale!',
        hints: [
          'Attento a non confondere "Gira a sinistra" con "Gira a destra" quando ti muovi verso il basso o verso sinistra.',
          'Ricorda: la destra e la sinistra sono sempre riferite al punto di vista di Leo, non al tuo schermo!',
          'Se Leo guarda a Sud (in basso), la sua destra punta verso Ovest (sinistra dello schermo).'
        ],
        conceptExplanation:
          'Punto di vista relativo vs assoluto: in informatica e robotica, i comandi di navigazione dipendono dall\'orientamento locale dell\'agente.',
        gridWidth: 7,
        gridHeight: 6,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 5, y: 4 },
        collectibles: [
          { id: 'c_wind1', x: 4, y: 1, type: 'crystal' },
          { id: 'c_wind2', x: 2, y: 3, type: 'crystal' }
        ],
        interactables: [],
        grid: [
          ['~', '~', '~', '~', '~', '~', '~'],
          ['~', 'G', 'G', 'G', 'G', 'G', '~'],
          ['~', '~', '~', '~', '~', 'G', '~'],
          ['~', 'G', 'G', 'G', 'G', 'G', '~'],
          ['~', 'G', '~', '~', '~', 'G', '~'],
          ['~', 'G', 'G', 'G', 'G', 'G', '~']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect'],
        maxBlocksRecommended: 14
      },
      // Livello 9
      {
        id: 9,
        adventureId: 'archipelago',
        title: 'La corrente ripetitiva',
        subtitle: 'Introduzione al ciclo RIPETI',
        difficulty: 'Esperto',
        description: 'Un lungo molo dritto con 5 cristalli allineati! Usa il blocco "RIPETI 5 VOLTE" per scrivere un programma breve ed elegante.',
        hints: [
          'Invece di scrivere 5 volte "Avanti" e "Raccogli", puoi racchiuderli all\'interno del blocco "RIPETI".',
          'Trascina o inserisci le istruzioni all\'interno della pancia del blocco RIPETI.',
          'Imposta il contatore a 5 per raccogliere tutti i cristalli in riga.'
        ],
        conceptExplanation:
          'I cicli (loop) consentono di eseguire più volte una sequenza di istruzioni senza doverle riscrivere, riducendo le dimensioni del codice e prevenendo errori.',
        gridWidth: 8,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 6, y: 2 },
        collectibles: [
          { id: 'c_rep1', x: 2, y: 2, type: 'crystal' },
          { id: 'c_rep2', x: 3, y: 2, type: 'crystal' },
          { id: 'c_rep3', x: 4, y: 2, type: 'crystal' },
          { id: 'c_rep4', x: 5, y: 2, type: 'crystal' },
          { id: 'c_rep5', x: 6, y: 2, type: 'crystal' }
        ],
        interactables: [],
        grid: [
          ['~', '~', '~', '~', '~', '~', '~', '~'],
          ['~', '~', '~', '~', '~', '~', '~', '~'],
          ['~', 'B', 'B', 'B', 'B', 'B', 'B', '~'],
          ['~', '~', '~', '~', '~', '~', '~', '~'],
          ['~', '~', '~', '~', '~', '~', '~', '~']
        ],
        allowedBlocks: ['forward', 'collect', 'repeat'],
        maxBlocksRecommended: 3
      },
      // Livello 10
      {
        id: 10,
        adventureId: 'archipelago',
        title: 'Il faro dell’arcipelago',
        subtitle: 'La grande missione finale',
        difficulty: 'Esperto',
        description: 'Raccogli il Cristallo Maestro supremo, raggiungi la torre del Faro e usa "INTERAGISCI" per accendere la luce su tutte le isole!',
        hints: [
          'C\'è un tratto rettilineo perfetto per usare un ciclo RIPETI.',
          'Raccogli il cristallo prima di salire la scalinata del faro.',
          'Quando sei davanti al faro, esegui il comando "Interagisci" per accendere il raggio luminoso.'
        ],
        conceptExplanation:
          'Integrazione algoritmica: combinare sequenze, iterazioni cicliche, raccolte e attivazioni per risolvere un problema completo nel mondo reale.',
        gridWidth: 8,
        gridHeight: 7,
        startPos: { x: 1, y: 5 },
        startDir: 'N',
        targetPos: { x: 6, y: 1 },
        collectibles: [{ id: 'c_master', x: 1, y: 1, type: 'crystal' }],
        interactables: [
          {
            id: 'lighthouse',
            x: 6,
            y: 1,
            type: 'lighthouse',
            label: 'Faro Antico'
          }
        ],
        grid: [
          ['~', '~', '~', '~', '~', '~', '~', '~'],
          ['~', 'G', 'B', 'B', 'B', 'B', 'F', '~'],
          ['~', 'G', '~', '~', '~', '~', '~', '~'],
          ['~', 'G', '~', '~', '~', '~', '~', '~'],
          ['~', 'G', '~', '~', '~', '~', '~', '~'],
          ['~', 'G', 'G', '~', '~', '~', '~', '~'],
          ['~', '~', '~', '~', '~', '~', '~', '~']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect', 'interact', 'repeat'],
        maxBlocksRecommended: 7
      }
    ]
  },

  // =========================================================================
  // AVVENTURA 2: IL REGNO DEI GHIACCI E DELLE TRACCE
  // =========================================================================
  {
    id: 'ice',
    title: 'Il regno dei ghiacci e delle tracce',
    tagline: 'Traccia figure geometriche luminose sulla neve',
    description:
      'Insieme alle due sorelle esploratrici Aria e Brina, disegna figure geometriche nel regno d’inverno. Ogni tuo passo crea una scia luminosa per risvegliare antichi sigilli magici!',
    characterName: 'Aria & Brina',
    companionName: 'Spirito della Neve',
    themeColor: 'from-blue-600 to-indigo-700',
    accentColor: '#3b82f6',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    skillsLearned: [
      'Geometria computazionale e angoli retti',
      'Costruzione di poligoni (quadrato, rettangolo, stelle)',
      'Rotazioni angolari precise a 90°',
      'Ottimizzazione con cicli RIPETI',
      'Chiusura di percorsi geometrici'
    ],
    totalLevels: 10,
    levels: [
      // Livello 1
      {
        id: 1,
        adventureId: 'ice',
        title: 'La prima traccia',
        subtitle: 'Traccia un segmento retto',
        difficulty: 'Principiante',
        description: 'Fai 3 passi in avanti per tracciare una linea luminosa continua sulla neve fino al totem ghiacciato.',
        hints: [
          'Ogni volta che avanzi, lasci dietro di te una scia di cristallo luminoso!',
          'Avanza di 3 passi verso est.',
          'Usa 3 volte il blocco "Avanti".'
        ],
        conceptExplanation:
          'Un segmento di retta è la traiettoria percorsa da un punto che si muove in linea retta per una distanza determinata.',
        gridWidth: 6,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 4, y: 2 },
        collectibles: [],
        interactables: [],
        grid: [
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S']
        ],
        geometryTarget: {
          name: 'Linea retta',
          description: '3 passi in linea retta',
          targetSides: 1,
          expectedAngles: [],
          mustClose: false,
          minPoints: 4,
          targetShapeType: 'line'
        },
        allowedBlocks: ['forward'],
        maxBlocksRecommended: 3
      },
      // Livello 2
      {
        id: 2,
        adventureId: 'ice',
        title: 'Il sentiero ghiacciato',
        subtitle: 'Segmenti e svolte ad angolo retto',
        difficulty: 'Principiante',
        description: 'Traccia un sentiero a due segmenti: avanza di 2 passi, gira a destra e avanza di altri 2 passi.',
        hints: [
          'Avanza prima di 2 passi, poi ruota a destra verso il basso.',
          'Quando ruoti, la traccia non si allunga: cambia solo la direzione.',
          'Fai altri 2 passi per completare il sentiero ad angolo.'
        ],
        conceptExplanation:
          'L\'angolo retto misura 90°. Una svolta a destra o a sinistra corrisponde a una rotazione di 90 gradi nel piano cartesiano.',
        gridWidth: 6,
        gridHeight: 6,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 3, y: 3 },
        collectibles: [],
        interactables: [],
        grid: [
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S']
        ],
        geometryTarget: {
          name: 'Angolo a L',
          description: '2 segmenti perpendicolari da 2 passi',
          targetSides: 2,
          expectedAngles: [90],
          mustClose: false,
          minPoints: 5,
          targetShapeType: 'corner'
        },
        allowedBlocks: ['forward', 'turn_right', 'turn_left'],
        maxBlocksRecommended: 5
      },
      // Livello 3
      {
        id: 3,
        adventureId: 'ice',
        title: 'L’angolo magico',
        subtitle: 'Traccia una "U" a tre lati',
        difficulty: 'Principiante',
        description: 'Disegna una figura a "U": 2 passi in giù, gira a sinistra, 2 passi, gira a sinistra, 2 passi in su!',
        hints: [
          'Aria parte orientata verso il basso (Sud).',
          'Fai due passi, poi gira per andare a Est, poi gira ancora per tornare verso Nord.',
          'Dovrai usare due volte la svolta a sinistra.'
        ],
        conceptExplanation:
          'Una spezzata aperta è costituita da più segmenti consecutivi non allineati che non tornano al punto di partenza.',
        gridWidth: 6,
        gridHeight: 6,
        startPos: { x: 1, y: 1 },
        startDir: 'S',
        targetPos: { x: 3, y: 1 },
        collectibles: [],
        interactables: [],
        grid: [
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S']
        ],
        geometryTarget: {
          name: 'Canale a U',
          description: '3 lati perpendicolari da 2 passi',
          targetSides: 3,
          expectedAngles: [90, 90],
          mustClose: false,
          minPoints: 7,
          targetShapeType: 'polygon'
        },
        allowedBlocks: ['forward', 'turn_left', 'turn_right'],
        maxBlocksRecommended: 8
      },
      // Livello 4
      {
        id: 4,
        adventureId: 'ice',
        title: 'Il quadrato di cristallo',
        subtitle: 'Poligono regolare chiuso a 4 lati',
        difficulty: 'Intermedio',
        description: 'Disegna un quadrato perfetto di lato 2 passi e torna esattamente al punto di partenza per chiudere il sigillo!',
        hints: [
          'Un quadrato ha 4 lati uguali e 4 angoli retti (90°).',
          'Per ogni lato: avanza di 2 passi e gira a destra (o a sinistra).',
          'Ripeti questa operazione per 4 volte fino a richiudere la figura.'
        ],
        conceptExplanation:
          'Un poligono regolare ha tutti i lati e tutti gli angoli congruenti. La somma degli angoli esterni di qualsiasi poligono convesso è 360° (4 × 90° = 360°).',
        gridWidth: 6,
        gridHeight: 6,
        startPos: { x: 2, y: 1 },
        startDir: 'E',
        targetPos: { x: 2, y: 1 },
        collectibles: [],
        interactables: [],
        grid: [
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S']
        ],
        geometryTarget: {
          name: 'Quadrato di cristallo',
          description: 'Quadrato chiuso di lato 2',
          targetSides: 4,
          expectedAngles: [90, 90, 90, 90],
          mustClose: true,
          minPoints: 8,
          targetShapeType: 'square'
        },
        allowedBlocks: ['forward', 'turn_right', 'turn_left'],
        maxBlocksRecommended: 12
      },
      // Livello 5
      {
        id: 5,
        adventureId: 'ice',
        title: 'La stella incompleta',
        subtitle: 'Traccia una croce simmetrica a 4 bracci',
        difficulty: 'Intermedio',
        description: 'Traccia una croce magica sulla neve: avanza, torna indietro e ruota per tracciare tutti e 4 i bracci cardinali!',
        hints: [
          'Dal centro (3, 3) fai 1 passo avanti sul cristallo, raccoglilo con "Raccogli", gira a destra 2 volte (180°), fai 1 passo avanti per tornare al centro e gira a destra verso il prossimo braccio!',
          'Puoi usare "Gira a destra" o "Gira a sinistra" dal menu e modificarli direttamente con il selettore.',
          'Usa il blocco "RIPETI 4 VOLTE" per ripetere lo schema del singolo braccio in modo compatto ed elegante!'
        ],
        conceptExplanation:
          'Simmetria radiale: una figura presenta simmetria rotazionale se coincide con se stessa dopo una rotazione inferiore a 360° attorno al centro.',
        gridWidth: 7,
        gridHeight: 7,
        startPos: { x: 3, y: 3 },
        startDir: 'N',
        targetPos: { x: 3, y: 3 },
        collectibles: [
          { id: 'star_n', x: 3, y: 2, type: 'crystal' },
          { id: 'star_e', x: 4, y: 3, type: 'crystal' },
          { id: 'star_s', x: 3, y: 4, type: 'crystal' },
          { id: 'star_w', x: 2, y: 3, type: 'crystal' }
        ],
        interactables: [],
        grid: [
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S']
        ],
        geometryTarget: {
          name: 'Stella a 4 punte',
          description: 'Tocca i 4 punti cardinali e torna al centro',
          targetSides: 4,
          expectedAngles: [],
          mustClose: true,
          minPoints: 8,
          targetShapeType: 'cross'
        },
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect', 'repeat'],
        maxBlocksRecommended: 8
      },
      // Livello 6
      {
        id: 6,
        adventureId: 'ice',
        title: 'Il rettangolo delle nevi',
        subtitle: 'Lati paralleli a coppie uguali',
        difficulty: 'Intermedio',
        description: 'Disegna un rettangolo con base di 3 passi e altezza di 2 passi. Chiudi la figura al punto di partenza!',
        hints: [
          'Un rettangolo ha lati opposti uguali e 4 angoli retti: base 3, altezza 2, base 3, altezza 2.',
          'Gira a destra dopo ogni lato.',
          'Assicurati di tornare alla casella di partenza.'
        ],
        conceptExplanation:
          'Il perimetro del rettangolo si calcola con 2 × (base + altezza) = 2 × (3 + 2) = 10 passi complessivi.',
        gridWidth: 7,
        gridHeight: 6,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 1, y: 1 },
        collectibles: [],
        interactables: [],
        grid: [
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S']
        ],
        geometryTarget: {
          name: 'Rettangolo delle nevi',
          description: 'Rettangolo chiuso 3x2',
          targetSides: 4,
          expectedAngles: [90, 90, 90, 90],
          mustClose: true,
          minPoints: 10,
          targetShapeType: 'rectangle'
        },
        allowedBlocks: ['forward', 'turn_right', 'turn_left'],
        maxBlocksRecommended: 12
      },
      // Livello 7
      {
        id: 7,
        adventureId: 'ice',
        title: 'Il poligono segreto',
        subtitle: 'Forma geometrica a scalino',
        difficulty: 'Intermedio',
        description: 'Traccia una figura geometrica a gradini: 1 avanti, 1 a destra, 1 avanti, 1 a sinistra, 1 avanti, 1 a destra.',
        hints: [
          'Alterna svolte a destra e a sinistra per creare una sagoma a zig-zag o a gradini.',
          'Ogni scalino è composto da: Avanti, Gira a destra, Avanti, Gira a sinistra.',
          'Controlla sempre verso quale direzione punti prima di avanzare.'
        ],
        conceptExplanation:
          'Le linee a scalino (Manhattan geometry) compongono traiettorie ortogonali utilizzate sia nei circuiti stampati che nella grafica vettoriale.',
        gridWidth: 6,
        gridHeight: 6,
        startPos: { x: 1, y: 4 },
        startDir: 'N',
        targetPos: { x: 4, y: 1 },
        collectibles: [],
        interactables: [],
        grid: [
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S']
        ],
        geometryTarget: {
          name: 'Scalinata di ghiaccio',
          description: 'Tre scalini ortogonali',
          targetSides: 6,
          expectedAngles: [90, 90, 90, 90, 90],
          mustClose: false,
          minPoints: 7,
          targetShapeType: 'polygon'
        },
        allowedBlocks: ['forward', 'turn_left', 'turn_right'],
        maxBlocksRecommended: 11
      },
      // Livello 8
      {
        id: 8,
        adventureId: 'ice',
        title: 'Il ciclo dei fiocchi',
        subtitle: 'Disegnare un quadrato con RIPETI',
        difficulty: 'Esperto',
        description: 'Disegna un grande quadrato di lato 3 sulla neve usando il blocco "RIPETI 4 VOLTE". Scrivi la soluzione con pochissimi blocchi!',
        hints: [
          'Un quadrato è composto da 4 lati identici.',
          'Un singolo lato si ottiene facendo: 3 passi avanti e girando a destra.',
          'Inserisci questi comandi dentro "RIPETI 4 VOLTE": otterrai un quadrato perfetto con soli 4 blocchi!'
        ],
        conceptExplanation:
          'Algoritmo per poligoni regolari: per qualsiasi poligono con N lati uguali, la formula fondamentale è: RIPETI N VOLTE [ Avanza(L), Ruota(360° / N) ].',
        gridWidth: 7,
        gridHeight: 7,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 1, y: 1 },
        collectibles: [],
        interactables: [],
        grid: [
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S']
        ],
        geometryTarget: {
          name: 'Quadrato grande con ciclo',
          description: 'Quadrato di lato 3 chiuso',
          targetSides: 4,
          expectedAngles: [90, 90, 90, 90],
          mustClose: true,
          minPoints: 12,
          targetShapeType: 'square'
        },
        allowedBlocks: ['forward', 'turn_right', 'repeat'],
        maxBlocksRecommended: 5
      },
      // Livello 9
      {
        id: 9,
        adventureId: 'ice',
        title: 'Il labirinto luminoso',
        subtitle: 'Spirale quadrata concentrica',
        difficulty: 'Esperto',
        description: 'Traccia una spirale decrescente verso il centro: 4 passi, gira a destra, 3 passi, gira a destra, 2 passi, gira a destra, 1 passo!',
        hints: [
          'I lati si accorciano progressivamente di un passo alla volta: 4, 3, 2, 1.',
          'Gira sempre a destra alla fine di ogni segmento.',
          'Il centro del regno dei ghiacci si trova esattamente alla fine dell\'ultimo passo!'
        ],
        conceptExplanation:
          'Spirale aurea discreta: una successione di segmenti ortogonali a lunghezza decrescente che converge verso un punto centrale.',
        gridWidth: 7,
        gridHeight: 7,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 3, y: 3 },
        collectibles: [{ id: 'ice_heart', x: 3, y: 3, type: 'crystal' }],
        interactables: [],
        grid: [
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S']
        ],
        geometryTarget: {
          name: 'Spirale concentrica',
          description: 'Spirale 4-3-2-1 verso il centro',
          targetSides: 4,
          expectedAngles: [90, 90, 90],
          mustClose: false,
          minPoints: 11,
          targetShapeType: 'polygon'
        },
        allowedBlocks: ['forward', 'turn_right', 'turn_left', 'collect'],
        maxBlocksRecommended: 12
      },
      // Livello 10
      {
        id: 10,
        adventureId: 'ice',
        title: 'Il simbolo del regno',
        subtitle: 'Il Gran Sigillo di Ghiaccio',
        difficulty: 'Esperto',
        description: 'Traccia il gran sigillo perimetrale a cornice (4 lati da 4 passi) raccogliendo i 4 cristalli celesti con cicli ottimizzati!',
        hints: [
          'La cornice esterna è un quadrato gigante di 4 passi per lato con un cristallo su ogni vertice.',
          'Usa "RIPETI 4 VOLTE" per: raccogliere il cristallo, avanzare 4 volte, e girare a destra.',
          'Il codice finale sarà compatto ed eseguirà il giro completo del regno!'
        ],
        conceptExplanation:
          'Eleganza del codice: combinare cicli con istruzioni di movimento e raccolta consente di risolvere compiti molto lunghi con pochissime righe di programma.',
        gridWidth: 7,
        gridHeight: 7,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 1, y: 1 },
        collectibles: [
          { id: 'sig1', x: 5, y: 1, type: 'crystal' },
          { id: 'sig2', x: 5, y: 5, type: 'crystal' },
          { id: 'sig3', x: 1, y: 5, type: 'crystal' },
          { id: 'sig4', x: 1, y: 1, type: 'crystal' }
        ],
        interactables: [],
        grid: [
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
          ['S', 'S', 'S', 'S', 'S', 'S', 'S']
        ],
        geometryTarget: {
          name: 'Sigillo supremo',
          description: 'Quadrato perimetrale 4x4 chiuso',
          targetSides: 4,
          expectedAngles: [90, 90, 90, 90],
          mustClose: true,
          minPoints: 16,
          targetShapeType: 'square'
        },
        allowedBlocks: ['forward', 'turn_right', 'collect', 'repeat'],
        maxBlocksRecommended: 6
      }
    ]
  },

  // =========================================================================
  // AVVENTURA 3: IL ROBOT E LA CITTÀ DEL FUTURO
  // =========================================================================
  {
    id: 'city',
    title: 'Il robot e la città del futuro',
    tagline: 'Programma il robot corriere tra strade, pacchi e condizioni',
    description:
      'Guida Volt, il piccolo robot corriere cybernetico, nella metropoli del futuro. Raccogli batterie, consegna pacchi energetici e usa le istruzioni condizionali per decidere come muoverti!',
    characterName: 'Volt il Robot',
    companionName: 'Centrale Cyber-Hub',
    themeColor: 'from-amber-500 to-emerald-600',
    accentColor: '#10b981',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    skillsLearned: [
      'Movimento su reticolo urbano',
      'Raccolta e consegna di risorse',
      'Gestione di ostacoli e cantieri stradali',
      'Cicli di pattugliamento urbano',
      'Istruzioni condizionali (SE ... ALLORA)'
    ],
    totalLevels: 10,
    levels: [
      // Livello 1
      {
        id: 1,
        adventureId: 'city',
        title: 'Il robot si sveglia',
        subtitle: 'Raggiungi la prima stazione',
        difficulty: 'Principiante',
        description: 'Volt deve percorrere il viale principale per raggiungere la colonnina di ricarica rapida.',
        hints: [
          'Le strade asfaltate sono libere, mentre i palazzi sono ostacoli non attraversabili.',
          'Volt è già rivolto verso est lungo il viale.',
          'Avanza dritto di 3 passi per raggiungere la stazione.'
        ],
        conceptExplanation:
          'Gli agenti robotici eseguono percorsi nello spazio calcolando distanze espresse in unità di griglia (passi discreti).',
        gridWidth: 6,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 4, y: 2 },
        collectibles: [],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#'],
          ['.', '.', '.', '.', '.', '.'],
          ['#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward'],
        maxBlocksRecommended: 3
      },
      // Livello 2
      {
        id: 2,
        adventureId: 'city',
        title: 'La batteria smarrita',
        subtitle: 'Raccogli energia di riserva',
        difficulty: 'Principiante',
        description: 'Una cella energetica è caduta sulla strada! Raggiungila, raccoglila con "RACCOGLI" e prosegui.',
        hints: [
          'Volt deve fermarsi sopra la casella della batteria.',
          'Usa "Raccogli" per caricare la batteria nel vano robot.',
          'Fai ancora un passo avanti per raggiungere il punto d\'incontro.'
        ],
        conceptExplanation:
          'Acquisizione di dati o risorse: il robot interagisce con l\'ambiente aggiornando il suo stato interno (inventario).',
        gridWidth: 6,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 4, y: 2 },
        collectibles: [{ id: 'bat1', x: 2, y: 2, type: 'battery' }],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#'],
          ['.', '.', '.', '.', '.', '.'],
          ['#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'collect'],
        maxBlocksRecommended: 4
      },
      // Livello 3
      {
        id: 3,
        adventureId: 'city',
        title: 'La prima consegna',
        subtitle: 'Raccogli il pacco e consegnalo',
        difficulty: 'Principiante',
        description: 'Preleva il pacco al magazzino, portalo alla stazione di consegna e premi "INTERAGISCI" per recapitarlo!',
        hints: [
          'Avanza e raccogli il pacco.',
          'Gira a sinistra e avanza fino all\'armadietto delle consegne.',
          'Quando sei sopra l\'armadietto, usa "Interagisci" per completare la consegna!'
        ],
        conceptExplanation:
          'Flusso input-processing-output: prelevare una risorsa, trasferirla attraverso il percorso e scaricarla a destinazione.',
        gridWidth: 6,
        gridHeight: 6,
        startPos: { x: 1, y: 4 },
        startDir: 'E',
        targetPos: { x: 3, y: 1 },
        collectibles: [{ id: 'pkg1', x: 3, y: 4, type: 'package' }],
        interactables: [
          {
            id: 'drop1',
            x: 3,
            y: 1,
            type: 'dropoff',
            label: 'Ufficio Consegne'
          }
        ],
        grid: [
          ['#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', 'D', '#', '#'],
          ['#', '#', '#', '.', '#', '#'],
          ['#', '#', '#', '.', '#', '#'],
          ['#', '.', '.', '.', '#', '#'],
          ['#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect', 'interact'],
        maxBlocksRecommended: 7
      },
      // Livello 4
      {
        id: 4,
        adventureId: 'city',
        title: 'Le strade bloccate',
        subtitle: 'Deviazione e aggiramento ostacoli',
        difficulty: 'Intermedio',
        description: 'Due barriere arancioni di cantiere (X) bloccano la corsia diretta. Ricorda: in informatica le barriere stradali non si possono rimuovere, si devono AGGIRARE! Trova la deviazione nel vicolo aperto sottostante per raggiungere la piazza.',
        hints: [
          'Le barriere stradali e i coni (X) sono ostacoli invalicabili: non cercare di romperli, la soluzione è prendere la deviazione nel vicolo aperto sottostante!',
          'Dalla partenza a (1, 2) fai 1 passo avanti a (2, 2) -> gira a destra verso sud -> fai 1 passo avanti a (2, 3) per scendere nel vicolo!',
          'Nel vicolo gira a sinistra verso est, fai 3 passi avanti fino a (5, 3), poi gira a sinistra verso nord e avanza per salire al traguardo (5, 2)!'
        ],
        conceptExplanation:
          'Pathfinding e aggiramento ostacoli: quando il percorso diretto è ostruito da blocchi o cantieri, un algoritmo intelligente calcola una rotta alternativa priva di collisioni.',
        gridWidth: 7,
        gridHeight: 6,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 5, y: 2 },
        collectibles: [],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', 'X', 'X', '.', '#'],
          ['#', '#', '.', '.', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right'],
        maxBlocksRecommended: 9
      },
      // Livello 5
      {
        id: 5,
        adventureId: 'city',
        title: 'La stazione energetica',
        subtitle: 'Raccogli e riattiva il generatore',
        difficulty: 'Intermedio',
        description: 'La città è senza luce! Raccogli la super-batteria al neon e attivala nella Centrale Termica.',
        hints: [
          'Prendi la batteria posta all\'incrocio con il blocco "Raccogli".',
          'Svolta verso la centrale con una rotazione corretta.',
          'Usa "Interagisci" per avviare il generatore principale della città.'
        ],
        conceptExplanation:
          'Dipendenze operative: certe azioni non possono essere completate se le pre-condizioni (avere la risorsa necessaria) non sono verificate.',
        gridWidth: 7,
        gridHeight: 6,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 5, y: 4 },
        collectibles: [{ id: 'bat_super', x: 4, y: 1, type: 'power_core' }],
        interactables: [
          {
            id: 'station_main',
            x: 5,
            y: 4,
            type: 'station',
            label: 'Centrale Energetica'
          }
        ],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '#', '#'],
          ['#', '#', '#', '#', '.', '#', '#'],
          ['#', '#', '#', '#', '.', '.', '#'],
          ['#', '#', '#', '#', '#', 'S', '#'],
          ['#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect', 'interact'],
        maxBlocksRecommended: 9
      },
      // Livello 6
      {
        id: 6,
        adventureId: 'city',
        title: 'Il percorso efficiente',
        subtitle: 'Raccogli 2 celle in successione',
        difficulty: 'Intermedio',
        description: 'Due server urbani hanno perso le loro batterie. Raccoglile entrambe e approda al centro di manutenzione.',
        hints: [
          'Pianifica l\'ordine: raccogli la prima batteria lungo la strada, poi svolta per prendere la seconda.',
          'Assicurati di avere entrambe le batterie nel contatore in alto prima di entrare al centro.',
          'Minimizza i cambi di direzione per rendere il programma più rapido.'
        ],
        conceptExplanation:
          'Efficienza degli algoritmi: trovare percorsi che riducono il numero complessivo di passi e svolte riduce il tempo di esecuzione.',
        gridWidth: 7,
        gridHeight: 6,
        startPos: { x: 1, y: 1 },
        startDir: 'S',
        targetPos: { x: 5, y: 1 },
        collectibles: [
          { id: 'b1', x: 1, y: 4, type: 'battery' },
          { id: 'b2', x: 5, y: 4, type: 'battery' }
        ],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '#', '#', '#', '.', '#'],
          ['#', '.', '#', '#', '#', '.', '#'],
          ['#', '.', '#', '#', '#', '.', '#'],
          ['#', '.', '.', '.', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect'],
        maxBlocksRecommended: 13
      },
      // Livello 7
      {
        id: 7,
        adventureId: 'city',
        title: 'Il giro della città',
        subtitle: 'Ciclo di pattugliamento urbano',
        difficulty: 'Esperto',
        description: 'Volt deve fare un giro quadrato completo di pattuglia attorno al parco tecnologico usando "RIPETI".',
        hints: [
          'La strada attorno al parco è un anello quadrato con 4 lati identici di 3 passi ciascuno.',
          'Raccogli le 4 micro-batterie poste su ciascun lato usando un ciclo.',
          'Struttura del ciclo: RIPETI 4 VOLTE [ Avanza 3 volte, Raccogli, Gira a destra ].'
        ],
        conceptExplanation:
          'Astrazione iterativa: riconoscere pattern ricorrenti in una mappa e compattarli in una singola formula ripetibile.',
        gridWidth: 7,
        gridHeight: 7,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 1, y: 1 },
        collectibles: [
          { id: 'pat1', x: 4, y: 1, type: 'battery' },
          { id: 'pat2', x: 5, y: 4, type: 'battery' },
          { id: 'pat3', x: 2, y: 5, type: 'battery' },
          { id: 'pat4', x: 1, y: 2, type: 'battery' }
        ],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '.', '#'],
          ['#', '.', '#', '#', '#', '.', '#'],
          ['#', '.', '#', '#', '#', '.', '#'],
          ['#', '.', '#', '#', '#', '.', '#'],
          ['#', '.', '.', '.', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_right', 'collect', 'repeat'],
        maxBlocksRecommended: 5
      },
      // Livello 8
      {
        id: 8,
        adventureId: 'city',
        title: 'Il semaforo intelligente',
        subtitle: 'Istruzioni condizionali: SE ... ALLORA',
        difficulty: 'Esperto',
        description: 'La corsia ha un sensore! Usa il blocco "SE la strada davanti è libera ALLORA avanza" per muoverti in sicurezza.',
        hints: [
          'Il blocco condizionale verifica lo stato dell\'ambiente prima di eseguire l\'azione.',
          'Se c\'è un ostacolo o un muro, il blocco "SE" salta l\'istruzione evitando l\'incidente.',
          'Combina la condizione con un ciclo o usala per decidere se avanzare o svoltare.'
        ],
        conceptExplanation:
          'Le strutture condizionali (Branching IF) permettono a un programma di prendere decisioni dinamiche in base alle informazioni rilevate dai sensori.',
        gridWidth: 7,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 5, y: 2 },
        collectibles: [{ id: 'sens1', x: 3, y: 2, type: 'battery' }],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect', 'if', 'repeat'],
        conditionOptions: [
          { id: 'front_clear', label: 'Davanti è libero' },
          { id: 'has_battery', label: 'Batteria raccolta' }
        ],
        maxBlocksRecommended: 5
      },
      // Livello 9
      {
        id: 9,
        adventureId: 'city',
        title: 'Le consegne multiple',
        subtitle: 'Logistica avanzata su più tappe',
        difficulty: 'Esperto',
        description: 'Raccogli i 2 pacchi espressi sparsi nel quartiere e recapitali al Terminale di Smistamento Centrale!',
        hints: [
          'Raccogli il primo pacco a nord, poi scendi lungo il corso per raccogliere il secondo a sud.',
          'Una volta ottenuti entrambi i pacchi, dirigi Volt verso il terminale contrassegnato con D.',
          'Premi "Interagisci" per completare la doppia consegna.'
        ],
        conceptExplanation:
          'Gestione dello stato multi-variabile: monitorare contatori multipli di inventario nel corso dell\'esecuzione.',
        gridWidth: 8,
        gridHeight: 6,
        startPos: { x: 1, y: 3 },
        startDir: 'E',
        targetPos: { x: 6, y: 3 },
        collectibles: [
          { id: 'mpkg1', x: 3, y: 1, type: 'package' },
          { id: 'mpkg2', x: 3, y: 4, type: 'package' }
        ],
        interactables: [
          {
            id: 'hub_central',
            x: 6,
            y: 3,
            type: 'dropoff',
            label: 'Terminale Smistamento'
          }
        ],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '.', '#', '#', '#', '#'],
          ['#', '#', '#', '.', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '.', 'D', '#'],
          ['#', '#', '#', '.', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect', 'interact', 'repeat'],
        maxBlocksRecommended: 12
      },
      // Livello 10
      {
        id: 10,
        adventureId: 'city',
        title: 'La città riparte',
        subtitle: 'La Torre Cybernetica Centrale',
        difficulty: 'Esperto',
        description: 'La grande missione finale: raccogli i 3 Super-Nuclei Energetici della città e attiva la Torre Centrale!',
        hints: [
          'Ci sono 3 nuclei energetici nei vicoli laterali.',
          'Pianifica il tragitto dividendo il percorso isolato per isolato.',
          'Quando raggiungi la Torre Centrale a destra, usa "INTERAGISCI" per riaccendere tutta la metropoli del futuro!'
        ],
        conceptExplanation:
          'Progetto computazionale integrato: sequenze complesse, rotazioni relative, gestione delle risorse e interazione finale per risolvere una missione su larga scala.',
        gridWidth: 8,
        gridHeight: 7,
        startPos: { x: 1, y: 5 },
        startDir: 'N',
        targetPos: { x: 6, y: 1 },
        collectibles: [
          { id: 'nuc1', x: 1, y: 1, type: 'power_core' },
          { id: 'nuc2', x: 4, y: 1, type: 'power_core' },
          { id: 'nuc3', x: 4, y: 5, type: 'power_core' }
        ],
        interactables: [
          {
            id: 'city_tower',
            x: 6,
            y: 1,
            type: 'station',
            label: 'Torre Cybernetica'
          }
        ],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '#', 'T', '#'],
          ['#', '.', '#', '#', '.', '#', '.', '#'],
          ['#', '.', '#', '#', '.', '.', '.', '#'],
          ['#', '.', '#', '#', '.', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect', 'interact', 'repeat', 'if'],
        conditionOptions: [
          { id: 'front_clear', label: 'Davanti è libero' },
          { id: 'has_battery', label: 'Cella raccolta' }
        ],
        maxBlocksRecommended: 16
      }
    ]
  },
  // =========================================================================
  // AVVENTURA PER ESPERTI: LA STAZIONE SPAZIALE ORBITALE (TUTTI LIVELLI ESPERTO)
  // =========================================================================
  {
    id: 'space',
    title: 'La stazione spaziale orbitale',
    tagline: 'Solo per programmatori esperti: labirinti quantistici, laser e condizioni avanzate',
    description:
      'Guida l’astronauta cibernetico Nova nella stazione orbitale Nexus. Tutti i 10 livelli sono classificati come ESPERTO: richiedono algoritmi complessi, cicli annidati, aggiramento laser e condizioni sui sensori!',
    characterName: 'Nova l’Astronauta',
    companionName: 'AI Orbitale Nexus',
    themeColor: 'from-purple-600 via-indigo-700 to-slate-900',
    accentColor: '#9333ea',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    skillsLearned: [
      'Algoritmi complessi e percorsi ottimali',
      'Gestione di ostacoli estremi (vuoto e laser)',
      'Cicli RIPETI annidati e perimetrali',
      'Condizionali SE ... ALLORA avanzati',
      'Attivazione sequenziale multi-terminale'
    ],
    totalLevels: 10,
    levels: [
      // Livello 1
      {
        id: 1,
        adventureId: 'space',
        title: 'Attivazione reattore',
        subtitle: 'Labirinto nel vuoto cosmico',
        difficulty: 'Esperto',
        description: 'La stazione è isolata! Nova deve percorrere il corridoio d\'acciaio sospeso sul vuoto cosmico (#) per raggiungere il primo snodo.',
        hints: [
          'Non cadere nel vuoto nero dello spazio!',
          'Calcola esattamente il numero di passi e le rotazioni ad angolo retto.',
          'Avanza di 2 passi, gira a sinistra, avanza di 3 passi, gira a destra e fai gli ultimi 2 passi.'
        ],
        conceptExplanation:
          'Nei sistemi critici aerospaziali ogni istruzione deve essere deterministica: una sola mossa errata provoca un fallimento irreparabile.',
        gridWidth: 7,
        gridHeight: 6,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 5, y: 4 },
        collectibles: [{ id: 'q1', x: 3, y: 1, type: 'power_core' }],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '#', '#', '#'],
          ['#', '#', '#', '.', '#', '#', '#'],
          ['#', '#', '#', '.', '#', '#', '#'],
          ['#', '#', '#', '.', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect'],
        maxBlocksRecommended: 9
      },
      // Livello 2
      {
        id: 2,
        adventureId: 'space',
        title: 'Il campo laser',
        subtitle: 'Deviazione tra barriere energetiche',
        difficulty: 'Esperto',
        description: 'Le barriere laser (X) tagliano il corridoio principale. Trova la deviazione perfetta nel condotto di manutenzione!',
        hints: [
          'Le barriere rosse (X) disintegrano il circuito di Nova.',
          'Devia verso l\'alto o verso il basso dove ci sono le piastre metalliche.',
          'Raccogli il nucleo energetico e punta al portale di teletrasporto.'
        ],
        conceptExplanation:
          'Algoritmi di evitamento ostacoli (obstacle avoidance) in tempo reale su reticoli spaziali discreti.',
        gridWidth: 7,
        gridHeight: 6,
        startPos: { x: 1, y: 3 },
        startDir: 'E',
        targetPos: { x: 5, y: 3 },
        collectibles: [{ id: 'q_laser', x: 3, y: 1, type: 'power_core' }],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '.', '#'],
          ['#', '.', '#', 'X', '#', '.', '#'],
          ['#', '.', '.', 'X', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect'],
        maxBlocksRecommended: 11
      },
      // Livello 3
      {
        id: 3,
        adventureId: 'space',
        title: 'I tre nuclei quantistici',
        subtitle: 'Pianificazione complessa a tappe',
        difficulty: 'Esperto',
        description: 'Tre nuclei quantistici sono instabili nei laboratori. Devi recuperarli tutti e tre prima di accedere al ponte di comando!',
        hints: [
          'Organizza un percorso a pettine per raccogliere prima il nucleo superiore, poi quello centrale, poi quello inferiore.',
          'Usa "Passo singolo" per controllare ogni rotazione.',
          'Assicurati di non saltare nessun nucleo!'
        ],
        conceptExplanation:
          'Problema del commesso viaggiatore (TSP): determinare il tragitto a costo minimo per visitare tutti i nodi di una rete.',
        gridWidth: 7,
        gridHeight: 7,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 5, y: 5 },
        collectibles: [
          { id: 'qk1', x: 5, y: 1, type: 'power_core' },
          { id: 'qk2', x: 3, y: 3, type: 'power_core' },
          { id: 'qk3', x: 1, y: 5, type: 'power_core' }
        ],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '.', '#'],
          ['#', '#', '#', '.', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '.', '#'],
          ['#', '#', '#', '.', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect'],
        maxBlocksRecommended: 16
      },
      // Livello 4
      {
        id: 4,
        adventureId: 'space',
        title: 'L’anello gravitazionale',
        subtitle: 'Pattugliamento quantico con RIPETI',
        difficulty: 'Esperto',
        description: 'La ruota gravitazionale ha 4 sezioni identiche da 3 passi con 4 nuclei agli angoli. Usa RIPETI 4 VOLTE!',
        hints: [
          'La ruota è quadrata: ogni lato misura 3 passi di piastre metalliche.',
          'Ad ogni angolo raccogli il nucleo e gira a destra.',
          'Scrivi un programma di soli 4 blocchi per vincere 3 stelle!'
        ],
        conceptExplanation:
          'Simmetria computazionale circolare: compattare una sequenza di oltre 16 istruzioni in un unico ciclo elegante.',
        gridWidth: 7,
        gridHeight: 7,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 1, y: 1 },
        collectibles: [
          { id: 'grav1', x: 5, y: 1, type: 'power_core' },
          { id: 'grav2', x: 5, y: 5, type: 'power_core' },
          { id: 'grav3', x: 1, y: 5, type: 'power_core' },
          { id: 'grav4', x: 1, y: 1, type: 'power_core' }
        ],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '.', '#'],
          ['#', '.', '#', '#', '#', '.', '#'],
          ['#', '.', '#', '#', '#', '.', '#'],
          ['#', '.', '#', '#', '#', '.', '#'],
          ['#', '.', '.', '.', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_right', 'collect', 'repeat'],
        maxBlocksRecommended: 5
      },
      // Livello 5
      {
        id: 5,
        adventureId: 'space',
        title: 'Sensori nel buio',
        subtitle: 'Navigazione condizionale autonoma',
        difficulty: 'Esperto',
        description: 'Una fessura nello scafo blocca alcuni settori. Usa "SE davanti è libero ALLORA avanza" per superare il corridoio!',
        hints: [
          'Il blocco condizionale interroga i sensori di prossimità di Nova.',
          'Se rileva il vuoto o un laser, non avanza ed evita la collisione.',
          'Metti la condizione dentro un ciclo o una serie ordinata di verifiche.'
        ],
        conceptExplanation:
          'Sistemi di guida reattiva autonoma: l\'agente software reagisce all\'ambiente senza percorsi pre-calcolati statici.',
        gridWidth: 8,
        gridHeight: 5,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 6, y: 2 },
        collectibles: [{ id: 'core_sens', x: 3, y: 2, type: 'power_core' }],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect', 'if', 'repeat'],
        conditionOptions: [
          { id: 'front_clear', label: 'Davanti è libero' },
          { id: 'has_battery', label: 'Nucleo raccolto' }
        ],
        maxBlocksRecommended: 4
      },
      // Livello 6
      {
        id: 6,
        adventureId: 'space',
        title: 'La spirale quantica',
        subtitle: 'Convergenza al centro reattore',
        difficulty: 'Esperto',
        description: 'Traccia una traiettoria a spirale verso il nucleo centrale: 4 passi, gira a destra, 3 passi, gira a destra, 2 passi, gira a destra, 1 passo!',
        hints: [
          'I corridoi formano una spirale perfetta che converge verso il centro (3, 3).',
          'Svolta a destra alla fine di ciascun segmento.',
          'Raccogli il nucleo centrale al termine dell\'ultimo passo.'
        ],
        conceptExplanation:
          'Spirali di Ulam e traiettorie convergenti: geometrie iterative a passo scalare decrescente.',
        gridWidth: 7,
        gridHeight: 7,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 3, y: 3 },
        collectibles: [{ id: 'spiral_core', x: 3, y: 3, type: 'power_core' }],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '.', '#'],
          ['#', '.', '.', '.', '#', '.', '#'],
          ['#', '.', '#', '#', '#', '.', '#'],
          ['#', '.', '.', '.', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_right', 'turn_left', 'collect'],
        maxBlocksRecommended: 12
      },
      // Livello 7
      {
        id: 7,
        adventureId: 'space',
        title: 'Condizione sui componenti',
        subtitle: 'Decisione basata sull’inventario',
        difficulty: 'Esperto',
        description: 'Raccogli il nucleo quantistico; se lo possiedi, attiva la svolta verso il portale di scarico!',
        hints: [
          'Usa il blocco "SE Cella raccolta ALLORA gira a destra" dopo aver preso il nucleo.',
          'Se non hai ancora preso il nucleo, il blocco condizionale non girerà.',
          'In questo modo il programma esegue la mossa solo quando lo stato interno è valido.'
        ],
        conceptExplanation:
          'State-driven decision logic: il comportamento del robot cambia radicalmente in base al contenuto della memoria di lavoro.',
        gridWidth: 7,
        gridHeight: 6,
        startPos: { x: 1, y: 2 },
        startDir: 'E',
        targetPos: { x: 3, y: 4 },
        collectibles: [{ id: 'cond_core', x: 3, y: 2, type: 'power_core' }],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '#', '#', '#'],
          ['#', '#', '#', '.', '#', '#', '#'],
          ['#', '#', '#', '.', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect', 'if', 'repeat'],
        conditionOptions: [
          { id: 'has_battery', label: 'Cella raccolta' },
          { id: 'front_clear', label: 'Davanti è libero' }
        ],
        maxBlocksRecommended: 6
      },
      // Livello 8
      {
        id: 8,
        adventureId: 'space',
        title: 'Camera di decompressione',
        subtitle: 'Sequenza rigorosa con terminale',
        difficulty: 'Esperto',
        description: 'Raccogli la chiave cibernetica, raggiungi la console e premi "INTERAGISCI" per sigillare la camera d\'aria!',
        hints: [
          'Devi prima raccogliere la chiave posta nel braccio nord.',
          'Poi ridiscendi e punta verso la console terminale a est.',
          'Usa "Interagisci" sopra il terminale per completare la procedura di pressurizzazione.'
        ],
        conceptExplanation:
          'Protocolli di sicurezza informatica industriale: autorizzazione (token di accesso) prima di inviare comandi all\'attuatore hardware.',
        gridWidth: 8,
        gridHeight: 6,
        startPos: { x: 1, y: 4 },
        startDir: 'N',
        targetPos: { x: 6, y: 2 },
        collectibles: [{ id: 'airlock_key', x: 1, y: 1, type: 'power_core' }],
        interactables: [
          {
            id: 'airlock_console',
            x: 6,
            y: 2,
            type: 'terminal',
            label: 'Console Pressurizzazione'
          }
        ],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '.', 'T', '#'],
          ['#', '.', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '#', '#', '#', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect', 'interact', 'repeat'],
        maxBlocksRecommended: 10
      },
      // Livello 9
      {
        id: 9,
        adventureId: 'space',
        title: 'Il ponte di energia',
        subtitle: 'Serpentina estrema a larghezza 1',
        difficulty: 'Esperto',
        description: 'Un ponte energetico sottilissimo a zig-zag sopra il buio stellare. Richiede 8 svolte perfette senza errori!',
        hints: [
          'Ogni curva richiede una svolta a 90° precisa (destra o sinistra).',
          'Puoi usare il selettore nel blocco "Gira" per impostare subito destra o sinistra.',
          'Testa il percorso con "Passo singolo" per non rischiare di cadere!'
        ],
        conceptExplanation:
          'Ingegneria della precisione nei cammini vincolati: quando il margine di errore (tolerance) è zero, la verifica formale del codice è indispensabile.',
        gridWidth: 8,
        gridHeight: 6,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 6, y: 4 },
        collectibles: [
          { id: 'bridge_c1', x: 3, y: 1, type: 'power_core' },
          { id: 'bridge_c2', x: 5, y: 3, type: 'power_core' }
        ],
        interactables: [],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '#', '#', '#', '#'],
          ['#', '#', '#', '.', '.', '#', '#', '#'],
          ['#', '#', '#', '#', '.', '.', '#', '#'],
          ['#', '#', '#', '#', '#', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect', 'repeat'],
        maxBlocksRecommended: 13
      },
      // Livello 10
      {
        id: 10,
        adventureId: 'space',
        title: 'Il portale galattico',
        subtitle: 'La grande sfida computazionale finale',
        difficulty: 'Esperto',
        description: 'Recupera i 4 Super-Nuclei Quantistici dai 4 laboratori periferici, raggiungi il Portale Centrale e usa "INTERAGISCI" per attivare l\'ipersalto!',
        hints: [
          'Ci sono 4 nuclei quantistici disposti nei 4 angoli della stazione orbitale.',
          'Pianifica una rotta che visiti i 4 laboratori in modo circolare o a otto.',
          'Quando tutti i 4 nuclei sono caricati nel vano di Nova, posizionati al centro e usa "Interagisci" per completare la sfida finale!'
        ],
        conceptExplanation:
          'Integrazione architetturale suprema: ciclo iterativo, memoria di stato complessa, aggiramento ostacoli e interazione finale per il successo della missione.',
        gridWidth: 8,
        gridHeight: 8,
        startPos: { x: 1, y: 1 },
        startDir: 'E',
        targetPos: { x: 4, y: 4 },
        collectibles: [
          { id: 'nuc_alpha', x: 6, y: 1, type: 'power_core' },
          { id: 'nuc_beta', x: 6, y: 6, type: 'power_core' },
          { id: 'nuc_gamma', x: 1, y: 6, type: 'power_core' },
          { id: 'nuc_delta', x: 3, y: 1, type: 'power_core' }
        ],
        interactables: [
          {
            id: 'hyperspace_portal',
            x: 4,
            y: 4,
            type: 'terminal',
            label: 'Portale Iperspazio'
          }
        ],
        grid: [
          ['#', '#', '#', '#', '#', '#', '#', '#'],
          ['#', '.', '.', '.', '.', '.', '.', '#'],
          ['#', '.', '#', '#', '#', '#', '.', '#'],
          ['#', '.', '.', '.', '.', '#', '.', '#'],
          ['#', '.', '#', '.', 'T', '.', '.', '#'],
          ['#', '.', '#', '#', '#', '#', '.', '#'],
          ['#', '.', '.', '.', '.', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '#', '#', '#']
        ],
        allowedBlocks: ['forward', 'turn_left', 'turn_right', 'collect', 'interact', 'repeat', 'if'],
        conditionOptions: [
          { id: 'front_clear', label: 'Davanti è libero' },
          { id: 'has_battery', label: 'Cella raccolta' }
        ],
        maxBlocksRecommended: 18
      }
    ]
  }
];

export function getAdventure(id: AdventureId): Adventure | undefined {
  return ADVENTURES.find((a) => a.id === id);
}

export function getLevel(adventureId: AdventureId, levelId: number) {
  const adv = getAdventure(adventureId);
  return adv?.levels.find((l) => l.id === levelId);
}
