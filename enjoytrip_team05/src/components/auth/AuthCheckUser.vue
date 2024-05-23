<script setup>
import {onMounted, ref} from 'vue';
import "@/stores/member.js";
import "@/stores/menu.js";
import {useMenuStore} from "@/stores/menu.js";
import {storeToRefs} from "pinia";
import {useMemberStore} from "@/stores/member.js";
import {useRouter} from "vue-router";
import {jwtDecode} from "jwt-decode"

const router = useRouter()

const memberStore = useMemberStore()
const menuStore = useMenuStore();

const { isLogin, isLoginError } = storeToRefs(memberStore)
const { userLogin, getUserInfo } = memberStore
const { fetchMenuItems } = menuStore;
const { changeMenuState } = useMenuStore()
const URL = import.meta.env.VITE_BASE_URL;
const loginErrorMessage = ref("");
const loginUser = ref({
  id: "",
  password: "",
})

const login = async () => {
  await userLogin(loginUser.value)

  let token = sessionStorage.getItem("accessToken")
  let memberId = sessionStorage.getItem("memberId");
  if (isLogin.value) {
    getUserInfo(token)
    // changeMenuState()
    // fetchMenuItems();
    router.replace({name: "mypage", params: {memberId: memberId}})
  } else {
    loginErrorMessage.value = "비밀번호를 다시 확인해주세요.";
  }
};

onMounted(() => {
  const token = sessionStorage.getItem("accessToken")
  loginUser.value.id = jwtDecode(token).sub;
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-700">Login</h2>
      <form @submit.prevent="login">
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

</style>