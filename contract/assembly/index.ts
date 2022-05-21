//Near imports
import {
  Context,
  logging,
  PersistentUnorderedMap,
  u128,
  ContractPromiseBatch,
  env,
} from "near-sdk-as";

//Models import
import { Bounty } from "../models/models";

/* Creating a new PersistentUnorderedMap with the key of type string and the value of type Bounty. 
   That stores all of the bounties in the contract.
*/
const bounties = new PersistentUnorderedMap<u8, Bounty>("BN");



/*
 * If the bounty is open, add the attached deposit to the pool and add the attached account to the
 * funders array
 * @param {u8} issueId - The ID of the issue that the bounty is attached to.
 */
export function fundBounty(issueId: u8): void {
  assert(Context.attachedDeposit > u128.Zero, "Amount must be greater than 0");
  const bounty = bounties.get(issueId);
  assert(bounty != null, "Bounty not found");

  if (bounty != null && bounty.status === "OPEN") {
    // Add the attached deposit to the pool
    bounty.pool = u128.add(bounty.pool, Context.attachedDeposit);

    let isNewFunder = true;

    // Check if the attached account is already a funder
    for (let i = 0; i < bounty.funders.length; i++) {
      if (bounty.funders[i] === Context.sender) {
        isNewFunder = false;
        break;
      }
    }

    // If the attached account is a new funder, add it to the funders array
    if (isNewFunder) {
      bounty.funders.push(Context.sender);
    }

    // Update the bounty in the contract
    bounties.set(issueId, bounty);
  }
}



/*
 * It returns an array of all the bounties in the bounties map
 * @returns An array of Bounty objects.
 */
export function viewBounties() : Bounty[] {
  return bounties.values();
}