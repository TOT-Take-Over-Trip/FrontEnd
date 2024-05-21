<script setup>
import axios from "axios";
import { useRoute, useRouter } from 'vue-router';
import {computed, onMounted, onUpdated, ref, watch} from "vue";
import BoardComment from "@/components/board/BoardComment.vue";
import {jwtDecode} from "jwt-decode";

const URL = import.meta.env.VITE_BASE_URL;

const route = useRoute();
const router = useRouter();

const post = ref({});

/*
    content
    createdDate
    memberId
    memberName
    postCommentId
    postId
    status
    updatedDate
*/
const comments = ref([]);
const newComment = ref("");


// TODO: 유저정보 바꿔줘야 함
const submitComment = async () => {
  const data = {
    postId : post.value.postId,
    memberId : 1,
    memberName : "익명의 유저",
    content : newComment.value,
  }
  await axios.post(`${URL}/posts/comments/new`, data)
  .then(response => {
    comments.value.push(response.data);
    newComment.value = "";
  })
};

const token = sessionStorage.getItem("accessToken");
const decodeToken = jwtDecode(token);
const loginId = decodeToken.sub; //TODO: 현재 로그인 유저로 바꿔줘야 함
const memberId = sessionStorage.getItem("memberId");
console.log("decodeToken: ", decodeToken);
console.log("loginId: ", loginId);

// console.log(route.params.postId);
onMounted(async () => {
  await axios.get(`${URL}/posts/${route.params.postId}?memberId=${memberId}`)
      .then((response) => {
        console.log(response.data);
        post.value = response.data.postResponseDto;
        post.value.createdDate = post.value.createdDate.split(' ')[0];
        post.value.updatedDate = post.value.updatedDate.split(' ')[0];
        console.log("post: ", post.value);
        comments.value = response.data.postCommentDtos;
        // console.log(comments);
        // console.log(comments.value[0].content);
      })
      .catch((error) => {
        console.error("Single Post error: ", error);
      })
})

</script>

<template>
  <div class="container mx-auto" style="width: 80%;">
    <!--  제목 / 닉네임|날짜|수정|삭제  -->
    <div class="text-4xl my-3">{{ post.title }}</div>
    <div class="flex ">
      <div>{{post.memberName}}&ensp;|&ensp;</div>
      <div>{{ post.updatedDate }}&ensp;|&ensp;</div>
      <!--   TODO: RouterLink로 수정 하는 걸로 갈아끼워야 함   -->
      <div>수정&ensp;|&ensp;</div>
      <!--   TODO: 진짜 삭제할 건지 물어봐야 함     -->
      <div>삭제</div>
    </div>
    <div class="mt-14 px-2" style="min-height: 56rem;" v-html="post.content"></div>
    <!-- 댓글 입력 박스 -->
    <div class="bg-gray-200 p-4 rounded-lg flex flex-col mb-4 space-y-2">
      <textarea
          class="flex-grow bg-gray-200 h-24 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="댓글을 입력하세요"
          v-model="newComment"
      ></textarea>
      <div class="flex justify-between items-center">
        <!-- TODO: 사용자 이름 -->
        <div></div>
        <button
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            @click="submitComment"
        >
          등록
        </button>
      </div>
    </div>
    <BoardComment v-for="(comment) in comments" :comment="comment" />
  </div>

</template>

<style scoped>

</style>