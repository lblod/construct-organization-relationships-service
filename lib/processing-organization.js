import {
  getOrganizationDetails,
  createGoverningBody,
  createGoverningBodyInTime,
  createMandate,
  createBestuursfunctie,
  createMinister,
} from "./queries";
import {
  ORGANIZATION_CLASSIFICATIONS,
  GOVERNING_BODY_CLASSIFICATIONS,
  START_DATE_NON_WORSHIP_GOVERNING_BODY,
  END_DATE_NON_WORSHIP_GOVERNING_BODY,
  MANDATE_CLASSIFICATIONS,
  BESTUURSFUNCTIE_CLASSIFICATIONS,
  MINISTER_CLASSIFICATIONS,
} from "./config";
import { getUpcomingWorshipGoverningBodyPeriods } from "./utils";

/**
 * Create the necessary relationships for the organization resource associated
 * with the given UUID.
 * @param {string} organizationUuid - the UUID of the identifying the
 *     organization for which to create the necessary relationships.
 */
export async function createOrganizationRelationships(organizationUuid) {
  const organization = await getOrganizationDetails(organizationUuid);

  if (!organization) return;

  const governingBodies = await createGoverningBodies(organization);

  // Worship orgs get both the current and the next 3-year period materialised
  // so a mid-cycle registration doesn't leave an orgaan-in-time gap for the
  // next legislature. Non-worship orgs keep the single open-ended period.
  const periods = isWorshipAdministrativeUnit(organization.classification)
    ? getUpcomingWorshipGoverningBodyPeriods()
    : [{
        startDate: START_DATE_NON_WORSHIP_GOVERNING_BODY,
        endDate: END_DATE_NON_WORSHIP_GOVERNING_BODY,
      }];

  for (const period of periods) {
    const governingBodiesInfo = await createGoverningBodiesInTime(
      governingBodies,
      period,
    );

    await createMandates(governingBodiesInfo);

    if (!isWorshipAdministrativeUnit(organization.classification)) {
      // Bestuursfuncties currently only apply to non worship organizations,
      // might change in the future
      await createBestuursfuncties(governingBodiesInfo);
    }
  }

  if (isWorshipService(organization.classification)) {
    // Ministers only apply to worship services and live at the organization
    // level (not per period).
    await createMinisters(organization);
  }
}

/**
 * Create the necessary governing bodies for the given organization.
 * @typedef {object} GoverningBodyInfo
 * @property {string} uri - The URI of the governing body resource.
 * @property {string} classification - The URI of the classification of the
 *     governing body.
 *
 * @param {import("./queries").OrganizationDetails} organization - the
 *     information on the organization for which to create governing bodies.
 * @returns {Promise<GoverningBodyInfo>} The URIs and classifications of the
 *     created governing body resources.
 */
async function createGoverningBodies(organization) {
  const governingBodyClassifications =
    getGoverningBodyClassifications(organization);

  let governingBodies = [];
  for (let classification of governingBodyClassifications) {
    const uri = await createGoverningBody(organization, classification);
    governingBodies.push({
      uri,
      classification,
    });
  }

  return governingBodies;
}

/**
 * Create time-specialised instances for the provided governing bodies in the
 * given period.
 * @typedef {object} GoverningBodyInTimeInfo
 * @property {GoverningBodyInfo} governingBody - The untimed governing body.
 * @property {string} governingBodyInTime - The URI of a time-specialised
 *     governing body resource.
 *
 * @param {GoverningBodyInfo[]} governingBodies - the governing bodies for which
 *     to create time specialisations.
 * @param {{startDate: string, endDate?: string}} period - the period to
 *     materialise.
 * @returns {Promise<GoverningBodyInTimeInfo[]>} The information on the created
 *     time-specialised governing body resources.
 */
async function createGoverningBodiesInTime(governingBodies, period) {
  let governingBodiesInfo = [];
  for (let governingBody of governingBodies) {
    const governingBodyInTime = await createGoverningBodyInTime(
      governingBody.uri,
      period.startDate,
      period.endDate,
    );
    governingBodiesInfo.push({
      governingBody,
      governingBodyInTime,
    });
  }

  return governingBodiesInfo;
}

/**
 * Create the necessary mandates for a governing body. For each provided
 * time-specialised governing body, the appropriate mandates are created. For
 * governing bodies that have a classification with which no mandates are
 * associated, nothing happens.
 * @param {GoverningBodyInTimeInfo[]} governingBodiesInfo - the information on
 *     the governing bodies for which to create mandates.
 */
