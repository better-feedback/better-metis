import { Layout } from "../../shared/components/layout";
import { IssuesList } from "../components/issues-list";

import type { NextPage } from "next";

const IssuesListPage: NextPage = () => {
  return (
    <Layout title="Home">
      <IssuesList />
    </Layout>
  );
};

export default IssuesListPage;
