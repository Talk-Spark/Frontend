import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "black" | "pink" | "gray";
type ButtonSize = "xl" | "l" | "m" | "s";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = ({
  children,
  variant,
  size,
  disabled,
  onClick,
}: ButtonProps) => {
  //size s는 따로!

  // px-[10rem] py-[1.6rem]
  const baseClass =
    "flex flex-shrink-0 items-center justify-center gap-[1rem] rounded-[12px]";

  const variantClass = {
    black: "bg-black",
    pink: "bg-main-pink",
    gray: "bg-gray-3",
  }[variant || "black"]; //default값은 black으로


  const textColorClass = (() => {
    if (!disabled && variant == "gray") return "text-gray-8";
    else if (size === "s") return "text-gray-7";
    else return "text-white";
  })();

  const sizeClass = {
    xl: "w-[33.5rem] h-[5.6rem] text-subhead-bold",
    l: "w-[16.2rem] h-[5.6rem] text-subhead-bold",
    m: "w-[14.5rem] h-[4.8rem] text-body-1-bold",
    s: "w-[5.1rem] h-[2.5rem] text-caption-med bg-white-25 border-[1px] border-solid border-gray-7 ",
  }[size || "xl"]; //default값은 xl로

  const fullClassName = [baseClass, variantClass, sizeClass, textColorClass]
    .filter(Boolean)
    .join(" ");

  return (
    <button onClick={onClick} className={fullClassName} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
