<script setup>
import axios from 'axios';
import { onMounted, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";

import ItemContent from "@/components/item/ItemContent.vue";

const items = ref([]);

const URL = import.meta.env.VITE_BASE_URL;
const memberInfo = ref({});

const fetchItems = async () => {
  try {
    const response = await axios.get(`${URL}/items`);
    console.log("response: ", response.data);
    items.value = response.data;
    console.log(items.value);
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

const router = useRouter();

onMounted(() => {
  fetchItems();
  const memberId = sessionStorage.getItem("memberId");
  axios.get(`${URL}/members/${memberId}`)
      .then((response) => {
        memberInfo.value = response.data;
      })
});
</script>

<template>
  <div class="container mx-auto">
    <div class="flex justify-center items-center font-bold text-xl py-4 bg-gray-100">
      아이템 목록
    </div>

    <div class="grid-container">
      <div v-for="(item, index) in items"
           :key="item.itemId"
           :to="{ name: 'itemDetail', params: { itemId: item.itemId } }"
           class="grid-item"
      >
        <ItemContent :item="item" :memberInfo="memberInfo" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
}

.grid-item {
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.grid-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
