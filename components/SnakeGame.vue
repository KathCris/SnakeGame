<template style="background-color: 'blue'">
  <!-- <div>
    <canvas ref="board" :width="canvasSize" :height="canvasSize"></canvas>
  </div> -->

  <div v-if="showGameOver" class="screenOpacityGameOver">
    <h1 class="titleGameOver">Game over!</h1>
    <button @click="restartGame" class="buttonStart" type="button">Jogar novamente</button>
  </div>
  <div v-if="showButtonStart" class="containerButtonStart">
    <button @click="startGame" class="buttonStart" type="button">Iniciar jogo</button>
  </div>
  <div v-if="showButtonStart" :class="{'screenOpacity': showButtonStart, 'screenOpacityGameOver': showGameOver}" />
    <div class="configContainerCanvas">
      <canvas
        :width="canvasSize" 
        :height="canvasSize"
        ref="board"
        :style="{ backgroundColor: bgColorRefBoard }"
      />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
  data() {
    return {
      canvasSize: 600,
      cellSize: 20,
      showButtonStart: true,
      showGameOver: false,
      bgColorRefBoard: ref('green'),
      board: ref<HTMLCanvasElement | null>(null),
      contextCanvas: ref<CanvasRenderingContext2D | null>(null),
      snake: [{ x: 5, y: 5 }],
      direction: { x: 1, y: 0 },
      food: { x: 0, y: 0 },
      intervalId: 0 as number,
    };
  },

  methods: {
    generateRandomFood() {
        this.food.x= Math.floor(Math.random() * (this.canvasSize / this.cellSize)),
        this.food.y= Math.floor(Math.random() * (this.canvasSize / this.cellSize))
    },

    drawBoard() {
      this.board = this.$refs.board as HTMLCanvasElement
      this.contextCanvas = this.board?.getContext('2d')

      if (this.contextCanvas) {
        // Draw background with alternating colors
        this.contextCanvas.clearRect(0, 0, this.canvasSize, this.canvasSize);

        for (let row = 0; row < this.canvasSize / this.cellSize; row++) {
          for (let col = 0; col < this.canvasSize / this.cellSize; col++) {
            this.contextCanvas.fillStyle = (row + col) % 2 === 0 ? '#92DC70' : '#85CB64';
            this.contextCanvas.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
          }
        }  
  
        // Draw food
        this.contextCanvas.fillStyle = 'red';
        this.contextCanvas.fillRect(this.food.x * this.cellSize, this.food.y * this.cellSize, this.cellSize, this.cellSize);
  
        // Draw snake
        this.contextCanvas.fillStyle = 'gray';
        this.snake.forEach(segment =>
          this.contextCanvas?.fillRect(segment.x * this.cellSize, segment.y * this.cellSize, this.cellSize, this.cellSize)
        );
      }

    },

    moveSnake() {
      const newHead = {
        x: this.snake[0].x + this.direction.x,
        y: this.snake[0].y + this.direction.y
      };


      // Game over conditions
      if (
        newHead.x < 0 || newHead.x >= this.canvasSize / this.cellSize ||
        newHead.y < 0 || newHead.y >= this.canvasSize / this.cellSize ||
        this.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        // alert('Game Over');
        this.gameOver()
      }

      // Add new head
      this.snake.unshift(newHead);

      // Check for food collision
      if (newHead.x === this.food.x && newHead.y === this.food.y) {
        this.generateRandomFood();
        // this.food = this.generateRandomFood();
      } else {
        this.snake.pop();
      }
    },

    gameOver () {
      clearInterval(this.intervalId);
      this.showGameOver = true
      this.generateRandomFood()
      this.snake= [{ x: 0, y: 0 }]
    },


    startGame () {
      
      this.showButtonStart = false

      this.intervalId = window.setInterval(this.updateGame, 60);
      window.addEventListener('keydown', this.changeDirection);
    },

    restartGame () {
      
      this.showGameOver = false

      this.intervalId = window.setInterval(this.updateGame, 60);
      window.addEventListener('keydown', this.changeDirection);
    },

    updateGame() {
      this.moveSnake();
      this.drawBoard();
    },

    changeDirection(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowUp': if (this.direction.y === 0) this.direction = { x: 0, y: -1 }; break;
        case 'ArrowDown': if (this.direction.y === 0) this.direction = { x: 0, y: 1 }; break;
        case 'ArrowLeft': if (this.direction.x === 0) this.direction = { x: -1, y: 0 }; break;
        case 'ArrowRight': if (this.direction.x === 0) this.direction = { x: 1, y: 0 }; break;
      }
    }
  },

  mounted() {
    // if (this.board) {
    //   console.log('entrei')
    //   this.contextCanvas = this.board.getContext('2d'); 
    //   this.food = this.generateRandomFood();
    // }
    this.generateRandomFood()
    this.drawBoard();
    // this.intervalId = window.setInterval(this.startUpdateGame, 60);
    // window.addEventListener('keydown', this.changeDirection);
  },

  beforeUnmount() {
    clearInterval(this.intervalId);
    window.removeEventListener('keydown', this.changeDirection);
  }
});
</script>


<style scoped>

.titleGameOver {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 32px;
  color: white;
}

canvas {
  border: 1px solid black;
  display: block;
  margin: 0 auto;
}

.buttonStart {
  padding: 16px 32px;
  font-size: larger;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: dodgerblue;
}
.buttonStart:hover{
  background-color: rgb(25, 108, 190);
  cursor: pointer;
}

.screenOpacity {
  background-color: black; 
  height: 100vh; 
  width: 100%; 
  position: absolute; 
  z-index: 10; 
  opacity: 0.6;
}
.screenOpacityGameOver {
  background-color: black; 
  height: 100vh; 
  width: 100%; 
  position: absolute; 
  z-index: 10; 
  opacity: 0.6;


  width: 100%; 
  display: flex; 
  flex-direction: column;
  position: absolute; 
  z-index: 20; 
  justify-content: center; 
  align-items: center; 
  height: 100vh;
}

.configContainerCanvas {
  position: relative; 
  background-color: #7DC55C; 
  height: 100vh; 
  margin: 0; 
  padding: 0; 
  display: flex; 
  justify-content: center; 
  align-items: center;
}

.containerGameOver{
  width: 100%; 
  display: flex; 
  flex-direction: column;
  position: absolute; 
  z-index: 20; 
  justify-content: center; 
  align-items: center; 
  height: 100vh;
}
.containerButtonStart{
  width: 100%; 
  display: flex; 
  position: absolute; 
  z-index: 20; 
  justify-content: center; 
  align-items: center; 
  height: 100vh;
}

/*  */
.apple {
  position: relative;
  width: 100px;
  height: 100px;
}

.apple-body {
  width: 100%;
  height: 100%;
  background: red;
  border-radius: 50%;
}

.apple-leaf {
  width: 30px;
  height: 20px;
  background: green;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  left: 35px;
  transform: rotate(-45deg);
  z-index: 20;
}

.apple-stem {
  width: 10px;
  height: 20px;
  background: brown;
  position: absolute;
  top: -20px;
  left: 45px;
}
</style>