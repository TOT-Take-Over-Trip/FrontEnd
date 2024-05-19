<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: Object,
});

const imageUrl = computed(() => {
  if (props.item.itemImg) {
    // console.log(props.post.thumbnail)
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
</script>

<template>
  <div class="container mx-auto flex h-64 mt-3 border-y-2">
    <!--  제목 + contents   -->
    <div :class="contentClass + ' flex flex-col mt-4'" style="height: 100%;">
      <div>
        <!--   이름   -->
        <div class="text-3xl">{{ item.name }}</div>
        <!--   가격  -->
        <div class="text-3xl">{{ itemPrice }}원</div>
        <!--   수량  -->
        <div class="text-3xl">{{ item.quantity }}개 보유중</div>
        <button
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          교환하기
        </button>
      </div>
      <!--   제목 + 작성 날짜 묶음 END   -->

    </div>
    <!--  img 그림  -->
    <div class="w-2/12 mt-3" style="height: 100%" v-if="props.item.itemImg != null">
      <img :src="imageUrl" style="height: 90%" alt="Item Image"/>
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
