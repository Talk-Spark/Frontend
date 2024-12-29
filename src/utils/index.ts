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
