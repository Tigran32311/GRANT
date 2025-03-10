<script setup>

import MapInfo from "@/components/MapInfo.vue";
import Map from "@/components/Map.vue";
</script>

<template>
  <v-container class="d-flex flex-column" fluid>
    <MapInfo/>
    <Map/>
  </v-container>
</template>

<script>
export default {
  name: 'MapPage',
  data: () => ({

  })
}
</script>

<style scoped>

</style>