<script setup>
import axios from "axios";
import { useRoute, useRouter } from 'vue-router';
import {computed, onMounted, onUpdated, ref, watch} from "vue";
import BoardComment from "@/components/board/BoardComment.vue";

const URL = import.meta.env.VITE_BASE_URL;

const route = useRoute();
const router = useRouter();

const item = ref({});


// console.log(route.params.postId);
onMounted(async () => {
  await axios.get(`${URL}/items/${route.params.itemId}`)
  .then((response) => {
    console.log(response.data);
    item.value = response.data;
  })
  .catch((error) => {
    console.error("Single Post error: ", error);
  })
})

</script>

<template>
  <div class="container mx-auto" style="width: 80%;">
    <!--  제목 / 닉네임|날짜|수정|삭제  -->
    <div class="text-4xl my-3">{{ item.name }}</div>
      <div>{{item.price}}원</div>
      <div>{{ item.quantity }}개&ensp;</div>
<!--    <div class="mt-14 px-2" style="min-height: 56rem;" v-html="post.content"></div>-->
  </div>

</template>

<style scoped>

</style>