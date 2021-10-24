import { Octokit } from "octokit";
import config from "../../../shared/config";

import type { ReqParams } from "../../../shared/types";

const octokit = new Octokit({ auth: config.github.pat });

export async function getIssues(reqParams: ReqParams = {}) {
  return octokit.rest.issues.listForRepo({
    owner: config.github.repoOwner,
    repo: config.github.repoName,
    labels: config.github.betterIssueLabel,
    per_page: reqParams.perPage,
    page: reqParams.page,
  });
}
