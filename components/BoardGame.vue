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
import { ref } from "vue"

export default{
  data() {
    return {
      numberRandomToApply: 1,
      numberRandomToSnake: 1, 
      showButtonStart: true,
      bgColorRefBoard: ref('green'),
      sizeSquares: 24,
      qtdSquares: 30,
      snakeTail: 0,
      trail: [{
        x: 10,
        y: 1
      }],
      snakeTrailX: 15,
      snakeTrailY: 15,
      AppleX: 10,
      AppleY: 10,
      positionX: 0,
      positionY: 0,
      contextCanvas: ref<CanvasRenderingContext2D  | null>(null),
      refBoard: ref<HTMLCanvasElement | null>(null),
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
      this.snakeTail = 5
      this.refBoard = this.$refs.board as HTMLCanvasElement
      this.contextCanvas = this.refBoard?.getContext('2d')

      if (this.contextCanvas) {
        const size = this.sizeSquares;
        const qtdSquares = this.qtdSquares;

        for (let row = 0; row < qtdSquares; row++) {
          for (let col = 0; col < qtdSquares; col++) {
            const x = col * size
            const y = row * size

            if ((row + col) % 2 === 0) {
              this.contextCanvas.fillStyle = '#92DC70' // Light
            } else {
              this.contextCanvas.fillStyle = '#85CB64' // Dark
            }

            this.contextCanvas.fillRect(x, y, size, size)

            // CREATE AND PLOT APLLY 
            this.AppleX = this.numberRandomToApply
            this.AppleY = this.numberRandomToApply
            this.contextCanvas.fillStyle = "red"
            this.contextCanvas.fillRect(this.AppleX * this.sizeSquares, this.AppleY * this.sizeSquares, this.sizeSquares, this.sizeSquares)
            

            // CREATE AND PLOT SNAke 
            // this.snakeTrailX = this.numberRandomToSnake
            // this.snakeTrailY = this.numberRandomToSnake
            // this.contextCanvas.fillStyle = "gray"
            // this.contextCanvas.fillRect(this.snakeTrailX * this.sizeSquares, this.snakeTrailY * this.sizeSquares, this.snakeTail * this.sizeSquares, this.sizeSquares)
          }
        }
      }
    },

    startGame () {
      this.showButtonStart = false
      setInterval(() => {this.processingGame()}, 60)
    },

    processingGame () {    

      console.log('processingGame')
      
      if(this.snakeTrailX < 0 || 
          this.snakeTrailX > this.qtdSquares || 
          this.snakeTrailY < 0 || 
          this.snakeTrailY > this.qtdSquares) {
            this.endGame()
      }

      if(this.contextCanvas) {
        for (let index = 0; index < this.trail.length; index++) {
          this.contextCanvas.fillStyle = "gray"
          this.contextCanvas?.fillRect(this.trail[index].x*this.sizeSquares, this.trail[index].y*this.sizeSquares, 
                                        this.snakeTail * this.sizeSquares, this.sizeSquares)
        }
      }
      this.trail[0].x = this.snakeTrailX
      this.trail[0].y = this.snakeTrailY

      // while (this.trail.length > this.snakeTail) {
      //   const calcTailX = this.snakeTail - this.trail[0].x
      //   const calcTailY = this.snakeTail - this.trail[0].y

      //   console.log('calcTailX', calcTailX)
      //   console.log('calcTailY', calcTailY)
      // }

      // vereficação para aumentar o tamanho da cobra
      if(this.AppleX === this.snakeTrailX && this.AppleY === this.snakeTrailY) {
        this.trail[0].x + 1
        this.trail[0].y + 1
        // random of apple
        this.AppleX = Math.floor(Math.random()*this.qtdSquares)
        this.AppleY = Math.floor(Math.random()*this.qtdSquares)
      }
    },

    endGame () {
      console.log('Perdeu o jogo!')
    },

    // keyPush (event: any) {
    //     switch (event.keyCode) {
    //       case 37:
            
    //         break;
        
    //       default:
    //         break;
    //     }
    // }
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

