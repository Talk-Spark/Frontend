// src/app/dashboard/[userId]/page.tsx

type UserPageProps = {
  params: Promise<{ userId: string }>;
};

export default async function UserPage({ params }: UserPageProps) {
  const { userId } = await params;
  return <p>Viewing details for user ID: {userId}</p>;
}
