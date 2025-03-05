import {
  getDatesWorshipGoverningBody
} from "./utils";

export const START_DATE_NON_WORSHIP_GOVERNING_BODY =
  process.env.START_DATE_NON_WORSHIP_GOVERNING_BODY || "2019-01-01T00:00:00";
export const END_DATE_NON_WORSHIP_GOVERNING_BODY =
  process.env.END_DATE_NON_WORSHIP_GOVERNING_BODY;
export const START_DATE_WORSHIP_GOVERNING_BODY = getDatesWorshipGoverningBody().startDate;
export const END_DATE_WORSHIP_GOVERNING_BODY = getDatesWorshipGoverningBody().endDate;

export const ORGANIZATION_CLASSIFICATIONS = {
  AGB: "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/36a82ba0-7ff1-4697-a9dd-2e94df73b721",
  APB: "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/80310756-ce0a-4a1b-9b8e-7c01b6cc7a2d",
  HULPVERLENINGSZONE:
    "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/ea446861-2c51-45fa-afd3-4e4a37b71562",
  POLITIEZONE:
    "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/a3922c6d-425b-474f-9a02-ffb71a436bfc",
  WELZIJNSVERENIGING:
    "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/e8294b73-87c9-4fa2-9441-1937350763c9",
  // Note: the following 4 UUIDs are chosen by OP, they might need to be changed
  // if upstream ends up using different ones
  AUTONOME_VERZORGINGSINSTELLING:
    "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/34b5af85-dc9f-468f-9e03-ef89b174c267",
  ZIEKENHUISVERENIGING:
    "http://data.vlaanderen.be/id/concept/GeregistreerdeOrganisatieClassificatieCode/82250452-83a0-48f4-89cc-b430320493ce",
  VERENIGING_OF_VENNOOTSCHAP_VOOR_SOCIALE_DIENSTVERLENING:
    "http://data.vlaanderen.be/id/concept/GeregistreerdeOrganisatieClassificatieCode/35833ba2-7371-400b-8df2-2912f66fb153",
  WOONZORGVERENIGING_OF_WOONZORGVENNOOTSCHAP:
    "http://data.vlaanderen.be/id/concept/GeregistreerdeOrganisatieClassificatieCode/82fd21dc-e8bb-4d13-a010-f4a12358ef10",
  DIENSTVERLENENDE_VERENIGING:
    "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/d01bb1f6-2439-4e33-9c25-1fc295de2e71",
  OPDRACHTHOUDENDE_VERENIGING:
    "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/cd93f147-3ece-4308-acab-5c5ada3ec63d",
  OPDRACHTHOUDENDE_VERENIGING_MET_PRIVATE_DEELNAME:
    "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/4b8450cf-a326-4c66-9e63-b4ec10acc7f6",
  PROJECTVERENIGING:
    "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/b156b67f-c5f4-4584-9b30-4c090be02fdc",
  PROVINCIE:
    "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000000",
  GEMEENTE:
    "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000001",
  OCMW: "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000002",
  DISTRICT:
    "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000003",
  VGC: "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/d90c511e-f827-488c-84ba-432c8f69561c",
  EB: "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/66ec74fd-8cfc-4e16-99c6-350b35012e86",
  CB: "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/f9cac08a-13c1-49da-9bcb-f650b0604054",
  PEVA_MUNICIPALITY:
    "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/2ad46df5-5c79-4d67-84d5-604c1377231e",
  PEVA_PROVINCE:
    "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/088784b6-e188-48bf-b94f-94665f9e1f53",
  ASSOCIATION_OTHER:
    "http://data.vlaanderen.be/id/concept/GeregistreerdeOrganisatieClassificatieCode/3e5c8e30-95a7-47b0-b0a4-210d5bd440a7",
  CORPORATION_OTHER:
    "http://data.vlaanderen.be/id/concept/GeregistreerdeOrganisatieClassificatieCode/b9ed22af-3661-4c3e-b07f-b641d80ebf61",
};

////////////////////////////////////////////////////
// START: Governing Body Classification Constants //
////////////////////////////////////////////////////

