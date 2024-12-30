// src/app/layout.tsx
import localFont from "next/font/local";
import "./globals.css";
import HeaderWrapper from "../components/Headers/HeaderWrapper"; // Client Component
import type { Metadata } from "next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// SEO를 위한 메타데이터 (레이아웃 전체에 적용)
export const metadata: Metadata = {
  title: "Talk Spark",
  description: "실시간 아이스브레이킹 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* EditProvider로 감싸서 전체에서 편집 상태 관리 */}
        <HeaderWrapper />
        {/* 375px 이하의 디스플레이인 모든 페이지 양쪽에 20px의 여백 생성 (이후 breakpoint 추가 가능) */}
        <main className="gutter container">{children}</main>
      </body>
    </html>
  );
}
