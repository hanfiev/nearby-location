<template>
  <div id="loader">
    Please open this page on a desktop browser.
  </div>
</template>

<script setup>
if (typeof window !== 'undefined') import('@lottiefiles/lottie-player')
</script>

<style scoped>
#loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.918);
  backdrop-filter: blur(7px);
}
</style>