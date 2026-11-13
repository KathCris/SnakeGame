
<template>
  <div>
    <StartModal
      v-if="!isGameStarted || isGameOver"
      :is-game-over="isGameOver"
      @start-game="iniciarJogo"
    />

    <Board
      :key="boardKey"
      :is-playing="isGameStarted"
      @end-game="endGame"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Board from "./Board.vue";
import StartModal from "./StartModal.vue";

const isGameStarted = ref(false);
const isGameOver = ref(false);
const boardKey = ref(0);

function iniciarJogo() {
  boardKey.value++;
  isGameOver.value = false;
  isGameStarted.value = true;
}

function endGame() {
  isGameOver.value = true;
}
</script>
