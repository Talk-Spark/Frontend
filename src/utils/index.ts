import { access } from "fs";

export type UserLocalData = {
  accessToken: string;
  kakaoId: string;
  password: string;
  refreshToken: string;
  roleNames: string;
  sparkUserId: string;
} | null;

export const getUserData = (): UserLocalData => {
  const user = JSON.parse(localStorage.getItem("user") || "");
  if (!user) return null;

  return {
    accessToken: user.accessToken,
    kakaoId: user.kakaoId,
    password: user.password,
    refreshToken: user.refreshToken,
    roleNames: user.roleNames,
    sparkUserId: user.sparkUserId,
  };
};

export const getDataFromLocalStorage = (key : string) => {
  const data = localStorage.getItem(key); // localStorage에서 데이터를 가져옴
  if (data) {
    try {
      return JSON.parse(data); // JSON으로 파싱하여 반환
    } catch (error) {
      console.error("JSON 파싱 오류:", error);
      return null; // 파싱 실패 시 null 반환
    }
  }
  return null; // 데이터가 없으면 null 반환
};