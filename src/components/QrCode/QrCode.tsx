import { QRCodeCanvas } from "qrcode.react";

interface QrCodeProps {
  cardId: string;
  name: string;
  size: number;
}

const QrCode = ({ cardId, name, size }: QrCodeProps) => {
  const qrData = JSON.stringify({ cardId, name });

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
