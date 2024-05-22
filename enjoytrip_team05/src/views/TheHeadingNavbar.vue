<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import {computed, onMounted, ref} from "vue";
import { useMenuStore } from "@/stores/menu";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";
import axios from "axios";

const menuStore = useMenuStore();
const memberStore = useMemberStore();

// 반응형을 유지하면서 스토어에서 속성을 추출하려면, storeToRefs()를 사용
// https://pinia.vuejs.kr/core-concepts/
const { menuList, notificationList } = storeToRefs(menuStore);
const { changeMenuState, fetchMenuItems } = menuStore;

const { userLogout } = memberStore;
//알림 드랍다운 START

const URL = import.meta.env.VITE_BASE_URL;
const dropdownOpen = ref(false);

const isDropdownOpen = computed( () => {
  return dropdownOpen.value;
})

const computedNotificationList = computed(()=>{
  return notificationList.value;
})

const showToggleDropdown = () => {
  dropdownOpen.value = true;
}

const hideToggleDropdown = () => {
  dropdownOpen.value = false;
}

const readNotification = (notificationId) => {
  axios.post(`${URL}/notifications/read/${notificationId}`)
  .then(response => {
    const index = notificationList.value.findIndex(
        notification => notification.notificationId === notificationId);
    notificationList.value.splice(index, 1);
      }
  )
}
//알림 드랍다운 END

const logout = () => {
  userLogout();
  changeMenuState();
};

const navigation = [
  {
    value: '게시판',
    name: 'board',
    current: false,
    submenu: [
      {
        value: '전체게시글 보기',
        name: 'board',
      },
      {
        value: '내 게시글 보기',
        name: 'myBoard',
      },
      {
        value: '댓글 단 글 보기',
        name: 'myCommentBoard',
      },
      {
        value: '스크랩한 글 보기',
        name: 'myLikeBoard',
      }
    ]
  },
  {
    value: '코스',
    name: 'course',
    current: false,
    submenu: [
      {
        value: '전체 코스 보기',
        name: 'course',
      },
      {
        value: '내 코스 보기',
        name: 'myCourse',
      },
      {
        value: '코스 등록',
        name: 'courseRegist',
      },
    ]
  },
  { value: '상점', name: 'shop', current: false },
]

const itemHover = ref(null);

const handleMouseEnter = (name) => {
  itemHover.value = name;
};

const handleMouseLeave = () => {
  itemHover.value = null;
};

onMounted(() => {
  changeMenuState();
  if(sessionStorage.getItem("accessToken")) {
    fetchMenuItems();
  }
});

</script>

<template>
  <nav class="border-b-2">
    <div class="mx-56 px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between w-full">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon class="hidden h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <RouterLink :to="{name: 'main'}">
              <img class="h-8 w-auto" src="/src/assets/img/logo.png" alt="logo img" />
            </RouterLink>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <div
                  v-for="item in navigation"
                  :key="item.name"
                  class="relative group"
                  @mouseenter="handleMouseEnter(item.name)"
                  @mouseleave="handleMouseLeave"
              >
                <RouterLink :to="{name: item.name}" :class="[item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-xl font-medium']">
                  {{ item.value }}
                </RouterLink>
                <transition name="fade">
                  <div v-show="itemHover === item.name" class="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-50">
                    <RouterLink :to="{name: subitem.name}" v-for="subitem in item.submenu" :key="subitem.name" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {{ subitem.value }}
                    </RouterLink>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div v-for="menu in menuList" :key="menu.routeName">
            <RouterLink v-if="menu.show === true" :to="{name: menu.routeName}" class="mx-3">
              {{ menu.name }}
            </RouterLink>
          </div>

          <!-- Profile dropdown -->
          <Menu v-if="menuList[0].show === false" as="div" class="relative ml-3">
            <div>
              <MenuButton class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <!-- TODO: 이거 갈아 끼워야 됨 프로필 이미지 -->
                <img :class="['h-8 w-8 rounded-full', computedNotificationList.length > 0 ? 'border-2 border-red-500' : '']" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" href="#">마이페이지</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" href="#">Settings</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <p :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" @mouseover="showToggleDropdown">
                    알림 <span class="bg-red-500 text-white font-bold rounded-full px-1.5 py-0.5 ml-1">{{computedNotificationList.length}}</span>
                  </p>

                </MenuItem>
                <div v-if="isDropdownOpen" class="dropdown-menu" @mouseleave="hideToggleDropdown">
                  <ul>
                    <li v-for="(notification, index) in computedNotificationList" :key="notification.notificationId">
                      <div v-html="'<span>' + (index+1) + '. ' + notification.content + '</span>'"></div>
                      <hr style="margin-top: 10px; margin-bottom: 10px;">
                      <div style="text-align: center;">
                        <button @click="readNotification(notification.notificationId)">읽기</button>
                      </div>
                    </li>
                  </ul>
                </div>
                <MenuItem v-slot="{ active }">
                  <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" href="#">로그아웃</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <div class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <a v-for="item in navigation" :key="item.name" href="#" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.value }}</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-inner {
  width: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.dropdown-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 200px;
  z-index: 11;
  margin-top: 10px;
}
.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 11;
}
.dropdown-menu li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  z-index: 11;
}
.dropdown-menu li:last-child {
  border-bottom: none;
}
</style>
