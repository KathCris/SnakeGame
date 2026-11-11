<template>
  <div>
    <StartModal v-if="!isGameStarted" @start-game="iniciarJogo" />
    <Board :is-playing="isGameStarted" />
  </div>
</template>

<script setup>
import Board from "./Board.vue";
import StartModal from "./StartModal.vue";
import { ref } from "vue";

const isGameStarted = ref(false);

function iniciarJogo() {
  isGameStarted.value = true;
}
</script>
