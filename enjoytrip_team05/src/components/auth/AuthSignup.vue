<script setup>
import {computed, ref} from 'vue';
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';

const router = useRouter();
const URL = import.meta.env.VITE_BASE_URL;
const profileImage = ref({});
const checkPassword = ref("");
const isIdChecked = ref(false);
const memberInfo = ref({
  name: '',
  id: '',
  password: '',
  email: '',
  phoneNumber: '',
});
const errorMessage = ref("");

const handleFileUpload = (event) => {
  profileImage.value = event.target.files[0];
};

const checkIdAvailability = () => {
  if (memberInfo.value.id === "") {
    Swal.fire({
      icon: 'error',
      title: '사용 불가',
      text: '아이디를 입력해주세요.',
    });
    return;
  }
  axios.get(`${URL}/auth/checkId`, {
    params: { id: memberInfo.value.id },
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    Swal.fire({
      icon: 'success',
      title: '사용 가능',
      text: '사용 가능한 아이디입니다.',
    });
    isIdChecked.value = true;
  })
  .catch(error => {
    Swal.fire({
      icon: 'error',
      title: '사용 불가',
      text: '이미 사용 중인 아이디입니다.',
    });
  });
};

const signup = () => {
  if (["name", "password", "id", "email", "phoneNumber"].some(key => memberInfo.value[key] === "")) {
    Swal.fire({
      icon: 'error',
      title: '제출 불가',
      text: '빈 칸을 모두 입력해주세요.',
    })
    return;
  }

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

  axios.post(`${URL}/auth/signup`, formData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '회원가입 성공',
          text: '회원가입이 성공적으로 완료되었습니다!',
        });
        router.push({ name: 'main' });
      });

  // axios.get(`${URL}/auth/checkId`, {
  //   params: { id: memberInfo.value.id },
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // })
  //     .then(response => {
  //       if (response.data.available) {
  //         return axios.post(`${URL}/auth/signup`, formData);
  //       } else {
  //         throw new Error('ID가 이미 사용 중입니다.');
  //       }
  //     })
  //     .then(() => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: '회원가입 성공',
  //         text: '회원가입이 성공적으로 완료되었습니다!',
  //       });
  //       router.push({ name: 'main' });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       errorMessage.value = error.message || '회원가입 중 오류가 발생했습니다.';
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: errorMessage.value,
  //       });
  //     });
}
const passwordMismatch = computed(() => checkPassword.value !== memberInfo.value.password);
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
          <label class="block text-gray-700">아이디</label>
          <input
              v-model.lazy="memberInfo.id"
              type="text"
              class="w-full px-3 py-2 border rounded"
              :disabled="isIdChecked"
          />
        </div>
        <div class="mb-4 text-right">
          <button
              type="button"
              @click="checkIdAvailability"
              class="px-2 py-2 bg-green-300 text-white rounded hover:bg-green-400"
          >
            아이디 중복 검사
          </button>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">비밀번호</label>
          <input
              v-model.lazy="memberInfo.password"
              type="password"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div :class="{'mb-1': passwordMismatch, 'mb-4': !passwordMismatch}">
          <label class="block text-gray-700">비밀번호 확인</label>
          <input
              v-model.lazy="checkPassword"
              type="password"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div v-if="passwordMismatch" class="mb-4 ps-2 text-red-700 rounded">
          비밀번호가 일치하지 않습니다.
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
          회원가입 하기
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
