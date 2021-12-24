import * as nearApi from "near-api-js";

import { nearChainConfig } from "config";

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

export async function getAccountId() {
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
  ghIssueNumber: number;
  issueDescription: string;
  token: string;
  amount: string;
  times: number;
  maxDeadline: number;
}) {
  const daoContract = initDaoContract();
  const id = await (daoContract as any).add_proposal({
    description: `Bounty created for GitHub issue #${params.ghIssueNumber}`,
    kind: {
      bounty: {
        description: params.issueDescription,
        token: params.token,
        amount: params.amount,
        times: params.times,
        max_deadline: params.maxDeadline,
      },
    },
  });
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
