<script setup>

import TheHeadingNavbar from "@/views/TheHeadingNavbar.vue";
import { RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <TheHeadingNavbar />
  </nav>
  <RouterView />
</template>

<style scoped>

</style>