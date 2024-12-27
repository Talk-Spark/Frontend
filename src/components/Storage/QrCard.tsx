import Image, { StaticImageData } from "next/image";
import blueGraphic from "@/public/nameCard/blueStorageGraphic.svg";
import yellowGraphic from "@/public/nameCard/yellowStorageGraphic.svg";
import pinkGraphic from "@/public/nameCard/pinkStoragePink.svg";
import mintGraphic from "@/public/nameCard/mintStorageGraphic.svg";
import QrCode from "../QrCode/QrCode";

type SelectedColor = "pink" | "green" | "yellow" | "blue";

type QrCardProps = {
  name: string;
  color: SelectedColor;
  cardId: number;
};

const QrCard = ({ name = "", color = "pink" }: QrCardProps) => {
  const graphicColor: Record<string, StaticImageData> = {
    pink: pinkGraphic,
    green: mintGraphic,
    yellow: yellowGraphic,
    blue: blueGraphic,
  };

  const backColorTop: Record<string, string> = {
    pink: "bg-gradient-to-b from-[#FFCCE1] to-[#FFA6CA]",
    green: "bg-gradient-to-b from-[#BBFFF3] to-[#66F5DC]",
    yellow: "bg-gradient-to-b from-[#FFEFB7] to-[#FEE485]",
    blue: "bg-gradient-to-b from-[#9CACFF] to-[#6D86F5]",
  };

  const backColorBottom: Record<string, string> = {
    pink: "bg-gradient-to-b from-[#FFA6CA] to-[#FF80B4]",
    green: "bg-gradient-to-b from-[#66F5DC] to-[#11EBC5]",
    yellow: "bg-gradient-to-b from-[#FEE485] to-[#FDD853]",
    blue: "bg-gradient-to-b from-[#6D86F5] to-[#3D5BF5]",
  };

  return (
    <div className="h-[49.2rem] w-[33.5rem] rounded-[2rem]">
      <div
        className={`"flex h-[30.1rem] rounded-[2rem] ${backColorTop[color.toLocaleLowerCase()]}`}
      >
        <div className="flex h-full w-full items-center justify-center">
          <QrCode cardId="1" name="최정인" size={200} />{" "}
        </div>
      </div>
      <div
        className={`relative flex h-[19.2rem] flex-col items-center gap-[2.7rem] overflow-hidden rounded-[20px] px-[2.8rem] text-headline-1 ${backColorBottom[color]}`}
      >
        <span className="mt-[2.4rem]">{name}</span>
        <div className="absolute top-[2.6rem] flex h-full w-full justify-center rounded-[2rem] bg-white-storage">
          <Image
            src={graphicColor[color.toLocaleLowerCase()]}
            alt="그래픽 이미지"
          />
        </div>
      </div>
    </div>
  );
};
export default QrCard;
