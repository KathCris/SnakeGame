<template>
    <div class="min-w-lvw min-h-lvh absolute z-30 flex justify-center items-center flex-col gap-7">
        <div class="bg-blue-400 w-[366px] h-[400px] rounded-2xl flex flex-col items-center pt-5">
            <h1 class="text-white text-4xl font-bold">Start Game</h1>
            <div class="flex items-center justify-between">
                <div class="flex flex-col justify-center items-center gap-3">
                    <AppleIcon />
                    <h2 class="text-white text-2xl font-bold">2</h2>
                </div>
                <div class="flex flex-col justify-center items-center gap-3">
                    <AppleIcon />
                    <h2 class="text-white text-2xl font-bold">2</h2>
                </div>
            </div>
        </div>
        <button class="bg-blue-600 w-[366px] h-12 rounded-2xl text-amber-50">
             Start
        </button>
    </div>
  <div class="bg-gray-700 opacity-55 min-w-lvw min-h-lvh absolute z-20">
  </div>
</template>

<script>
import AppleIcon from './AppleIcon.vue';
import {
  PhTrophy
} from "@phosphor-icons/vue";
</script>