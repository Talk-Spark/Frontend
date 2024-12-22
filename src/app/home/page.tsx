import CardMatching from "@/src/components/home/CardMatching";
import MyCard from "@/src/components/home/MyCard";
import Storage from "@/src/components/home/Storage";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <CardMatching />
      <MyCard />
      <Storage />
    </div>
  );
};

export default Page;
