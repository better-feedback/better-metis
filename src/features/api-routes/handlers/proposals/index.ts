import * as githubApi from "../../api/github";
import {
  getMetadataAndCleanedComment,
  setMetadataComment,
  buildMetadataInfoText,
} from "../../api/github/utils";
import { ApiError } from "../utils";

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * `POST /proposal`
 */
export async function postProposalHandler(
  req: NextApiRequest,
  res: NextApiResponse<{
    message?: string;
    error?: any;
  }>
) {
  const requiredPostBodyKeys = ["issueNumber", "chain", "proposalId"];
  const postBody: {
    issueNumber: number;
    chain: string;
    proposalId: number;
  } = req.body;

  Object.keys(postBody).forEach((postBodyKey) => {
    if (!requiredPostBodyKeys.includes(postBodyKey)) {
      throw new ApiError(
        400,
        `Required POST body keys: ${requiredPostBodyKeys}`
      );
    }
  });

  const metadataComment = await githubApi.getMetadataComment(
    postBody.issueNumber
  );
  const { metadata } = getMetadataAndCleanedComment(
    metadataComment?.body || ""
  );

  const updatedMetadata = {
    ...metadata,
    chainProposals: [
      ...metadata.chainProposals,
      {
        chain: postBody.chain,
        proposalId: postBody.proposalId,
      },
    ],
  };

  const newMetadataCommentBody = setMetadataComment(
    buildMetadataInfoText(updatedMetadata),
    updatedMetadata
  );

  await githubApi.upsertMetadataComment({
    metadataCommentBody: newMetadataCommentBody,
    issueNumber: postBody.issueNumber,
    metadataCommentId: metadataComment?.id,
  });

  res.status(200).json({ message: "OK" });
}
