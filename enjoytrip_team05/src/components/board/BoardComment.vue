<script setup>
import {computed, onMounted} from 'vue';

const props = defineProps({
  comment: Object,
  memberInfo: Object,
});

const profileImage = computed(() => {
  if (props.memberInfo.profileImage) {
    return `data:image/jpeg;base64,${props.memberInfo.profileImage}`;
  }
  return null;
});

const deleteComment = () => {
  
}
onMounted(() => {
  const dateSplit = props.comment.createdDate.split(':');
  props.comment.createdDate = dateSplit[0] + ':' + dateSplit[1];

});
</script>

<template>
  <div class="container mx-auto flex border-y-2 py-4">
    <!-- 왼쪽에 프로필 이미지 -->
    <div class="w-1/12 flex justify-center">
      <img
          class="profile-image"
          :src="profileImage"
          alt="Profile Image"
      />
    </div>
    <div class="w-11/12">
      <!-- 오른쪽에 id -->
      <div class="font-bold text-xl mb-2">{{ comment.memberName }}</div>
      <!-- 작성 시간 -->
      <div class="text-sm">{{ comment.createdDate }}</div>
      <!-- contents  -->
      <div class="my-4" style="min-height: 2rem; height: 2rem;">{{ comment.content }}</div>
      <!-- 수정/삭제 댓글쓰기 -->
      <div class="flex">
        <!--   TODO: 이거 버튼으로 처리해야됨   -->
        <div class="me-2 text-sm text-gray-500">수정</div>
        <div class="me-2 text-sm text-gray-500" @click="deleteComment">삭제</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-image {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
}
</style>
