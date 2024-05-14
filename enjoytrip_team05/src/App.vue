<script setup>

import TheHeadingNavbar from "@/views/TheHeadingNavbar.vue";
import { RouterView } from 'vue-router'
import TheFooterNavbar from "@/views/TheFooterNavbar.vue";
</script>

<template>
  <nav>
    <TheHeadingNavbar />
  </nav>
  <RouterView />
  <TheFooterNavbar />
</template>

<style scoped>

</style>