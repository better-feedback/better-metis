import Image from "next/image";

import ChainIcon from "./chain-icon";

export default function ChainListItem(props: {
  chainName: string;
  onClick: (chainName: string) => void;
}) {
  return (
    <li
      className="flex flex-row items-center p-2 mt-2 rounded-lg cursor-pointer hover:bg-purple-400 text-white"
      onClick={() => props.onClick(props.chainName)}
    >
      <ChainIcon chainName={props.chainName} />
      <div className="ml-4">{props.chainName.toUpperCase()}</div>
    </li>
  );
}
