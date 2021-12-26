import React from "react";

const typeToClass: Record<string, string> = {
  primary: "px-4 py-2 bg-pink-500 text-white shadow-lg shadow-pink-500/40",
  secondary: "px-4 py-2 border-2 border-pink-500 bg-transparent text-pink-500",
  icon: "p-0 ",
};

export default function Button(
  props: {
    type?: "primary" | "secondary" | "inverse" | "icon";
  } & React.HTMLProps<HTMLButtonElement>
) {
  const { type = "primary", className = "", ...restProps } = props;

  const baseClassName = "rounded-md hover:opacity-80 cursor-pointer";
  const typeClassName = typeToClass[type];

  return (
    <button
      className={`${className} ${baseClassName} ${typeClassName}`}
      {...restProps}
    />
  );
}
