<template>
  <div class="absolute inset-0 pointer-events-none">
    <!-- Corpo inteiro da cobra -->
    <svg
      class="absolute inset-0 w-full h-full"
      :viewBox="`0 0 ${cols * size} ${rows * size}`"
      preserveAspectRatio="none"
      style="overflow: visible; z-index: 1"
    >
      <path
        v-if="segments.length > 1"
        :d="bodyPath"
        fill="none"
        stroke="#3B82F6"
        :stroke-width="size - 6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <!-- Cabeça -->
    <div
      v-if="animatedSegments.length"
      class="absolute flex items-center justify-center"
      :style="{
        width: `${size}px`,
        height: `${size}px`,
        left: `${(animatedSegments[0].col + 0.5) * size}px`,
        top: `${(animatedSegments[0].row + 0.5) * size}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        zIndex: 2,
      }"
    >
      <div class="w-10 h-7 bg-blue-500 rounded-r-2xl shadow-lg relative">
        <!-- Olhos -->
        <div class="flex flex-col items-center justify-center -mt-2.5 -ml-10">
          <div
            class="w-6 h-6 bg-gray-300 rounded-full border-4 border-blue-500 shadow-lg relative"
          >
            <div
              class="w-2 h-2 bg-gray-800 rounded-full absolute top-2 right-2 translate-x-2 -translate-y-1/2"
            />
          </div>

          <div
            class="w-6 h-6 bg-gray-300 rounded-full border-4 border-blue-500 shadow-lg relative"
          >
            <div
              class="w-2 h-2 bg-gray-800 rounded-full absolute top-2 right-2 translate-x-2 -translate-y-1/2"
            />
          </div>
        </div>

        <!-- Nariz -->
        <div>
          <div class="w-1 h-1 bg-gray-800 rounded-full absolute top-1 left-4" />
          <div
            class="w-1 h-1 bg-gray-800 rounded-full absolute bottom-1 left-4"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onBeforeUnmount } from "vue";

const props = defineProps({
  segments: {
    type: Array,
    required: true,
  },
  direction: {
    type: String,
    default: "right",
  },
  animationDuration: {
    type: Number,
    default: 150,
  },
});

const size = 34;

const rotation = computed(() => {
  const rotations = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  };

  return rotations[props.direction];
});

// Conecta o centro de cada segmento em um único caminho
const bodyPath = computed(() => {
  return animatedSegments.value
    .map((segment, index) => {
      const x = (segment.col + 0.5) * size;
      const y = (segment.row + 0.5) * size;

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
});

// Posições visuais dos segmentos
const animatedSegments = ref(props.segments.map((segment) => ({ ...segment })));

let animationFrame = null;

watch(
  () => props.segments,
  (newSegments) => {
    // Cancela a animação anterior, caso ainda esteja acontecendo
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    // Posição atual exibida na tela
    const startPositions = animatedSegments.value.map((segment) => ({
      ...segment,
    }));

    // Posições finais recebidas da movimentação do jogo
    const targetPositions = newSegments.map((segment) => ({ ...segment }));

    const startTime = performance.now();
    const duration = props.animationDuration;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      animatedSegments.value = targetPositions.map((target, index) => {
        // Quando a cobra cresce, o novo segmento começa na posição da cauda anterior
        const start =
          startPositions[index] ??
          startPositions[startPositions.length - 1] ??
          target;

        return {
          row: start.row + (target.row - start.row) * progress,
          col: start.col + (target.col - start.col) * progress,
        };
      });

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        animationFrame = null;
      }
    };

    animationFrame = requestAnimationFrame(animate);
  },
  { flush: "sync" },
);

onBeforeUnmount(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>
