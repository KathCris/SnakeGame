<template>
  <div
    ref="containerRef"
    class="w-full h-screen max-h-screen flex flex-col items-center pt-5 pb-10 pl-25 pr-25"
  >
    <HeaderBoard :is-muted="isMuted" @toggle-mute="toggleMute" :apple-count="appleCount" :trophy-count="trophyCount"/>
    <div
      ref="boardAreaRef"
      class="relative w-full flex-1 min-h-0 overflow-hidden rounded-b-lg"
    >
      <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />

      <div class="absolute inset-0 pointer-events-none">
        <Apple
          :x="(applePosition.col + 0.5) * size"
          :y="(applePosition.row + 0.5) * size"
        />
      </div>
      <div class="absolute inset-0 pointer-events-none">
        <Snake
          :segments="snakeSegments"
          :direction="direction"
          :animation-duration="speed"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import HeaderBoard from "./HeaderBoard.vue";
import Apple from "./Apple.vue";
import Snake from "./Snake.vue";
import { useGameSounds } from "~/composables/useGameSounds";

const props = defineProps({
  isPlaying: {
    type: Boolean,
    default: false,
  },
});

const isMuted = ref(false);
const AUDIO_STORAGE_KEY = "is-muted";

const loadAudioPreference = () => {
  const savedPreference = localStorage.getItem(AUDIO_STORAGE_KEY);

  isMuted.value = savedPreference === "true";
};

const toggleMute = () => {
  isMuted.value = !isMuted.value;

  localStorage.setItem(
    AUDIO_STORAGE_KEY,
    String(isMuted.value)
  );
};

const { unlockAudio, playBite, playTurn, playGameOver } = useGameSounds();

const canvasRef = ref(null);
const boardAreaRef = ref(null);

let resizeObserver = null;

let rowCount = 0;
let colCount = 0;

const size = 34;
const colorLight = "#88E788";
const colorDark = "#1fa700";
const borderThickness = 10;

// row 1 to 16 and col 1 to 37

// Posição da maçã no tabuleiro (linha e coluna)
const applePosition = ref({
  row: 17,
  col: 38,
});


const appleCount = ref(0);
const trophyCount = ref(0)

const incrementApple = () => {
  appleCount.value++;
  incrementTrophy();
};

const TROPHY_STORAGE_KEY = "trophy-count";

const loadTrophyCount = () => {
  const savedTrophyCount = localStorage.getItem(TROPHY_STORAGE_KEY);

  trophyCount.value = savedTrophyCount;
};

const incrementTrophy = () => {
  if(trophyCount.value < appleCount.value){
    trophyCount.value++;
    localStorage.setItem(TROPHY_STORAGE_KEY, trophyCount.value);
  } else {
    return trophyCount.value
  }
};

const drawGridAndBorder = () => {
  const canvas = canvasRef.value;
  const boardArea = boardAreaRef.value;
  const ctx = canvas?.getContext("2d");

  if (!ctx || !boardArea) return;

  canvas.width = boardArea.clientWidth;
  canvas.height = boardArea.clientHeight;

  rowCount = Math.floor(canvas.height / size);
  colCount = Math.floor(canvas.width / size);

  // Desenha os quadrados alternados
  for (let y = 0; y < canvas.height; y += size) {
    for (let x = 0; x < canvas.width; x += size) {
      const isEven = (Math.floor(x / size) + Math.floor(y / size)) % 2 === 0;

      ctx.fillStyle = isEven ? colorLight : colorDark;
      ctx.fillRect(x, y, size, size);
    }
  }

  // Desenha a borda
  const halfThickness = borderThickness / 2;

  ctx.strokeStyle = "#006400";
  ctx.lineWidth = borderThickness;

  ctx.beginPath();
  ctx.moveTo(canvas.width - halfThickness, 0);
  ctx.lineTo(canvas.width - halfThickness, canvas.height - halfThickness);
  ctx.lineTo(halfThickness, canvas.height - halfThickness);
  ctx.lineTo(halfThickness, 0);
  ctx.stroke();
};

const getRandomRow = () => {
  return Math.floor(Math.random() * (rowCount - 1)) + 1;
};

const getRandomCol = () => {
  return Math.floor(Math.random() * (colCount - 1)) + 1;
};

const generateApple = () => {
  let newApplePosition;

  do {
    newApplePosition = {
      row: getRandomRow(),
      col: getRandomCol(),
    };
  } while (
    snakeSegments.value.some(
      (segment) =>
        segment.row === newApplePosition.row &&
        segment.col === newApplePosition.col,
    )
  );

  applePosition.value = newApplePosition;
};

