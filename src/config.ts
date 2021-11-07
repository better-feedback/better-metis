type Config = {
  github: {
    repoOwner: string;
    repoName: string;
    betterIssueLabel: string;
    pat: string;
  };
  chains: {
    near: {
      apiBaseUrl: string;
      jsonRpcUrl: string;
      daoId: string;
    };
  };
  projectName: string;
  siteTitle: string;
  chain: "near";
};

export const config: Config = {
  github: {
    repoOwner: process.env.NEXT_PUBLIC_REPO_OWNER || "",
    repoName: process.env.NEXT_PUBLIC_REPO_NAME || "",
    betterIssueLabel: "better",

    // secret
    pat: process.env.GITHUB_PAT || "",
  },
  chains: {
    near: {
      apiBaseUrl: process.env.NEXT_PUBLIC_NEAR_API_BASE_URL || "",
      jsonRpcUrl: process.env.NEXT_PUBLIC_NEAR_JSON_RPC_URL || "",
      daoId: process.env.NEXT_PUBLIC_NEAR_DAO_ID || "",
    },
  },
  projectName: "Better",
  siteTitle: "Better",
  chain: "near",
};

export default config;
