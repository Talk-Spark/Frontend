// src/app/dashboard/page.js
"use client";

import { get, instance } from "@/src/apis";
import { useEffect } from "react";

export default function DashboardPage() {
  //사용 예시
  useEffect(() => {
    const getTest = async () => {
      try {
        const response = await instance.get("/api/cards/1"); //이건 instance를 사용하는 예시
        const response2 = await get("/api/cards/1"); //이건 헬퍼 함수를 이용하여 더욱 간단하게 api 요청을 하는 방식

        return response.data;
      } catch (e) {
        console.log(e);
      }
    };

    getTest();
  }, []);
  return <p>This is the dashboard main page.</p>;
}
