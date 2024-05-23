<script setup>
import {ref, computed, onMounted} from 'vue';
import Swal from "sweetalert2";
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;
const props = defineProps({
  item: Object,
  memberInfo: Object,
});

const imageUrl = computed(() => {
  if (props.item.itemImg) {
    return `data:image/jpeg;base64,${(props.item.itemImg)}`;
  }
  return null;
});

const contentClass = computed(() => {
  return props.item.itemImg ? 'w-10/12' : 'w-full';
});

const itemPrice = computed(() =>{
  return props.item.price.toLocaleString();
})

const exchangeItem = () => {
  const item = props.item;
  const memberInfo = props.memberInfo;
  console.log("item: ", item);
  if (item.price > memberInfo.point) {
    Swal.fire({
      icon: 'error',
      title: '상품 구매 불가능',
      text: '잔액을 확인해주세요.',
    });
    return;
  }
  if (item.quantity === 0) {
    Swal.fire({
      icon: 'error',
      title: '상품 구매 불가능',
      text: '재고를 확인해주세요.',
    });
    return;
  }
  axios.post(`${URL}/items/orders`, null, {
    params: {
      itemId: item.itemId,
      memberId: memberInfo.memberId,
      quantity: 1,
    }
  });
  window.location.reload();
}

onMounted(() => {
})
</script>

<template>
  <div class="container mx-auto flex h-64 mt-3 border-y-2">
    <!--  제목 + contents   -->
    <div :class="contentClass + ' flex flex-col justify-evenly'" style="height: 100%;">
      <div class="flex flex-col justify-around mt-4">
        <!--   이름   -->
        <div class="text-3xl mt-2">{{ item.name }}</div>
        <!--   가격  -->
        <div class="text-3xl mt-2">{{ itemPrice }}원</div>
        <!--   수량  -->
        <div class="text-3xl mt-2">{{ item.quantity }}개 보유중</div>
      </div>
      <!--   제목 + 작성 날짜 묶음 END   -->
      <div class="flex justify-end mb-8">
        <button
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style="width: 20%;"
            @click="exchangeItem"
        >
          교환하기
        </button>
      </div>
    </div>
    <!--  img 그림  -->
    <div class="w-2/12 my-auto" style="height: 80%" v-if="props.item.itemImg != null">
      <img :src="imageUrl" style="height: 90%" alt="Item Image"/>
    </div>
  </div>
</template>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
