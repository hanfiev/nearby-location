<template>
  <div v-if="loaderToggle"><Loader /></div>
  <div class="container">
    <Menu v-if="showMenu" class="menu"/>
    <Results v-else class="results"/>
    <Map class="map"/>
  </div>
</template>

<script setup>
import { showMenu, loaderToggle } from '/composables/radius.js'
const load = ref(false)
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

:root{
  --purple-50: #f3f3ff;
  --purple-100: #ebeafd;
  --purple-200: #d9d7fd;
  --purple-300: #bcb7fb;
  --purple-400: #9a8ef7;
  --purple-500: #7a60f2;
  --purple-600: #673fe8;
  --purple-700: #5e34d6;
  --purple-800: #4a25b2;
  --purple-900: #3e2092;

  --azalea-50: #fef2f2;
  --azalea-100: #fde6e7;
  --azalea-200: #f9c7cb;
  --azalea-300: #f6abb1;
  --azalea-400: #f07c88;
  --azalea-500: #e54e62;
  --azalea-600: #d12d4a;
  --azalea-700: #b0203d;
  --azalea-800: #941d39;
  --azalea-900: #7f1c37;

  --apricot-50: #fff5ed;
  --apricot-100: #ffe7d5;
  --apricot-200: #fed0b1;
  --apricot-300: #fda874;
  --apricot-400: #fb793c;
  --apricot-500: #f95516;
  --apricot-600: #ea3a0c;
  --apricot-700: #c2290c;
  --apricot-800: #9a2212;
  --apricot-900: #7c1f12;

  --apple-50: #f4faf3;
  --apple-100: #e5f6e2;
  --apple-200: #ccebc7;
  --apple-300: #a3da9b;
  --apple-400: #72c167;
  --apple-500: #4ea542;
  --apple-600: #419336;
  --apple-700: #326b2a;
  --apple-800: #2b5526;
  --apple-900: #234720;

  --leaf-50: #f0fbf9;
  --leaf-100: #d8f5f3;
  --leaf-200: #a7e7e2;
  --leaf-300: #83ddd8;
  --leaf-400: #4ac6bf;
  --leaf-500: #2eaca7;
  --leaf-600: #299091;
  --leaf-700: #277577;
  --leaf-800: #285f62;
  --leaf-900: #255054;

  --denim-50: #eff8ff;
  --denim-100: #daefff;
  --denim-200: #bee4ff;
  --denim-300: #91d4ff;
  --denim-400: #5dbbfd;
  --denim-500: #379cfa;
  --denim-600: #217def;
  --denim-700: #1a6ae3;
  --denim-800: #1b53b2;
  --denim-900: #1c488c;

  --bronze-50: #fff4e1;
  --bronze-100: #ffe8be;
  --bronze-200: #ffd785;
  --bronze-300: #ffc740;
  --bronze-400: #ffc108;
  --bronze-500: #fbd600;
  --bronze-600: #cab300;
  --bronze-700: #988700;
  --bronze-800: #776700;
  --bronze-900: #4e4503;




}

body{
  margin: 0;
  padding: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #f9fafb;
}

.container{
  display: flex;
  /* background-color: red; */
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.menu {
  width: 360px;
  height: calc(100vh - 50px);
  /* background-color: #fff; */
  border-radius: 10px;
}

.results {
  width: 360px;
  height: calc(100vh - 50px);
  background-color: #fff;
  border-radius: 10px;
}

.map{
  min-width: calc(100vh - 50px);
  height: calc(100vh - 50px);
  
}

.material-symbols-rounded {
  vertical-align: bottom;
  font-variation-settings:
  'FILL' 1,
  'wght' 700,
  'GRAD' 0,
  'opsz' 24
}

</style>
