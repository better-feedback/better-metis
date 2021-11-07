import { useQuery } from "react-query";
import { getIssues } from "../api";
import { IssuesListItem } from "./issues-list-item";

export function IssuesList() {
  const { data = [], isLoading } = useQuery(["issues"], getIssues);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.map((issue: any) => (
        <IssuesListItem key={issue.id} issueNumber={issue.number} />
      ))}
    </ul>
  );
}
