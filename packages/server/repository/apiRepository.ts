import axios from 'axios'

const YANDEX_API_URL = "https://ya-praktikum.tech";

export type TIndexed<T = any> = {
  [key in string]: T;
};

export const apiRepository = (cookiesHeader: string | undefined) => {
  
  const baseAPI = axios.create({
    baseURL: YANDEX_API_URL,
    withCredentials: true,
    timeout: 5000,
    headers: {
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "content-type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":
            "https://oauth.yandex.ru,http://127.0.0.1:3000",
        cookie: cookiesHeader,
    },
  });

  const authAPI = {
    async signin(data: TIndexed) {
        return await baseAPI.post(`/auth/signin`, JSON.stringify(data));
    },
    async signup(data: TIndexed) {
        return await baseAPI.post(`/auth/signup`, JSON.stringify(data));
    },
    async user() {
        return await baseAPI.get(`/auth/user`);
    },
    async logout() {
        return await baseAPI.post(`/auth/logout`);
    },
  }
  return authAPI;
};
