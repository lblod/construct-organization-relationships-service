/* 
  General rule: governing body runs from April 1 (year) to March 31 (year+3).
  Current governing body runs from April 1, 2023 to March 31, 2026.
  Next governing body runs from April 1, 2026 (2023+3) to March 31, 2029 (2026+3), etc.
*/
export function getDatesWorshipGoverningBody() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  
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

  const startDate = `${startYear}-04-01T00:00:00`;
  const endDate = `${endYear}-03-31T00:00:00`;

  return {
    startDate,
    endDate
  }
}
