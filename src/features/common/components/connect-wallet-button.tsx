import React from "react";

import Button from "./button";
import SelectChainModal from "./select-chain-modal";
import ChainIcon from "./chain-icon";

import useWallet from "../hooks/useWallet";
import config from "config";

export default function ConnectWalletButton() {
  const [isSelectChainModalOpen, setIsSelectChainModalOpen] =
    React.useState(false);

  const { signIn, signOut, signedInChain, isSignedIn, signedInAccountId } =
    useWallet();

  async function handleSelectChain(chain: string) {
    await signIn(chain);
  }

  async function handleDisconnectWallet() {
    await signOut();
  }

  if (isSignedIn && signedInChain) {
    return (
      <div className="flex flex-row items-center">
        <div className="mr-4 flex flex-row items-center">
          <ChainIcon size={20} chainName={signedInChain} />
          <div className="ml-2">{signedInAccountId}</div>
        </div>
        <Button type="secondary" onClick={handleDisconnectWallet}>
          Disconnect Wallet
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button type="secondary" onClick={() => setIsSelectChainModalOpen(true)}>
        Connect Wallet
      </Button>
      <SelectChainModal
        isOpen={isSelectChainModalOpen}
        onClose={() => setIsSelectChainModalOpen(false)}
        onSelectChain={handleSelectChain}
        enabledChains={config.site.enabledChains}
      />
    </>
  );
}
