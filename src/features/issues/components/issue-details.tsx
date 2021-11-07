import { useQuery, useMutation } from "react-query";
import { getIssueByNumber, addProposalToMetadataComment } from "../api";

type Props = {
  issueNumber: number;
};

export function IssueDetails(props: Props) {
  const { data, isLoading, isFetching } = useQuery(
    ["issues", props.issueNumber],
    () => getIssueByNumber(props.issueNumber),
    { enabled: Boolean(props.issueNumber) }
  );

  const addProposalMutation = useMutation((chainProposal: any) =>
    addProposalToMetadataComment(props.issueNumber, chainProposal)
  );

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Number: {data.number}</div>
      <button
        onClick={() =>
          addProposalMutation.mutate({
            chain: "near",
            proposalId: 1,
          })
        }
        disabled={addProposalMutation.isLoading}
      >
        {addProposalMutation.isLoading ? "Funding..." : "Fund Me"}
      </button>
    </div>
  );
}
