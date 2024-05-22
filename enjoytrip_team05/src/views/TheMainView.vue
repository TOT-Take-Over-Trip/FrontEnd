<script setup>
import { ref, onMounted, computed} from "vue";
import { useRouter } from "vue-router";

const showLogo = ref(false);
const logoStatus = computed(()=>{
  return showLogo.value;
})

const showButton = ref(false);
const buttonStatus = computed(()=>{
  return showButton.value;
})
const showBackground = ref(false);
const logoUrl = 'src/assets/img/logo.png'; // 로고 이미지 경로를 설정하세요

onMounted(() => {
  setTimeout(() => {
    showBackground.value = true;
    setTimeout(() => {
      showLogo.value = true;
      setTimeout(() => {
        showButton.value = true;
      }, 3000);
    }, 2000);
  }, 1000);
});

const router = useRouter();
const navigateToLogin = () => {
  router.push({ name: 'login' });
};
</script>

<template>
  <div class="intro-page" @click="navigateToLogin">
    <div :class="{ 'background': true, 'fade-in': showBackground }"></div>
    <img v-show="logoStatus" :src="logoUrl" class="logo fade-in-transition"/>
    <button v-show="buttonStatus" class="start-button fade-in-transition">시작하기</button>
  </div>
</template>

<style scoped>
.intro-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('src/assets/img/test/background.jpeg'); /* 배경 이미지 경로를 설정하세요 */
  background-size: cover;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.background.fade-in {
  opacity: 1;
}

.logo {
  max-width: 50%;
  /*transition: opacity 1s ease-in-out;*/
  opacity: 0;
  animation: fadein 5s ease 3s;
  -webkit-animation: fadein 3s; /* Safari and Chrome */
  z-index: 1;
}

.start-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0;
  z-index: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.logo, .start-button {
  opacity: 1; /* 초기 상태에서는 보이도록 설정 */
}

</style>
