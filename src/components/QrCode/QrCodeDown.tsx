import Image from "next/image";
import blackDown from "@/public/storageNameCard/blackDown.svg";
import whiteDown from "@/public/storageNameCard/down.svg";
import { QRCodeCanvas } from "qrcode.react";

type QrData = {
  cardId: number;
  name: string;
};

type QrcodeDownProps = {
  selectedColor: "PINK" | "GREEN" | "YELLOW" | "BLUE";
  qrData: QrData;
};

const validateData = (data: QrData): boolean => {
  if (!data.cardId || data.cardId < 0) return false;
  if (!data.name || typeof data.name !== "string") return false;
  return true;
};

const QrcodeDown: React.FC<QrcodeDownProps> = ({ selectedColor, qrData }) => {
  const downImageUrl = selectedColor === "BLUE" ? whiteDown : blackDown;

  const handleDownloadClick = () => {
    if (!validateData(qrData)) {
      alert("올바르게 데이터를 입력해주세요");
      return;
    }

    const canvas = document.querySelector("canvas");
    if (!canvas) {
      alert("QR 코드가 생성되지 않았습니다.");
      return;
    }

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-${qrData.name}.png`;
    link.click();
  };

  return (
    <div>
      <div onClick={handleDownloadClick}>
        <Image
          src={downImageUrl}
          alt="다운로드 아이콘"
          width={26}
          height={26}
          className="mb-[1.7rem] cursor-pointer"
        />
      </div>

      <QRCodeCanvas
        value={JSON.stringify(qrData)}
        size={300}
        bgColor="transparent"
        fgColor="#000000"
        level="H"
        style={{ display: "none" }} // 큐알 캔버스 숨기기
      />
    </div>
  );
};

export default QrcodeDown;
