import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import StatusLabel from "features/common/components/status-label";
import Button from "features/common/components/button";
import { useWalletIsSignedInQuery } from "features/common/hooks/useWalletQueries";

import { utils } from "near-api-js";

import type { Issue } from "../types";
import { viewFunction } from "features/near/api";

export default function IssueDetailsSidebar(props: { issue: Issue }) {
  const router = useRouter();
  const walletIsSignedInQuery = useWalletIsSignedInQuery();

  const [bounty, setBounty] = useState(null);

  useEffect(() => {
    if (!props.issue) return;
    viewFunction("getBountyByIssue", { issueId: props.issue.number })
      .then((res) => {
        setBounty(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <aside>
      <SidebarItem title="Status" content={<StatusLabel status="open" />} />
      <SidebarItem
        title="Total bounty sum"
        content={
          <div>
            {!bounty
              ? "-"
              : utils.format.formatNearAmount(bounty.pool) + " Near"}
          </div>
        }
      />
      <SidebarItem
        title="Funders"
        content={
          <div className="flex gap-2 flex-wrap">
            {!bounty
              ? "-"
              : bounty.funders.map((funder : string) => {
                  return <span key={funder}>{funder}</span>;
                })}
          </div>
        }
      />
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
