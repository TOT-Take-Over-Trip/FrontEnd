<script setup>
import { computed } from 'vue';

const props = defineProps({
  course: Object,
});

// const imageUrl = computed(() => {
//   if (props.item.itemImg) {
//     // console.log(props.post.thumbnail)
//     return `data:image/jpeg;base64,${(props.item.itemImg)}`;
//   }
//   return null;
// });

const contentClass = computed(() => {
  // return props.item.itemImg ? 'w-10/12' : 'w-full';
  return 'w-full';
});
//
// const itemPrice = computed(() =>{
//   return props.item.price.toLocaleString();
// })
</script>

<template>
  <div class="container mx-auto flex h-64 mt-3 border-y-2">
    <!--  제목 + contents   -->
    <div>
      <div>
        <!--   제목   -->
        <div class="text-3xl">제목: {{ course.title }}</div>
        <!--   내용  -->
        <div class="text-3xl">내용: {{ course.content }}</div>
        <div v-for="(coursePlace,index) in course.coursePlaces":key="coursePlace.courseId">
          {{index + 1}}번째 장소 : {{coursePlace.content}}
        </div>

      </div>
      <!--   제목 + 작성 날짜 묶음 END   -->

    </div>
    <!--  img 그림  -->
<!--    <div class="w-2/12 mt-3" style="height: 100%" v-if="props.item.itemImg != null">-->
<!--      <img :src="imageUrl" style="height: 90%" alt="Item Image"/>-->
<!--      &lt;!&ndash;      <img src="/src/assets/img/test/testImg.jpeg" style="height: 90%" alt="Post Thumbnail"/>&ndash;&gt;-->
<!--    </div>-->
  </div>
</template>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
