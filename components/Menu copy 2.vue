<template>
  <div>
    <div id="logo">
      <img src="~assets/img/logo.png" style="height: 60px;" alt="logo">
      <div class="text">Nearby <br> Location Report</div>
    </div>
    <div id="desc">Collects data from OpenStreetMap with Overpass API and generates a report summarizing the features around the chosen point and measure  its distance.</div>
    <!-- <div id="search">
      <input id="searchinput" type="text" placeholder="Search">
    </div> -->
    <div id="radius">
      <div class="title">Search Radius (m)</div>
      <br>
      <div class="slider">
        <div id="slider-bar"><input type="range" min="500" max="2000" step="100" value="1000" class="slider" id="radius-input"></div>
        <div id="selected-radius">{{ radiusValue }}</div>
      </div>
    </div>
    <div id="category">
      <div class="title">Category</div>
      https://overpass.hanfiev.com/api/-6.91442/107.61129/1000/amenity/school
      {{ mapCenter }}
      {{ radiusValue }}
      {{ selectedCategory }}
      <br>
      <Multiselect v-model="selectedCategory" mode="tags" :options="options" placeholder="Select category" searchable="true" class="multiselect-blue" />
      <br>
    </div>
    <button id="generate-btn" :class="[selectedCategory.length > 0 ? 'enabled' : 'disabled']">View Nearby Objects</button>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import osmtag from 'assets/db/osm-tag.json'
import { radiusValue, mapCenter, selectedCat } from '/composables/radius.js'


export default {
  name: 'Menu',
  components:{Multiselect},
  data() {
    return {
      // raidusValue: 1000,
      selectedCategory: [],options: osmtag,
      osmtag: osmtag,
      active: true
    }
  },
  methods: {
    radius() {
      radiusValue.value = document.getElementById('radius-input').value;
    }
  },
  mounted() {
    document.getElementById('radius-input').addEventListener('input', this.radius);
  }
}

</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.multiselect-blue {
  --ms-tag-bg: #DBEAFE;
  --ms-tag-color: #2563EB;
}

#logo{
  display: flex;
  align-items: center;
  padding: 20px 10px;
}

#logo .text{
  font-weight: 700;
  margin: 10px;
}

#desc{
  margin: 20px 0px;
  color: #868686;
  font-size: 11pt;
}

#search{
  margin: 20px 0px;
}

#searchinput{
  width: 100%;
  height: 40px;
  border-radius: 7px;
  border: 1px solid #E8EEF5;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #E4F0F4;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px;
}

#radius{
  margin: 20px 0px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 7px;
  border: 1px solid #EAF7F8;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px
}

.title{
  font-weight: 600;
}

.slider{
  display: flex;
  justify-content: space-between;
}

#category{
  margin: 20px 0px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 7px;
  border: 1px solid #EAF7F8;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px
}

.selected-cat{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 11pt;
}

.cat {
  background-color: rgba(0, 156, 255, 0.07);
  color: rgba(0, 156, 255, 1);
  padding: 10px;
  border-radius: 4px;
}

.material-symbols-rounded{
  vertical-align: bottom;
}

.cat::after{
  font-family: 'Material Symbols Rounded';
  vertical-align: bottom;
  font-size: 11pt;
  content: "cancel";
  color: rgba(0, 156, 255, 1);
  margin-left: 5px;
  cursor: pointer;
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24

}


#slider-bar{
  width: 100%;
}

#radius-input{
  width: 240px;
}

.category-select{
  background-color: #E4F0F4;
  color: #1c1b1f6f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 12px 0px;
  border-radius: 7px;
  cursor: pointer;
  transition: cubic-bezier(0.86,0,0.07,1) 0.4s;
  font-size: 11pt;
}

.category-select:hover{
  background-color: #d9e4e8;
  color: #1c1b1f;
}

#generate-btn{
  all: unset;
  text-align: center;
  cursor: pointer;
  width: 100%;
  height: 40px;
  background: #2748EB;
  border-radius: 5px;
  color: #ffffff;
  transition: cubic-bezier(0.22,0.61,0.36,1) 0.4s;
  /* font-size: 14pt; */
}

/* #generate-btn{
  all: unset;
  text-align: center;
  cursor: pointer;
  width: 100%;
  height: 40px;
  background: #2748EB;
  border-radius: 5px;
  color: #ffffff;
  transition: cubic-bezier(0.22,0.61,0.36,1) 0.4s; */
  /* font-size: 14pt; */
/* } */

#generate-btn:hover{
  transform: translateY(-4px);
  background: #4d68ee;
  box-shadow: 0px 100px 80px rgba(10, 41, 112, 0.05), 0px 41.7776px 33.4221px rgba(10, 41, 112, 0.0359427), 0px 22.3363px 17.869px rgba(10, 41, 112, 0.0298054), 0px 12.5216px 10.0172px rgba(10, 41, 112, 0.025), 0px 6.6501px 5.32008px rgba(10, 41, 112, 0.0201946), 0px 2.76726px 2.21381px rgba(10, 41, 112, 0.0140573);
}




</style>