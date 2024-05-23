<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const showLogo = ref(false);
const logoStatus = computed(() => showLogo.value);

const showButton = ref(false);
const buttonStatus = computed(() => showButton.value);

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
  if (sessionStorage.getItem("memberId"))
    router.push({name: 'board'})
  else
    router.push({ name: 'login' });
};
</script>

<template>
  <div class="intro-page" @click="navigateToLogin">
    <div :class="{ 'background': true, 'fade-in': showBackground }">
      <div class="overlay"></div>
    </div>
    <img v-show="logoStatus" :src="logoUrl" class="logo fade-in-transition" />
    <p v-show="logoStatus" class="background-text">리뷰를 등록하고, 코스를 인수하세요.</p>
    <button v-show="buttonStatus" @click="navigateToLogin" class="start-button fade-in-transition">시작하기</button>
  </div>
</template>

<style scoped>
@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes moveDown {
  0% {
    top: 50%;
  }
  100% {
    top: 70%;
  }
}

.intro-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%);
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('src/assets/img/background4.jpeg'); /* 배경 이미지 경로를 설정하세요 */
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.background.fade-in {
  opacity: 1;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검은색 오버레이 */
  z-index: 1;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.background.fade-in .overlay {
  opacity: 1;
}

.background-text {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 2.5rem;
  text-align: center;
  padding: 0 20px;
  font-weight: bold;
  opacity: 0;
  animation: fadein 2s ease 4s forwards; /* 로고가 나타난 후에 텍스트가 나타나도록 애니메이션 조정 */
  z-index: 2;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7); /* 텍스트에 더 뚜렷한 그림자 추가 */
}

.logo {
  max-width: 20%; /* 로고 크기를 줄이기 위해 max-width를 30%로 변경 */
  opacity: 0;
  animation: fadein 3s ease 3s forwards;
  z-index: 2;
}

.start-button {
  margin-top: 100px;
  padding: 10px 20px;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0;
  animation: fadein 2s ease 6s forwards;
  z-index: 2;
  border: none;
  background-color: #fff;
  color: #333;
  border-radius: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.start-button:hover {
  transform: scale(1.05);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
