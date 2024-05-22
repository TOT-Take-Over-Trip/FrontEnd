<script setup>
import { ref } from 'vue';
import "@/stores/member.js";
import "@/stores/menu.js";
import {useMenuStore} from "@/stores/menu.js";
import {storeToRefs} from "pinia";
import {useMemberStore} from "@/stores/member.js";
import {useRouter} from "vue-router";

const router = useRouter()

const memberStore = useMemberStore()
const menuStore = useMenuStore();

const { isLogin, isLoginError } = storeToRefs(memberStore)
const { userLogin, getUserInfo } = memberStore
const { fetchMenuItems } = menuStore;
const { changeMenuState } = useMenuStore()
const URL = import.meta.env.VITE_BASE_URL;
const loginUser = ref({
  id: "",
  password: "",
})

const loginErrorMessage = ref("");

const login = async () => {
  await userLogin(loginUser.value)

  let token = sessionStorage.getItem("accessToken")
  console.log("token: ", token)
  if (isLogin.value) {
    getUserInfo(token)
    changeMenuState()
    fetchMenuItems();
    router.replace("/")
  } else {
    loginErrorMessage.value = "아이디와 비밀번호를 다시 확인해주세요.";
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-700">Login</h2>
      <form @submit.prevent="login">
        <div class="mt-4">
          <label class="block text-sm">ID</label>
          <input
              type="text"
              v-model="loginUser.id"
              class="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              required
          />
        </div>
        <div class="mt-4">
          <label class="block text-sm">Password</label>
          <input
              type="password"
              v-model="loginUser.password"
              class="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              required
          />
        </div>
        <div v-if="loginErrorMessage" class="mt-4 text-red-600">
          {{ loginErrorMessage }}
        </div>
        <div class="flex items-center justify-between mt-4">
          <button
              type="submit"
              class="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* 추가적인 스타일을 여기에 작성할 수 있습니다. */
</style>
