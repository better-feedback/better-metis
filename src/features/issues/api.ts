import axios from "axios";
import { githubConfig } from "config";

import type { IssueType, Issue } from "./types";
import type { ReqParams } from "features/common/types";

export async function getIssues(issueType: IssueType, params: ReqParams) {
  const labelsOfType = githubConfig.labels[issueType];
  const { data } = await axios.get<{ issues: Issue[] }>(
    `/api/issues?labels=${labelsOfType}&page=${params.page || 1}&perPage=${
      params.perPage || 10
    }`
  );
  return data.issues;
}

export async function getIssueByNumber(issueNumber: number) {
  const { data } = await axios.get<{ issue: Issue }>(
    `/api/issues/${issueNumber}`
  );
  return data.issue;
}

export async function addProposalToMetadataComment(
  issueNumber: number,
  chainProposal: {
    chain: string;
    proposalId: number;
  }
) {
  return axios.post<any>(`/api/proposal`, {
    issueNumber,
    chain: chainProposal.chain,
    proposalId: chainProposal.proposalId,
  });
}
