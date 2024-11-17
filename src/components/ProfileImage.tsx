import React, { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

import pinkProfile from "@/public/profile/pink.svg";
import greenProfile from "@/public/profile/green.svg";
import yellowProfile from "@/public/profile/yellow.svg";
import blueProfile from "@/public/profile/blue.svg";

import pinkCrown from "@/public/profile/pinkCrown.svg";
import greenCrown from "@/public/profile/greenCrown.svg";
import yellowCrown from "@/public/profile/yellowCrown.svg";
import blueCrown from "@/public/profile/blueCrown.svg";

const profileImages: Record<string, StaticImageData> = {
  pink: pinkProfile,
  green: greenProfile,
  yellow: yellowProfile,
  blue: blueProfile,
};

const crownImages: Record<string, StaticImageData> = {
  pink: pinkCrown,
  green: greenCrown,
  yellow: yellowCrown,
  blue: blueCrown,
};

interface ProfileImageProps {
  color?: "pink" | "green" | "yellow" | "blue";
  alt?: string;
  isHost?: boolean;
  children?: ReactNode;
  isSelected?: boolean; // 선택 여부 (동적 border, name color 적용)
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  color = "pink",
  alt = "Profile",
  isHost = false,
  children,
  isSelected = false,
}) => {
  const profileImageUrl = profileImages[color] || profileImages.pink;
  const crownImageUrl = crownImages[color] || crownImages.pink;

  const positionStyles = {
    pink: "top-4 right-2.5",
    green: "bottom-0.5 left-2.5",
    yellow: "bottom-0 left-2",
    blue: "top-1.5 right-2",
  };

  const borderStyle = isSelected ? "border-3 border-main-pink" : "border-0";

  const textColor = isSelected ? "text-main-pink" : "text-black";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative box-border h-[68px] w-[68px]">
        <div
          className={`relative h-full w-full overflow-hidden rounded-full bg-sub-blue-40`}
        >
          {/* 왕관 이미지 */}
          {isHost && (
            <Image
              src={crownImageUrl}
              alt="Crown"
              width={22}
              height={15}
              className="absolute right-0 top-3 z-10 -translate-x-1/2 object-cover"
            />
          )}
          {/* 프로필 이미지 */}
          <Image
            src={profileImageUrl}
            alt={alt}
            width={60}
            height={60}
            className={`absolute object-cover ${positionStyles[color]}`}
          />
        </div>
        <div
          className={`absolute inset-0 h-full w-full rounded-full ${borderStyle}`}
        ></div>
      </div>

      {/* 이름 */}
      {children && (
        <div
          className={`mt-1 text-center text-body-2-bold text-sm ${textColor}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
