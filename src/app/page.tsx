
"use client"; // useState, onClick 사용할거니깐 명시 필요!!
// import { Metadata } from "next";
import React, { useState } from "react";
import Modal from "../components/common/Modal";
import Button from "@/src/components/common/Button";
import Image from "next/image";

//alias 테스트

// src/app/page.tsx
import { Metadata } from "next";
import NameCard from "../components/NameCard";
import ParentComponent from "../components/ParentComponet";

//메타데이터는 클라이언트 컴포넌트에서는 사용 불가 !!
// //SEO를 위한 메타데이터(해당 페이지에 적용, 레이아웃 메타데이터를 덮어씀)
// export const metadata: Metadata = {
//   title: "Home Page",
//   description: "Welcome to the home page of our Next.js app",
// };

//반드시 export만 해주면 됨.(컴포넌트명은 뭐가 되든 상관 x)
export default function HomePage() {

  const [isModalOpen, setModalOpen] = useState(false); // 모달 열림 상태 관리 (필수!!)

  // "나가기" 버튼 클릭 시 동작하는 함수 (필요에 맞게 작성해서 onAction에 넘겨주면 됨)
  const handleExit = () => {
    alert("나가기 버튼 클릭됨");
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setModalOpen(true)}
        className="bg-main-pink p-1 text-white"
      >
        모달창 열기


      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAction={handleExit}
        title="방 만들기를 나가시겠어요?"
        description="지금까지 작성한 내용이 저장되지 않아요"
        buttonText="이어서 만들기"
        actionText="나가기"
      />
    </div>
  );
}