const BURGEMEESTER                          = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/4955bd72cd0e4eb895fdbfab08da0284";
const GEMEENTERAAD                          = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000005";
const COLLEGE_VAN_BURGEMEESTER_EN_SCHEPENEN = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000006";
const ALGEMEEN_DIRECTEUR                    = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/39854196-f214-4688-87a1-d6ad12baa2fa";
const ADJUNCT_ALGEMEEN_DIRECTEUR            = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/11f0af9e-016c-4e0b-983a-d8bc73804abc";
const FINANCIEEL_DIRECTEUR                  = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/62644b9c-4514-41dd-a660-4c35257f2b35";
const ADJUNCT_FINANCIEEL_DIRECTEUR          = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/ed40469e-3b6f-4f38-99ba-18912ee352b0";

const VOORZITTER_VAN_HET_BIJZONDER_COMITE_VOOR_DE_SOCIALE_DIENST  = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/53c0d8cd-f3a2-411d-bece-4bd83ae2bbc9";
const RAAD_VOOR_MAATSCHAPPELIJK_WELZIJN                           = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000007";
const VAST_BUREAU                                                 = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000008";
const BIJZONDER_COMITE_VOOR_DE_SOCIALE_DIENST                     = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e000009";

const PROVINCIERAAD         = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e00000c";
const GOUVERNEUR            = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/180a2fba-6ca9-4766-9b94-82006bb9c709";
const DEPUTATIE             = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e00000d";
const GRIFFIER              = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab19107-82d2-4273-a986-3da86fda050d";
const FINANCIEEL_BEHEERDER  = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/3e9f22c1-0d35-445b-8a37-494addedf2d8";

const DISTRICTSRAAD         = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e00000a";
const DISTRICTSBURGEMEESTER = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/9314533e-891f-4d84-a492-0338af104065";
const DISTRICTSCOLLEGE      = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5ab0e9b8a3b2ca7c5e00000b";

const RAAD_VAN_BESTUUR          = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/013cc838-173a-4657-b1ae-b00c048df943";
const BEVOEGD_BESLISSINGSORGAAN = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/0dbc70ec-6be9-4997-b8e1-11b6c0542382";
const ALGEMENE_VERGADERING      = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/b52094ff-21a2-4da8-8dbe-f513365d1528";
const LEIDEND_AMBTENAAR         = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/41caf7e6-b040-4720-9cc2-a96cfffed5b4";

const DIRECTIECOMITE            = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/5733254e-73ff-4844-8d43-7afb7ec726e8";
const REGIONAAL_BESTUURSCOMITE  =  "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/17e76b36-64a1-4db1-8927-def3064b4bf1";

const ZONERAAD = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/a9e30e31-0cd2-4f4a-9352-545c5d43be83";

const POLITIERAAD = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/1afce932-53c1-46d8-8aab-90dcc331e67d";

const COLLEGE     = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/7148e12a-ae03-4a7b-bb16-7b6269b84175";
const COLLEGELID  = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/ff20fa3e-806b-4160-b74b-7483fe3a6ecd";

//////////////////////////////////////////////////
// END: Governing Body Classification Constants //
//////////////////////////////////////////////////

////////////////////////////////////////
// START: Worship Units URI Constants //
////////////////////////////////////////

const KERKRAAD        = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/04f65457bf125b2dc59fd71917ac3d08";
const BESTUURSRAAD    = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/90a9ec83cb93b9369bba7ff29d9ce5ce";
const KERKFABRIEKRAAD = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/af811edba97c6ec34874d0830cbb1183";
const COMITE          = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/b475fa47e17a8a05ae04a9e1fb9c9258";

