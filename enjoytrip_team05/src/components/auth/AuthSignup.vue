<script setup>
import { ref } from 'vue';
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const URL = import.meta.env.VITE_BASE_URL;
const profileImage = ref({});
const checkPassword = ref("");
const memberInfo = ref({
  name: '',
  id: '',
  password: '',
  email: '',
  phoneNumber: '',
});


const handleFileUpload = (event) => {
  profileImage.value = event.target.files[0];
};

const signup = () => {

  const formData = new FormData();
  const signUpUserDto = JSON.stringify({
    id: memberInfo.value.id,
    password: memberInfo.value.password,
    name: memberInfo.value.name,
    email: memberInfo.value.email,
    phoneNumber: memberInfo.value.phoneNumber,
  });

  formData.append("signUpUserDto", new Blob([signUpUserDto], { type: "application/json" }));
  if (profileImage.value) {
    formData.append("profileImage", profileImage.value);
  }

  axios.get(`${URL}/auth/checkId`, {
    params: { id: memberInfo.value.id },
    headers: {
      'Content-Type': 'application/json',
    }
  })
      .then(response => {
        if (response.data.available) {
          return axios.post(`${URL}/auth/signup`, formData);
        } else {
          throw new Error('ID가 이미 사용 중입니다.');
        }
      })
      .then(() => {
        console.log("회원가입 성공?");
        router.push({ name: 'main' });
      })
      .catch(error => {
        console.error(error);
        errorMessage.value = error.message || '회원가입 중 오류가 발생했습니다.';
      });
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">회원 가입</h2>
      <form @submit.prevent="signup">
        <div class="mb-4">
          <label class="block text-gray-700">이름</label>
          <input
              v-model.lazy="memberInfo.name"
              type="text"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">ID</label>
          <input
              v-model.lazy="memberInfo.id"
              type="text"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">비밀번호</label>
          <input
              v-model.lazy="memberInfo.password"
              type="password"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">비밀번호 확인</label>
          <input
              v-model.lazy="checkPassword"
              type="password"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div v-if="errorMessage" class="mb-4 text-red-500">{{ errorMessage }}</div>
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input
              v-model.lazy="memberInfo.email"
              type="email"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">전화번호</label>
          <input
              v-model.lazy="memberInfo.phoneNumber"
              type="tel"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">프로필 이미지</label>
          <input
              @change="handleFileUpload"
              type="file"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind CSS는 이미 프로젝트에 설치되어 있다고 가정합니다. */
</style>
