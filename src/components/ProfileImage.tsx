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
  PINK: pinkProfile,
  MINT: greenProfile,
  YELLOW: yellowProfile,
  BLUE: blueProfile,
};

const crownImages: Record<string, StaticImageData> = {
  PINK: pinkCrown,
  MINT: greenCrown,
  YELLOW: yellowCrown,
  BLUE: blueCrown,
};

interface ProfileImageProps {
  color?: "PINK" | "MINT" | "YELLOW" | "BLUE";
  alt?: string;
  isHost?: boolean;
  children?: ReactNode;
  isSelected?: boolean; // 선택 여부 (동적 border, name color 적용)
  size?: 36 | 52 | 64 | 68 | 148; // Added size 36px
  backColor?: "gray" | "blue";
  isSecond?: boolean; //명함 맞추기 flow에서 2순위에 사용할 prop
  noBorder?: boolean; //최종 스코어에서 3등에게 사용할 prop
  hasTransparency?: boolean; // 투명도 적용 여부
  hasFixedWidth?: boolean; // 고정 너비(w-[6.8rem]) 적용 여부
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  color = "PINK",
  alt = "Profile",
  isHost = false,
  children,
  isSelected = false,
  size = 68,
  backColor = "blue",
  isSecond = false,
  hasTransparency = true,
  noBorder = false,
  hasFixedWidth = true,
}) => {
  const profileImageUrl = profileImages[color] || profileImages.PINK;
  const crownImageUrl = crownImages[color] || crownImages.PINK;

  const positionStyles = {
    PINK:
      size === 36
        ? "top-3 right-1.5"
        : size === 52
          ? "top-5 right-2.5"
          : size === 64
            ? "top-6 right-3"
            : size === 68
              ? "top-6 right-4"
              : "top-14 right-10",
    MINT:
      size === 36
        ? "bottom-0.5 left-2"
        : size === 52
          ? "bottom-1 left-3"
          : size === 64
            ? "bottom-1 left-4"
            : size === 68
              ? "bottom-1.5 left-4"
              : "bottom-3 left-9",
    YELLOW:
      size === 36
        ? "bottom-0 left-1.5"
        : size === 52
          ? "bottom-0 left-2"
          : size === 64
            ? "bottom-0 left-2.5"
            : size === 68
              ? "bottom-0 left-3"
              : "bottom-1 left-8",
    BLUE:
      size === 36
        ? "top-1 right-2"
        : size === 52
          ? "top-2 right-3"
          : size === 64
            ? "top-2 right-3"
            : size === 68
              ? "top-2.5 right-4"
              : "top-5 right-8",
  };

  const borderStyle =
    size === 148
      ? isSelected
        ? "border-3 border-main-pink"
        : "border-3 border-gray-3"
      : size === 36
        ? isSelected
          ? "border-1 border-main-pink"
          : "border-1 border-gray-3"
        : size === 52
          ? isSecond
            ? "border-2 border-sub-pink" // isSecond true일때
            : noBorder
              ? ""
              : isSelected
                ? "border-2 border-main-pink"
                : "border-2 border-gray-3"
          : size === 64
            ? isSelected
              ? "border-2 border-main-pink"
              : "border-2 border-gray-3"
            : isSelected
              ? "border-3 border-main-pink"
              : "border-0";

  const borderStyleSecond = "border-2 border-sub-pink";

  const textColor = noBorder
    ? "text-black"
    : isSelected
      ? "text-main-pink"
      : "text-black";

  const imageSize =
    size === 36
      ? "h-[36px] w-[36px]"
      : size === 52
        ? "h-[52px] w-[52px]"
        : size === 64
          ? "h-[64px] w-[64px]"
          : size === 68
            ? "h-[68px] w-[68px]"
            : "h-[148px] w-[148px]";

  const bgStyle =
    backColor === "blue"
      ? hasTransparency
        ? "bg-sub-blue-40" // 투명도 적용
        : "bg-[#9CAEF9]" // 투명도 없는 색상
      : "bg-gray-1";

  return (
    <div
      className={`flex ${hasFixedWidth ? "w-[6.8rem]" : ""} flex-col items-center`}
    >
      <div className={`relative box-border ${imageSize}`}>
        <div
          className={`relative h-full w-full overflow-hidden rounded-full ${bgStyle}`}
        >
          {/* 왕관 이미지 */}
          {isHost && (
            <Image
              src={crownImageUrl}
              alt="Crown"
              width={25}
              height={15}
              className="absolute -right-1 top-4 z-10 -translate-x-1/2 object-cover"
            />
          )}
          {/* 프로필 이미지 */}
          <Image
            src={profileImageUrl}
            alt={alt}
            width={
              size === 36
                ? 34
                : size === 52
                  ? 50
                  : size === 64
                    ? 58
                    : size === 68
                      ? 64
                      : 127
            } // Adjust image width based on size
            height={
              size === 36
                ? 34
                : size === 52
                  ? 48
                  : size === 64
                    ? 58
                    : size === 68
                      ? 64
                      : 140
            }
            className={`absolute object-cover ${positionStyles[color]}`}
          />
        </div>
        <div
          className={`absolute inset-0 h-full w-full rounded-full ${isSecond ? borderStyleSecond : borderStyle}`}
        ></div>
      </div>

      {/* 이름 */}
      {children && (
        <div
          className={`mt-[0.4rem] text-center ${isSelected ? "text-body-2-bold" : "text-body-2-reg"} ${textColor}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
