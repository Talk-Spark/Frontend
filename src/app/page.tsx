import React from "react";
import { redirect } from "next/navigation";

//해당 페이지에서 적절하게 navgiate하는 로직 구성하기
export default function HomePage() {
  // useRouter는 훅 -> 렌더링 도중 사용 x, useEffect에서 사용할 것
  // const router = useRouter();
  // router.push("/login");

  //todo: 필요에 따라 onboarding 혹은 home들로 리다이렉트 하는 로직 필요
  redirect("/login");
  return <></>;
}
