import { createRouter, createWebHistory } from 'vue-router'
import TheMainView from "@/views/TheMainView.vue";
import ThePostRegist from "@/components/post/ThePostRegist.vue"
import TheBoardView from "@/views/board/TheBoardView.vue";
import TheMyBoardView from "@/views/board/TheMyBoardView.vue"
import BoardDetail from "@/components/board/BoardDetail.vue";
import axios from "axios";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMainView,
    },
      //TODO: 경로수정
    {
      path: "/regist",
      name: "regist",
      component: ThePostRegist,
    },
    {
      // 게시판 router
      path: "/board",
      name: "board",
      component: TheBoardView,
    },
    {
      //게시판 상세정보 router
      path: '/board/:postId',
      name: 'boardDetail',
      component: () => import("@/components/board/BoardDetail.vue"),
    },
    {
      path: '/board/members/:memberId',
      name: 'boardMyList',
      component: () => import("@/components/board/BoardMyList.vue"),
    },
    {
      // 코스 router
      path: "/course",
      name: "course",
      component: TheMainView,
    },
    {
      // 상점 router
      path: "/shop",
      name: "shop",
      component: TheMainView,
    },
    {
      // 내 게시글 보기
      path: "/myBoard",
      name: "myBoard",
      component: TheMyBoardView
    }
  ]
})

export default router
