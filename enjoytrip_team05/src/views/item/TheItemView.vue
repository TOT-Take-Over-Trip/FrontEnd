<script setup>
import axios from 'axios';
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";



import ItemContent from "@/components/item/ItemContent.vue";
import VButton from "@/components/VButton.vue";
import VSelect from "@/components/VSelect.vue";

const items = ref([]);

const URL = import.meta.env.VITE_BASE_URL;

const fetchItems = async () => {
  try {
    const response = await axios.get(`${URL}/items`);
    console.log(response.data);
    items.value = response.data;
    console.log(items.value);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const router = useRouter();

// TODO: 짝수 번째 마다 색 조금 다르게

onMounted(() => {
  fetchItems();
})

</script>

<template>
  <div>

    <div class="flex justify-center items-center font-bold text-xl py-4 bg-gray-100">
      아이템 목록
    </div>

    <!-- 전체 게시글 목록 (제목, 날짜, content:글자수로 자름) | 썸네일 START -->
    <RouterLink v-for="(item, index) in items"
                :key="item.itemId"
                :to="{ name: 'itemDetail', params: { itemId: item.itemId } }">
      <ItemContent :item="item" />
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
