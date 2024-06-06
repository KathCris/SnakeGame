<template>
    <div>
      <canvas ref="board" :width="canvasSize" :height="canvasSize"></canvas>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
  
  export default defineComponent({
    setup() {
      const canvasSize = 400;
      const cellSize = 20;
      const board = ref<HTMLCanvasElement | null>(null);
      const ctx = ref<CanvasRenderingContext2D | null>(null);
      const snake = ref([{ x: 5, y: 5 }]);
      const direction = ref({ x: 1, y: 0 });
      const food = ref(generateRandomFood());
  
      let intervalId: number;
  
      function generateRandomFood() {
        return {
          x: Math.floor(Math.random() * (canvasSize / cellSize)),
          y: Math.floor(Math.random() * (canvasSize / cellSize))
        };
      }
  
      function drawBoard() {
        if (!ctx.value) return;
        ctx.value.clearRect(0, 0, canvasSize, canvasSize);
  
        // Draw food
        ctx.value.fillStyle = 'red';
        ctx.value.fillRect(food.value.x * cellSize, food.value.y * cellSize, cellSize, cellSize);
  
        // Draw snake
        ctx.value.fillStyle = 'green';
        snake.value.forEach(segment =>
          ctx.value?.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize)
        );
      }
  
      function moveSnake() {
        const newHead = {
          x: snake.value[0].x + direction.value.x,
          y: snake.value[0].y + direction.value.y
        };
  
        // Game over conditions
        if (
          newHead.x < 0 || newHead.x >= canvasSize / cellSize ||
          newHead.y < 0 || newHead.y >= canvasSize / cellSize ||
          snake.value.some(segment => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          clearInterval(intervalId);
          alert('Game Over');
          return;
        }
  
        // Add new head
        snake.value.unshift(newHead);
  
        // Check for food collision
        if (newHead.x === food.value.x && newHead.y === food.value.y) {
          food.value = generateRandomFood();
        } else {
          snake.value.pop();
        }
      }
  
      function updateGame() {
        moveSnake();
        drawBoard();
      }
  
      function changeDirection(event: KeyboardEvent) {
        switch (event.key) {
          case 'ArrowUp': if (direction.value.y === 0) direction.value = { x: 0, y: -1 }; break;
          case 'ArrowDown': if (direction.value.y === 0) direction.value = { x: 0, y: 1 }; break;
          case 'ArrowLeft': if (direction.value.x === 0) direction.value = { x: -1, y: 0 }; break;
          case 'ArrowRight': if (direction.value.x === 0) direction.value = { x: 1, y: 0 }; break;
        }
      }
  
      onMounted(() => {
        if (board.value) ctx.value = board.value.getContext('2d');
        intervalId = window.setInterval(updateGame, 60);
        window.addEventListener('keydown', changeDirection);
      });
  
      onBeforeUnmount(() => {
        clearInterval(intervalId);
        window.removeEventListener('keydown', changeDirection);
      });
  
      return { board, canvasSize };
    }
  });
  </script>
  
  <style scoped>
  canvas {
    border: 1px solid black;
    display: block;
    margin: 0 auto;
  }
  </style>
  