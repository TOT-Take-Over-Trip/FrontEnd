import { createRouter, createWebHistory } from 'vue-router'
import TheMainView from "@/views/TheMainView.vue";
import ThePostRegist from "@/components/post/ThePostRegist.vue"
import TheBoardView from "@/views/board/TheBoardView.vue";
import TheItemView from "@/views/item/TheItemView.vue"
import TheMyBoardView from "@/views/board/TheMyBoardView.vue"
import TheMyCommentBoardView from "@/views/board/TheMyCommentBoardView.vue"
import TheMyLikeBoardView from "@/views/board/TheMyLikeBoardView.vue"
import TheCourseView from "@/views/course/TheCourseView.vue";
import BoardModifyView from "@/components/board/BoardModify.vue";
import {storeToRefs} from "pinia";
import { useMemberStore } from "@/stores/member";
import {useMenuStore} from "@/stores/menu.js";
import TheMyCourseView from "@/views/course/TheMyCourseView.vue";

const onlyAuthUser = async (to, from, next) => {
  const memberStore = useMemberStore();
  const { userInfo, isValidToken } = storeToRefs(memberStore);
  const { getUserInfo } = memberStore;

  let token = sessionStorage.getItem("accessToken");
  // userInfo 가 null이면 token 확인
  // token 없으면 그 때 login으로 넘김
  if (userInfo.value != null && token) {
    await getUserInfo(token);
  }
  else if (userInfo.value === null) {
    if (!token) {
      next({name: "login"});
    }
    await getUserInfo(token);
  }
  next();
};

const removeSessionItem = async (to, from, next) => {
  sessionStorage.removeItem("memberId");
  sessionStorage.removeItem("accessToken");
  next();
  window.location.reload();
}


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
      beforeEnter: onlyAuthUser,
      component: ThePostRegist,
    },
    {
      // 게시판 router
      path: "/board",
      name: "board",
      beforeEnter: onlyAuthUser,
      component: TheBoardView,
    },
    {
      //게시판 상세정보 router
      path: '/board/:postId',
      name: 'boardDetail',
      beforeEnter: onlyAuthUser,
      component: () => import("@/components/board/BoardDetail.vue"),
    },
      //보드 수정
    {
      path: '/board/modify/:postId',
      name: 'boardModify',
      beforeEnter: onlyAuthUser,
      component: BoardModifyView
    },
    {
      // 코스 router
      path: "/course",
      name: "course",
      beforeEnter: onlyAuthUser,
      component: TheCourseView,
    },
    {
      // 코스 router
      path: "/myCourse",
      name: "myCourse",
      beforeEnter: onlyAuthUser,
      component: TheMyCourseView,
    },
    {
      // 코스 상세정보 router
      path: "/course/:courseId",
      name: "courseDetail",
      beforeEnter: onlyAuthUser,
      component: () => import("@/components/course/CourseDetail.vue"),
    },
    {
      // 코스 상세정보 router
      path: "/course/regist",
      name: "courseRegist",
      beforeEnter: onlyAuthUser,
      component: () => import("@/views/course/TheCourseRegistView.vue"),
    },
    {
      // 상점 router
      path: "/shop",
      name: "shop",
      beforeEnter: onlyAuthUser,
      component: TheItemView,
    },
    {
      // 내 게시글 보기
      path: "/myBoard",
      name: "myBoard",
      beforeEnter: onlyAuthUser,
      component: TheMyBoardView
    },
    {
      //댓글단 글 보기
      path: "/myCommentBoard",
      name: "myCommentBoard",
      beforeEnter: onlyAuthUser,
      component: TheMyCommentBoardView
    },
    {
      //스크랩한 글 보기
      path: "/myLikeBoard",
      name: "myLikeBoard",
      beforeEnter: onlyAuthUser,
      component: TheMyLikeBoardView
    },
    {
      //아이템 상세정보 router
      path: '/item/:itemId',
      name: 'itemDetail',
      beforeEnter: onlyAuthUser,
      component: () => import("@/components/item/ItemDetail.vue"),
    },
    {
      path: '/auth/join',
      name: 'join',
      component: () => import("@/components/auth/AuthLogin.vue"),
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import("@/components/auth/AuthLogin.vue"),
    },
    {
      path: '/auth/mypage',
      name: 'mypage',
      beforeEnter: onlyAuthUser,
      component: () => import("@/components/auth/AuthLogin.vue"),
    },
    {
      path: '/',
      name: 'logout',
      beforeEnter: removeSessionItem,
      component: TheMainView,
    },
  ]
})

export default router
