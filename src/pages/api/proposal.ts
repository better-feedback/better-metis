import { postProposalHandler } from "../../features/api-routes/handlers/proposals";
import {
  ApiError,
  apiErrorHandler,
} from "../../features/api-routes/handlers/utils";

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
        return postProposalHandler(req, res);
      default:
        throw new ApiError(400, `Method ${req.method} not allowed`);
    }
  } catch (error) {
    apiErrorHandler(res, error);
  }
}
