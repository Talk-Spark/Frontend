"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const code = searchParams.get("code");
      console.log("code: ", code);

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
          console.log("access_token: ", access_token);

          await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/member/kakao`,
            {
              access_token,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          const user = {
            accessToken: access_token,
          };

          localStorage.setItem("user", JSON.stringify(user));
          router.push("/home");
        } catch (error) {
          console.error("Error fetching access token: ", error);
        }
      }
    };

    fetchToken();
  }, [searchParams]);

  return <div>리다이렉션중...</div>;
};

export default Page;
