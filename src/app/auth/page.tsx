"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const code = searchParams.get("code");

      if (code) {
        try {
          const response = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            null,
            {
              params: {
                grant_type: "authorization_code",
                client_id: process.env.NEXT_PUBLIC_REST_API_KEY,
                redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
                code,
              },
              headers: {
                "Content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            },
          );

          const access_token = response.data.access_token;

          // 서버에 토큰 전달
          const serverResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/member/kakao`,
            null,
            {
              params: {
                accessToken: access_token,
              },
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          const user = {
            accessToken: serverResponse.data.accessToken,
            refreshToken: serverResponse.data.refreshToken,
            kakaoId: serverResponse.data.kakaoId,
            password: serverResponse.data.password,
            roleNames: serverResponse.data.roleNames[0],
            sparkUserId: serverResponse.data.sparkUserId,
          };

          localStorage.setItem("user", JSON.stringify(user));
          router.push("/landing");
        } catch (error) {
          console.error("Error fetching access token: ", error);
        }
      }
    };

    fetchToken();
  }, [searchParams]);

  return <div>리다이렉션중...</div>;
};

export default function PageWithSuspense() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}
