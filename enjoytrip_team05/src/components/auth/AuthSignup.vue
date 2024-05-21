<script>
import { ref } from 'vue';

export default {
  setup() {
    const form = ref({
      name: '',
      id: '',
      password: '',
      email: '',
      phone_number: '',
      profile_image: null,
    });

    const handleFileUpload = (event) => {
      form.value.profile_image = event.target.files[0];
    };

    const submitForm = () => {
      // 여기에 폼 제출 로직을 추가합니다.
      console.log('Form submitted:', form.value);
    };

    return {
      form,
      handleFileUpload,
      submitForm,
    };
  },
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-gray-700">Name</label>
          <input
              v-model="form.name"
              type="text"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">ID</label>
          <input
              v-model="form.id"
              type="text"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input
              v-model="form.password"
              type="password"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input
              v-model="form.email"
              type="email"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Phone Number</label>
          <input
              v-model="form.phone_number"
              type="tel"
              class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Profile Image</label>
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