const ROOMSKATHOLIEK_CONCEPT  = "http://lblod.data.gift/concepts/b13d1d623626bc1ee75c7d20bc60e3c0";
const PROTESTANT_CONCEPT      = "http://lblod.data.gift/concepts/e8cba1540b35a32e9cb45126c38c03c6";
const ORTHODOX_CONCEPT        = "http://lblod.data.gift/concepts/84bcd6896f575bae4857ff8d2764bed8";
const ISLAMITISCH_CONCEPT     = "http://lblod.data.gift/concepts/9d8bd472a00bf0a5c7b7186606365a52";
const ANGLICAANS_CONCEPT      = "http://lblod.data.gift/concepts/99536dd6eb0d2ef38a89efafb17e7389";
const ISRAELITISCH_CONCEPT    = "http://lblod.data.gift/concepts/1a1abeafc973d27cebcb2d7a15b2d823";

const CENTRAAL_KERKBESTUUR  = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/0d985699479162198b889f10e4f1a8ce";
const CENTRAAL_BESTUUR      = "http://data.vlaanderen.be/id/concept/BestuursorgaanClassificatieCode/4393389e99127b68e7fc11936ba92e18";

//////////////////////////////////////
// END: Worship Units URI Constants //
//////////////////////////////////////

//////////////////////////////////
// START: Mandate URI Constants //
//////////////////////////////////

const BURGEMEESTER_BESTUURSFUNCTIE  = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e000013";
const AANGEWEZEN_BURGEMEESTER           = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/7b038cc40bba10bec833ecfe6f15bc7a";

const SCHEPEN             = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e000014";
const TOEGEVOEGDE_SCHEPEN = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/59a90e03-4f22-4bb9-8c91-132618db4b38";

const VOORZITTER_VAN_DE_GEMEENTERAAD  = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e000012";
const GEMEENTERAADSLID                = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e000011";

const VOORZITTER_VAN_HET_BIJZONDER_COMITE_VOOR_DE_SOCIALE_DIENST_BESTUURSFUNCTIE = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e00001a";

const VOORZITTER_VAN_HET_VAST_BUREAU  = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e000018";
const LID_VAN_HET_VAST_BUREAU         = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e000017";

const LID_VAN_HET_BIJZONDER_COMITE_VOOR_DE_SOCIALE_DIENST = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e000019";

const VOORZITTER_VAN_DE_RAAD_VOOR_MAATSCHAPPELIJK_WELZIJN = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e00001a";
const LID_VAN_DE_RAAD_VOOR_MAATSCHAPPELIJK_WELZIJN        = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e000015";

const DISTRICTSBURGEMEESTER_BESTUURSFUNCTIE = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e00001d";
const DISTRICTSSCHEPEN                          = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e00001e";

const VOORZITTER_VAN_DE_DISTRICTSRAAD = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e00001c";
const DISTRICTSRAADSLID               = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e00001b";

const GEDEPUTEERDE = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e000020";

const GOUVERNEUR_BESTUURSFUNCTIE = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/d7c00cd1-baf1-4346-83c0-6796c0bedd85";

const VOORZITTER_VAN_DE_PROVINCIERAAD = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e000027";
const PROVINCIERAADSLID               = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ab0e9b8a3b2ca7c5e00001f";

const BESTUURSLID_VAN_RECHTSWEGE_VAN_HET_BESTUUR_VAN_DE_EREDIENST = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5972fccd87f864c4ec06bfbd20b5008b";
const BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_KLEINE_HELFT   = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/2962f0bd-2836-4758-9866-8ce8ea2c536f";
const BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_GROTE_HELFT    = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/a8b5509b-f86b-48f8-94d6-fe463a9b77e3";
const SECRETARIS_VAN_HET_BESTUUR_VAN_DE_EREDIENST                 = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5ac134b9800b81da3c450d6b9605cef2";
const PENNINGMEESTER_VAN_HET_BESTUUR_VAN_DE_EREDIENST             = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/180d13930d6f1a3938e0aa7fa9990002";
const VOORZITTER_VAN_HET_BESTUUR_VAN_DE_EREDIENST                 = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/67e6e585166cd97575b3e17ffc430a43";

