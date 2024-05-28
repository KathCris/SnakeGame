<template>
  <div v-if="showButtonStart" class="containerButtonStart">
    <button @click="startGame" class="buttonStart" type="button">Iniciar jogo</button>
  </div>
  <div v-if="showButtonStart" class="screenOpacity" />
    <div class="configContainerCanvas">
      <canvas
        :width="600"
        :height="600"
        ref="board"
        :style="{ backgroundColor: bgColorRefBoard }"
      />
  </div>
  <!-- <div class="apple">
    <div class="apple-body"></div>
    <div class="apple-leaf"></div>
    <div class="apple-stem"></div>
  </div> -->
</template>


<script lang="ts">
// import defineComponent from 'nuxt'

export default{
  data() {
    return {
      numberRandomToApply: 1,
      numberRandomToSnake: 1, 
      showButtonStart: true,
      context: null,
      bgColorRefBoard: ref('green'),
      sizeSquares: 24,
      qtdSquares: 30,
      snakeTrail: 0,
      // snakeTrail: [],
      snakeTrailX: 15,
      snakeTrailY: 15,
      AppleX: 10,
      AppleY: 10,
      speedX: 0,
      speedY: 0,
    }
  },
  
  mounted() {
    this.createBoard()
  },

  computed: {
  },

  created() {
    console.log('Component has been created')

    this.numberRandomToApply = Math.floor(Math.random() * (20 - 1 + 1)) + 1
    this.numberRandomToSnake = Math.floor(Math.random() * (20 - 1 + 1)) + 1
  },


  // Methods
  methods: {
    createBoard () {
      this.snakeTrail = 5
      const refBoard = this.$refs.board as HTMLCanvasElement
      const context = refBoard?.getContext('2d')

      if (context) {
        const size = this.sizeSquares;
        const qtdSquares = this.qtdSquares;

        for (let row = 0; row < qtdSquares; row++) {
          for (let col = 0; col < qtdSquares; col++) {
            const x = col * size
            const y = row * size

            if ((row + col) % 2 === 0) {
              context.fillStyle = '#92DC70' // Light
            } else {
              context.fillStyle = '#85CB64' // Dark
            }

            context.fillRect(x, y, size, size)

            // CREATE AND PLOT APLLY 
            this.AppleX = this.numberRandomToApply
            this.AppleY = this.numberRandomToApply
            context.fillStyle = "red"
            context.fillRect(this.AppleX * this.sizeSquares, this.AppleY * this.sizeSquares, this.sizeSquares, this.sizeSquares)
            

            // CREATE AND PLOT SNAke 
            this.snakeTrailX = this.numberRandomToSnake
            this.snakeTrailY = this.numberRandomToSnake
            context.fillStyle = "gray"
            context.fillRect(this.snakeTrailX * this.sizeSquares, this.snakeTrailY * this.sizeSquares, this.snakeTrail * this.sizeSquares, this.sizeSquares)
          }
        }
      }
    },

    startGame () {
      this.showButtonStart = false
    },


    processingGame () {
      this.snakeTrailX = this.speedX
      this.snakeTrailY = this.speedY

      if(this.snakeTrailX < 0) {
        // this.endGame()
      } 
    }
  },
};
</script>


<style scoped>

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

