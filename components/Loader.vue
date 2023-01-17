<template>
  <div id="loader">
    <lottie-player autoplay loop mode="normal" src="https://assets3.lottiefiles.com/packages/lf20_rlmdrwm8.json" style="width: 320px"></lottie-player>
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
  background: rgba(255, 255, 255, 0.547);
  backdrop-filter: blur(7px);
}
</style>