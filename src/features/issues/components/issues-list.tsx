import React from "react";
import { useQuery } from "react-query";

import { getIssues } from "../api";
import { IssuesListItem } from "./issues-list-item";

import type { IssueType } from "../types";

export function IssuesList(props: { title: string; issueType: IssueType }) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery(["issues", props.issueType], () =>
    getIssues(props.issueType, {
      page: 1,
      perPage: 10,
    })
  );

  return (
    <div className="border-2 border-gray-200 dark:border-zinc-800 rounded-md">
      <div className="flex flex-row border-b-2 border-gray-200 dark:border-zinc-800 px-4 py-2">
        <h3 className="font-bold">{props.title}</h3>
      </div>
      <ul>
        {isLoading ? (
          <div className="text-center p-4">Loading...</div>
        ) : isError ? (
          <div className="text-center p-4">Error: {error}</div>
        ) : data.length === 0 ? (
          <div className="text-center p-4">No issues</div>
        ) : (
          data.map((issue) => (
            <IssuesListItem key={issue.number} issue={issue} />
          ))
        )}
      </ul>
    </div>
  );
}
