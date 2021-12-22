import type { Metadata } from "./types";

export const metadataCommentRegex = /\n\n<!-- better-meta = (.*) -->/;

export function getMetadataAndCleanedComment(comment: string): {
  metadata: Metadata;
  cleanedComment: string;
} {
  const match = comment.match(metadataCommentRegex);

  const metadata = match ? JSON.parse(match[1]) : { chainProposals: [] };
  const cleanedComment = comment.replace(metadataCommentRegex, "");
  return { cleanedComment, metadata };
}

export function setMetadataComment(
  metadataInfoText: string,
  metadata: Metadata
) {
  return `${metadataInfoText}\n\n<!-- better-meta = ${JSON.stringify(
    metadata
  )} -->`;
}

export function buildMetadataInfoText(metadata: Metadata) {
  let infoComment = `This issue has ${metadata.chainProposals.length} bounties.\n`;
  for (const chainProposal of metadata.chainProposals) {
    infoComment += `Chain: ${chainProposal.chain}, Proposal ID: ${chainProposal.proposalId}\n`;
  }
  return infoComment;
}
