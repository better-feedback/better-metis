import Link from "next/link";

import ListItemMetadata from "./list-item-metadata";

import type { Issue, Label } from "../types";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useWalletChainQuery, useWalletSignedInAccountQuery } from "features/common/hooks/useWalletQueries";

import { CommentMatadata } from "./../../../features/api-routes/api/github/types";

import {
  useVotingAccessQuery,
  useIssueVoteCount,
  useVote,
} from "features/common/hooks/useGuildQueries";
import { upsertMetadataComment } from "features/api-routes/api/github";

import { Octokit } from "octokit";
import config from "config";

import { useAccount } from "wagmi";

const octokit = new Octokit({ auth: config.github.pat });

type Props = {
  issue: Issue;
};

export function IssuesListItem(props: Props) {
  const { issue } = props;
  const signedInAccountQuery = useWalletSignedInAccountQuery();
  const canVote = useVotingAccessQuery();
  const { data: walletChain } = useWalletChainQuery()
  const addVote = useVote();
  const { data } = useIssueVoteCount(issue.number);

  const { isConnected, address } = useAccount()



  const hasUserVotes = (VoteType: string): boolean => {
    return walletChain === "near" ? (data as CommentMatadata)?.voters?.includes(
      signedInAccountQuery.data + VoteType
    ) : (data as CommentMatadata)?.voters?.includes(
      address + VoteType
    )
  }

  const isUserConnected = () => {
    return walletChain === "near" ? signedInAccountQuery.data : isConnected
  }


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
        </div>
      </Link>
      <ListItemMetadata metadata={issue.metadata} />
      <div className="flex flex-col justify-center items-center ">
        <span>{process.env.NEXT_PUBLIC_SHOW_DOWNVOTES == "false" ? ((data as CommentMatadata)?.upVotes) - (data as CommentMatadata)?.downVotes : ((data as CommentMatadata)?.upVotes)}</span>
        <IoIosArrowUp
          className={`text-[1.5rem] h-5	opacity-50 transition-all duration-300 hover:opacity-100 ${hasUserVotes("_up") && "text-[#FF6CE5] opactity-100"
            }`}
          onClick={async (e) => {
            e.stopPropagation();
            if (!isUserConnected())
              return alert("You need to be signed in");
            if (!canVote.data) return alert("You don't have access to vote");
            try {
              addVote.mutate({
                issueNumber: issue.number,
                isUpVote: true,
                walletId: walletChain === "near" ? signedInAccountQuery.data as string : address as string,
              });
            } catch (e) {
              console.error(e);
            }
          }}
        />
        <IoIosArrowDown
          onClick={(e) => {
            e.stopPropagation();
            if (!isUserConnected())
              return alert("You need to be signed in");
            if (!canVote.data) return alert("You don't have access to vote");
            try {
              addVote.mutate({
                issueNumber: issue.number,
                isUpVote: false,
                walletId: walletChain === "near" ? signedInAccountQuery.data as string : address as string,
              });
            } catch (e) {
              console.error(e);
            }
          }}
          className={`text-[1.5rem] h-5 opacity-50 transition-all duration-300 hover:opacity-100 ${hasUserVotes("_down") && "text-red-500"
            }`}
        />
        {process.env.NEXT_PUBLIC_SHOW_DOWNVOTES == "true" && <span>{(data as CommentMatadata)?.downVotes}</span>}
      </div>
    </li>
  );
}
