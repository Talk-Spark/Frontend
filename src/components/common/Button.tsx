import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "black" | "pink" | "gray";
type ButtonSize = "xl" | "l" | "m" | "s";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const Button = ({
  children,
  variant,
  size,
  isLoading,
  onClick,
}: ButtonProps) => {
  //const baseStyle = "flex w";

  return (
    <button
      onClick={onClick}
      className={"flex h-[56px]"}
      disabled={isLoading}
    ></button>
  );
};

export default Button;
