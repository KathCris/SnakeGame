<template>
  <div
    class="absolute -translate-x-1/2 -translate-y-1/2"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
    }"
  >
    <div class="flex items-center justify-center">
      <div class="w-40 h-8 bg-blue-500 rounded-2xl shadow-lg" />
      <div class="flex flex-col items-center justify-center -mt-1 -ml-11">
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
      <div class="flex flex-col items-center justify-center -mt-1 -ml-3">
        <div
          class="w-1.5 h-1.5 bg-gray-600 rounded-full absolute top-[16px] -right-5 translate-x-2 -translate-y-1/2"
        />
        <div
          class="w-1.5 h-1.5 bg-gray-600 rounded-full absolute top-[28px] -right-5 translate-x-2 -translate-y-1/2"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
});
</script>
