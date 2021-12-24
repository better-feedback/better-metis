import React from "react";

import * as nearApi from "features/near/api";
import { chains } from "../constants";

const chainFuncs = {
  [chains.NEAR]: {
    signIn: nearApi.signIn,
    signOut: nearApi.signOut,
    isSignedIn: nearApi.isSignedIn,
    getAccountId: nearApi.getAccountId,
  },
};

export default function useWallet() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [signedInChain, setSignedInChain] = React.useState<string | null>(null);
  const [signedInAccountId, setSignedInAccountId] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    if (typeof window !== undefined) {
      const walletChain = window.localStorage.getItem("wallet-chain");

      if (walletChain) {
        setSignedInChain(walletChain);
        const { isSignedIn, getAccountId } = chainFuncs[walletChain];
        isSignedIn()
          .then((result) => setIsSignedIn(result))
          .then(async () => {
            const accountId = await getAccountId();
            setSignedInAccountId(accountId);
          });
      }
    }
  }, []);

  async function signIn(chain: string) {
    const { signIn, getAccountId } = chainFuncs[chain];

    await signIn();
    setIsSignedIn(true);
    setSignedInChain(chain);
    window.localStorage.setItem("wallet-chain", chain);

    const accountId = await getAccountId();
    setSignedInAccountId(accountId);
  }

  async function signOut() {
    const { signOut } = chainFuncs[signedInChain || chains.NEAR];
    await signOut();
    setIsSignedIn(false);
    setSignedInChain(null);
    window.localStorage.removeItem("wallet-chain");
  }

  return { signIn, isSignedIn, signOut, signedInChain, signedInAccountId };
}
