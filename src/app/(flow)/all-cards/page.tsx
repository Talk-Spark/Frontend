"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "@/src/app/(flow)/all-cards/mystyle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import StorageNameCard from "@/src/components/StorageNameCard";
import { FinalPeopleProps } from "../flow/page";
import Header from "@/src/components/Headers/Header";
import { getDataFromLocalStorage } from "@/src/utils";
import { useRouter } from "next/navigation";
import { instance } from "@/src/apis";

const AllCards = () => {
  const [finalPeople, setFinalPeople] = useState<FinalPeopleProps[] | null>(
    null,
  );
  const router = useRouter();
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    const storedRoomId = localStorage.getItem("roomId");
    setRoomId(storedRoomId);

    const finalPeople: FinalPeopleProps[] =
      getDataFromLocalStorage("finalPeople");
    setFinalPeople(finalPeople);
  }, []);

  useEffect(() => {
    const newGuestBook = async () => {
      await instance.post(`/api/guest-books/create?roomId=${roomId}`);
    };

    localStorage.setItem("gameEnd", JSON.stringify(true));

    if (roomId) {
      newGuestBook();
      console.log("방명록 생성");
    }
  }, [roomId]);

  const headerBtn2 = () => {
    if (roomId) {
      const numericRoomId = parseInt(roomId, 10);

      // 숫자로 변환된 roomId를 사용하여 라우팅
      router.push(`/guest-book/${numericRoomId}`);
    } else {
      console.error("roomId is not found in localStorage.");
    }
  };

  if (!finalPeople) return;
  return (
    <>
      <Header
        title="전체 명함 공개"
        button2Type="next"
        button2Action={() => headerBtn2()}
      />
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
          onSlideChange={() => {
            /*noting to do*/
          }}
          style={{ width: "100%", height: "590px" }}
        >
          {finalPeople.map((user, index) => (
            <SwiperSlide>
              <StorageNameCard
                key={`key-${index}`}
                oneCard={user}
                isFull={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default AllCards;
