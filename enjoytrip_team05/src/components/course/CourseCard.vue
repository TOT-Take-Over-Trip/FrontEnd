<script setup>

import {computed} from "vue";

const props = defineProps({
  course: Object,
});

const thumbnail = computed(()=>{
  const coursePlaces = props.course.coursePlaces;
  for(let i=0; i<coursePlaces.length; i++){
    if(coursePlaces[i].place.thumbnail){
      return coursePlaces[i].place.thumbnail;
    }
  }
  return "src/assets/img/test/testImg.jpeg";
})

</script>

<template>
  <div class="board-card flex flex-col bg-zinc-200 justify-evenly mx-6 w-10/12">
    <div class="title-container flex justify-center items-center font-bold text-xl mx-auto bg-white text-center break-words">
      {{ course.title }}
    </div>
    <div class="img-container mx-auto">
      <!--  TODO: axios로 데이터 받아줘야 함    -->
      <img :src="thumbnail" class="rounded-xl" style="height: 100%; width: 100%" alt="thumbnail"/>
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