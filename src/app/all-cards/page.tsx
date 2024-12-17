"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "@/src/app/all-cards/mystyle.css";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import StorageNameCard from "@/src/components/StorageNameCard";

const STORAGE_CARD = {
  teamName: "팀이름없어용",
  name: "공준혁",
  age: 26,
  major: "컴퓨터공학과",
  mbti: "intj",
  hobby: "운동",
  lookAlike: "강동원",
  selfDescription: "저는 아무 생각이 없는 사람입니당나귀",
  tmi: "티엠아이입니다 하하 티엠아이 딱히 없어요",
  color: "yellow" as const,
  isFull: true,
  isStorage: false,
};

const AllCards = () => {
  return (
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
        slidesPerView={1.12}
        centeredSlides={true}
        navigation={true}
        pagination={{ clickable: true , type: "fraction"}}
        
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        style={{ width: "100%", height: "590px"}} 
      >
        <SwiperSlide>
          <StorageNameCard
            teamName={STORAGE_CARD.teamName}
            name={STORAGE_CARD.name}
            age={STORAGE_CARD.age}
            major={STORAGE_CARD.major}
            mbti={STORAGE_CARD.mbti}
            hobby={STORAGE_CARD.hobby}
            lookAlike={STORAGE_CARD.lookAlike}
            selfDescription={STORAGE_CARD.selfDescription}
            tmi={STORAGE_CARD.tmi}
            color={STORAGE_CARD.color}
            isFull={STORAGE_CARD.isFull}
            isStorage={STORAGE_CARD.isStorage}
          />
        </SwiperSlide>
        <SwiperSlide>
          <StorageNameCard
            teamName={STORAGE_CARD.teamName}
            name={STORAGE_CARD.name}
            age={STORAGE_CARD.age}
            major={STORAGE_CARD.major}
            mbti={STORAGE_CARD.mbti}
            hobby={STORAGE_CARD.hobby}
            lookAlike={STORAGE_CARD.lookAlike}
            selfDescription={STORAGE_CARD.selfDescription}
            tmi={STORAGE_CARD.tmi}
            color={"green"}
            isFull={STORAGE_CARD.isFull}
            isStorage={STORAGE_CARD.isStorage}
          />
        </SwiperSlide>
        <SwiperSlide>
          <StorageNameCard
            teamName={STORAGE_CARD.teamName}
            name={STORAGE_CARD.name}
            age={STORAGE_CARD.age}
            major={STORAGE_CARD.major}
            mbti={STORAGE_CARD.mbti}
            hobby={STORAGE_CARD.hobby}
            lookAlike={STORAGE_CARD.lookAlike}
            selfDescription={STORAGE_CARD.selfDescription}
            tmi={STORAGE_CARD.tmi}
            color={"pink"}
            isFull={STORAGE_CARD.isFull}
            isStorage={STORAGE_CARD.isStorage}
          />
        </SwiperSlide>
        <SwiperSlide><StorageNameCard
            teamName={STORAGE_CARD.teamName}
            name={STORAGE_CARD.name}
            age={STORAGE_CARD.age}
            major={STORAGE_CARD.major}
            mbti={STORAGE_CARD.mbti}
            hobby={STORAGE_CARD.hobby}
            lookAlike={STORAGE_CARD.lookAlike}
            selfDescription={STORAGE_CARD.selfDescription}
            tmi={STORAGE_CARD.tmi}
            color={"blue"}
            isFull={STORAGE_CARD.isFull}
            isStorage={STORAGE_CARD.isStorage}
          /></SwiperSlide>
      </Swiper>
    </section>
  );
};

export default AllCards;
