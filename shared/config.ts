export const config = {
  github: {
    repoOwner: process.env.NEXT_PUBLIC_REPO_OWNER || "",
    repoName: process.env.NEXT_PUBLIC_REPO_NAME || "",
    betterIssueLabel: "better",

    // secret
    pat: process.env.GITHUB_PAT || "",
  },
  near: {
    apiBaseUrl: process.env.NEXT_PUBLIC_NEAR_API_BASE_URL || "",
    jsonRpcUrl: process.env.NEXT_PUBLIC_JSON_RPC_URL || "",
    daoId: process.env.NEXT_PUBLIC_DAO_ID || "",
  },
  projectName: process.env.NEXT_PUBLIC_PROJECT_NAME || "Your Project",
  siteTitle: process.env.NEXT_PUBLIC_SITE_TITLE || "Site Title",
  publicApiUrl: process.env.NEXT_PUBLIC_API_URL || "",
};

export default config;
