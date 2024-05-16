<script setup>
import axios from 'axios';
import {onMounted, ref} from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';


// Import Swiper styles
import 'swiper/css';
import VBoardCard from "@/components/board/BoardCard.vue";
import SearchComponent from "@/components/board/BoardSearchComponent.vue";
import BoardContent from "@/components/board/BoardContent.vue";


// posts => 전체 포스트
// topRankPosts => 상위 10개 post
const posts = ref([]);
const topRankPosts = ref([]);
const URL = import.meta.env.VITE_BASE_URL;
const fetchPosts = async () => {
  try {
    const response = await axios.get(`${URL}/posts`);
    posts.value = response.data.posts;
    topRankPosts.value = response.data.topRankPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// TODO: 짝수 번째 마다 색 조금 다르게

onMounted(() => {
  fetchPosts();
})

// TODO: board 게시판 정보 불러와야 함
</script>

<template>
  <div>
    <!-- swiper 부분 (게시글 title, content 적고 넘기는 용도) START -->
    <div class="swiper-container flex items-center bg-zinc-100 justify-center py-4 text-black">
      <swiper
          class="h-96"
          :slides-per-view="4"
          :space-between="100"
          :breakpoints="{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
          1280: { slidesPerView: 4, spaceBetween: 50 },
        }"

      >
        <swiper-slide v-for="(post) in topRankPosts" :key="post.id">
          <VBoardCard class="rounded-xl" :post="post" style="border: 1px solid #c0c0c0" />
        </swiper-slide>
      </swiper>
    </div>
    <!-- swiper 부분 (게시글 title, content 적고 넘기는 용도) END -->

    <!-- 검색창 START -->
    <div class="search-container">
      <SearchComponent :posts="posts" />
    </div>
    <!-- 검색창 END -->

    <!-- 전체 게시글 목록 (제목, 날짜, content:글자수로 자름) | 썸네일 START -->
    <RouterLink :to="name='boardDetail'">
      <BoardContent  v-for="(post, index) in posts" :key="post.postId" :post="post" />
    </RouterLink>
    <!-- 전체 게시글 목록 (제목, 날짜, content:글자수로 자름) | 썸네일 END -->
  </div>
</template>

<style scoped>

.swiper-container {
  height: 25%;
}
.search-container {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white; /* 배경색을 설정하여 스크롤 시 다른 요소와 겹치지 않게 함 */
}
</style>
