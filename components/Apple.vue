<template>
  <div
    class="absolute -translate-x-1/2 -translate-y-1/2"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
    }"
  >
    <div class="grid grid-cols-[28px] grid-rows-[12px_28px] place-items-center items-center justify-center animate-bounce shadow-lg">
      <div
        class="col-start-1 row-start-1 w-[3px] h-3 bg-yellow-800 rounded-lg mr-2 shadow-lg rotate-[-30deg]"
      />
      <div
        class="col-start-1 row-start-1 w-[10px] h-3 bg-green-600 rounded-tr-full rounded-bl-full ml-2 shadow-lg border border-gray-600 rotate-[90deg]"
      />
      <div
        class="col-start-1 row-start-2 w-7 h-7 bg-red-500 rounded-full shadow-lg -mt-0.5 z-10"
      >
        <div
          class="w-1 h-1.5 bg-gray-300 rounded-full absolute top-[20px] left-2 -translate-x-1/2 -translate-y-1/2 shadow-lg"
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
