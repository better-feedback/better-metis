import { useQuery } from "react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getIssueByNumber } from "../api";
import IssueDetailsHeading from "./issue-details-heading";
import IssueDetailsSidebar from "./issue-details-sidebar";

export function IssueDetails(props: { issueNumber: number }) {
  const {
    data: issue,
    isLoading,
    isFetching,
  } = useQuery(
    ["issues", props.issueNumber],
    () => getIssueByNumber(props.issueNumber),
    { enabled: Boolean(props.issueNumber) }
  );

  console.log(issue);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!issue) {
    return <div>Not found</div>;
  }

  return (
    <div className="max-w-4xl grid grid-cols-5 mx-auto">
      <div className="col-span-5">
        <IssueDetailsHeading issue={issue} />
      </div>
      <div className="col-span-4">
        <div className="prose dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {issue.body}
          </ReactMarkdown>
        </div>
      </div>
      <IssueDetailsSidebar issueNumber={props.issueNumber} />
    </div>
  );
}
