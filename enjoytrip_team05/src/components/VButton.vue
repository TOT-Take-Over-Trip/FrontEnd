<script setup>
import {computed, defineEmits} from "vue";

const emits = defineEmits(['click'])

const btnClass = computed(() => {
  return `bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`;
});

function onClick(event) {
  emits('click', event); // 버튼 클릭 이벤트를 발생시키는 함수
}
</script>

<template>
  <button :class="btnClass" @click="onClick">
    <slot></slot>
  </button>
</template>

<style scoped>

</style>