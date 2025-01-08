import CardMatching from "@/src/components/home/CardMatching";
import MyCard from "@/src/components/home/MyCard";
import Storage from "@/src/components/home/Storage";

const Page = () => {
  return (
    <div className="-mx-[2rem] flex w-[100%+4rem] flex-col items-center justify-center bg-white">
      <CardMatching />
      <MyCard />
      <Storage />
    </div>
  );
};

export default Page;
