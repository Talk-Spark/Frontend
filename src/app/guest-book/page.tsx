import SearchInput from "@/src/components/SearchInput";
import SearchAndGetCard from "@/src/components/Storage/SearchAndGetCard";

const Page = () => {
  return (
    <div className="">
      <div>
        <SearchInput placeholderText="방명록 검색" />
        <SearchAndGetCard />
      </div>
    </div>
  );
};
export default Page;
