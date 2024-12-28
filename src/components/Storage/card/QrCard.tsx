import Image, { StaticImageData } from "next/image";
import blueGraphic from "@/public/nameCard/blueStorageGraphic.svg";
import yellowGraphic from "@/public/nameCard/yellowStorageGraphic.svg";
import pinkGraphic from "@/public/nameCard/pinkStoragePink.svg";
import mintGraphic from "@/public/nameCard/mintStorageGraphic.svg";
import QrCode from "../../QrCode/QrCode";

type SelectedColor = "PINK" | "GREEN" | "YELLOW" | "BLUE";

type QrCardProps = {
  name: string;
  color: SelectedColor;
  cardId: number;
};

const QrCard = ({ name = "", color = "PINK", cardId = 1 }: QrCardProps) => {
  const graphicColor: Record<string, StaticImageData> = {
    PINK: pinkGraphic,
    GREEN: mintGraphic,
    YELLOW: yellowGraphic,
    BLUE: blueGraphic,
  };

  const backColorTop: Record<string, string> = {
    PINK: "bg-gradient-to-b from-[#FFCCE1] to-[#FFA6CA]",
    GREEN: "bg-gradient-to-b from-[#BBFFF3] to-[#66F5DC]",
    YELLOW: "bg-gradient-to-b from-[#FFEFB7] to-[#FEE485]",
    BLUE: "bg-gradient-to-b from-[#9CACFF] to-[#6D86F5]",
  };
  const backColorBottom: Record<string, string> = {
    PINK: "bg-gradient-to-b from-[#FFA6CA] to-[#FF80B4]",
    GREEN: "bg-gradient-to-b from-[#66F5DC] to-[#11EBC5]",
    YELLOW: "bg-gradient-to-b from-[#FEE485] to-[#FDD853]",
    BLUE: "bg-gradient-to-b from-[#6D86F5] to-[#3D5BF5]",
  };

  const positionStyles = {
    PINK: "top-[3.8rem]",
    YELLOW: "top-[3.6rem]",
    GREEN: "top-[3.2rem]",
    BLUE: "top-[1.3rem]",
  };

  return (
    <div className="h-[49.2rem] w-[33.5rem] rounded-[2rem]">
      <div
        className={`"flex h-[30.1rem] rounded-[2rem] ${backColorTop[color]}`}
      >
        <div className="flex h-full w-full items-center justify-center">
          <QrCode cardId={cardId} name={name} size={200} />{" "}
        </div>
      </div>
      <div
        className={`relative flex h-[19.2rem] flex-col items-center gap-[2.7rem] overflow-hidden rounded-[20px] px-[2.8rem] text-headline-1 ${backColorBottom[color]}`}
      >
        <span className="mt-[2.4rem]">{name}</span>
        <div
          className={`absolute ${positionStyles[color]} flex h-full w-full justify-center rounded-[2rem] bg-white-storage`}
        >
          <Image
            src={graphicColor[color] || graphicColor.PINK}
            alt="그래픽 이미지"
          />
        </div>
      </div>
    </div>
  );
};
export default QrCard;
