import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useMenuStore = defineStore("menuStore", () => {
    const menuList = ref([
        { name: "회원가입", show: true, routeName: "join" },
        { name: "로그인", show: true, routeName: "login" },
        { name: "내정보", show: false, routeName: "mypage" },
        { name: "로그아웃", show: false, routeName: "logout" },
    ]);

    const fetchMenuItems = async () => {
        try {
            let memberId = sessionStorage.getItem("memberId");
            const response = await axios.get(`http://localhost:8080/tot/members/${memberId}`); // 서버 URL로 변경
            console.log(response);
            const userInfo = response.data;
            const point = userInfo.point;
            menuList.value.push({name: "Point: " + point, show: true}); //point 정보를 넣어주고 싶음
            // menuList.value = [...menuList.value, ...serverMenuItems];
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
        fetchMenuItems,
        changeMenuState,
    };
});