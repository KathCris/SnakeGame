<template>
  <div>
    <div
      ref="containerRef"
      class="w-full h-full max-h-screen flex flex-col items-center justify-center pt-5 pb-10 pl-25 pr-25"
    >
      <HeaderBoard />
      <canvas ref="canvasRef" class="w-full h-full rounded-b-lg"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import HeaderBoard from "./HeaderBoard.vue";

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


  // desenha a borda interna em apenas 3 lados (exclui o topo)
  const halfThickness = borderThickness / 2;
  ctx.beginPath();
  // começa no topo direito
  ctx.moveTo(canvas.width - halfThickness, 0);
  // desce até o canto inferior direito
  ctx.lineTo(canvas.width - halfThickness, canvas.height - halfThickness);
  // vai para o canto inferior esquerdo
  ctx.lineTo(halfThickness, canvas.height - halfThickness);
  // sobe até o topo esquerdo
  ctx.lineTo(halfThickness, 0);
  
  // Executa o desenho da linha aberta
  ctx.stroke();
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
