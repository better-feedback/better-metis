import getIssueDetails from "../../../features/api-routes/issues/get-details";
import { ApiError, apiErrorHandler } from "../../../features/api-routes/utils";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  issue?: any[];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    switch (req.method) {
      /**
       * `GET /issues/:issueNumber`
       */
      case "GET":
        return getIssueDetails(req, res);
      default:
        throw new ApiError(400, `Method ${req.method} not allowed`);
    }
  } catch (error) {
    apiErrorHandler(res, error);
  }
}
