<script setup>

import VButton from "@/components/VButton.vue";
</script>

<template>
  <div class="flex justify-around items-center w-full border-b-2">
    <!--  검색 + 검색아이콘 + 필터 + 글쓰기 -->
    <div class="flex items-center w-2/3 h-32">
      <!--  TODO: select 아예 component로 사용할 수 있는 거 만들기    -->
      <!--  TODO: 이거 필터 내용 어떤거 할건지?    -->
      <select class="me-12" style="height: 50%">
        <option>제목</option>
        <option>작성자</option>
      </select>
      <input type="text" class="text-2xl" style="width: 50%; height: 50%" placeholder="검색할 내용을 입력해주세요.">
      <!--  TODO: click 할 때 게시글 검색으로 넘어가야돼    -->
      <img src="/src/assets/img/searchIcon.png" @click="" class="mx-3" style="height: 49%" alt="searchIcon" />
    </div>
    <VButton class="w-32 h-3/4">글쓰기</VButton>
    <!--  필터 + 글쓰기  -->
  </div>
</template>

<style scoped>

</style>