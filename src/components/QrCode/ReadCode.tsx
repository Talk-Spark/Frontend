"use client";
import { useEffect, useRef } from "react";
import QrScanner from "qr-scanner";
import cameraIcon from "@/public/entry/camera.svg";
import Image from "next/image";

interface MyRun {
  cardId: string;
  name: string;
}

const ReadCode = ({
  myRun,
  setMyRun,
  setIsNewData,
  setIsCamera,
}: {
  myRun: MyRun | null;
  setMyRun: React.Dispatch<React.SetStateAction<MyRun | null>>;
  setIsNewData: (value: boolean) => void;
  setIsCamera: (value: boolean) => void;
}) => {
  const QrOptions = {
    preferredCamera: "environment",
    maxScansPerSecond: 10,
  };
  // 페이지에 필요할시 삭제
  // const [user, setUser] = useState<{ name: string; id: number } | null>(null);

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user"); // 로그인한 사용자 정보 (localStorage 사용 예시)
  //   if (loggedInUser) {
  //     setUser(JSON.parse(loggedInUser)); // 로그인 정보가 있다면 상태에 저장
  //   }
  // }, []);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleScan = (result: QrScanner.ScanResult) => {
    try {
      const parsedData = JSON.parse(result.data);
      setMyRun({
        cardId: parsedData.cardId,
        name: parsedData.name,
      });
      setIsCamera(false);
      setIsNewData(true);
    } catch (error) {
      console.error("Error parsing QR code data:", error);
      setMyRun(null);
    }
  };

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
    // if (myRun) {
    //   const getResponse = async () => {
    //     if (!myRun || !user?.id) return;
    //     const requestData = {
    //       storeType: "IND",
    //       name: myRun?.name,
    //       cardId: myRun?.cardId,
    //       sparkUserId: user?.id,
    //     };
    //     try {
    //       const response = await post("/api/store/ind", requestData);
    //     } catch (e) {
    //       console.log(e);
    //     } finally {
    //       // 병렬 상태 업데이트
    //       setIsNewData(true);
    //     }
    //   };
    //   getResponse();
    // }
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
