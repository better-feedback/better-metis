import Link from "next/link";

type Props = {
  issueNumber: number;
};

export function IssuesListItem(props: Props) {
  return (
    <li>
      <Link href={`/issues/${props.issueNumber}`}>
        {`Number: ${props.issueNumber}`}
      </Link>
    </li>
  );
}
