<script setup>
import { RouterLink} from 'vue-router'
</script>

<template>
  <div>Main 화면 입니다.</div>
  <RouterLink :to="{name: 'regist'}">Quill적용한 글쓰기 페이지</RouterLink>
</template>

<style scoped></style>
