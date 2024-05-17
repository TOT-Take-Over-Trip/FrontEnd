<script setup>
import axios from "axios";
import {useRoute} from "vue-router";
import {onMounted} from "vue";

const URL = import.meta.env.VITE_BASE_URL;

const route = useRoute();

// onMounted(async () => {
//   await axios.get(`${URL}/posts/members/${route.params.memberId}`)
//       .then((response) => {
//
//       })
//
// })

</script>

<template>

</template>

<style scoped>

</style>