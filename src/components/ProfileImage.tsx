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
  size?: 36 | 52 | 62 | 68 | 148; // Added size 36px
  backColor?: "gray" | "blue";
  isSecond?: boolean; //명함 맞추기 flow에서 2순위에 사용할 prop
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  color = "pink",
  alt = "Profile",
  isHost = false,
  children,
  isSelected = false,
  size = 68,
  backColor = "blue",
  isSecond = false,
}) => {
  const profileImageUrl = profileImages[color] || profileImages.pink;
  const crownImageUrl = crownImages[color] || crownImages.pink;

  const positionStyles = {
    pink:
      size === 36
        ? "top-3 right-1.5"
        : size === 52
          ? "top-5 right-2.5"
          : size === 62
            ? "top-6 right-3"
            : size === 68
              ? "top-6 right-4"
              : "top-14 right-10",
    green:
      size === 36
        ? "bottom-0.5 left-2"
        : size === 52
          ? "bottom-1 left-3"
          : size === 62
            ? "bottom-1 left-4"
            : size === 68
              ? "bottom-1.5 left-4"
              : "bottom-3 left-9",
    yellow:
      size === 36
        ? "bottom-0 left-1.5"
        : size === 52
          ? "bottom-0 left-2"
          : size === 62
            ? "bottom-0 left-2.5"
            : size === 68
              ? "bottom-0 left-3"
              : "bottom-1 left-8",
    blue:
      size === 36
        ? "top-1 right-2"
        : size === 52
          ? "top-2 right-3"
          : size === 62
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
            : isSelected
              ? "border-2 border-main-pink"
              : "border-2 border-gray-3"
          : size === 62
            ? isSelected
              ? "border-2 border-main-pink"
              : "border-2 border-gray-3"
            : isSelected
              ? "border-3 border-main-pink"
              : "border-0";

  const borderStyleSecond = "border-2 border-sub-pink";

  const textColor = isSelected ? "text-main-pink" : "text-black";

  const imageSize =
    size === 36
      ? "h-[36px] w-[36px]"
      : size === 52
        ? "h-[52px] w-[52px]"
        : size === 62
          ? "h-[62px] w-[62px]"
          : size === 68
            ? "h-[68px] w-[68px]"
            : "h-[148px] w-[148px]";

  const bgStyle = backColor === "blue" ? "bg-sub-blue-40" : "bg-gray-1";

  return (
    <div className="flex flex-col items-center justify-center">
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
                  : size === 62
                    ? 58
                    : size === 68
                      ? 62
                      : 127
            } // Adjust image width based on size
            height={
              size === 36
                ? 34
                : size === 52
                  ? 48
                  : size === 62
                    ? 58
                    : size === 68
                      ? 62
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
          className={`mt-[0.4rem] text-center text-body-2-bold text-sm ${textColor}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
