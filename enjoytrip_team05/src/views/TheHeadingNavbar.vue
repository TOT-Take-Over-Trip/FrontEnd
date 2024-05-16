<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

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
        name: 'board',
      },
      {
        value: '댓글 단 글 보기',
        name: 'board',
      },
      {
        value: '스크랩한 글 보기',
        name: 'board',
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
        name: 'board',
      },
      {
        value: '코스 등록',
        name: 'board',
      },
    ]
  },
  { value: '상점', name: 'shop', current: false },
]
</script>

<template>
  <nav class="border-b-2">
    <!--  TODO: 이거 양 끝 간격 조절할 수 있음  -->
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
              <!--    TODO: 여기에 로고 이미지 넣으면 됨          -->
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            </RouterLink>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <div v-for="item in navigation" :key="item.name" class="relative group">
                <RouterLink :to="item.name" :class="[item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-xl font-medium']">
                  {{ item.value }}
                </RouterLink>
                <div class="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <RouterLink :to="subitem.name" v-for="subitem in item.submenu" :key="subitem" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {{ subitem.value }}
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <!-- 프로필 이미지 -->
                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
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
</style>
