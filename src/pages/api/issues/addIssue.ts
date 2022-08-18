import {
  ApiError,
  apiErrorHandler,
} from "../../../features/api-routes/handlers/utils";

import type { NextApiRequest, NextApiResponse } from "next";


import { Octokit } from "octokit";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    
    const {userId , title, body, isGithubAuth} = req.body;

    // const accessToken = isGithubAuth ? await getAccessToken(req, res) : null;

  } catch (error) {
    apiErrorHandler(res, error);
  }
}
