import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

const URL = import.meta.env.VITE_BASE_URL;

export const useMenuStore = defineStore("menuStore", () => {
    const menuList = ref([
        { name: "회원가입", show: true, routeName: "join" },
        { name: "로그인", show: true, routeName: "login" },
        { name: "내정보", show: false, routeName: "mypage" },
        { name: "로그아웃", show: false, routeName: "logout" },
    ]);

    const notificationList = ref([]);
    const fetchMenuItems = async () => {
        try {
            let memberId = sessionStorage.getItem("memberId");
            const userResponse = await axios.get(`${URL}/members/${memberId}`); //유저 정보 조회
            const point = userResponse.data.point;
            if(menuList.value.length<5) {
                menuList.value.push({name: "Point: " + point, show: true});
            }

            const notificationResponse = await axios.get(`${URL}/notifications?memberId=${memberId}`); //유저 알림 목록 조회
            notificationList.value = notificationResponse.data;
            console.log(notificationList);
        } catch (error) {
            console.error("Failed to fetch menu items", error);
        }
    };

    const changeMenuState = () => {
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken) {
            menuList.value = menuList.value.map((item) => {
                if (item.routeName === "mypage" || item.routeName === "logout") {
                    return { ...item, show: true };
                } else if (item.routeName === "join" || item.routeName === "login") {
                    return { ...item, show: false };
                }
                return item;
            });
        } else {
            menuList.value = menuList.value.map((item) => {
                if (item.routeName === "mypage" || item.routeName === "logout") {
                    return { ...item, show: false };
                } else if (item.routeName === "join" || item.routeName === "login") {
                    return { ...item, show: true };
                }
                return item;
            });
        }
    };

    return {
        menuList,
        notificationList,
        fetchMenuItems,
        changeMenuState,
    };
});