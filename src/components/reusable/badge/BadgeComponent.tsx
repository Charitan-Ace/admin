import React from "react";
import { BadgeProps } from "./interfaces";

const Badge: React.FC<BadgeProps> = ({
  color,
  text,
  textStyle = "normal",
  borderRadius = "rounded-full",
  innerPadding = "px-2 py-1",
}) => {
  const badgeColor = color ? color : "bg-gray-200 text-gray-800";

  return (
    <span
      className={`${badgeColor} ${borderRadius} ${innerPadding} ${textStyle === "bold" ? "font-bold" : "font-normal"}`}
    >
      {text}
    </span>
  );
};

export default Badge;