//AREA DA MOVIMENTAÇÃO DA COBRA
// Posição inicial da cobra com movimentação por parte do corpo
const snakeSegments = ref([
  { row: 5, col: 5 }, // Cabeça
  { row: 5, col: 4 }, // Corpo
  { row: 5, col: 3 },
  { row: 5, col: 2 }, // Cauda
]);

// Direção inicial da cobra
const direction = ref("right");
// Próxima direção solicitada
const nextDirection = ref("right");

// Velocidade da cobra (milissegundos)
const speed = 120;

//Start da movimentação da cobra
let movementInterval = null;

const keyDirections = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",

  w: "up",
  s: "down",
  a: "left",
  d: "right",

  W: "up",
  S: "down",
  A: "left",
  D: "right",
};

const oppositeDirections = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const handleKeydown = async (event) => {
  const newDirection = keyDirections[event.key];

  if (!newDirection) return;

  event.preventDefault();

  // Impede que a cobra vire diretamente para trás
  if (newDirection === oppositeDirections[direction.value]) {
    return;
  }

  if (newDirection !== nextDirection.value && isMuted.value === false) {
    // Primeiro desbloqueia o áudio
    await unlockAudio();

    nextDirection.value = newDirection;

    // Depois reproduz o som
    playTurn();
  }

  nextDirection.value = newDirection;
};

let isGameOver = false;

const endGame = () => {
  if (isGameOver) return;

  isGameOver = true;

  if(isMuted.value === false) {
    playGameOver();
  }

  clearInterval(movementInterval);
  movementInterval = null;

  console.log("Game Over!");
};

const moveSnake = () => {
  direction.value = nextDirection.value;

  const head = snakeSegments.value[0];

  const newHead = { ...head };

  switch (direction.value) {
    case "up":
      newHead.row -= 1;
      break;

    case "down":
      newHead.row += 1;
      break;

    case "left":
      newHead.col -= 1;
      break;

    case "right":
      newHead.col += 1;
      break;
  }

  // Verifica os limites do tabuleiro
  const isOutOfBounds =
    newHead.row < 0 ||
    newHead.row >= rowCount ||
    newHead.col < 0 ||
    newHead.col >= colCount;

  if (isOutOfBounds) {
    endGame();
    return;
  }

  // Verifica se a cabeça encontrou a maçã
  const ateApple =
    newHead.row === applePosition.value.row &&
    newHead.col === applePosition.value.col;

  // Verifica colisão com o próprio corpo
  const bodyToCheck = ateApple
    ? snakeSegments.value
    : snakeSegments.value.slice(0, -1);

  const hitBody = bodyToCheck.some(
    (segment) => segment.row === newHead.row && segment.col === newHead.col,
  );

  if (hitBody) {
    endGame();
    return;
  }

  // Adiciona a nova cabeça
  const newSegments = [newHead, ...snakeSegments.value];

  // Se não comeu a maçã, remove a cauda
  if (!ateApple) {
    newSegments.pop();
  }

  snakeSegments.value = newSegments;

  // Se comeu a maçã, gera outra
  if (ateApple) {
    if (isMuted.value === false) {
      playBite();
    }
    generateApple();
    incrementApple();
  }
};

onMounted(() => {
  drawGridAndBorder();
  loadAudioPreference();
  loadTrophyCount();

  // Inicializa a cobra no centro do tabuleiro
  const centerRow = Math.floor(rowCount / 2);
  const centerCol = Math.floor(colCount / 2);

  snakeSegments.value = [
    { row: centerRow, col: centerCol },
    { row: centerRow, col: centerCol - 1 },
    { row: centerRow, col: centerCol - 2 },
    { row: centerRow, col: centerCol - 3 },
  ];

  // Gera a primeira maçã
  generateApple();

  // Captura os comandos do teclado
  window.addEventListener("keydown", handleKeydown);

  // Observer de redimensionamento
  resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(drawGridAndBorder);
  });

  if (boardAreaRef.value) {
    resizeObserver.observe(boardAreaRef.value);
  }
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();

  window.removeEventListener("keydown", handleKeydown);

  if (movementInterval) {
    clearInterval(movementInterval);
  }
});

// Observa quando isPlaying mudar de false para true
watch(
  () => props.isPlaying,
  async (newValue) => {
    if (newValue === true) {
      console.log("O botão Start foi clicado! Iniciar movimento da cobra.");
      // Chame aqui a função que inicia o intervalo/loop do jogo
      await unlockAudio();
      // Inicia a movimentação
      movementInterval = setInterval(moveSnake, speed);
    }
  },
);
</script>
