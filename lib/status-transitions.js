import {
  getOrganizationDetails,
  closeOpenBestuursorganenInTime,
  getGoverningBodiesForOrganization,
  hasOpenEndedBestuursorganenInTime,
} from "./queries";
import {
  ACTIVE_STATUS,
  INACTIVE_STATUS,
} from "./config";
import { createPeriodsForExistingGoverningBodies, isWorshipService } from "./processing-organization";

/**
 * Handle status transitions for worship services from "In Oprichting" to
 * "Active" or "Inactive".
 * @param {string} organizationUuid - the UUID of the organization whose status changed.
 * @param {string} transitionDate - the date of the transition (the change event date).
 */
export async function handleStatusChange(organizationUuid, transitionDate) {
  const organization = await getOrganizationDetails(organizationUuid);

  if (!organization) {
    console.log(`Organization with UUID ${organizationUuid} not found`);
    return;
  }

  if (!isWorshipService(organization.classification)) {
    console.log(
      `Organization ${organizationUuid} is not a worship service, no status change handling needed`
    );
    return;
  }

  if (organization.status === ACTIVE_STATUS) {
    await handleTransitionToActive(organization, transitionDate);
  } else if (organization.status === INACTIVE_STATUS) {
    await handleTransitionToInactive(organization, transitionDate);
  } else {
    console.log(
      `Organization ${organizationUuid} has status ${organization.status}, no transition handling needed`
    );
  }
}

/**
 * Handle transition from "In Oprichting" to "Active".
 * - Check for open-ended bestuursorganen as precondition
 * - Close existing open-ended bestuursorgaan
 * - Create 2 new bestuursorganen: the current period starting on the
 *   transition date, plus the next 3-year period
 */
async function handleTransitionToActive(organization, endDate) {
  const hasOpenEnded = await hasOpenEndedBestuursorganenInTime(organization.uri);

  if (!hasOpenEnded) {
    console.log(
      `No open-ended bestuursorganen found for ${organization.uuid}. ` +
      `Skipping.`
    );
    return;
  }

  await closeOpenBestuursorganenInTime(organization.uri, endDate);
  const governingBodies = await getGoverningBodiesForOrganization(
    organization.uri
  );

  await createPeriodsForExistingGoverningBodies(governingBodies, endDate);
  console.log(
    `Created active worship relationships for ${organization.uuid}`
  );
}

/**
 * Handle transition from "In Oprichting" to "Inactive".
 * - Check for open-ended bestuursorganen as precondition
 * - Close existing open-ended bestuursorgaan
 */
async function handleTransitionToInactive(organization, endDate) {
  const hasOpenEnded = await hasOpenEndedBestuursorganenInTime(organization.uri);

  if (!hasOpenEnded) {
    console.log(
      `No open-ended bestuursorganen found for ${organization.uuid}. ` +
      `Skipping.`
    );
    return;
  }

  await closeOpenBestuursorganenInTime(organization.uri, endDate);
  console.log(`Closed open bestuursorganen for ${organization.uuid}`);
}
