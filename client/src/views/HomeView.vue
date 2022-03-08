<template>
  <h1 class="h-screen relative">
    <GeoErrorModal
      v-if="geoError"
      :geoErrorMsg="geoErrorMsg"
      @closeGeoError="closeGeoError"
    />
    <div id="map" class="h-full z-[1]"></div>
  </h1>
</template>

<script setup>
import L from "leaflet";
import { onMounted, ref } from "vue";
import GeoErrorModal from "@/components/GeoErrorModal";

let map;

const coords = ref(null);
const fetchCoords = ref(null);
const geoMarker = ref(null);
const geoError = ref(null);
const geoErrorMsg = ref(null);

const getGeolocation = () => {
  if (sessionStorage.getItem("coords")) {
    coords.value = JSON.parse(sessionStorage.getItem("coords"));
    plotGeolocation(coords.value);
    return;
  }

  fetchCoords.value = true;

  navigator.geolocation.getCurrentPosition(setCoords, getLocError);
};

const setCoords = (pos) => {
  fetchCoords.value = false;

  const setSessionCoords = {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude,
  };

  sessionStorage.setItem("coords", JSON.stringify(setSessionCoords));

  coords.value = setSessionCoords;

  plotGeolocation(coords.value);
};

const getLocError = (err) => {
  fetchCoords.value = null;
  geoError.value = true;
  geoErrorMsg.value = err.message;
};

const closeGeoError = (err) => {
  geoError.value = null;
  geoErrorMsg.value = err.null;
};

const plotGeolocation = (coords) => {
  const customMarker = L.icon({
    iconUrl: require("../assets/map-marker-red.svg"),
    iconSize: [35, 35],
  });

  geoMarker.value = L.marker([coords.lat, coords.lng], {
    icon: customMarker,
  }).addTo(map);

  map.setView([coords.lat, coords.lng], 10);
};

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

  getGeolocation();
});
</script>
