import axios from "axios";

//카카오 로그인 구현하는 사람은 반드시 localStorage에 key 이름을 user로 만들어서 넣어두기 !
//user : {accessToken: 어쩌구 저쩌구} 형식! / 여기서 accessToken 은 최종적으로 받아와서 앞으로 요청 보낼때 사용할 토큰을 의미
const getAccessToken = () : string | null => {
    const user = localStorage.getItem("user");
    if(user){
        try{
            const userObj = JSON.parse(user);
            return userObj.accessToken || ""
        }catch(e){
            console.log("Failed to parse user from localStorage",e)
            return "";
        }
    }
    return "";
}

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }else{
        config.headers.Authorization = `Bearer none`; // 응답: malform
    }
    return config;
  });


/*
  api 요청 헬퍼 함수 (더욱 간단한 형태로 요청 보낼 수 있도록 작성한 함수)
*/
//Promise 온전한 타입 추론을 위해 <T>사용
export function get<T>(...args : Parameters<typeof instance.get>){
    return instance.get<T>(...args);
}

export function post<T>(...args : Parameters<typeof instance.post>){
    return instance.post<T>(...args);
}

export function put<T>(...args : Parameters<typeof instance.put>){
    return instance.put<T>(...args);
}

export function patch<T>(...args : Parameters<typeof instance.patch>){
    return instance.patch<T>(...args);
}

//예약어 -> delete가 아니라 del 사용
export function del<T>(...args : Parameters<typeof instance.delete>){
    return instance.delete<T>(...args);
}