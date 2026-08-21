import {
  BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_GROTE_HELFT,
  BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_KLEINE_HELFT,
} from "./config";

/*
  General rule: a worship governing body runs from April 1 (year) to March 31 (year+3).
  Current governing body runs from April 1, 2023 to March 31, 2026.
  Next governing body runs from April 1, 2026 (2023+3) to March 31, 2029 (2026+3), etc.
*/
function computeWorshipPeriod(referenceDate) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();

  const yearOffset = year % 3 - 1;

  // trick to ensure we have a positive modulo value
  const positiveYearOffset = (yearOffset + 3) % 3;

  let startYear;
  let endYear;

  if (positiveYearOffset == 0 && month < 3) {
    startYear = year - 3;
    endYear = year;
  } else {
    startYear = year - positiveYearOffset;
    endYear = year + (3 - positiveYearOffset);
  }

  return {
    startDate: `${startYear}-04-01T00:00:00`,
    endDate: `${endYear}-03-31T00:00:00`
  };
}

/*
  Returns the worship governing body periods we want to materialise for a newly
  registered worship org: the current period plus the next one. Pre-creating the
  next period closes the gap where an org registered mid-cycle would otherwise
  have no orgaan-in-time for the following legislature until a backfill
  migration runs.
  The periods are computed relative to referenceDate (default: today), so
  backdated status transitions land in the legislature of the transition date.
*/
export function getUpcomingWorshipGoverningBodyPeriods(referenceDate = new Date()) {
  const current = computeWorshipPeriod(referenceDate);
  const currentEndYear = parseInt(current.endDate.slice(0, 4), 10);
  const next = {
    startDate: `${currentEndYear}-04-01T00:00:00`,
    endDate: `${currentEndYear + 3}-03-31T00:00:00`,
  };
  return [current, next];
}

/*
  The "grote helft" and "kleine helft" of a bestuur van de eredienst alternate
  every 3-year worship period, e.g. 2026-2029 is "grote helft", 2029-2032 is
  "kleine helft", 2032-2035 is "grote helft" again, etc. 2026 is a known
  anchor: the worship period starting in that year is a "grote helft" period.
  Since periods are 3 years apart, each period flips parity relative to the
  previous one, so periods land back on "grote helft" every other (even)
  year from that 2026 anchor - i.e. whenever the period's start year is even.
*/
export function isGroteHelftPeriod(referenceDate = new Date()) {
  const periodStartYear = parseInt(
    computeWorshipPeriod(referenceDate).startDate.slice(0, 4),
    10
  );

  return periodStartYear % 2 === 0;
}

/**
 * Determine which of the mutually exclusive "grote helft" / "kleine helft"
 * mandates should be shared across the pair of periods being created, based
 * on the earliest of those periods.
 * @param {{startDate: string|Date}} firstPeriod - the earliest period being
 *     materialised in this run.
 * @returns {string} The URI of the applicable helft mandate classification.
 */
export function getApplicableHelftMandate(firstPeriod) {
  return isGroteHelftPeriod(new Date(firstPeriod.startDate))
    ? BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_GROTE_HELFT
    : BESTUURSLID_VAN_HET_BESTUUR_VAN_DE_EREDIENST_KLEINE_HELFT;
}

