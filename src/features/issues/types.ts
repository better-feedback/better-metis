export type IssueType = "open" | "planned" | "inProgress";

export type Metadata = {
  chainProposals: {
    chain: string;
    proposalId: number;
  }[];
};

export type Issue = {
  title: string;
  metadata: Metadata;
  created_at: string;
  number: number;
  body: string;
  user: {
    login: string;
  };
};
