<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import VBoardCard from "@/components/board/BoardCard.vue";
import SearchComponent from "@/components/board/SearchComponent.vue";

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};

// TODO: board 게시판 정보 불러와야 함



</script>

<template>
  <div class="board-container">
    <!--  swiper 부분 (게시글 title, content 적고 넘기는 용도) START -->
    <div class="swiper-container flex items-center justify-center bg-gray-700 text-black">
      <swiper
          class="h-96"
          :slides-per-view="7"
          :space-between="100"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
      >
        <swiper-slide v-for="(i) in 10">
          <VBoardCard />
        </swiper-slide>
      </swiper>
    </div>
    <!--  swiper 부분 (게시글 title, content 적고 넘기는 용도) END -->

    <!--  검색창 START  -->
    <div>
      <SearchComponent />
    </div>
    <!--  검색창 END  -->

    <!--  전체 게시글 목록 (제목, 날짜, content:글자수로 자름) | 썸네일 START  -->
    <div></div>
    <!--  전체 게시글 목록 (제목, 날짜, content:글자수로 자름) | 썸네일 START  -->
  </div>
</template>

<style scoped>
.board-container {
  height: 2550px;
}
.swiper-container {
  height: 25%;
}
</style>