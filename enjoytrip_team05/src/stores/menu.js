import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenuStore = defineStore("menuStore", () => {
    const menuList = ref([
        { name: "회원가입", show: true, routeName: "join" },
        { name: "로그인", show: true, routeName: "login" },
        { name: "내정보", show: false, routeName: "mypage" },
        { name: "로그아웃", show: false, routeName: "logout" },
    ]);

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
        changeMenuState,
    };
});
