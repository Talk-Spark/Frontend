// src/app/dashboard/[userId]/page.tsx

// 동적 라우팅에서, 페이지의 props(params)는 Promise로 래핑될 가능성이 있으므로
//Awaited 유틸 사용 필수
type UserPageProps = {
  params: Awaited<{
    userId: string;
  }>;
};

export default function UserPage({ params }: UserPageProps) {
  const { userId } = params;
  return <p>Viewing details for user ID: {userId}</p>;
}
