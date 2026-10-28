<template>
    <div>
        <div class="w-screen h-screen flex items-center justify-center pt-10 pb-10 pl-40 pr-40">
            <canvas id="board" class="w-full h-full rounded-lg"></canvas>
        </div>
    </div>
  </template>
  
  <script setup>

  onMounted(() => {
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');

    const size = 34; // Tamanho de cada quadrado em pixels
    const colorLight = '#88E788'; // Verde claro
    const colorDark = '#1fa700';  // Verde escuro

    if (!ctx) return;

  // Ajusta o tamanho do canvas para ocupar todo o container
  canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
  canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

  // Loops para preencher a tela com os quadrados alternados
  for (let y = 0; y < canvas.height; y += size) {
    for (let x = 0; x < canvas.width; x += size) {
      // A lógica chave: soma os índices da linha e coluna. 
      // Se for par, desenha verde claro. Se for ímpar, desenha verde escuro.
      const isEven = (Math.floor(x / size) + Math.floor(y / size)) % 2 === 0;
      
      ctx.fillStyle = isEven ? colorLight : colorDark;
      ctx.fillRect(x, y, size, size);
    }
  }
});
  </script>