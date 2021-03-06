<template>
  <div class="h-screen relative">
    <GeoErrorModal
      v-if="geoError"
      :geoErrorMsg="geoErrorMsg"
      @closeGeoError="closeGeoError"
    />
    <MapFeatures
      :coords="coords"
      :fetchCoords="fetchCoords"
      :searchResults="searchResults"
      @getLocation="getGeoLocation"
      @plotResult="plotResult"
      @toggleSearchResults="toggleSearchResults"
      @removeResult="removeResult"
    />
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<script setup>
import L from "leaflet";
import { onMounted, ref } from "vue";
import GeoErrorModal from "@/components/GeoErrorModal";
import MapFeatures from "@/components/MapFeatures";

let map;

const coords = ref(null);
const fetchCoords = ref(null);
const geoMarker = ref(null);
const geoError = ref(null);
const geoErrorMsg = ref(null);
const resultMarker = ref(null);
const searchResults = ref(null);

const getGeoLocation = () => {
  if (coords.value) {
    coords.value = null;
    sessionStorage.removeItem("coords");
    map.removeLayer(geoMarker.value);
    return;
  }

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

const plotResult = (coords) => {
  if (resultMarker.value) {
    map.removeLayer(resultMarker.value);
  }

  const customMarker = L.icon({
    iconUrl: require("../assets/map-marker-blue.svg"),
    iconSize: [35, 35],
  });

  resultMarker.value = L.marker(
    [coords.coordinates[1], coords.coordinates[0]],
    {
      icon: customMarker,
    }
  ).addTo(map);

  map.setView([coords.coordinates[1], coords.coordinates[0]], 14);

  closeSearchResults();
};

const toggleSearchResults = () => {
  searchResults.value = !searchResults.value;
};

const closeSearchResults = () => {
  searchResults.value = null;
};

const removeResult = () => {
  map.removeLayer(resultMarker.value);
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

  map.on("moveend", () => {
    closeSearchResults();
  });

  getGeoLocation();
});
</script>
