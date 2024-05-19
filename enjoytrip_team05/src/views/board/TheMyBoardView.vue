<script setup>
import axios from 'axios';
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";


// Import Swiper styles
import 'swiper/css';
import BoardContent from "@/components/board/BoardContent.vue";
import VButton from "@/components/VButton.vue";
import VSelect from "@/components/VSelect.vue";


// posts => 전체 포스트
// topRankPosts => 상위 10개 post
const posts = ref([]);
const filteredPosts = ref([]);

const searchCondition = ref('제목');
const searchContent = ref('')

const displayPosts = computed( () => {
  return filteredPosts.value.length>0 ? filteredPosts.value : posts.value;
})

function searchPosts() {
  if (searchCondition.value === '제목') {
    filteredPosts.value = JSON.parse(JSON.stringify(posts.value)).filter(post => post.title.includes(searchContent.value))
  } else if (searchCondition.value === '작성자') {
    filteredPosts.value = JSON.parse(JSON.stringify(posts.value)).filter(post => post.memberName.includes(searchContent.value))
  }
  console.log(filteredPosts);
}

const URL = import.meta.env.VITE_BASE_URL;
const memberId = 1;
const fetchPosts = async () => {
  try {
    const response = await axios.get(`${URL}/posts/members?memberId=${memberId}`);
    posts.value = response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const router = useRouter();

// TODO: 짝수 번째 마다 색 조금 다르게


const options = ref([
  {
    id: 1,
    name: '제목',
  },
  {
    id: 2,
    name: '작성자',
  }
])



onMounted(() => {
  fetchPosts();
})

// TODO: board 게시판 정보 불러와야 함
</script>

<template>
  <div>
    <!-- 검색창 START -->
    <div class="search-container">
      <!--      <SearchComponent :posts="posts" />-->
      <div class="flex justify-around items-center w-full ">
        <!--  검색 + 검색아이콘 + 필터 + 글쓰기 -->
        <div class="flex items-center justify-center w-2/3 h-24">
          <!--  TODO: 이거 필터 내용 어떤거 할건지?    -->
          <VSelect class="me-12 my-auto" style="height: 40%; width: 10%;" v-model="searchCondition" :options="options" />
          <input type="text" class="text-xl border-2" style="width: 50%; height: 45%" placeholder="검색할 내용을 입력해주세요." v-model="searchContent">
          <!--   TODO: 이거 검색할 때 일치하는 데이터 없으면 전체 랜더링 되는데 이거 해결해야 될듯       -->
          <img src="/src/assets/img/searchIcon.png" @click="searchPosts" class="mx-3" style="height: 49%" alt="searchIcon" />
          <RouterLink :to="{name: 'regist'}">
            <VButton class="w-32" style="height: 40%;">글쓰기</VButton>
          </RouterLink>
        </div>
      </div>
    </div>
    <!-- 검색창 END -->

    <div class="flex justify-center items-center font-bold text-xl py-4 bg-gray-100">
      내가 작성한 글 목록
    </div>


    <!-- 전체 게시글 목록 (제목, 날짜, content:글자수로 자름) | 썸네일 START -->
    <RouterLink v-for="(post, index) in displayPosts"
                :key="post.postId"
                :to="{ name: 'boardDetail', params: { postId: post.postId } }">
      <BoardContent :post="post" />
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
