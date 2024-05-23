<script setup>
import axios from "axios";
import { useRoute, useRouter } from 'vue-router';
import {computed, onMounted, ref} from "vue";
import BoardComment from "@/components/board/BoardComment.vue";
import {jwtDecode} from "jwt-decode";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const route = useRoute();
const router = useRouter();
const memberInfo = ref({});
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

const token = sessionStorage.getItem("accessToken");
const decodeToken = jwtDecode(token);
const loginId = decodeToken.sub;
const memberId = sessionStorage.getItem("memberId");

const submitComment = async () => {
  const data = {
    postId : post.value.postId,
    memberId : memberId,
    memberName : loginId,
    content : newComment.value,
  }
  await axios.post(`${BASE_URL}/posts/comments/new`, data)
      .then(response => {
        comments.value.push(response.data);
        newComment.value = "";
      })
};

const profileImage = computed(() => {
  if (memberInfo.value.profileImage) {
    return `data:image/jpeg;base64,${memberInfo.value.profileImage}`;
  }
  return null;
});

// console.log(route.params.postId);
onMounted(async () => {
  await axios.get(`${BASE_URL}/posts/${route.params.postId}?memberId=${memberId}`)
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
  await axios.get(`${BASE_URL}/members/${memberId}`)
      .then((response) => {
        memberInfo.value = response.data;

        console.log("memberInfo: ", memberInfo.value);
      })
})

const confirmDelete = () => {
  axios.post(`${BASE_URL}/posts/${post.value.postId}`)
      .then(() => {
        router.replace({name: "board"});
      })
}
</script>

<template>
  <div class="container mx-auto" style="width: 80%;">
    <!--  제목 / 닉네임|날짜|수정|삭제  -->
    <div class="text-4xl my-3">{{ post.title }}</div>
    <div class="flex ">
      <div>{{post.memberName}}&ensp;|&ensp;</div>
      <div>{{ post.updatedDate }}&ensp;|&ensp;</div>
      <!-- RouterLink로 수정하는 부분 -->
      <RouterLink v-if="post.memberId == memberId" :to="{ name: 'boardModify', params: { postId: post.id } }">수정 &ensp;|&ensp;</RouterLink>
      <!-- 삭제 버튼 클릭 시 deletePost 메소드 호출 -->
      <div v-if="post.memberId == memberId" @click="confirmDelete">삭제</div>
    </div>
    <div class="mt-14 px-2" style="min-height: 56rem;" v-html="post.content"></div>
    <!-- 댓글 입력 박스 -->
    <div class="bg-gray-200 p-4 rounded-lg flex flex-col mb-4 space-y-2">
      <div class="flex items-center space-x-4">
        <img :src="profileImage" class="profile-image"/>
        <div>{{memberInfo.id}}</div>
      </div>
      <textarea
          class="flex-grow bg-gray-200 h-24 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="댓글을 입력하세요"
          v-model="newComment"
      ></textarea>
      <div class="flex justify-between items-center">
        <button
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            @click="submitComment"
        >
          등록
        </button>
      </div>
    </div>
    <BoardComment v-for="(comment) in comments" :comment="comment" :memberInfo="memberInfo" />
  </div>

</template>

<style scoped>
.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
