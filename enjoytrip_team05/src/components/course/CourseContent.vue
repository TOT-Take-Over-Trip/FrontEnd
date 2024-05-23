<script setup>
import {computed, onMounted, ref} from 'vue';
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const props = defineProps({
  course: Object,
});

const showMore = ref(false);
const maxVisiblePlaces = ref(4);

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

/*좋아요 로직 Start*/
const token = sessionStorage.getItem("accessToken");
const decodeToken = jwtDecode(token);
const memberName = decodeToken.sub;
const memberId = sessionStorage.getItem("memberId");
const URL = import.meta.env.VITE_BASE_URL;
const isLiked = ref(props.course.like) // 좋아요 상태를 나타내는 boolean 값
const likedImageUrl = 'src/assets/img/like.png'; // 좋아요 상태일 때의 이미지 URL
const unlikedImageUrl = 'src/assets/img/non-like.png'; // 좋아요 상태가 아닐 때의 이미지 URL
const courseLikeCount = ref(props.course.courseLikeCount)

const likeCourse = (courseId) => {
  if(isLiked.value) {
    axios.post(`${URL}/courses/${courseId}/unlike?memberId=${memberId}`).then(console.log("좋아요 취소"))
    courseLikeCount.value-=1;
  }else{
    axios.post(`${URL}/courses/${courseId}/like?memberId=${memberId}`).then(console.log("좋아요 성공!"))
    courseLikeCount.value+=1;
  }
  isLiked.value = !isLiked.value;
}

const likeCount = computed(()=>{
  return courseLikeCount.value;
})
/*좋아요 로직 End*/

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
  <div class="container mx-auto flex h-72 mt-3 border-y-2">
    <!--  제목 + contents   -->
    <div :class="contentClass + ' flex flex-col mt-4 w-10/12'" style="height: 100%;">
      <!--   제목 + 작성 날짜 묶음 START   -->
      <div>
        <!--   제목 START  -->
        <div class="text-3xl flex justify-center">{{ course.title }}</div>
        <!--   제목 END  -->
        <button @click.stop.prevent="likeCourse(course.courseId)" class="like-button">
          <img :src="isLiked ? likedImageUrl : unlikedImageUrl" alt="Like Button" style="width: 2rem; height: 2rem;" />
        </button>
        {{likeCount}}
        <!--   작성 날짜 START  -->
<!--        <div class="text-xl mt-2 mb-4">{{ course.createdDate }}</div>-->
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
<!--      img 그림-->
    <div class="w-1/12 mt-3 flex justify-end" style="height: 100%; width: 100%" v-if="thumbnail != null">
      <img :src="thumbnail" style="height: 90%" alt="Post Thumbnail"/>
      <!--      <img src="/src/assets/img/test/testImg.jpeg" style="height: 90%" alt="Post Thumbnail"/>-->
    </div>
  </div>
</template>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
