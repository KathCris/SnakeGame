<template>
  <div class="absolute inset-0 pointer-events-none">
    <div
      v-for="(segment, index) in segments"
      :key="index"
      class="absolute flex items-center justify-center"
      :style="{
        width: `${size}px`,
        height: `${size}px`,
        left: `${(segment.col + 0.5) * size}px`,
        top: `${(segment.row + 0.5) * size}px`,
        transform: `translate(-50%, -50%) ${index === 0 ? `rotate(${rotation}deg)` : ''}`,
        transition: 'left 120ms linear, top 120ms linear',
        zIndex: segments.length - index,
      }"
    >
      <!-- Cabeça -->
      <div
        v-if="index === 0"
        class="w-10 h-7 bg-blue-500 rounded-r-2xl shadow-lg relative"
      >
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

      <!-- Corpo -->
      <div v-else class="w-full h-7 bg-blue-500 last:rounded-l-3xl" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  segments: {
    type: Array,
    required: true,
  },
  direction: {
    type: String,
    default: "right",
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
</script>
