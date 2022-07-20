import Link from "next/link";

import ConnectWalletButton from "./connect-wallet-button";
import config from "config";
import { ConnectButton } from '@rainbow-me/rainbowkit';


import { useAccount } from 'wagmi'
import { useEffect } from "react";

import { useWalletChainQuery } from "../hooks/useWalletQueries";

export default function HeaderNav() {

  const { isDisconnected } = useAccount()

  const { data: walletChain = "" } = useWalletChainQuery();

  // Removing the wallet from local storage when the user disconnects it (Polygon only)
  useEffect(() => {
    if (isDisconnected) {
      localStorage.removeItem('wallet-chain')
    }
  }, [isDisconnected])

  console.log("Thing to show the correct thing :", (walletChain === "near" || !walletChain) && isDisconnected)
  console.log("Is disconnected : " , isDisconnected)

  return (
    <header className="shadow-md dark:bg-zinc-800">
      <nav className="container mx-auto p-4 flex flex-row justify-between items-center">
        <Link href={{ pathname: "/" }}>{config.site.title}</Link>
        {(walletChain === "near" || !walletChain) || isDisconnected ? <ConnectWalletButton />
          : <ConnectButton />}
      </nav>
    </header>
  );
}
