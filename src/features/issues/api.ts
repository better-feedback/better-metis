import axios from "axios";

export async function getIssues() {
  const { data } = await axios.get<any>("/api/issues");
  return data.issues;
}

export async function getIssueByNumber(issueNumber: number) {
  const { data = {} } = await axios.get<any>(`/api/issues/${issueNumber}`);
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
