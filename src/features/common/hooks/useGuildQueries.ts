import { guild } from "@guildxyz/sdk";
import { useQuery } from "react-query";
import { nearAccountToHex } from "utils/helpers";
import { chainsToApi } from "../constants";

export function useVotingAccessQuery() {
  const walletChain = window.localStorage.getItem("wallet-chain");

  return useQuery("hasVotingAccess", async () => {
    if (!walletChain) {
      return null;
    }
    const { getAccountId } = chainsToApi[walletChain];

    return getAccountId().then(async (accountId) => {
      const account = nearAccountToHex([accountId]);

      //Getting guild roles data
      const guildData = await guild.getUserAccess(
        parseInt(process.env.NEXT_PUBLIC_GUILD_ID),
        account[0]
      );

      //Getting role id by chain
      const roleId: string =
        walletChain === "near"
          ? process.env.NEXT_PUBLIC_NEAR_ID
          : process.env.NEXT_PUBLIC_ROLE_ID;

      let canVote: boolean = false;

      //Checking if user has access to vote or not
      guildData.forEach((access) => {
        if (access.roleId === parseInt(roleId)) {
          canVote = access.access;
        }
      });
      return canVote;
    });
  });
}
