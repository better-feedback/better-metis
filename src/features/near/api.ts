import axios from "axios";
import config from "../../config";

type Proposal = {
  transactionHash: string;
  updateTransactionHash: string;
  createTimestamp: number;
  updateTimestamp: number;
  id: string;
  proposalId: number;
  daoId: string;
  proposer: string;
  description: string;
  status:
    | "InProgress"
    | "Approved"
    | "Rejected"
    | "Removed"
    | "Expired"
    | "Moved";
};

export async function getProposalById(proposalId: number) {
  const searchCondition = getSearchConditionString({ proposalId });
  const result = await axios.get<Proposal[]>(
    `${config.chains.near.apiBaseUrl}/proposals?s=${searchCondition}`
  );
  return result.data[0];
}

export function mergeIssuesWithProposals(issues: any[], proposals: Proposal[]) {
  return issues;
}

function getSearchConditionString(searchCondition: {
  proposalId: string | number;
}) {
  return JSON.stringify({
    $or: [
      {
        daoId: config.chains.near.daoId,
        proposalId: searchCondition.proposalId,
      },
    ],
  });
}
