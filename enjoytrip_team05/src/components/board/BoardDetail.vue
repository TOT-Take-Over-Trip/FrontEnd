<script setup>
import axios from "axios";
import { useRoute, useRouter } from 'vue-router';
import {onMounted, onUpdated, ref, watch} from "vue";

const URL = import.meta.env.VITE_BASE_URL;

const route = useRoute();
const router = useRouter();

const post = ref({});
const comments = ref([]);

console.log(route.params.postId);

onMounted(async () => {
  await axios.get(`${URL}/posts/${route.params.postId}`)
      .then((response) => {
        post.value = response.data.postDto;
        post.value.createdDate = post.value.createdDate.split(' ')[0];
        post.value.updatedDate = post.value.updatedDate.split(' ')[0];
        comments.value = response.data.postCommentDtos;
        console.log(post.value);
        console.log(response);
      })
      .catch((error) => {
        console.error("Single Post error: ", error);
      })
})

</script>

<template>
  <div class="container mx-auto" style="width: 80%">
    <!--  제목 / 닉네임|날짜|수정|삭제  -->
    <div class="text-4xl my-3">{{ post.title }}</div>
    <div class="flex ">
<!--        <div>{{post.memberName}}&ensp;|&ensp;</div>     -->
      <div>{{ post.updatedDate }}&ensp;|&ensp;</div>
      <!--   TODO: RouterLink로 수정 하는 걸로 갈아끼워야 함   -->
      <div>수정&ensp;|&ensp;</div>
      <!--   TODO: 진짜 삭제할 건지 물어봐야 함     -->
      <div>삭제</div>
    </div>
    <div class="mt-14 px-2" v-html="post.content"></div>
    <hr />
  </div>
</template>

<style scoped>

</style>