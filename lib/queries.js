import {
  sparqlEscapeString,
  sparqlEscapeUri,
  sparqlEscapeDateTime,
  query,
  update,
  uuid,
} from "mu";
import { PREFIXES } from "./config";

/**
 * Retrieve the necessary details for an organization from the triplestore.
 * @typedef {object} OrganizationDetails
 * @property {string} uri - the URI of the organization.
 * @property {string} uuid - the UUID of the organization.
 * @property {string} classification - the URI of the organization's
 *     classification code.
 * @property {string} [religionType|null] - If it is a worship administrative
 *     unit, the URI of the recognized worship type.
 *
 * @param {string} organizationUuid - the UUID of the organization to query for.
 * @returns {Promise<OrganizationDetails | null>} The details for the
 *     organization retrieved from the triplestore, null if no organization was
 *     found for the given UUID.
 */
export async function getOrganizationDetails(organizationUuid) {
  // prettier-ignore
  const result = await query(`
    ${PREFIXES}

    SELECT DISTINCT ?organization ?classification ?religionType WHERE {
      ?organization mu:uuid ${sparqlEscapeString(organizationUuid)} ;
        org:classification ?classification .

      OPTIONAL { ?organization ere:typeEredienst ?religionType . }
    }
    LIMIT 1
  `);

  if (result.results.bindings.length) {
    return {
      uri: result.results.bindings[0].organization.value,
      uuid: organizationUuid,
      classification: result.results.bindings[0].classification.value,
      religionType: result.results.bindings[0].religionType
        ? result.results.bindings[0].religionType.value
        : null,
    };
  } else {
    console.log(
      `Details not found for organization with UUID ${organizationUuid}.`,
    );
    return null;
  }
}

/**
 * Create a governing body of the given classification type that governs the
 * provided organization.
 * @param {OrganizationDetails} organization - the organization for which to
 *     create a governing body.
 * @param {string} classification - the URI of the classification that should be
 *     assigned to the created governing body.
 * @returns {Promise<string>} the URI of the newly created governing body.
 * @throws {Error} When a non-existing classification was provided.
 */
export async function createGoverningBody(organization, classification) {
  const id = uuid();
  const uri = `http://data.lblod.info/id/bestuursorganen/${id}`;

  // prettier-ignore
  let result = await query(`
       ${PREFIXES}

       SELECT DISTINCT ?classificationLabel WHERE {
         ${sparqlEscapeUri(classification)} skos:prefLabel ?classificationLabel .
       }
  `);

  if (result.results.bindings.length) {
    let classificationLabel =
      result.results.bindings[0].classificationLabel.value;

    // prettier-ignore
    await update(`
    ${PREFIXES}

    INSERT {
      ${sparqlEscapeUri(uri)} a besluit:Bestuursorgaan ;
        mu:uuid ${sparqlEscapeString(id)} ;
        skos:prefLabel ?governingBodyLabel ;
        besluit:bestuurt ${sparqlEscapeUri(organization.uri)} ;
        org:classification ${sparqlEscapeUri(classification)} .
    } WHERE {
      ?organization mu:uuid ${sparqlEscapeString(organization.uuid)} ;
        skos:prefLabel ?organizationLabel .

      BIND(CONCAT(${sparqlEscapeString(classificationLabel)}, " ", ?organizationLabel) as ?governingBodyLabel)
    }
  `);

    return uri;
  } else {
    throw Error(`classificationLabel not found for ${classification}`);
  }
}

/**
 * Create a time specialisation of a given governing body.
 * @param {string} governingBody - the URI of the governing body to specialise.
 * @param {string} startDate - the starting date and time for the new governing
 *     body.
 * @param {string} [endDate] - the optional end data and time for the new
 *     governing body.
 * @returns {Promise<string>} the URI of the newly created time specialised
 *     governing body.
 */
export async function createGoverningBodyInTime(
  governingBody,
  startDate,
  endDate
) {
  const id = uuid();
  const uri = `http://data.lblod.info/id/bestuursorganen/${id}`;

  const endDateTriple = endDate
    ? `${sparqlEscapeUri(uri)} mandaat:bindingEinde ${sparqlEscapeDateTime(
        endDate
      )} ;`
    : "";

  // prettier-ignore
  await update(`
    ${PREFIXES}

    INSERT DATA {
      ${sparqlEscapeUri(uri)} a besluit:Bestuursorgaan ;
        mu:uuid ${sparqlEscapeString(id)} ;
        generiek:isTijdspecialisatieVan ${sparqlEscapeUri(governingBody)} ;
        mandaat:bindingStart ${sparqlEscapeDateTime(startDate)} .

      ${endDateTriple}
    }
  `);

  return uri;
}

/**
 * Create a new mandate with the given role for one or more time-specialised
 * governing bodies.
 * @param {string} role - the URI of the role for the new mandate.
 * @param {string[]} governingBodiesInTime - the URIs of the governing bodies
 *     for which to create the mandate.
 * @returns {Promise<string>} The URI of the newly created mandate.
 */
export async function createMandate(role, governingBodiesInTime) {
  const id = uuid();
  const uri = `http://data.lblod.info/id/mandaten/${id}`;

  const linksToGoverningBodies = governingBodiesInTime
    .map((governingBodyInTime) => {
      return `${sparqlEscapeUri(
        governingBodyInTime
      )} org:hasPost ${sparqlEscapeUri(uri)} .\n`;
    })
    .join("");

  // prettier-ignore
  await update(`
    ${PREFIXES}

    INSERT DATA {
      ${linksToGoverningBodies}

      ${sparqlEscapeUri(uri)} a mandaat:Mandaat ;
        mu:uuid ${sparqlEscapeString(id)} ;
        org:role ${sparqlEscapeUri(role)} .
    }
  `);

  return uri;
}

/**
 * Create a new bestuursfunctie, with a given role, for the provided
 * time-specialised governing body.
 * @param {string} role - the URI of the role for the new bestuursfunctie.
 * @param {string} governingBodyInTime - the URI of the governing body of the
 *     related governing body.
 * @returns {Promise<string>} The URI of the newly created bestuursfunctie
 *     resource.
 */
export async function createBestuursfunctie(role, governingBodyInTime) {
  const id = uuid();
  const uri = `http://data.lblod.info/id/bestuursfuncties/${id}`;

  // prettier-ignore
  await update(`
    ${PREFIXES}

    INSERT DATA {
      ${sparqlEscapeUri(governingBodyInTime)} lblodlg:heeftBestuursfunctie ${sparqlEscapeUri(uri)} .

      ${sparqlEscapeUri(uri)} a lblodlg:Bestuursfunctie ;
        mu:uuid ${sparqlEscapeString(id)} ;
        org:role ${sparqlEscapeUri(role)} .
    }
  `);

  return uri;
}

/**
 * Create a new minister resource, with the given role, for the provided
 * organization.
 * @param {string} role - the URI of the role for the new minister.
 * @param {string} organization - the URI of the related organization.
 * @returns {Promise<string>} The URI of the newly created minister resource.
 */
export async function createMinister(role, organization) {
  const id = uuid();
  const uri = `http://data.lblod.info/id/positiesBedienaar/${id}`;

  // prettier-ignore
  await update(`
    ${PREFIXES}

    INSERT DATA {
      ${sparqlEscapeUri(organization)} ere:wordtBediendDoor ${sparqlEscapeUri(uri)} .

      ${sparqlEscapeUri(uri)} a org:Post, ere:PositieBedienaar ;
        mu:uuid ${sparqlEscapeString(id)} ;
        ere:functie ${sparqlEscapeUri(role)} .
    }`);

  return uri;
}
