<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

  function onDragEnd() {
        var lngLat = marker.getLngLat();
        console.log('Longitude: ' + lngLat.lng + ' Latitude: ' + lngLat.lat);

        // move map to where the marker is dragged 
        map.flyTo({
            center: [
                lngLat.lng,
                lngLat.lat
            ],
            essential: false // this animation is considered essential with respect to prefers-reduced-motion
        });
    }

  

export default {
  data() {
    return {
      access_token: 'pk.eyJ1IjoiaGFuZmlldi1kZXYiLCJhIjoiY2xjNGhkY2JsMDUzZDNvdDd0dmNkOWE4ZiJ9.Au0chyGGmf9G-ys-x0Zvow',
      map: {}
    }
  },
  mounted(){
    this.createMap()
  },
  methods:{
    createMap(){
      mapboxgl.accessToken = this.access_token;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40],
        zoom: 9
      });

      var marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([-74.5, 40])
            .addTo(this.map);

        marker.on('dragend', onDragEnd)

        return marker
    },

    onDragEnd() {
        var lngLat = marker.getLngLat();
        console.log('Longitude: ' + lngLat.lng + ' Latitude: ' + lngLat.lat);

        // move map to where the marker is dragged 
        map.flyTo({
            center: [
                lngLat.lng,
                lngLat.lat
            ],
            essential: false // this animation is considered essential with respect to prefers-reduced-motion
        });
    }

    
  }
}
</script>

<style scoped>
#map{
   width:100%;
   height:100%;
   border-radius: 10px;
}
</style>