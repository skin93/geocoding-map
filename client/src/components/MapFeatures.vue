<template>
  <div
    class="w-full md:w-auto absolute md:top-[40px] md:left-[60px] z-[2] flex gap-4 px-6 py-8 md:px-0 md:py-0 bg-transparent"
  >
    <div
      :class="{ 'bg-slate-600': props.coords }"
      class="px-4 bg-white flex items-center shadow-md rounded-md min-h-[45px]"
      @click="$emit('getLocation')"
    >
      <i
        :class="{
          'text-white': props.coords,
          'animate-pulse': props.fetchCoords,
        }"
        class="fas fa-location-arrow text--slate-600 text-[18px]"
      ></i>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  coords: Object,
  fetchCoords: Boolean,
});
</script>

<style></style>
