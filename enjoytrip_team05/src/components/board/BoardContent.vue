<script setup>
import { ref, computed } from 'vue';
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const props = defineProps({
  post: Object,
});

const maxLength = 800; // 글자 최대 길이


const imageUrl = computed(() => {
  if (props.post.thumbnail) {
    // console.log(props.post.thumbnail)
    return `data:image/jpeg;base64,${(props.post.thumbnail)}`;
  }
  return null;
});



const truncatedContent = computed(() => {
  if (props.post.content.length > maxLength) {
    return props.post.content.slice(0, maxLength) + '...';
  }
  return props.post.content;
});

const contentClass = computed(() => {
  return props.post.thumbnail ? 'w-10/12' : 'w-full';
});

const URL = import.meta.env.VITE_BASE_URL;
const token = sessionStorage.getItem("accessToken");
const decodeToken = jwtDecode(token);
const memberName = decodeToken.sub;
const memberId = sessionStorage.getItem("memberId");
const postLikeCount = ref(props.post.postLikeCount)
const isLiked = ref(props.post.like) // 좋아요 상태를 나타내는 boolean 값
const likedImageUrl = 'src/assets/img/like.png'; // 좋아요 상태일 때의 이미지 URL
const unlikedImageUrl = 'src/assets/img/non-like.png'; // 좋아요 상태가 아닐 때의 이미지 URL

const likePost = (postId) => {
  if(isLiked.value) {
    axios.post(`${URL}/posts/${postId}/unlike?memberId=${memberId}`).then(console.log("좋아요 취소"))
    postLikeCount.value-=1;
  }else{
    axios.post(`${URL}/posts/${postId}/like?memberId=${memberId}`).then(console.log("좋아요 성공!"))
    postLikeCount.value+=1;
  }
  isLiked.value = !isLiked.value;
}

const likeCount = computed(()=>{
  return postLikeCount.value;
})

</script>

<template>
  <div class="container mx-auto flex h-64 mt-3 border-y-2">
    <!--  제목 + contents   -->
    <div :class="contentClass + ' flex flex-col mt-4'" style="height: 100%;">
      <!--   제목 + 작성 날짜 묶음 START   -->
      <div>
        <button @click.stop.prevent="likePost(post.postId)" class="like-button">
          <img :src="isLiked ? likedImageUrl : unlikedImageUrl" alt="Like Button" style="width: 2rem; height: 2rem;" />
        </button>
        {{likeCount}} Like
        <!--   제목 START  -->
        <div class="text-3xl">{{ post.title }}</div>
        <!-- 좋아요 버튼 START -->
        <!-- 좋아요 버튼 END -->
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
      <img :src="imageUrl" style="height: 90%" alt="Post Thumbnail"/>
<!--      <img src="/src/assets/img/test/testImg.jpeg" style="height: 90%" alt="Post Thumbnail"/>-->
    </div>
  </div>
</template>

<style scoped>
img {
  width:100%;
  height:100%;
  max-width: 100%;
}
.like-button {
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}
</style>
