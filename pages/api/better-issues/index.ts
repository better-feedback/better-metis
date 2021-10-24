import { getIssues } from "../../../functions/api/github";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  betterIssues?: any[];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // 1. Get GH issues
    const issues = await getIssues({
      page: Number(req.query.page) || 1,
      perPage: Number(req.query.perPage) || 10,
    });
    // 2. Get SputnikDAO proposals
    // 3. Get SputnikDAO bounties
    // 4.
    res.status(200).send({ betterIssues: issues.data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
}
