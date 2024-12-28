import { QRCodeCanvas } from "qrcode.react";

interface QrCodeProps {
  cardId: number; // 방 개설 입장하기: roomID, 명함 : cardId
  name: string;
  size: number;
}
const QrCode = ({ cardId, name, size }: QrCodeProps) => {
  const qrData = JSON.stringify({ cardId, name });
  const qrLink = "https://talk-spark-frontend-nine.vercel.app/login";

  return (
    <div>
      <QRCodeCanvas
        value={qrData}
        size={size}
        bgColor={"transparent"}
        fgColor={"#000000"}
        level={"H"}
      />
    </div>
  );
};

export default QrCode;
