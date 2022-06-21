import {
  ApiError,
  apiErrorHandler,
} from "../../../features/api-routes/handlers/utils";

import type { NextApiRequest, NextApiResponse } from "next";

import { Octokit } from "octokit";

import {
  setMetadataComment,
  getMetadataAndCleanedComment,
  metadataCommentRegex,
} from "features/api-routes/api/github/utils";

import { getMetadataCommentId } from "features/api-routes/api/github";

type Data = {
  issue?: any[];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      /**
       * `GET /issues/:issueNumber`
       */
      case "POST":
        const octoKit = new Octokit({ auth: process.env.GITHUB_PAT });
        if (
          !process.env.NEXT_PUBLIC_REPO_OWNER ||
          !process.env.NEXT_PUBLIC_REPO_NAME
        )
          return res.status(500).send("Missing environment variables");

        /* Destructuring the request body and then getting the metadata comment id. */
        const { issueNumber, isUpVote } = req.body;

        const { id, body } = await getMetadataCommentId(issueNumber);

        /* This is creating a new comment with the metadata if matadata doesnt exist already. */
        if (!id || !body || !body.includes("vote")) {
          const commentBody = setMetadataComment(
            `This issue has ${isUpVote ? "1" : "-1"} votes`,
            {
              votes: isUpVote ? 1 : -1,
            }
          );

          await octoKit.rest.issues.createComment({
            owner: process.env.NEXT_PUBLIC_REPO_OWNER,
            repo: process.env.NEXT_PUBLIC_REPO_NAME,
            issue_number: issueNumber,
            body: commentBody,
          });
        }/* This is updating the comment with the new vote count. */
         else {
          const { metadata, cleanedComment } =
            getMetadataAndCleanedComment(body);

          const newVotes = isUpVote
            ? metadata["votes"] + 1
            : metadata["votes"] - 1;

          const commentBody = setMetadataComment(
            `This issue has ${newVotes} votes`,
            {
              votes: newVotes,
            }
          );

          await octoKit.rest.issues.updateComment({
            owner: process.env.NEXT_PUBLIC_REPO_OWNER,
            repo: process.env.NEXT_PUBLIC_REPO_NAME,
            issue_number: issueNumber,
            comment_id: id,
            body: commentBody,
          });
        }

        return res.status(200).send("Success");
      default:
        throw new ApiError(400, `Method ${req.method} not allowed`);
    }
  } catch (error) {
    apiErrorHandler(res, error);
  }
}
