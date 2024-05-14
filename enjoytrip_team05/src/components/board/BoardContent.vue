<script setup>
import { computed } from 'vue';

const props = defineProps({
  post: Object,
});

const maxLength = 800; // 글자 최대 길이

const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const imageUrl = computed(() => {
  if (props.post.thumbnail) {
    return `data:image/jpeg;base64,${arrayBufferToBase64(props.post.thumbnail)}`;
  }
  // props.post.thumbnail = "/src/assets/img/test/testImg.jpeg";
  return null;
  // return "/src/assets/img/test/testImg.jpeg";
});



const truncatedContent = computed(() => {
  if (props.post.content.length > maxLength) {
    return props.post.content.slice(0, maxLength) + '...';
  }
  return props.post.content;
});

const contentClass = computed(() => {
  props.post.thumbnail = '/src/assets/img/test/testImg.jpeg'
  return props.post.thumbnail ? 'w-10/12' : 'w-full';
});
</script>

<template>
  <div class="container mx-auto flex h-64 mt-3 border-y-2">
    <!--  제목 + contents   -->
    <div :class="contentClass + ' flex flex-col mt-4'" style="height: 100%;">
      <!--   제목 + 작성 날짜 묶음 START   -->
      <div>
        <!--   제목 START  -->
        <div class="text-3xl">{{ post.title }}</div>
        <!--   제목 END  -->
        <!--   작성 날짜 START  -->
        <div class="text-xl mt-2 mb-4">{{ post.createdDate }}</div>
        <!--   작성 날짜 END  -->
      </div>
      <!--   제목 + 작성 날짜 묶음 END   -->
      <!--   본문 START  -->
      <div v-html="truncatedContent"></div>
      <!--   본문 END  -->
    </div>
    <!--  img 그림  -->
    <div class="w-2/12 mt-3" style="height: 100%" v-if="props.post.thumbnail != null">
<!--      <img :src="imageUrl" alt="Post Thumbnail"/>-->
      <img src="/src/assets/img/test/testImg.jpeg" style="height: 90%" alt="Post Thumbnail"/>
    </div>
  </div>
</template>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
