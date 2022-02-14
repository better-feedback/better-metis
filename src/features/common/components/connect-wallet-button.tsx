import React from "react";

import Button from "./button";
import SelectChainModal from "./select-chain-modal";
import ChainIcon from "./chain-icon";

import {
  useWalletChainQuery,
  useWalletSignedInAccountQuery,
  useWalletSignInMutation,
  useWalletSignOutMutation,
} from "../hooks/useWalletQueries";
import config from "config";

export default function ConnectWalletButton() {
  const [isSelectChainModalOpen, setIsSelectChainModalOpen] =
    React.useState(false);

  const walletChainQuery = useWalletChainQuery();
  const signedInAccountQuery = useWalletSignedInAccountQuery();
  const signInMutation = useWalletSignInMutation();
  const signOutMutation = useWalletSignOutMutation();

  async function handleSelectChain(chain: string) {
    signInMutation.mutate(chain);
  }

  async function handleDisconnectWallet() {
    signOutMutation.mutate();
  }

  if (walletChainQuery.data && signedInAccountQuery.data) {
    return (
      <div className="flex flex-row items-center">
        <div className="mr-4 flex flex-row items-center">
          <ChainIcon
            size={20}
            chainName={walletChainQuery.data}
            className="dark:fill-current dark:text-white"
          />
          <div className="ml-2">{signedInAccountQuery.data}</div>
        </div>
        <Button type="secondary" onClick={handleDisconnectWallet}>
          Disconnect
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
