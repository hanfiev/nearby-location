<template>
  <div>
    <div id="logo">
      <img src="~assets/img/logo.png" style="height: 60px;" alt="logo">
      <div class="text">Location Report</div>
    </div>
    <div id="desc">Collects data from the OpenStreetMap with Overpass API and generates a report summarizing the features around the chosen point and measure  its distance.</div>
    <div id="search">
      <input id="searchinput" type="text" placeholder="Search">
    </div>
    <div id="radius">
      <div class="title">Search Radius</div>
      <br>
      <div class="slider">
        <div id="slider-bar"><input type="range" min="100" max="2000" step="100" value="1000" class="slider" id="radius-input"></div>
        <div id="selected-radius">{{ radiusa }}</div>
      </div>
    </div>
    <div id="category">
      <div class="title">Category</div>
      <Multiselect v-model="value" mode="tags" :options="options" />
      <div class="category-select">
        <div class="cat-title">Add Category</div>
        <div class="cat-icon"><span class="material-symbols-rounded">add_box</span></div>
      </div>
      
      <div class="selected-cat">
        <div class="cat">School</div>
        <div class="cat">Library</div>
        <div class="cat">Restaurant</div>
        <div class="cat">Cafe</div>
        <div class="cat">Sport</div>
        <div class="cat">Office</div>
      </div>
    </div>
    <button id="generate-btn">Generate Report</button>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
export default {
  name: 'Menu',
  components:{Multiselect},
  data() {
    return {
      radiusa: 100,
      value: null,
        options: [
          'Batman',
          'Robin',
          'Joker',
        ]
    }
  },
  methods: {
    radius() {
      this.radiusa = document.getElementById('radius-input').value;
    }
  },
  mounted() {
    document.getElementById('radius-input').addEventListener('input', this.radius);
  }
}

</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
#logo{
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* background-color: red; */
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
}

#radius{
  margin: 20px 0px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 7px;
  border: 1px solid #EAF7F8;
  /* box-shadow: 0px 100px 80px rgba(41, 80, 140, 0.04), 0px 41.7776px 33.4221px rgba(41, 80, 140, 0.0287542), 0px 22.3363px 17.869px rgba(41, 80, 140, 0.0238443), 0px 12.5216px 10.0172px rgba(41, 80, 140, 0.02), 0px 6.6501px 5.32008px rgba(41, 80, 140, 0.0161557), 0px 2.76726px 2.21381px rgba(41, 80, 140, 0.0112458); */
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
  /* box-shadow: 0px 100px 80px rgba(41, 80, 140, 0.04), 0px 41.7776px 33.4221px rgba(41, 80, 140, 0.0287542), 0px 22.3363px 17.869px rgba(41, 80, 140, 0.0238443), 0px 12.5216px 10.0172px rgba(41, 80, 140, 0.02), 0px 6.6501px 5.32008px rgba(41, 80, 140, 0.0161557), 0px 2.76726px 2.21381px rgba(41, 80, 140, 0.0112458); */
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
}

#generate-btn:hover{
  transform: translateY(-4px);
  background: #1d38bb;
  box-shadow: 0px 100px 80px rgba(10, 41, 112, 0.05), 0px 41.7776px 33.4221px rgba(10, 41, 112, 0.0359427), 0px 22.3363px 17.869px rgba(10, 41, 112, 0.0298054), 0px 12.5216px 10.0172px rgba(10, 41, 112, 0.025), 0px 6.6501px 5.32008px rgba(10, 41, 112, 0.0201946), 0px 2.76726px 2.21381px rgba(10, 41, 112, 0.0140573);
}

.multiselect-tag{
  background: var(--ms-tag-bg,#4a0f9d)!important;
}


</style>