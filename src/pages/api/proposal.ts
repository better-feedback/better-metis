import postProposalMeta from "../../features/api-routes/proposals/post-meta";
import { ApiError, apiErrorHandler } from "../../features/api-routes/utils";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    switch (req.method) {
      /**
       * `POST /proposal`
       */
      case "POST":
        return postProposalMeta(req, res);
      default:
        throw new ApiError(400, `Method ${req.method} not allowed`);
    }
  } catch (error) {
    apiErrorHandler(res, error);
  }
}
