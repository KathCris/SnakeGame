
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import HeaderBoard from "./HeaderBoard.vue";
import Apple from "./Apple.vue";

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

onMounted(() => {
  drawGridAndBorder();
  applePosition.value.row = getRandomRow();
  applePosition.value.col = getRandomCol();

  resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(drawGridAndBorder);
  });

  if (boardAreaRef.value) {
    resizeObserver.observe(boardAreaRef.value);
  }
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
});
</script>
