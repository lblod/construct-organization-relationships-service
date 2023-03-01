import {
  getAdministrativeUnitDetails,
  createGoverningBody,
  createGoverningBodyInTime,
  createMandate,
  createBestuursfunctie,
  createMinister,
} from "./queries";
import {
  ADMIN_UNIT_CLASSIFICATIONS,
  GOVERNING_BODY_CLASSIFICATIONS,
  START_DATE_NON_WORSHIP_GOVERNING_BODY,
  END_DATE_NON_WORSHIP_GOVERNING_BODY,
  START_DATE_WORSHIP_GOVERNING_BODY,
  END_DATE_WORSHIP_GOVERNING_BODY,
  MANDATE_CLASSIFICATIONS,
  BESTUURSFUNCTIE_CLASSIFICATIONS,
  MINISTER_CLASSIFICATIONS,
} from "./config";

export async function createAdministrativeUnitdRelationships(
  administrativeUnitdUuid
) {
  const administrativeUnit = await getAdministrativeUnitDetails(
    administrativeUnitdUuid
  );

  if (administrativeUnit) {
    const governingBodies = await createGoverningBodies(administrativeUnit);
    const governingBodiesInfo = await createGoverningBodiesInTime(
      administrativeUnit,
      governingBodies
    );

    await createMandates(administrativeUnit.graph, governingBodiesInfo);

    if (isWorshipService(administrativeUnit.classification)) {
      // Ministers only apply to worship services
      await createMinisters(administrativeUnit);
    } else if (
      !isWorshipAdministrativeUnit(administrativeUnit.classification)
    ) {
      // Bestuursfuncties currently only apply to non worship admin units, might change in the future
      await createBestuursfuncties(
        administrativeUnit.graph,
        governingBodiesInfo
      );
    }
  }
}

async function createGoverningBodies(administrativeUnit) {
  const governingBodyClassifications = await getGoverningBodyClassifications(
    administrativeUnit
  );

  let governingBodies = [];
  for (let classification of governingBodyClassifications) {
    const uri = await createGoverningBody(administrativeUnit, classification);
    governingBodies.push({
      uri,
      classification,
    });
  }

  return governingBodies;
}

async function createGoverningBodiesInTime(
  administrativeUnit,
  governingBodies
) {
  let startDate;
  let endDate;

  if (isWorshipAdministrativeUnit(administrativeUnit.classification)) {
    startDate = START_DATE_WORSHIP_GOVERNING_BODY;
    endDate = END_DATE_WORSHIP_GOVERNING_BODY;
  } else {
    startDate = START_DATE_NON_WORSHIP_GOVERNING_BODY;
    endDate = END_DATE_NON_WORSHIP_GOVERNING_BODY;
  }

  let governingBodiesInfo = [];
  for (let governingBody of governingBodies) {
    const governingBodyInTime = await createGoverningBodyInTime(
      administrativeUnit.graph,
      governingBody.uri,
      startDate,
      endDate
    );
    governingBodiesInfo.push({
      administrativeUnit,
      governingBody,
      governingBodyInTime,
    });
  }

  return governingBodiesInfo;
}

async function createMandates(graph, governingBodiesInfo) {
  let mandatesToCreate = [];

  governingBodiesInfo.forEach((governingBodyInfo) => {
    const governingBody = governingBodyInfo.governingBody;
    const governingBodyInTime = governingBodyInfo.governingBodyInTime;

    const mandatesClassifications = getMandateClassifications(
      governingBody.classification
    );

    // A mandate can be shared between multiple governing bodies of different classifications of an administrative unit.
    // Ex. the Burgemeester mandate is shared between the Gemeente and the College van Burgemeester & Schepenen
    // So we construct an object indicating which mandates should apply to which governing bodies.
    if (mandatesClassifications) {
      mandatesClassifications.forEach((mandateClassification) => {
        const mandateWithSameClassification = mandatesToCreate.find(
          (mandate) => mandate.classification == mandateClassification
        );

        if (mandateWithSameClassification) {
          mandateWithSameClassification.governingBodiesInTime.push(
            governingBodyInTime
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
      graph,
      mandateToCreate.classification,
      mandateToCreate.governingBodiesInTime
    );
  }
}

async function createBestuursfuncties(graph, governingBodiesInfo) {
  for (let governingBodyInfo of governingBodiesInfo) {
    const bestuursfunctieClassifications = getBestuursfunctieClassifications(
      governingBodyInfo.governingBody.classification
    );

    if (bestuursfunctieClassifications) {
      for (let bestuursfunctieClassification of bestuursfunctieClassifications) {
        await createBestuursfunctie(
          graph,
          bestuursfunctieClassification,
          governingBodyInfo.governingBodyInTime
        );
      }
    }
  }
}

async function createMinisters(administrativeUnit) {
  const ministerClassifications =
    MINISTER_CLASSIFICATIONS[administrativeUnit.religionType];

  for (let ministerClassification of ministerClassifications) {
    await createMinister(
      administrativeUnit.graph,
      ministerClassification,
      administrativeUnit.uri
    );
  }
}

// ---------------- UTILS ----------------

function isWorshipAdministrativeUnit(classification) {
  return (
    classification == ADMIN_UNIT_CLASSIFICATIONS.EB ||
    classification == ADMIN_UNIT_CLASSIFICATIONS.CB
  );
}

function isWorshipService(classification) {
  return classification == ADMIN_UNIT_CLASSIFICATIONS.EB;
}

function getGoverningBodyClassifications(administrativeUnit) {
  let governingBodyClassifications =
    GOVERNING_BODY_CLASSIFICATIONS[administrativeUnit.classification];

  if (isWorshipAdministrativeUnit(administrativeUnit.classification)) {
    governingBodyClassifications =
      governingBodyClassifications[administrativeUnit.religionType];
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
