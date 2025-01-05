"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "@/src/app/(flow)/all-cards/mystyle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import StorageNameCard from "@/src/components/StorageNameCard";
import { getDataFromLocalStorage } from "../../game-end/page";
import { FinalPeopleProps } from "../flow/page";
import Header from "@/src/components/Headers/Header";

const AllCards = () => {
  const [finalPeople, setFinalPeople] = useState<FinalPeopleProps[] | null>(null);
  
  useEffect(()=>{
    const finalPeople : FinalPeopleProps[] = getDataFromLocalStorage("finalPeople");
    setFinalPeople(finalPeople);
  },[])

  if(!finalPeople) return;
  return (
    <>
    <Header title="전체 명함 공개" button2Type="next" button2Action={()=>alert("네비게이션 연결 필요!")}/>
      <section className="mt-[3.2rem] flex flex-col items-center gap-[2.4rem]">
        <article className="flex flex-col items-center gap-[0.8rem]">
          <h1 className="text-center text-headline-3 text-black">
            모든 명함을 다 모았어요!
          </h1>
          <span className="text-body-1-med text-gray-12">
            보관함에 자동으로 저장돼요
          </span>
        </article>
        <Swiper
          className="myclass"
          modules={[Navigation, Pagination]}
          spaceBetween={12}
          slidesPerView={1}
          centeredSlides={true}
          navigation={true}
          pagination={{ clickable: true, type: "fraction" }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => {}}
          onSlideChange={() => {/*noting to do*/}}
          style={{ width: "100%", height: "590px" }}
        >
          {finalPeople.map((user)=><SwiperSlide>
            <StorageNameCard
            oneCard={user}
            isFull={true}
            />
          </SwiperSlide>)}
    
        </Swiper>
      </section>
    </>
    
  );
};

export default AllCards;
