import { QRCodeCanvas } from "qrcode.react";

interface QrCodeProps {
  cardId: string; // 방 개설 입장하기: roomID, 명함 : cardId
  name: string;
  size: number;
}
const QrCode = ({ cardId, name, size }: QrCodeProps) => {
  const qrData = JSON.stringify({ cardId, name });
  const qrLink = new URL("https://talk-spark-frontend-nine.vercel.app/login"); // 로그인 페이지 or 명함보관함 페이지
  qrLink.searchParams.append("cardId", String(cardId));
  qrLink.searchParams.append("name", name);

  return (
    <div>
      <QRCodeCanvas
        value={qrLink.toString()} // URL 객체를 문자열로 변환
        size={size}
        bgColor={"transparent"}
        fgColor={"#000000"}
        level={"H"}
      />
    </div>
  );
};

export default QrCode;
