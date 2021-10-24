import axios from "axios";
import config from "../../../shared/config";

import type { ReqParams } from "../../../shared/types";

const searchCondition = JSON.stringify({
  $or: [{ daoId: config.near.daoId }],
});

export async function getProposals(reqParams: ReqParams) {
  return axios.get(
    `${config.near.apiBaseUrl}/proposals?s=${searchCondition}${
      reqParams.page ? `&page=${reqParams.page}` : ""
    }${reqParams.page ? `&offset=${reqParams.perPage}` : ""}`
  );
}

export async function getBounties(reqParams: ReqParams) {
  return axios.get(
    `${config.near.apiBaseUrl}/bounties?s=${searchCondition}${
      reqParams.page ? `&page=${reqParams.page}` : ""
    }${reqParams.page ? `&offset=${reqParams.perPage}` : ""}`
  );
}