const VERTEGENWOORDIGER_AANGESTELD_DOOR_HET_REPRESENTATIEF_ORGAAN_VAN_HET_CENTAAL_BESTUUR_VAN_DE_EREDIENST  = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/6e26e94ea4b127eeb850fb6debe07271";
const EXPERT_VAN_HET_CENTRAAL_BESTUUR_VAN_DE_BESTUUR                                                        = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/8c91c321ad477c4fc372ee36358d3ed4";
const SECRETARIS_VAN_HET_CENTRAAL_BESTUUR_VAN_DE_EREDIENST                                                  = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/e2af0ea1a6af96cfb698ac39ad985eea";
const VOORZITTER_VAN_HET_CENTRAAL_BESTUUR_VAN_DE_EREDIENST                                                  = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/5960262f753661cf84329f3afa9f7df7";
const BESTUURSLID_VAN_HET_CENTRAAL_BESTUUR_VAN_DE_EREDIENST                                                 = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/f848fa3cc2c5fb7c581a116866293925";

const ALGEMEEN_DIRECTEUR_BESTUURSFUNCTIE            = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/39e08271-68db-4282-897f-5cba88c71862";
const ADJUNCT_ALGEMEEN_DIRECTEUR_BESTUURSFUNCTIE    = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/f7b4e17b-6f4e-48e7-a558-bce61669f59a";
const FINANCIEEL_DIRECTEUR_BESTUURSFUNCTIE          = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/6d4cf4dd-2080-4752-8733-d02a036b2df0";
const ADJUNCT_FINANCIEEL_DIRECTEUR_BESTUURSFUNCTIE  = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/3200ffc1-bb72-4235-a81c-64aa578b0789";
const GRIFFIER_BESTUURSFUNCTIE                      = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/63195ec6-02cb-4f86-ac8e-29c5183a11dc";
const FINANCIEEL_BEHEERDER_BESTUURSFUNCTIE          = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/b213c870-c762-4e39-9f78-3abdeda4b64a";
const LEIDEND_AMBTENAAR_BESTUURSFUNCTIE             = "http://data.vlaanderen.be/id/concept/BestuursfunctieCode/855489b9-b584-4f34-90b2-39aea808cd9f";

////////////////////////////////
// END: Mandate URI Constants //
////////////////////////////////

/////////////////////////////////////////
// START: Minister Classification URIs //
/////////////////////////////////////////

const DIAKEN    = "http://lblod.data.gift/concepts/f274cb5a-ba44-4931-a1a8-38ec34513215";
const PRIESTER  = "http://lblod.data.gift/concepts/efbf2ff50b5c4f693f129ac03319c4f2";
const RECTOR    = "http://lblod.data.gift/concepts/04d3b5325f2ebc5eaf96849519af4254";

const EERSTE_IMAM_IN_RANG = "http://lblod.data.gift/concepts/e357bc8f4cc3a694fde2239748768a22";
const TWEEDE_IMAM_IN_RANG = "http://lblod.data.gift/concepts/c4a3fd586211b17b06f574885e23f355";
const DERDE_IMAM_IN_RANG  = "http://lblod.data.gift/concepts/5ebb798bd59c3b48c25116032caa02b7";
const WAARNEMENDE_IMAM    = "http://lblod.data.gift/concepts/7d8e0c15-7726-4196-9416-6dc40ed858bb";

const COORDINATOR         = "http://lblod.data.gift/concepts/ea58c73d9b4fc8a24a4b3eaa73a33995";
const MEDEPASTOOR         = "http://lblod.data.gift/concepts/59837b12c14f215a4efadae950be0072";
const AANGESTELD_PRIESTER = "http://lblod.data.gift/concepts/84b3a2321d1b69b6de782bb04e1a6862";
const PASTOOR             = "http://lblod.data.gift/concepts/5c7fefe1b921dfd4c550924bb7a9331d";

const OFFICIEREND_BEDIENAAR = "http://lblod.data.gift/concepts/17e7177aba2596705ad3c209019c729a";
const RABBIJN               = "http://lblod.data.gift/concepts/27b3d149dd2a726effe749572177682e";

const KAPELAAN = "http://lblod.data.gift/concepts/fa4191f9d7050fe62ec3fc0e16541711";

const PREDIKANT = "http://lblod.data.gift/concepts/83d50e9184ae4a628851370079d162f6";

