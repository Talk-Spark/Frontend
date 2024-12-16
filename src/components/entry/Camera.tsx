"use client";
import { useEffect, useRef, useState } from "react";
import cameraIcon from "@/public/entry/camera.svg";
import Image from "next/image";

const CameraPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } }, // 후면 카메라 사용
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // load()를 호출하지 않아도 srcObject 설정으로 브라우저가 자동으로 로드
          videoRef.current
            .play()
            .catch((err) => console.error("Error playing video:", err));
        }

        setIsCameraOn(true);
      } catch (err) {
        setError("카메라에 접근할 수 없습니다. 권한을 확인해주세요.");
        console.error("Error accessing camera: ", err);
      }
    };

    startCamera();

    return () => {
      setIsCameraOn(false);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="h-full">
      {error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="relative flex h-full w-full justify-center">
            <span className="absolute mt-[8.8rem] text-headline-3 text-white">
              QR코드를 인식해 주세요
            </span>
            <video
              ref={videoRef}
              autoPlay={false}
              playsInline
              muted
              className="h-full w-full object-cover"
            />
            <Image
              className="absolute mt-[15.9rem]"
              src={cameraIcon}
              alt="카메라 아이콘"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CameraPage;
