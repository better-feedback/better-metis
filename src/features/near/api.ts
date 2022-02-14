import * as nearApi from "near-api-js";

import { nearChainConfig } from "config";

import type { Token } from "features/tokens/types";

export async function initNearWalletConnection() {
  const near = await nearApi.connect({
    networkId: nearChainConfig.networkId,
    keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: nearChainConfig.jsonRpcUrl,
    walletUrl: nearChainConfig.walletUrl,
    helperUrl: nearChainConfig.helperUrl,
  });
  return new nearApi.WalletConnection(near, null);
}

export async function signIn() {
  const nearWalletConnection = await initNearWalletConnection();

  return nearWalletConnection.requestSignIn({
    contractId: nearChainConfig.daoId,
  });
}

export async function isSignedIn() {
  const nearWalletConnection = await initNearWalletConnection();

  return nearWalletConnection.isSignedIn();
}

export async function signOut() {
  const nearWalletConnection = await initNearWalletConnection();

  return nearWalletConnection.signOut();
}

export async function getAccountId(): Promise<string> {
  const nearWalletConnection = await initNearWalletConnection();

  return nearWalletConnection.getAccountId();
}

export async function initDaoContract() {
  const nearWalletConnection = await initNearWalletConnection();
  const account = nearWalletConnection.account();

  return new nearApi.Contract(account, nearChainConfig.daoId, {
    viewMethods: ["getMessages"],
    changeMethods: ["add_proposal"],
  });
}

export async function addBounty(params: {
  issueNumber: number;
  issueDescription: string;
  token: string;
  amount: string;
  maxDeadline: number;
}) {
  const daoContract = await initDaoContract();
  console.log(daoContract);
  const id = await (daoContract as any).add_proposal(
    {
      proposal: {
        description: `Bounty created for GitHub issue #${params.issueNumber}`,
        kind: {
          AddBounty: {
            bounty: {
              // description: params.issueDescription,
              // token: params.token,
              // amount: params.amount,
              // times: 1,
              // max_deadline: params.maxDeadline,
              description: "Test",
              token: "",
              amount: "123",
              times: 1,
              max_deadline: "1000000000000",
            },
          },
        },
      },
    },
    undefined,
    1
  );
  return id;
}

export async function claimBounty() {
  // TODO
}

export async function doneBounty() {
  // TODO
}

export async function giveUpBounty() {
  // TODO
}

export async function getBountyById(bountyId: number) {
  // TODO
}

export async function getTokens(): Promise<Token[]> {
  return [
    {
      symbol: "NEAR",
      address: "0x",
      decimals: 18,
      name: "Near Token",
    },
  ];
}
