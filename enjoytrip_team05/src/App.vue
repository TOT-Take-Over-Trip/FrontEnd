<script setup>

import TheHeadingNavbar from "@/views/TheHeadingNavbar.vue";
import { RouterView } from 'vue-router'
import TheFooterNavbar from "@/views/TheFooterNavbar.vue";
</script>

<template>
  <nav>
    <TheHeadingNavbar />
  </nav>
  <div style="min-height: 86rem;">
    <RouterView />
  </div>
  <TheFooterNavbar />
</template>

<style scoped>

</style>