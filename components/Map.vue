<template>
  <div>
    <div id="map"></div>
  </div>
</template>


<script setup>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {point} from '@turf/helpers'
import buffer from '@turf/buffer'
import { radiusValue, mapCenter, selectedCat, geojsons, resetMapTrigger, interactive, queryCounters, hoverProperty } from '/composables/radius.js'

const apiKey = useRuntimeConfig().public.apiKey

let map
let marker
let buffered
let popup
let geojson_object = {type: 'FeatureCollection',features: []}
// function
const onMove = () => {
  var {lng, lat} = map.getCenter();
  mapCenter.value.lng = lng
  mapCenter.value.lat = lat
  marker.setLngLat([lng, lat])
}
const onMoveStart = () => {
  marker.setOffset([0, -5])
  map.getSource('buffer').setData(geojson_object)
}

const onMoveEnd = () => {
  marker.setOffset([0, 0])
  drawBuffer()
}

const drawBuffer = () => {
  var {lng, lat} = map.getCenter();
  buffered = buffer(point([lng, lat]), radiusValue.value, {units: 'meters'});
  map.getSource('buffer').setData(buffered)
  
}

const mapInteractivity = () => {
  let handlers = ["scrollZoom","boxZoom","dragRotate","dragPan","keyboard","doubleClickZoom","touchZoomRotate"]
  if (interactive.value) {
    for (const handler in handlers) {
      map[handlers[handler]].disable()
      interactive.value = false
      document.getElementsByClassName("mapboxgl-control-container")[0].style.display = "none"
    }
  } else {
    for (const handler in handlers) {
      map[handlers[handler]].enable()
      interactive.value = true
      document.getElementsByClassName("mapboxgl-control-container")[0].style.display = "block"
    }
  }  
}

const zoomToBound = () => {
  
  // Geographic coordinates of the LineString
  const coordinates = buffered.geometry.coordinates[0];
  
  // Create a 'LngLatBounds' with both corners at the first coordinate.
  const bounds = new mapboxgl.LngLatBounds(coordinates[0],coordinates[0]);
  
  // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
  for (const coord of coordinates) {bounds.extend(coord);}
  
  map.fitBounds(bounds, {padding: 20});

}

const colors = ['#5e34d6','#1a6ae3','#277577','#b0203d','#c2290c']

const drawPOI = () => {
  
  for (let i=0;i<geojsons.value.length;i++){
    map.addSource(`poi-${i}`, {
      type: 'geojson',
      data: geojsons.value[i]
    });
    map.addLayer({
      id: `poi-${i}`,
      type: 'circle',
      source: `poi-${i}`,
      paint: {
        'circle-color': colors[i],
        'circle-opacity': 0.9
      }
    });
  }
}

const resetMap = () => {
  let totalLayer = geojsons.value.length
  selectedCat.value = []
  geojsons.value = []
  mapInteractivity()

  for (let i=0; i<totalLayer; i++){
    map.removeLayer(`poi-${i}`)
    map.removeSource(`poi-${i}`)
  }
}

onMounted(() => {
  mapboxgl.accessToken = apiKey;
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-73.9965,40.7295],
    zoom: 13
  });


    map.on('load',()=>{
      popup = new mapboxgl.Popup({
      closeButton: false
      });
      map.addSource('buffer', {
        type: 'geojson',
        data: geojson_object
      });
      map.addLayer({
        id: 'buffer',
        type: 'fill',
        source: 'buffer',
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.2
        }
      });
      drawBuffer()
    })
    
    
    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
      }), 'top-left'
    );

    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {enableHighAccuracy: true}, showUserLocation: false})
    );

    map.addControl(new mapboxgl.NavigationControl());

  marker = new mapboxgl.Marker()
    .setLngLat([-73.9965,40.7295])
    .addTo(map);



  map.on('move', onMove);
  map.on('movestart', onMoveStart);
  map.on('moveend', onMoveEnd);
  return {marker}
})

watch(radiusValue, () => {
  drawBuffer()
})

watch(queryCounters,() => {
  zoomToBound();
  mapInteractivity()
  drawPOI();
  }
)

watch(hoverProperty, () => {
  if (hoverProperty.value != null) {
    popup.setLngLat(hoverProperty.value.coordinate.split(','))
      .setHTML(hoverProperty.value.name)
      .addTo(map);
  } else {
    popup.remove()
  }
},{deep:true})

watch(resetMapTrigger, () => {
  if (resetMapTrigger.value == true) {
    resetMap();
    mapInteractivity();
    resetMapTrigger.value = false
  } else {mapInteractivity()
  map.flyTo({
      zoom: 13
  })}
})

</script>

<style scoped>
#map{
   width:100%;
   height:100%;
   border-radius: 10px;
}
</style>