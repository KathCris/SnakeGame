<template>
  <div style="background-color: #7DC55C; height: 100vh; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center;">
    <canvas
      :width="600"
      :height="600"
      ref="board"
      :style="{ backgroundColor: bgColorRefBoard }"
    />
  </div>
</template>


<script lang="ts">
// import defineComponent from 'nuxt'


export default{
  data() {
    return {
      bgColorRefBoard: ref('green'),
      sizeSquares: 24,
      qtdSquares: 30,
    }
  },

  computed: {
  },

  created() {
    console.log('Component has been created')
  },

  mounted() {
    const refBoard = this.$refs.board as HTMLCanvasElement;
    const ctx = refBoard?.getContext('2d');

    if (ctx) {
      const size = this.sizeSquares;
      const qtdSquares = this.qtdSquares;

      for (let row = 0; row < qtdSquares; row++) {
        for (let col = 0; col < qtdSquares; col++) {
          const x = col * size;
          const y = row * size;

          if ((row + col) % 2 === 0) {
            ctx.fillStyle = '#92DC70'; // Light
          } else {
            ctx.fillStyle = '#85CB64'; // Dark
          }

          ctx.fillRect(x, y, size, size);
        }
      }
    }
  },

  // Methods
  methods: {
  },
};
</script>