///////////////////////////////////////
// END: Minister Classification URIs //
///////////////////////////////////////

const gemeente = [
  BURGEMEESTER,
  GEMEENTERAAD,
  COLLEGE_VAN_BURGEMEESTER_EN_SCHEPENEN,
  ALGEMEEN_DIRECTEUR,
  ADJUNCT_ALGEMEEN_DIRECTEUR,
  FINANCIEEL_DIRECTEUR,
  ADJUNCT_FINANCIEEL_DIRECTEUR
];

const ocmw = [
  VOORZITTER_VAN_HET_BIJZONDER_COMITE_VOOR_DE_SOCIALE_DIENST,
  RAAD_VOOR_MAATSCHAPPELIJK_WELZIJN,
  VAST_BUREAU,
  BIJZONDER_COMITE_VOOR_DE_SOCIALE_DIENST,
  ALGEMEEN_DIRECTEUR,
  ADJUNCT_ALGEMEEN_DIRECTEUR,
  FINANCIEEL_DIRECTEUR,
  ADJUNCT_FINANCIEEL_DIRECTEUR
];

const provincie = [
  PROVINCIERAAD,
  GOUVERNEUR,
  DEPUTATIE,
  GRIFFIER,
  FINANCIEEL_BEHEERDER
];

const district = [
  DISTRICTSRAAD,
  DISTRICTSBURGEMEESTER,
  DISTRICTSCOLLEGE
];

