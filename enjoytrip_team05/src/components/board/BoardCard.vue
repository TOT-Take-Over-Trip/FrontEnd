<script setup>

defineProps({
  post: Object
})


</script>

<template>
  <div class="board-card flex flex-col justify-evenly mx-6 bg-gray-300 w-10/12">
    <div class="title-container flex justify-center items-center font-bold text-xl mx-auto bg-amber-300 text-center break-words">
      {{ post.title }}
    </div>
    <div class="img-container mx-auto">
      <!--  TODO: axios로 데이터 받아줘야 함    -->
      <img src="/src/assets/img/test/testImg.jpeg" class="rounded-xl" style="height: 100%; width: 100%" alt="thumbnail"/>
    </div>

  </div>
</template>

<style scoped>
.board-card {
  height: 100%;
}

.title-container {
  height: 30%;
  width: 70%;
}

.img-container {
  height: 50%;
  width: 70%;
}

</style>