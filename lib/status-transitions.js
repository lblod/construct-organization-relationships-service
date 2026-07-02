import {
  getOrganizationDetails,
  closeOpenBestuursorganenInTime,
  getGoverningBodiesForOrganization,
} from "./queries";
import {
  ORGANIZATION_CLASSIFICATIONS,
  ACTIVE_STATUS,
  INACTIVE_STATUS,
} from "./config";
import { createPeriodsForExistingGoverningBodies } from "./processing-organization";

/**
 * Handle status transitions for worship services from "In Oprichting" to
 * "Active" or "Inactive".
 * @param {string} organizationUuid - the UUID of the organization whose status changed.
 */
export async function handleStatusChange(organizationUuid) {
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

  const today = new Date().toISOString().split("T")[0] + "T00:00:00";

  if (organization.status === ACTIVE_STATUS) {
    await handleTransitionToActive(organization, today);
  } else if (organization.status === INACTIVE_STATUS) {
    await handleTransitionToInactive(organization, today);
  } else {
    console.log(
      `Organization ${organizationUuid} has status ${organization.status}, no transition handling needed`
    );
  }
}

/**
 * Handle transition from "In Oprichting" to "Active".
 * - Close existing open-ended bestuursorgaan
 * - Create 2 new bestuursorganen (current + next 3-year periods)
 */
async function handleTransitionToActive(organization, endDate) {
  await closeOpenBestuursorganenInTime(organization.uri, endDate);
  const governingBodies = await getGoverningBodiesForOrganization(
    organization.uri
  );

  await createPeriodsForExistingGoverningBodies(governingBodies);
  console.log(
    `Created active worship relationships for ${organization.uuid}`
  );
}

/**
 * Handle transition from "In Oprichting" to "Inactive".
 * - Close existing open-ended bestuursorgaan
 */
async function handleTransitionToInactive(organization, endDate) {
  await closeOpenBestuursorganenInTime(organization.uri, endDate);
  console.log(`Closed open bestuursorganen for ${organization.uuid}`);
}

function isWorshipService(classification) {
  return classification === ORGANIZATION_CLASSIFICATIONS.EB;
}
