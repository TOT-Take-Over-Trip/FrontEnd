<script setup>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const BASE_URL = import.meta.env.VITE_BASE_URL;
const memberInfo = ref({});
const selectedProfileImage = ref(null);
let memberId;

const profileImage = computed(() => {
  if (selectedProfileImage.value) {
    return URL.createObjectURL(selectedProfileImage.value);
  }
  else if (memberInfo.value.profileImage) {
    return `data:image/jpeg;base64,${memberInfo.value.profileImage}`;
  }
  return null;
});

const updateMemberInfo = () => {
  if (memberInfo.value.password === "") {
    // TODO: sweet alert 추가
    return;
  }
  const formData = new FormData();
  const memberDto = JSON.stringify({
    email: memberInfo.value.email,
    password: memberInfo.value.password,
    phoneNumber: memberInfo.value.phoneNumber,
  });
  formData.append("memberDto", new Blob([memberDto], { type: "application/json" }));
  if (selectedProfileImage.value) {
    formData.append("profileImage", selectedProfileImage.value);
  }
  axios.put(`${BASE_URL}/members/${memberId}`, formData)
      .then(() => {
        console.log("update 완료");
        router.replace("/")
            .then(() => {
              window.location.reload();
            });
      });
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedProfileImage.value = file;
  }
};

onMounted(() => {
  memberId = sessionStorage.getItem('memberId');
  axios.get(`${BASE_URL}/members/${memberId}`).then((response) => {
    memberInfo.value = response.data;
    memberInfo.value.password = "";
  });
});
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-200">
    <div class="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-600">나의 정보</h1>
      </header>
      <div class="flex items-center">
        <div class="w-1/3 text-right pr-6">
          <img
              v-if="profileImage"
              :src="profileImage"
              alt="Profile Picture"
              class="w-32 h-32 rounded-full mx-auto border border-gray-300"
          />
          <img
              v-else
              src="/src/assets/img/anonymous.png"
              alt="Profile Picture"
              class="w-32 h-32 rounded-full mx-auto border border-gray-300"
          />
          <input type="file" @change="handleFileChange" class="mt-4 mx-auto block" />
        </div>
        <div class="w-2/3 text-left space-y-4">
          <div class="flex items-center space-x-2">
            <label for="name" class="w-1/3 text-gray-700">이름</label>
            <input
                disabled
                v-model="memberInfo.name"
                type="text"
                id="name"
                class="w-2/3 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="flex items-center space-x-2">
            <label for="id" class="w-1/3 text-gray-700">아이디</label>
            <input
                disabled
                v-model="memberInfo.id"
                type="text"
                id="id"
                class="w-2/3 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="flex items-center space-x-2">
            <label for="password" class="w-1/3 text-gray-700">비밀번호</label>
            <input
                required
                v-model="memberInfo.password"
                type="password"
                id="password"
                class="w-2/3 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="flex items-center space-x-2">
            <label for="email" class="w-1/3 text-gray-700">Email</label>
            <input
                v-model="memberInfo.email"
                type="email"
                id="email"
                class="w-2/3 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="flex items-center space-x-2">
            <label for="phoneNumber" class="w-1/3 text-gray-700">연락처</label>
            <input
                v-model="memberInfo.phoneNumber"
                type="text"
                id="phoneNumber"
                class="w-2/3 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="flex items-center space-x-2">
            <label for="point" class="w-1/3 text-gray-700">Point</label>
            <input
                disabled
                v-model="memberInfo.point"
                type="number"
                id="point"
                class="w-2/3 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="flex items-center space-x-2">
            <label for="createdDate" class="w-1/3 text-gray-700">가입 일자</label>
            <input
                v-model="memberInfo.createdDate"
                type="text"
                id="createdDate"
                class="w-2/3 p-2 border border-gray-300 rounded-md"
                disabled
            />
          </div>
        </div>
      </div>
      <div class="text-center mt-8">
        <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" @click="updateMemberInfo">
          저장
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
</style>