async function createMandates(governingBodiesInfo) {
  let mandatesToCreate = [];

  governingBodiesInfo.forEach((governingBodyInfo) => {
    const governingBody = governingBodyInfo.governingBody;
    const governingBodyInTime = governingBodyInfo.governingBodyInTime;

    const mandatesClassifications = getMandateClassifications(
      governingBody.classification,
    );

    // A mandate can be shared between multiple governing bodies of different
    // classifications of an organizations.
    // For example, the Burgemeester mandate is shared between the Gemeente and
    // the College van Burgemeester & Schepenen.
    // So, we construct an object indicating which mandates should apply to which
    // governing bodies.
    if (mandatesClassifications) {
      mandatesClassifications.forEach((mandateClassification) => {
        const mandateWithSameClassification = mandatesToCreate.find(
          (mandate) => mandate.classification === mandateClassification,
        );

        if (mandateWithSameClassification) {
          mandateWithSameClassification.governingBodiesInTime.push(
            governingBodyInTime,
          );
        } else {
          mandatesToCreate.push({
            classification: mandateClassification,
            governingBodiesInTime: [governingBodyInTime],
          });
        }
      });
    }
  });

  for (let mandateToCreate of mandatesToCreate) {
    await createMandate(
      mandateToCreate.classification,
      mandateToCreate.governingBodiesInTime,
    );
  }
}

/**
 * Create bestuursfuncties for the provided governing bodies. For each specified
 * time-specialised governing body, the appropriate bestuursfuncties are created
 * based on the classification of the corresponding untimed governing body. For
 * governing bodies that have a classification with which no bestuursfuncties
 * are associated, nothing happens.
 * @param {GoverningBodyInTimeInfo[]} governingBodiesInfo - the information on
 *     the time-specialised governing bodies for which bestuursfuncties must be
 *     created.
 */
async function createBestuursfuncties(governingBodiesInfo) {
  for (let governingBodyInfo of governingBodiesInfo) {
    const bestuursfunctieClassifications = getBestuursfunctieClassifications(
      governingBodyInfo.governingBody.classification,
    );

    if (bestuursfunctieClassifications) {
      for (let bestuursfunctieClassification of bestuursfunctieClassifications) {
        await createBestuursfunctie(
          bestuursfunctieClassification,
          governingBodyInfo.governingBodyInTime,
        );
      }
    }
  }
}

/**
 * Create the necessary ministers for the provided organization. The exact
 * minister resources created depends on the classification of the provided
 * organization. If the provided organization has no religion type, nothing
 * happens.
 * @param {import("./queries").OrganizationDetails} organization - the
 *     organization for which to create minister resources.
 */
async function createMinisters(organization) {
  const ministerClassifications =
    MINISTER_CLASSIFICATIONS[organization.religionType];

  for (let ministerClassification of ministerClassifications) {
    await createMinister(ministerClassification, organization.uri);
  }
}

// ---------------- UTILS ----------------

function isWorshipAdministrativeUnit(classification) {
  return (
    classification == ORGANIZATION_CLASSIFICATIONS.EB ||
    classification == ORGANIZATION_CLASSIFICATIONS.CB
  );
}

function isWorshipService(classification) {
  return classification == ORGANIZATION_CLASSIFICATIONS.EB;
}

/**
 * Retrieve the classifications for the governing bodies that are needed for the
 * kind of organization that is provided.
 * @param {import("./queries").OrganizationDetails} organization - the
 *     details on the organization for which the governing body classifications
 *     are needed.
 * @returns {string[]} The URIs of the governing body classifications for the
 *     provided kind of organization.
 */
function getGoverningBodyClassifications(organization) {
  let governingBodyClassifications =
    GOVERNING_BODY_CLASSIFICATIONS[organization.classification];

  if (isWorshipAdministrativeUnit(organization.classification)) {
    governingBodyClassifications =
      governingBodyClassifications[organization.religionType];
  }

  return governingBodyClassifications;
}

function getMandateClassifications(governingBodyClassification) {
  let mandateClassifications =
    MANDATE_CLASSIFICATIONS[governingBodyClassification];

  return mandateClassifications;
}

function getBestuursfunctieClassifications(governingBodyClassification) {
  let bestuursfunctieClassifications =
    BESTUURSFUNCTIE_CLASSIFICATIONS[governingBodyClassification];

  return bestuursfunctieClassifications;
}
