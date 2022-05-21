import { context, u128, RNG, datetime } from "near-sdk-as";

/* `Bounty` is a class that has a `issueId` property of type `u8`, a `pool` property of type `u128`
that is initialized to `u128.Zero`, a `funders` property of type `string[]` that is initialized to
an empty array, and a `status` property of type `string` that is initialized to `"OPEN"`

This is used to track a bounty for a particular issue.
*/
@nearBindgen
export class Bounty {
  issueId: u8;
  pool: u128 = u128.Zero;
  funders: string[] = [];
  status: string = "OPEN";

  constructor(issueId: u8) {
    this.issueId = issueId;
  }
}
