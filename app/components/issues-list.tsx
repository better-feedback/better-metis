import { useQuery } from "react-query";
import { getBetterIssues } from "../api/better-issues";

export function IssuesList() {
  const { data } = useQuery("issues", getBetterIssues);
  console.log(data);
  return <ul></ul>;
}
