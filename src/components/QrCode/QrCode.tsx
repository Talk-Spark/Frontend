import { QRCodeCanvas } from "qrcode.react";

interface QrCodeProps {
  cardId: string;
  name: string;
}

const QrCode = ({ cardId, name }: QrCodeProps) => {
  const qrData = JSON.stringify({ cardId, name });

  return (
    <div>
      <QRCodeCanvas
        value={qrData} 
        size={200}
        bgColor={"transparent"}
        fgColor={"#000000"}
        level={"H"}
        includeMargin={true}
      />
    </div>
  );
};

export default QrCode;
