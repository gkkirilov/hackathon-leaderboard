<template>
  <div class="relative h-screen w-screen bg-black overflow-hidden">
    <div id="tsparticles" class="absolute inset-0 z-10"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { tsParticles } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

definePageMeta({
  layout: false
})

onMounted(async () => {
  await loadSlim(tsParticles)
  
  await tsParticles.load({
    id: 'tsparticles',
    options: {
      fullScreen: false,
      background: {
        color: "#fff"
      },
      particles: {
        number: {
          value: 800,
          density: {
            enable: true
          }
        },
        color: {
          value: "#000"
        },
        opacity: {
          value: { min: 0.1, max: 1 }
        },
        size: {
          value: { min: 0.5, max: 3 }
        },
        move: {
          enable: true,
          speed: 0.2,
          direction: "none",
          random: true,
          straight: false,
          outModes: "out"
        }
      }
    }
  })

  // Enhance particles with CSS
  const canvas = document.querySelector('#tsparticles canvas')
  if (canvas) {
    canvas.classList.add('particle-canvas')
  }
})
</script>

<style>
.mask-gradient {
  mask-image: linear-gradient(to bottom, black, transparent);
  -webkit-mask-image: linear-gradient(to bottom, black, transparent);
}

.particle-canvas {
  filter: blur(0.4px) brightness(1.2);
}

#tsparticles canvas {
  mix-blend-mode: screen;
}
</style>