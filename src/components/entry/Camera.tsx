"use client";
import { useEffect, useRef, useState } from "react";
import cameraIcon from "@/public/entry/camera.svg";
import Image from "next/image";

// interface CameraPageProps {
//   setIsCameraOn: (isOn: boolean) => void; // setIsCameraOn 함수 타입 정의
//   setCapturedImage: (image: string) => void; // setCapturedImage 함수 타입 정의 (필요하다면 사용)
// }

const CameraPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);

  interface ExtendedMediaTrackCapabilities extends MediaTrackCapabilities {
    zoom?: number; // 선택적으로 zoom 속성 추가
  }

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
        });

        const videoTrack = stream.getVideoTracks()[0];
        const capabilities =
          videoTrack.getCapabilities() as ExtendedMediaTrackCapabilities;

        // 줌 기능을 지원하는 경우 기본값 설정
        if (capabilities.zoom !== undefined) {
          await videoTrack.applyConstraints({
            advanced: [{ zoom: 1 }],
          });
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.load(); // 미디어 로드 초기화

          videoRef.current.play().catch((err) => {
            console.error("Error playing video:", err);
          });
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

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setCapturedImage(dataUrl);
    }
  };

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="relative flex w-full justify-center">
            <span className="absolute mt-[8.8rem] text-headline-3 text-white">
              QR코드를 인식해 주세요
            </span>
            <video ref={videoRef} autoPlay={false} playsInline />
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

// CameraPage.propTypes = {
//   setCapturedImage: PropTypes.func.isRequired,
// };

export default CameraPage;
