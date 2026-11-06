<template>
  <div
    class="w-full min-h-12 flex items-center justify-center rounded-t-lg pl-5 pr-5"
    style="background-color: #006400"
  >
    <div class="w-full h-full flex items-center gap-6">
      <div class="flex items-center gap-2">
         <AppleIcon />
        <span class="text-white text-sm font-bold">{{ appleCount }}</span>
      </div>
      <div class="flex items-center gap-2">
        <PhTrophy :size="30" color="#d2af32" weight="fill" />
        <span class="text-white text-sm font-bold">{{ trophyCount }}</span>
      </div>
    </div>
    <div>
      <template v-if="speaker">
        <PhSpeakerHigh
          :size="25"
          color="#d2af32"
          weight="fill"
          @click="toggleSpeaker"
        />
      </template>
      <template v-else>
        <PhSpeakerSimpleSlash
          :size="25"
          color="#d2af32"
          weight="fill"
          @click="toggleSpeaker"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  PhTrophy,
  PhAppleLogo,
  PhSpeakerHigh,
  PhSpeakerSimpleSlash,
} from "@phosphor-icons/vue";
import AppleIcon from "./AppleIcon.vue";
const appleCount = ref(10);
const trophyCount = ref(0);
const speaker = ref(true);

const toggleSpeaker = () => {
  speaker.value = !speaker.value;
};

const incrementApple = () => {
  appleCount.value++;
};

const incrementTrophy = () => {
  trophyCount.value++;
};
</script>
