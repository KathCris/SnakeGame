<template>
  <div
    class="min-w-lvw min-h-lvh absolute z-30 flex justify-center items-center flex-col gap-7"
  >
    <div
      class="bg-blue-300 w-[360px] h-[400px] rounded-2xl flex flex-col pt-5 justify-between"
    >
      <div class="flex flex-col gap-10 items-center">
        <h1 class="text-white text-4xl font-bold">Start Game</h1>
        <div class="flex items-center justify-between gap-10">
          <div class="flex flex-col justify-center items-center gap-3">
            <AppleIcon />
            <h2 class="text-white text-2xl font-bold">2</h2>
          </div>
          <div class="flex flex-col justify-center items-center gap-3">
            <PhTrophy :size="32" color="#d2af32" weight="fill" />
            <h2 class="text-white text-2xl font-bold">2</h2>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div class="w-44 h-9 bg-blue-500 flex justify-end rounded-r-2xl">
            <!-- Olhos -->
            <div
                class="flex items-center justify-center -mt-10 mr-5"
              >
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
              <div class="relative flex gap-2 top-2 -left-1.5">
                <div
                  class="w-1 h-1 bg-gray-800 rounded-full "
                />
                <div
                  class="w-1 h-1 bg-gray-800 rounded-full"
                />
              </div>
              <!-- Boca -->
               <div class="flex absolute">
                <div class="w-20 h-3 border-b-2 border-l-2 border-blue-600 rounded-bl-2xl mt-2.5" />
               </div>
          </div>
        </div>
        <div class="flex flex-wrap w-full justify-center">
          <div class="flex w-fit" v-for="n in 18" :key="n">
            <div v-if="n % 2 !== 0" class="w-10 h-9 bg-green-600 flex" />
            <div
              v-else
              :class="{
                'w-10 h-9 bg-green-500 flex': n % 2 === 0,
                'rounded-bl-2xl': n === 10,
                'rounded-br-2xl': n === 18,
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      @click="emit('start-game')"
      class="flex items-center bg-blue-600 w-[366px] h-12 rounded-2xl text-amber-50 hover:bg-blue-800 hover:cursor-pointer gap-5 p-5"
    >
      <PhPlay :size="20" color="#fafafa" weight="fill" />
      Start
    </button>
  </div>
  <div class="bg-gray-700 opacity-55 min-w-lvw min-h-lvh absolute z-20"></div>
</template>

<script setup>
import AppleIcon from "./AppleIcon.vue";
import { PhTrophy, PhPlay } from "@phosphor-icons/vue";

const emit = defineEmits(['start-game']);
</script>
