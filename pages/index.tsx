import Layout from "../app/components/layout";
import { IssuesList } from "../app/components/issues-list";
import { getBetterIssues } from "../app/api/better-issues";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <IssuesList />
    </Layout>
  );
};

export default Home;
