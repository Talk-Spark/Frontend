"use client";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import cameraIcon from "@/public/Image/entry/camera.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { post } from "@/src/apis";

interface MyRun {
  cardId: number; // 입장하기 : 방 아이디, 명함보관함: 카드 아이디
  name: string; // 입장하기 : 방 이름, 명함보관함: 개인 이름
}

const ReadCode = ({
  myRun,
  setMyRun,
  setIsNewData,
  setIsCamera,
  qrVer,
  isLoading,
  setIsLoading,
}: {
  myRun: MyRun | null;
  setMyRun: React.Dispatch<React.SetStateAction<MyRun | null>>;
  setIsNewData: (value: boolean) => void;
  setIsCamera: (value: boolean) => void;
  qrVer: "room" | "card";
  isLoading?: boolean;
  setIsLoading?: (value: boolean) => void;
}) => {
  const router = useRouter();
  const QrOptions = {
    preferredCamera: "environment",
    maxScansPerSecond: 10,
  };
  // 페이지에 필요할시 삭제
  const [user, setUser] = useState<{ name: string; id: number } | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user"); // 로그인한 사용자 정보 (localStorage 사용 예시)
    if (loggedInUser) {
      // 나중에 로그인 구현 후에 확인 필요
      setUser(JSON.parse(loggedInUser)); // 로그인 정보가 있다면 상태에 저장
    }
  }, []);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleScan = (result: QrScanner.ScanResult) => {
    try {
      const parsedData = JSON.parse(result.data);
      setMyRun({
        cardId: Number(parsedData.cardId), // string -> number
        name: parsedData.name,
      });
      if (qrVer === "card") {
        setIsCamera(false);
        setIsNewData(true);
      }
    } catch (error) {
      console.error("Error parsing QR code data:", error);
      setMyRun(null);
    }
    if (qrVer === "card" && !isLoading) {
      setIsCamera(false);
      setIsNewData(true);
    }
  };

  // 큐알 스캐너 코드
  useEffect(() => {
    const videoElem = videoRef.current;
    if (videoElem) {
      const qrScanner = new QrScanner(
        videoElem,
        (result) => handleScan(result),
        QrOptions,
      );
      qrScanner.start();

      return () => {
        qrScanner.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (myRun) {
      // 큐알 스캔이 되고 값이 입력되었을때
      if (qrVer === "card") {
        //명함보관함 명함 추가하기
        const getResponse = async () => {
          if (!myRun || !user?.id) return;
          const requestData = {
            storeType: "IND",
            name: myRun?.name,
            cardId: myRun?.cardId,
            sparkUserId: user?.id,
          };
          if (setIsLoading) {
            try {
              setIsLoading(true);
              /* 명함 보관함에 개인 명함 저장 */
              await post("/api/store/ind", requestData);
            } catch (e) {
              console.log(e);
            }
            setIsLoading(false);
            setIsNewData(true);
          }
        };
        getResponse();
      } else if (qrVer === "room") {
        /* 입장하기에서 qr스캐너 (웹소켓) */
        const entryResponse = async () => {
          try {
            // const response = await post("/api/rooms/join", myRun.cardId); // 방 입장하기 post
            router.push(`/team/${myRun.cardId}`);
          } catch (e) {
            console.log(e);
          }
        };
        entryResponse();
      }
    }
  }, [myRun]);

  return (
    <div className="relative flex w-full justify-center">
      <span className="absolute z-30 mt-[8.8rem] text-headline-3 text-white">
        QR코드를 인식해 주세요
      </span>
      <video
        ref={videoRef}
        autoPlay={false}
        playsInline
        muted
        className="h-[100vh] w-full object-cover"
      />
      <Image
        className="absolute mt-[15.9rem]"
        src={cameraIcon}
        alt="카메라 아이콘"
      />
    </div>
  );
};

export default ReadCode;
