import React from "react";
import { useMutation } from "react-query";

import StatusLabel from "features/common/components/status-label";
import Button from "features/common/components/button";
import { addProposalToMetadataComment } from "../api";

export default function IssueDetailsSidebar(props: { issueNumber: number }) {
  const addProposalMutation = useMutation((chainProposal: any) =>
    addProposalToMetadataComment(props.issueNumber, chainProposal)
  );

  return (
    <aside>
      <SidebarItem title="Status" content={<StatusLabel status="open" />} />
      <SidebarItem title="Total bounty sum" content={<div>{2}</div>} />
      <SidebarItem title="# Attached bounties" content={<div>{2}</div>} />
      <div className="flex justify-center pt-4">
        <Button
          onClick={() =>
            addProposalMutation.mutate({
              chain: "near",
              proposalId: 1,
            })
          }
          disabled={addProposalMutation.isLoading}
        >
          {addProposalMutation.isLoading ? "Adding..." : "Add Bounty"}
        </Button>
      </div>
    </aside>
  );
}

function SidebarItem(props: { title: string; content: React.ReactNode }) {
  return (
    <div className="py-4 border-b-2 border-gray-100 dark:border-zinc-800">
      <div className="mb-1 font-semibold">{props.title}:</div>
      {props.content}
    </div>
  );
}
