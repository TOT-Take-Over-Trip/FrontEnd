import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function userConfirm(param, success, fail) {
    console.log("param: ", param);
    await local.post('/auth/login', param).then(success).catch(fail);
}

async function findById(userid, success, fail) {
    local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
    await local.get(`/members/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
    local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
    await local.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
    await local.get(`/auth/logout/${userid}`).then(success).catch(fail);
}

export { userConfirm, findById, tokenRegeneration, logout };
