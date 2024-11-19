//alias 테스트

// src/app/page.tsx
import { Metadata } from "next";
import NameCard from "../components/NameCard";
import ParentComponent from "../components/ParentComponet";

//SEO를 위한 메타데이터(해당 페이지에 적용, 레이아웃 메타데이터를 덮어씀)
export const metadata: Metadata = {
  title: "Home Page",
  description: "Welcome to the home page of our Next.js app",
};

//반드시 export만 해주면 됨.(컴포넌트명은 뭐가 되든 상관 x)
export default function HomePage() {
  console.log("hi");
  return (
    <>
      <h1 className="h-[10rem] w-[10rem]">안녕하세용</h1>
      <h1 className="bg-gradient-35-pink mb-4 font-sans text-headline-1 text-main-pink shadow">
        Welcome to the Home Page
      </h1>
      <div className="bg-gradient-pink-transparent rounded-lg p-8 text-center text-white">
        <p className="text-body-1-med">This is a test for gradient</p>
      </div>

      <div className="mt-8">
        <p className="mb-2 text-sub-blue-40">55프로 sub pale pink color</p>
        <p className="font-alt text-caption-bold">bold caption</p>
        <p className="font-sans text-caption-bold">bold caption</p>
      </div>
    </>
  );
}
