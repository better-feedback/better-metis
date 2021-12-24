import Image from "next/image";
import React from "react";

import NearLogo from "./icons/near-logo";

const chainNameToIcon: Record<
  string,
  (props: { size?: number }) => JSX.Element
> = {
  near: NearLogo,
};

export default function ChainIcon(props: { chainName: string; size?: number }) {
  const size = props.size || 32;
  const Icon = chainNameToIcon[props.chainName];

  if (!Icon) {
    return null;
  }

  return <Icon size={size} />;
}
