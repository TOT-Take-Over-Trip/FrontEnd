<script setup>
import {computed, onMounted, ref} from 'vue';

const props = defineProps({
  course: Object,
});

const showMore = ref(false);
const maxVisiblePlaces = ref(3);

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

const visiblePlaces = computed(() => {
  return showMore.value ? props.course.coursePlaces : props.course.coursePlaces.slice(0, maxVisiblePlaces.value);
});

const contentClass = computed(() => {
  // return props.item.itemImg ? 'w-10/12' : 'w-full';
  return 'w-full';
});


</script>

<template>
  <div class="container mx-auto flex h-72 mt-3 border-y-2">
    <!--  제목 + contents   -->
    <div :class="contentClass + ' flex flex-col mt-4'" style="height: 100%;">
      <!--   제목 + 작성 날짜 묶음 START   -->
      <div>
        <!--   제목 START  -->
        <div class="text-3xl">{{ course.title }}</div>
        <!--   제목 END  -->
        <!--   작성 날짜 START  -->
        <div class="text-xl mt-2 mb-4">{{ course.createdDate }}</div>
        <!--   작성 날짜 END  -->
      </div>
      <!--   제목 + 작성 날짜 묶음 END   -->
      <!--   내용  -->
      <div class="text-2xl mt-2 mb-4">{{ course.content }}</div>
      <div class="flex flex-col justify-between">
        <div v-for="(coursePlace, index) in visiblePlaces" :key="coursePlace.courseId" class="mb-1">
          {{ index + 1 }}번째 코스 ({{coursePlace.place.name}}) : {{ coursePlace.content }}
        </div>
      </div>
    </div>
    <!--  img 그림  -->
<!--    <div class="w-2/12 mt-3" style="height: 100%" v-if="props.post.thumbnail != null">-->
<!--      <img :src="imageUrl" style="height: 90%" alt="Post Thumbnail"/>-->
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
