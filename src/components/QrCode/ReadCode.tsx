"use client";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import cameraIcon from "@/public/entry/camera.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ReadCode = () => {
  const [myRun, setMyRun] = useState<{
    cardId: string;
    name: string;
    timestamp: string;
  } | null>(null);
  const router = useRouter();

  const QrOptions = {
    preferredCamera: "environment",
    maxScansPerSecond: 10,
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleScan = (result: QrScanner.ScanResult) => {
    try {
      const parsedData = JSON.parse(result.data);

      const date = new Date();
      const timestamp = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

      setMyRun({
        cardId: parsedData.cardId,
        name: parsedData.name,
        timestamp: timestamp,
      });
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
    if (myRun) {
      // QR 코드에서 읽은 값과 타임스탬프를 쿼리 파라미터로 전달
      // api 함수 post한 후 card 페이지에서 전체 get
      // const encodedTimestamp = encodeURIComponent(myRun.timestamp);
      // router.push(`/card?cardId=${myRun.cardId}&timestamp=${encodedTimestamp}`);
    }
  }, [myRun, router]);

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
