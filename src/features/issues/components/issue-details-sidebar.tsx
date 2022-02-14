import React from "react";
import { useRouter } from "next/router";

import StatusLabel from "features/common/components/status-label";
import Button from "features/common/components/button";
import { useWalletIsSignedInQuery } from "features/common/hooks/useWalletQueries";

import type { Issue } from "../types";

export default function IssueDetailsSidebar(props: { issue: Issue }) {
  const router = useRouter();
  const walletIsSignedInQuery = useWalletIsSignedInQuery();

  return (
    <aside>
      <SidebarItem title="Status" content={<StatusLabel status="open" />} />
      <SidebarItem title="Total bounty sum" content={<div>{2}</div>} />
      <SidebarItem title="# Attached bounties" content={<div>{2}</div>} />
      <div className="flex justify-center pt-4">
        <Button
          onClick={() =>
            router.push(`/issues/${props.issue.number}/add-bounty`)
          }
          disabled={!walletIsSignedInQuery.data}
        >
          Add Bounty
        </Button>
      </div>
      {!walletIsSignedInQuery.data && (
        <p className="text-xs text-center mt-2 text-gray-500 dark:text-zinc-500">
          You need to connect a wallet to add a bounty.
        </p>
      )}
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
