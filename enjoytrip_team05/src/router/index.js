import { createRouter, createWebHistory } from 'vue-router'
import TheMainView from "@/views/TheMainView.vue";
import ThePostRegist from "@/components/post/ThePostRegist.vue"
import TheBoardView from "@/views/board/TheBoardView.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";

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
      //게시판 상세정보 router
      path: '/board/:postId',
      name: 'BoardDetail',
      component: BoardDetail,
    }
  ]
})

export default router
