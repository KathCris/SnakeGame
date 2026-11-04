<template>
  <div>
    <div
      ref="containerRef"
      class="w-full h-full min-h-screen flex items-center justify-center pt-10 pb-10 pl-25 pr-25"
    >
      <canvas ref="canvasRef" class="w-full h-full rounded-lg"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref(null);
const containerRef = ref(null);
let resizeObserver = null;

const size = 34; // Tamanho de cada quadrado em pixels
const colorLight = "#88E788"; // Verde claro
const colorDark = "#1fa700"; // Verde escuro
const borderThickness = 10;

const drawGridAndBorder = () => {
  const container = containerRef.value;
  const canvas = canvasRef.value;
  const ctx = canvas?.getContext("2d");
  if (!ctx || !container) return;

  // Ajusta o tamanho do canvas para ocupar todo o container
  canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
  canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

  ctx.strokeStyle = "#006400"; // Verde escuro (DarkGreen)
  ctx.lineWidth = borderThickness;

  // Loops para preencher a tela com os quadrados alternados
  for (let y = 0; y < canvas.height; y += size) {
    for (let x = 0; x < canvas.width; x += size) {
      // A lógica chave: soma os índices da linha e coluna.
      // Se for par, desenha verde claro. Se for ímpar, desenha verde escuro.
      const isEven = (Math.floor(x / size) + Math.floor(y / size)) % 2 === 0;

      ctx.fillStyle = isEven ? colorLight : colorDark;
      ctx.fillRect(x, y, size, size);
    }
  }

  ctx.strokeRect(
    borderThickness / 2,
    borderThickness / 2,
    canvas.width - borderThickness,
    canvas.height - borderThickness,
  );
};

onMounted(() => {
  drawGridAndBorder();

  // Cria o Observer para redesenhar sempre que o contêiner mudar de tamanho
  resizeObserver = new ResizeObserver(() => {
    // requestAnimationFrame evita travamentos na tela durante o redimensionamento
    requestAnimationFrame(drawGridAndBorder);
  });

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value);
  }
});

// limpa o observer quando o componente for desmontado
onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>
