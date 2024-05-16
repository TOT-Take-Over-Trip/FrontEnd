<script setup>
import VButton from "@/components/VButton.vue";
import {ref} from 'vue';

// const props = defineProps({
//   posts: Array,
// });

const searchCondition = ref('');
const searchContent = ref('')

function searchPosts() {
  let filteredPosts;
  if (searchCondition.value === '제목') {
    filteredPosts = props.posts.filter(post => post.title.includes(searchContent.value));
  } else if (searchCondition.value === '작성자') {
    filteredPosts = props.posts.filter(post => post.member.includes(searchContent.value));
  }
  console.log(filteredPosts);
  // 필요하다면 필터링된 게시글을 다루는 로직 추가
}

</script>

<template>
  <div class="flex justify-around items-center w-full ">
    <!--  검색 + 검색아이콘 + 필터 + 글쓰기 -->
    <div class="flex items-center justify-center w-2/3 h-24">
      <!--  TODO: select 아예 component로 사용할 수 있는 거 만들기    -->
      <!--  TODO: 이거 필터 내용 어떤거 할건지?    -->
      <select class="me-12" style="height: 30%; width: 8%" v-model="searchCondition">
        <option>제목</option>
        <option>작성자</option>
      </select>
      <input type="text" class="text-xl border-2" style="width: 50%; height: 45%" placeholder="검색할 내용을 입력해주세요." v-model="searchContent">
      <!--  TODO: click 할 때 게시글 검색으로 넘어가야돼    -->
      <img src="/src/assets/img/searchIcon.png" @click="searchPosts" class="mx-3" style="height: 49%" alt="searchIcon" />
      <RouterLink :to="{name: 'regist'}">
        <VButton class="w-32" style="height: 40%;">글쓰기</VButton>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>