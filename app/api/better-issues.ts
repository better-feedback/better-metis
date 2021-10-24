import axios from "axios";

export async function getBetterIssues() {
  return axios.get("/api/better-issues");
}
