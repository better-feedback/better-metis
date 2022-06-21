import Link from "next/link";

import ListItemMetadata from "./list-item-metadata";

import type { Issue, Label } from "../types";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useWalletSignedInAccountQuery } from "features/common/hooks/useWalletQueries";

import { useVotingAccessQuery } from "features/common/hooks/useGuildQueries";

type Props = {
  issue: Issue;
};

export function IssuesListItem(props: Props) {
  const signedInAccountQuery = useWalletSignedInAccountQuery();
  const canVote = useVotingAccessQuery();

  const { issue } = props;
  return (
    <li className="py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-200 cursor-pointer overlow flex justify-between ">
      <Link passHref href={`/issues/${issue.number}`}>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h3 className="font-semibold">{issue.title}</h3>
            <div className="text-xs">
              {`#${issue.number} opened on ${issue.created_at} by ${issue.user.login}`}
            </div>
            <div className="flex gap-2 flex-wrap mt-1">
              {issue?.labels.map((label: Label) => {
                return (
                  <div
                    key={label.id}
                    className={`inline-flex items-center justify-center px-2 border-2 border-gray-200 dark:border-zinc-800 rounded-md bg-transparent text-gray-500`}
                  >
                    <span className={`text-sm`}>{label.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <ListItemMetadata metadata={issue.metadata} />
        </div>
      </Link>

      <div className="flex flex-col justify-center items-center ">
        <span>0</span>
        <IoIosArrowUp
          className="text-[1.5rem] opacity-50 transition-all duration-300 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            if (!signedInAccountQuery) return alert("You need to be signed in");
            if (!canVote.data) return alert("You don't have access to vote");
            alert("You can vote");
          }}
        />
        <IoIosArrowDown
          onClick={(e) => {
            e.stopPropagation();
            if (!signedInAccountQuery) return alert("You need to be signed in");
            if (!canVote.data) return alert("You don't have access to vote");
          }}
          className="text-[1.5rem] opacity-50 transition-all duration-300 hover:opacity-100"
        />
      </div>
    </li>
  );
}