const agb = [
  RAAD_VAN_BESTUUR,
  BEVOEGD_BESLISSINGSORGAAN,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const apb = [
  RAAD_VAN_BESTUUR,
  BEVOEGD_BESLISSINGSORGAAN,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const dienstverlenendeVereniging = [
  DIRECTIECOMITE,
  RAAD_VAN_BESTUUR,
  REGIONAAL_BESTUURSCOMITE,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const opdrachthoudendeVereniging = [
  DIRECTIECOMITE,
  RAAD_VAN_BESTUUR,
  REGIONAAL_BESTUURSCOMITE,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const opdrachthoudendeVerenigingMetPrivateDeelname = [
  DIRECTIECOMITE,
  RAAD_VAN_BESTUUR,
  REGIONAAL_BESTUURSCOMITE,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const projectvereniging = [
  DIRECTIECOMITE,
  RAAD_VAN_BESTUUR,
  REGIONAAL_BESTUURSCOMITE,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const hulpverleningszone = [
  ZONERAAD
];

const politiezone = [
  POLITIERAAD
];

const welzijnsvereniging = [
  RAAD_VAN_BESTUUR,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const autonomeVerzorgingsinstelling = [
  RAAD_VAN_BESTUUR,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const ziekenhuisvereniging = [
  RAAD_VAN_BESTUUR,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const vereniging_of_vennootschap_voor_sociale_dienstverlening = [
  RAAD_VAN_BESTUUR,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const woonzorgvereniging_of_woonzorgvennootschap = [
  RAAD_VAN_BESTUUR,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const peva_municipality = [
  RAAD_VAN_BESTUUR,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const peva_province = [
  RAAD_VAN_BESTUUR,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const associationOther = [
  RAAD_VAN_BESTUUR,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const corporationOther = [
  RAAD_VAN_BESTUUR,
  ALGEMENE_VERGADERING,
  LEIDEND_AMBTENAAR
];

const vgc = [
  COLLEGE,
  COLLEGELID
];

const roomsKatholiekEB = [
  KERKRAAD,
];
const protestantEB = [
  BESTUURSRAAD,
];
const orthodoxEB = [
  KERKFABRIEKRAAD,
];
const islamitischEB = [
  COMITE,
];
const anglicaansEB = [
  KERKRAAD,
];
const israelitischEB = [
  BESTUURSRAAD,
];

const worshipService = {
  ROOMSKATHOLIEK_CONCEPT:
    roomsKatholiekEB,
  PROTESTANT_CONCEPT:
    protestantEB,
  ORTHODOX_CONCEPT:
    orthodoxEB,
  ISLAMITISCH_CONCEPT:
    islamitischEB,
  ANGLICAANS_CONCEPT:
    anglicaansEB,
  ISRAELITISCH_CONCEPT:
    israelitischEB,
};

const roomsKatholiekCB = [
  CENTRAAL_KERKBESTUUR,
];
const protestantCB = [
  CENTRAAL_KERKBESTUUR,
];
const orthodoxCB = [
  CENTRAAL_KERKBESTUUR,
];
const islamitischCB = [
  CENTRAAL_BESTUUR,
];
const anglicaansCB = [
  CENTRAAL_KERKBESTUUR,
];
const israelitischCB = [
  CENTRAAL_BESTUUR,
];

const centralWorshipService = {
  ROOMSKATHOLIEK_CONCEPT:
    roomsKatholiekCB,
  PROTESTANT_CONCEPT:
    protestantCB,
  ORTHODOX_CONCEPT:
    orthodoxCB,
  ISLAMITISCH_CONCEPT:
    islamitischCB,
  ANGLICAANS_CONCEPT:
    anglicaansCB,
  ISRAELITISCH_CONCEPT:
    israelitischCB,
};

export const GOVERNING_BODY_CLASSIFICATIONS = {
  [ORGANIZATION_CLASSIFICATIONS.PROVINCIE]:
    provincie,
  [ORGANIZATION_CLASSIFICATIONS.DISTRICT]:
    district,
  [ORGANIZATION_CLASSIFICATIONS.GEMEENTE]:
    gemeente,
  [ORGANIZATION_CLASSIFICATIONS.OCMW]:
    ocmw,
  [ORGANIZATION_CLASSIFICATIONS.AGB]:
    agb,
  [ORGANIZATION_CLASSIFICATIONS.APB]:
    apb,
  [ORGANIZATION_CLASSIFICATIONS.DIENSTVERLENENDE_VERENIGING]:
    dienstverlenendeVereniging,
  [ORGANIZATION_CLASSIFICATIONS.OPDRACHTHOUDENDE_VERENIGING]:
    opdrachthoudendeVereniging,
  [ORGANIZATION_CLASSIFICATIONS.OPDRACHTHOUDENDE_VERENIGING_MET_PRIVATE_DEELNAME]:
    opdrachthoudendeVerenigingMetPrivateDeelname,
  [ORGANIZATION_CLASSIFICATIONS.PROJECTVERENIGING]:
    projectvereniging,
  [ORGANIZATION_CLASSIFICATIONS.HULPVERLENINGSZONE]:
    hulpverleningszone,
  [ORGANIZATION_CLASSIFICATIONS.POLITIEZONE]:
    politiezone,
  [ORGANIZATION_CLASSIFICATIONS.WELZIJNSVERENIGING]:
    welzijnsvereniging,
  [ORGANIZATION_CLASSIFICATIONS.AUTONOME_VERZORGINGSINSTELLING]:
    autonomeVerzorgingsinstelling,
  [ORGANIZATION_CLASSIFICATIONS.ZIEKENHUISVERENIGING]:
    ziekenhuisvereniging,
  [ORGANIZATION_CLASSIFICATIONS.VERENIGING_OF_VENNOOTSCHAP_VOOR_SOCIALE_DIENSTVERLENING]:
    vereniging_of_vennootschap_voor_sociale_dienstverlening,
  [ORGANIZATION_CLASSIFICATIONS.woonzorgvereniging_of_woonzorgvennootschap]:
    woonzorgvereniging_of_woonzorgvennootschap,
  [ORGANIZATION_CLASSIFICATIONS.PEVA_MUNICIPALITY]:
    peva_municipality,
  [ORGANIZATION_CLASSIFICATIONS.PEVA_PROVINCE]:
    peva_province,
  [ORGANIZATION_CLASSIFICATIONS.VGC]:
    vgc,
  [ORGANIZATION_CLASSIFICATIONS.EB]:
    worshipService,
  [ORGANIZATION_CLASSIFICATIONS.CB]:
    centralWorshipService,
  [ORGANIZATION_CLASSIFICATIONS.ASSOCIATION_OTHER]:
    associationOther,
  [ORGANIZATION_CLASSIFICATIONS.CORPORATION_OTHER]:
    corporationOther,
};

export const MANDATE_CLASSIFICATIONS = {
  BURGEMEESTER:
    [
      BURGEMEESTER_BESTUURSFUNCTIE,
      AANGEWEZEN_BURGEMEESTER,
    ],
  COLLEGE_VAN_BURGEMEESTER_EN_SCHEPENEN:
    [
      BURGEMEESTER_BESTUURSFUNCTIE,
      AANGEWEZEN_BURGEMEESTER,
      SCHEPEN,
      TOEGEVOEGDE_SCHEPEN,
    ],
  GEMEENTERAAD:
    [
      VOORZITTER_VAN_DE_GEMEENTERAAD,
      GEMEENTERAADSLID,
    ],
  VOORZITTER_VAN_HET_BIJZONDER_COMITE_VOOR_DE_SOCIALE_DIENST:
    [
      VOORZITTER_VAN_HET_BIJZONDER_COMITE_VOOR_DE_SOCIALE_DIENST_BESTUURSFUNCTIE,
    ],
  VAST_BUREAU:
    [
      VOORZITTER_VAN_HET_VAST_BUREAU,
      LID_VAN_HET_VAST_BUREAU,
    ],
  BIJZONDER_COMITE_VOOR_DE_SOCIALE_DIENST:
    [
      VOORZITTER_VAN_HET_BIJZONDER_COMITE_VOOR_DE_SOCIALE_DIENST_BESTUURSFUNCTIE,
      LID_VAN_HET_BIJZONDER_COMITE_VOOR_DE_SOCIALE_DIENST,
    ],
  RAAD_VOOR_MAATSCHAPPELIJK_WELZIJN:
    [
      VOORZITTER_VAN_DE_RAAD_VOOR_MAATSCHAPPELIJK_WELZIJN,
      LID_VAN_DE_RAAD_VOOR_MAATSCHAPPELIJK_WELZIJN,
    ],
  DISTRICTSBURGEMEESTER:
    [
      DISTRICTSBURGEMEESTER_BESTUURSFUNCTIE,
    ],
  DISTRICTSCOLLEGE:
    [
      DISTRICTSBURGEMEESTER_BESTUURSFUNCTIE,
      DISTRICTSSCHEPEN,
    ],
  DISTRICTSRAAD:
    [
      VOORZITTER_VAN_DE_DISTRICTSRAAD,
      DISTRICTSRAADSLID,
    ],
  DEPUTATIE:
    [
      GEDEPUTEERDE,
    ],
  GOUVERNEUR:
    [
      GOUVERNEUR_BESTUURSFUNCTIE,
    ],
  PROVINCIERAAD:
    [
      VOORZITTER_VAN_DE_PROVINCIERAAD,
      PROVINCIERAADSLID,
    ],
  KERKFABRIEKRAAD:
    [
      BESTUURSLID_VAN_RECHTSWEGE_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
      BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_KLEINE_HELFT,
      BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_GROTE_HELFT,
      SECRETARIS_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
      PENNINGMEESTER_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
      VOORZITTER_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
    ],
  COMITE:
    [
      BESTUURSLID_VAN_RECHTSWEGE_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
      BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_KLEINE_HELFT,
      BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_GROTE_HELFT,
      SECRETARIS_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
      PENNINGMEESTER_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
      VOORZITTER_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
    ],
  KERKRAAD:
    [
      BESTUURSLID_VAN_RECHTSWEGE_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
      BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_KLEINE_HELFT,
      BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_GROTE_HELFT,
      SECRETARIS_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
      PENNINGMEESTER_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
      VOORZITTER_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
    ],
  BESTUURSRAAD:
    [
      BESTUURSLID_VAN_RECHTSWEGE_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
      BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_KLEINE_HELFT,
      BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_GROTE_HELFT,
      SECRETARIS_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
      PENNINGMEESTER_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
      VOORZITTER_VAN_HET_BESTUUR_VAN_DE_EREDIENST,
    ],
  CENTRAAL_KERKBESTUUR:
    [
      VERTEGENWOORDIGER_AANGESTELD_DOOR_HET_REPRESENTATIEF_ORGAAN_VAN_HET_CENTAAL_BESTUUR_VAN_DE_EREDIENST,
      EXPERT_VAN_HET_CENTRAAL_BESTUUR_VAN_DE_BESTUUR,
      SECRETARIS_VAN_HET_CENTRAAL_BESTUUR_VAN_DE_EREDIENST,
      VOORZITTER_VAN_HET_CENTRAAL_BESTUUR_VAN_DE_EREDIENST,
      BESTUURSLID_VAN_HET_CENTRAAL_BESTUUR_VAN_DE_EREDIENST,
    ],
  CENTRAAL_BESTUUR:
    [
      VERTEGENWOORDIGER_AANGESTELD_DOOR_HET_REPRESENTATIEF_ORGAAN_VAN_HET_CENTAAL_BESTUUR_VAN_DE_EREDIENST,
      EXPERT_VAN_HET_CENTRAAL_BESTUUR_VAN_DE_BESTUUR,
      SECRETARIS_VAN_HET_CENTRAAL_BESTUUR_VAN_DE_EREDIENST,
      VOORZITTER_VAN_HET_CENTRAAL_BESTUUR_VAN_DE_EREDIENST,
      BESTUURSLID_VAN_HET_CENTRAAL_BESTUUR_VAN_DE_EREDIENST,
    ],
};

export const PREFIXES = `
    PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
    PREFIX org: <http://www.w3.org/ns/org#>
    PREFIX ere: <http://data.lblod.info/vocabularies/erediensten/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX besluit: <http://data.vlaanderen.be/ns/besluit#>
    PREFIX mandaat: <http://data.vlaanderen.be/ns/mandaat#>
    PREFIX generiek: <https://data.vlaanderen.be/ns/generiek#>
    PREFIX lblodlg: <http://data.lblod.info/vocabularies/leidinggevenden/>
`;

export const BESTUURSFUNCTIE_CLASSIFICATIONS = {
  ALGEMEEN_DIRECTEUR:
    [
      ALGEMEEN_DIRECTEUR_BESTUURSFUNCTIE,
    ],
  ADJUNCT_ALGEMEEN_DIRECTEUR:
    [
      ADJUNCT_ALGEMEEN_DIRECTEUR_BESTUURSFUNCTIE,
    ],
  FINANCIEEL_DIRECTEUR:
    [
      FINANCIEEL_DIRECTEUR_BESTUURSFUNCTIE,
    ],
  ADJUNCT_FINANCIEEL_DIRECTEUR:
    [
      ADJUNCT_FINANCIEEL_DIRECTEUR_BESTUURSFUNCTIE,
    ],
  GRIFFIER:
    [
      GRIFFIER_BESTUURSFUNCTIE,
    ],
  FINANCIEEL_BEHEERDER:
    [
      FINANCIEEL_BEHEERDER_BESTUURSFUNCTIE,
    ],
  LEIDEND_AMBTENAAR:
    [
      LEIDEND_AMBTENAAR_BESTUURSFUNCTIE,
    ],
};

export const MINISTER_CLASSIFICATIONS = {
  ORTHODOX_CONCEPT: [
    DIAKEN,
    PRIESTER,
    RECTOR,
  ],
  ISLAMITISCH_CONCEPT: [
    EERSTE_IMAM_IN_RANG,
    TWEEDE_IMAM_IN_RANG,
    DERDE_IMAM_IN_RANG,
    WAARNEMENDE_IMAM,
  ],
  ROOMSKATHOLIEK_CONCEPT: [
    COORDINATOR,
    MEDEPASTOOR,
    AANGESTELD_PRIESTER,
    PASTOOR,
  ],
  ISRAELITISCH_CONCEPT: [
    OFFICIEREND_BEDIENAAR,
    RABBIJN,
  ],
  ANGLICAANS_CONCEPT: [
    KAPELAAN,
  ],
  PROTESTANT_CONCEPT: [
    PREDIKANT,
  ],
};
