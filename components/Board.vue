
<template>
  <div
    ref="containerRef"
    class="w-full h-screen max-h-screen flex flex-col items-center pt-5 pb-10 pl-25 pr-25"
  >
    <HeaderBoard />

    <div
      ref="boardAreaRef"
      class="relative w-full flex-1 min-h-0 overflow-hidden rounded-b-lg"
    >
      <canvas
        ref="canvasRef"
        class="absolute inset-0 w-full h-full"
      />

      <div class="absolute inset-0 pointer-events-none">
        <Apple
          :x="(applePosition.col + 0.5) * size"
          :y="(applePosition.row + 0.5) * size"
        />
      </div>
      <!-- <div class="absolute inset-0 pointer-events-none">
        <Snake
          :x="150"
          :y="150"
        />
      </div> -->
      <div class="absolute inset-0 pointer-events-none">
  <Snake
    :x="(snakePosition.col + 0.5) * size"
    :y="(snakePosition.row + 0.5) * size"
    :direction="direction"
  />
</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import HeaderBoard from "./HeaderBoard.vue";
import Apple from "./Apple.vue";
import Snake from "./Snake.vue";

const canvasRef = ref(null);
const containerRef = ref(null);
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
      const isEven =
        (Math.floor(x / size) + Math.floor(y / size)) % 2 === 0;

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

//AREA DA MOVIMENTAÇÃO DA COBRA
// Posição inicial da cobra
const snakePosition = ref({
  row: 5,
  col: 5,
});

// Direção atual da cobra
const direction = ref("right");

// Próxima direção solicitada
const nextDirection = ref("right");

// Velocidade da cobra (milissegundos)
const speed = 60;

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

const handleKeydown = (event) => {
  const newDirection = keyDirections[event.key];

  if (!newDirection) return;

  event.preventDefault();

  // Impede que a cobra vire diretamente para trás
  if (newDirection === oppositeDirections[direction.value]) {
    return;
  }

  nextDirection.value = newDirection;
};

const moveSnake = () => {
  direction.value = nextDirection.value;

  const newPosition = {
    ...snakePosition.value,
  };

  switch (direction.value) {
    case "up":
      newPosition.row -= 1;
      break;

    case "down":
      newPosition.row += 1;
      break;

    case "left":
      newPosition.col -= 1;
      break;

    case "right":
      newPosition.col += 1;
      break;
  }

  // Verifica os limites do tabuleiro
  const isOutOfBounds =
    newPosition.row < 0 ||
    newPosition.row >= rowCount ||
    newPosition.col < 0 ||
    newPosition.col >= colCount;

  if (isOutOfBounds) {
    clearInterval(movementInterval);
    movementInterval = null;

    console.log("Game Over!");

    return;
  }

  // Atualiza a posição da cobra
  snakePosition.value = newPosition;
};

onMounted(() => {
  // Desenha o tabuleiro e calcula suas dimensões
  drawGridAndBorder();

  // Posiciona a cobra no centro do tabuleiro
  snakePosition.value = {
    row: Math.floor(rowCount / 2),
    col: Math.floor(colCount / 2),
  };

  // Registra os eventos do teclado
  window.addEventListener("keydown", handleKeydown);

  // Inicia a movimentação automática
  movementInterval = setInterval(moveSnake, speed);

  // Observer para redimensionamento
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

</script>
