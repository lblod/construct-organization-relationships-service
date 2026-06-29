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

export function getDatesWorshipGoverningBody() {
  return computeWorshipPeriod(new Date());
}

/*
  Returns the worship governing body periods we want to materialise for a newly
  registered worship org: the current period plus the next one. Pre-creating the
  next period closes the gap where an org registered mid-cycle would otherwise
  have no orgaan-in-time for the following legislature until a backfill
  migration runs.
*/
export function getUpcomingWorshipGoverningBodyPeriods() {
  const current = getDatesWorshipGoverningBody();
  const currentEndYear = parseInt(current.endDate.slice(0, 4), 10);
  const next = {
    startDate: `${currentEndYear}-04-01T00:00:00`,
    endDate: `${currentEndYear + 3}-03-31T00:00:00`,
  };
  return [current, next];
}

/*
  Returns the worship governing body period for a worship service in oprichting
*/
export function getInOprichtingWorshipGoverningBodyPeriod() {
  let current = getDatesWorshipGoverningBody();
  current.endDate = undefined;
  return [current];
}
