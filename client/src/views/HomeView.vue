<template>
  <h1 class="h-screen relative">
    <div id="map" class="h-full z-[1]"></div>
  </h1>
</template>

<script setup>
import L from "leaflet";
import { onMounted, reactive } from "vue";

let map = reactive();

onMounted(() => {
  map = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer(
    `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_API_KEY}`,
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: process.env.VUE_APP_API_KEY,
    }
  ).addTo(map);
});
</script>
