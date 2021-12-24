import React from "react";

const typeToClass: Record<string, string> = {
  primary: "px-4 py-2 bg-purple-400 text-white",
  secondary:
    "px-4 py-2 border-2 border-purple-400 bg-transparent text-purple-400",
  icon: "p-0 ",
};

export default function Button(
  props: {
    type?: "primary" | "secondary" | "inverse" | "icon";
  } & React.HTMLProps<HTMLButtonElement>
) {
  const { type = "primary", className, ...restProps } = props;

  const baseClassName = "rounded-md hover:opacity-80 cursor-pointer";
  const typeClassName = typeToClass[type];

  return (
    <button
      className={`${className} ${baseClassName} ${typeClassName}`}
      {...restProps}
    />
  );
}
