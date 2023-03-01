import {
  sparqlEscapeString,
  sparqlEscapeUri,
  sparqlEscapeDateTime,
  uuid,
} from "mu";
import { querySudo as query, updateSudo as update } from "@lblod/mu-auth-sudo";
import { PREFIXES, UNIT_GRAPH, WORSHIP_GRAPH } from "./config";

export async function getAdministrativeUnitDetails(administrativeUnitdUuid) {
  // prettier-ignore
  const result = await query(`
    ${PREFIXES}

    SELECT DISTINCT ?graph ?administrativeUnit ?classification ?religionType WHERE {
      GRAPH ?graph {
        ?administrativeUnit mu:uuid ${sparqlEscapeString(administrativeUnitdUuid)} ;
          org:classification ?classification .

        OPTIONAL { ?administrativeUnit ere:typeEredienst ?religionType . }
        FILTER (?graph in (${sparqlEscapeUri(UNIT_GRAPH)}, ${sparqlEscapeUri(WORSHIP_GRAPH)}))
      }
    }
    LIMIT 1
  `);

  if (result.results.bindings.length) {
    return {
      uri: result.results.bindings[0].administrativeUnit.value,
      graph: result.results.bindings[0].graph.value,
      uuid: administrativeUnitdUuid,
      classification: result.results.bindings[0].classification.value,
      religionType: result.results.bindings[0].religionType
        ? result.results.bindings[0].religionType.value
        : null,
    };
  } else {
    console.log(
      `Details not found for administrative unit with uuid ${administrativeUnitdUuid}.`
    );
    return null;
  }
}

export async function createGoverningBody(administrativeUnit, classification) {
  const id = uuid();
  const uri = `http://data.lblod.info/id/bestuursorganen/${id}`;

  // prettier-ignore
  await update(`
    ${PREFIXES}

    INSERT {
      GRAPH ${sparqlEscapeUri(administrativeUnit.graph)} {
        ${sparqlEscapeUri(uri)} a besluit:Bestuursorgaan ;
          mu:uuid ${sparqlEscapeString(id)} ;
          skos:prefLabel ?governingBodyLabel ;
          besluit:bestuurt ${sparqlEscapeUri(administrativeUnit.uri)} ;
          org:classification ${sparqlEscapeUri(classification)} .
      }
    } WHERE {
        ?administrativeUnit mu:uuid ${sparqlEscapeString(administrativeUnit.uuid)} ;
          skos:prefLabel ?administrativeUnitLabel .

        ${sparqlEscapeUri(classification)} skos:prefLabel ?classificationLabel .
      BIND(CONCAT(?classificationLabel, " ", ?administrativeUnitLabel) as ?governingBodyLabel)
    }
  `);

  return uri;
}

export async function createGoverningBodyInTime(
  graph,
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

  await update(`
    ${PREFIXES}

    INSERT DATA {
      GRAPH ${sparqlEscapeUri(graph)} {
        ${sparqlEscapeUri(uri)} a besluit:Bestuursorgaan ;
          mu:uuid ${sparqlEscapeString(id)} ;
          generiek:isTijdspecialisatieVan ${sparqlEscapeUri(governingBody)} ;
          mandaat:bindingStart ${sparqlEscapeDateTime(startDate)} .

        ${endDateTriple}
      }
    }
  `);

  return uri;
}

export async function createMandate(
  graph,
  classification,
  governingBodiesInTime
) {
  const id = uuid();
  const uri = `http://data.lblod.info/id/mandaten/${id}`;

  const linksToGoverningBodies = governingBodiesInTime
    .map((governingBodyInTime) => {
      return `${sparqlEscapeUri(
        governingBodyInTime
      )} org:hasPost ${sparqlEscapeUri(uri)} .\n`;
    })
    .join("");

  await update(`
    ${PREFIXES}

    INSERT DATA {
      GRAPH ${sparqlEscapeUri(graph)} {
        ${linksToGoverningBodies}

        ${sparqlEscapeUri(uri)} a mandaat:Mandaat ;
          mu:uuid ${sparqlEscapeString(id)} ;
          org:role ${sparqlEscapeUri(classification)} .
      }
    }
  `);

  return uri;
}

export async function createBestuursfunctie(
  graph,
  classification,
  governingBodyInTime
) {
  const id = uuid();
  const uri = `http://data.lblod.info/id/bestuursfuncties/${id}`;

  // prettier-ignore
  await update(`
    ${PREFIXES}

    INSERT DATA {
      GRAPH ${sparqlEscapeUri(graph)} {
        ${sparqlEscapeUri(governingBodyInTime)} lblodlg:heeftBestuursfunctie ${sparqlEscapeUri(uri)} .

        ${sparqlEscapeUri(uri)} a lblodlg:Bestuursfunctie ;
          mu:uuid ${sparqlEscapeString(id)} ;
          org:role ${sparqlEscapeUri(classification)} .
      }
    }
  `);

  return uri;
}

export async function createMinister(
  graph,
  classification,
  administrativeUnit
) {
  const id = uuid();
  const uri = `http://data.lblod.info/id/positiesBedienaar/${id}`;

  // prettier-ignore
  await update(`
    ${PREFIXES}

    INSERT DATA {
      GRAPH ${sparqlEscapeUri(graph)} {
        ${sparqlEscapeUri(administrativeUnit)} ere:wordtBediendDoor ${sparqlEscapeUri(uri)} .

        ${sparqlEscapeUri(uri)} a org:Post, ere:PositieBedienaar ;
          mu:uuid ${sparqlEscapeString(id)} ;
          ere:functie ${sparqlEscapeUri(classification)} .
      }
    }
  `);

  return uri;
}
