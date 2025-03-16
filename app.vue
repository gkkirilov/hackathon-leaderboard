<template>
  <vue-lenis root>
    <div class="flex min-h-screen flex-col">
      <div class="flex-1">
        <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      </div>
    </div>
  </vue-lenis>
</template>
<script setup>
// import { useLenis } from 'lenis/vue'

// const lenis = useLenis((lenis) => {
//   console.log('page callback', lenis)
// })

// watch(lenis, (lenis) => {
//   console.log('page', lenis)
// })
</script>
<style>

body {
  font-family: Inter, serif;
  font-weight: 500;
}

.font-courier {
  font-family: Courier Prime;
}

.slide-fadeup-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fadeup-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fadeup-enter-from,
.slide-fadeup-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>