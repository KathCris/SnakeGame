<script lang="ts">
// import defineComponent from 'nuxt'

export default{
  // Define reactive data
  data() {
    return {
      message: 'Hello from Nuxt!',
      count: 0,
    }
  },

  // Computed properties
  computed: {
    uppercaseMessage() {
      return this.message.toUpperCase()
    },
  },

  // Lifecycle hooks
  created() {
    console.log('Component has been created')
  },

  mounted() {
    console.log('Component has been mounted')
  },

  // Methods
  methods: {
    incrementCount() {
      this.count++
    },
  },
};
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <p>Uppercase: {{ uppercaseMessage }}</p>
    <button @click="incrementCount">Count: {{ count }}</button>
  </div>
</template>

<style scoped>
button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #38a873;
}
</style>
