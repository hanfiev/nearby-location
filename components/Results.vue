<template>
  <div class="card" v-if="geojsons.length > 0">
    <div class="content">
    <div id="header"><span @click="reset()" class="material-symbols-rounded iconbtn">arrow_back</span>  Search Results</div>
    <div id="coordinate" class="section">
      <div class="title">Coordinate</div>
      <div class="body">{{ mapCenter.lat.toFixed(7)}}, {{ mapCenter.lng.toFixed(7) }}</div>
    </div>
    <div id="radius" class="section">
      <div class="title">Radius</div>
      <div class="body">{{ radiusValue }} m</div>
    </div>
    <div class="resultCard">
      
    <div v-for="(cat,index) in selectedCat" :key="index">
      <div class="catCard" :class="`i-${index}`">
        
        <div class="catTitle">{{ geojsons[index].features[0].properties.amenity }}</div>
        <div class="catCount">{{geojsons[index].features.length}}</div>
      </div>
      <div v-for="feature in geojsons[index].features">
        <div class="feature hoverProp" :class="`i-${index}`" :coordinate="feature.geometry.coordinates" :name="feature.properties.name">
        <div class="hoverProp" :coordinate="feature.geometry.coordinates" v-if="feature.properties.name" :name="feature.properties.name">{{ feature.properties.name }}</div> <div class="hoverProp" :coordinate="feature.geometry.coordinates" v-else :name="feature.properties.name">(N/A)</div> 
        <div class="hoverProp" :coordinate="feature.geometry.coordinates" :name="feature.properties.name" style="min-width:50px; text-align: right;">{{ feature.properties.distance.toFixed(2) }} km</div>
      </div>
      </div>
      <div v-if="geojsons">{{ sorted }} </div>
      <br>
    </div>
  </div>
  <div id="downloadArea">
    <button @click="downloadGeoJSON()" class="btn geojson">GeoJSON</button>
    <button @click="downloadCSV()" class="btn csv">CSV</button>
  </div>
  </div>
  </div>
</template>

<script setup>
import { radiusValue, mapCenter, selectedCat, geojsons, showMenu, resetMapTrigger, hoverProperty } from '/composables/radius.js'
// Import JSZip library
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const downloadGeoJSON = () => {
  let zip = new JSZip();
  for (let i=0;i<geojsons.value.length;i++){
    zip.file(`${geojsons.value[i].features[0].properties.amenity}.geojson`, JSON.stringify(geojsons.value[i]));
  }
  zip.generateAsync({type:"blob"})
  .then(function(content) {
    // see FileSaver.js
    saveAs(content, "results_geojson.zip");
  });
}

const downloadCSV = () => {
  let zip = new JSZip();
  for (let i=0;i<geojsons.value.length;i++){
    let csv = 'name,latitude,longitude,distance\r\n'
    for (let j=0;j<geojsons.value[i].features.length;j++){
      csv += `${geojsons.value[i].features[j].properties.name},${geojsons.value[i].features[j].geometry.coordinates[1]},${geojsons.value[i].features[j].geometry.coordinates[0]},${geojsons.value[i].features[j].properties.distance}\r\n`
    }
    zip.file(`${geojsons.value[i].features[0].properties.amenity}.csv`, csv);
  }
  zip.generateAsync({type:"blob"})
  .then(function(content) {
    // see FileSaver.js
    saveAs(content, "results_csv.zip");
  });
}


const sorted = computed(() => {
  for (let i=0;i<geojsons.value.length;i++){
    geojsons.value[i].features.sort((a,b) => (a.properties.distance > b.properties.distance) ? 1 : ((b.properties.distance > a.properties.distance) ? -1 : 0))
  }
})

const reset = () => {
  showMenu.value = true
  resetMapTrigger.value = true
}

onMounted(()=>{
  let features = document.querySelectorAll(".hoverProp")
  for (let i=0;i<features.length;i++){
    features[i].addEventListener('mouseover',(e)=>{
      if (e.target.getAttribute('coordinate') !== null){
        hoverProperty.value.coordinate = e.target.getAttribute('coordinate')
        hoverProperty.value.name = e.target.getAttribute('name')
      }

    })
    features[i].addEventListener('mouseout',(e)=>{
      if (e.target.getAttribute('coordinate') !== null){
        hoverProperty.value.coordinate = '0,0'
        hoverProperty.value.name = ''
      }
    })
  }
  
})

</script>


<style scoped>

#header{
  font-weight: 700;
  font-size: 12pt;
  /* margin: auto; */
  display: flex;
  align-items: center;
  gap: 8px;
  /* justify-content: space-between; */
}

.card{
  border: 1px solid rgb(228, 228, 228);
}
.content{
  padding: 20px;
  overflow: scroll;
  height: 95%;
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  gap: 10px
}

.section {
  /* margin: 20px 0px; */
  /* height: 100%; */
}

.title {
  font-weight: 700;
}

.catCard{
  background-color: rgb(80, 80, 80);
  border-radius: 7px;
  padding: 10px;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.catCard.i-0{
  background-color: var(--purple-700);
}

.catCard.i-1{
  background-color: var(--denim-700);
}

.catCard.i-2{
  background-color: var(--leaf-700);
}
.catCard.i-3{
  background-color: var(--apple-700);
}

.catCard.i-4{
  background-color: var(--apricot-700);
}

.feature.i-0:hover{
  background-color: var(--purple-100);
}

.feature.i-1:hover{
  background-color: var(--denim-100);
}

.feature.i-2:hover{
  background-color: var(--leaf-100);
}
.feature.i-3:hover{
  background-color: var(--apple-100);
}

.feature.i-4:hover{
  background-color: var(--apricot-100);
}

.catTitle {
  font-weight: 600;
  font-size: 9pt;
  text-transform: uppercase;
  letter-spacing: 0.20em;
}

.feature{
  display: flex;
  justify-content: space-between;
  /* margin: 10px 0px; */
  padding: 10px 5px;
  border-radius: 7px;
}

.feature:hover{
  background-color: black;
}

.resultCard{
  overflow: scroll;
  font-size: 10pt;
  /* background-color: red; */
  /* height: %; */
}

#downloadArea{
  background-color: #dedede;
  padding: 10px;
  border-radius: 7px;
  display: flex;
  gap: 10px;
}

.iconbtn{
  cursor: pointer;
}

button {
  all: unset;
  text-align: center;
  cursor: pointer;
  font-size: 10pt;
  padding: 10px;
  background: #2748EB;
  border-radius: 5px;
  color: #ffffff;
  transition: cubic-bezier(0.22,0.61,0.36,1) 0.4s;
}

button::before{
  content: "\f15b"; 
  font-family: "Font Awesome";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>