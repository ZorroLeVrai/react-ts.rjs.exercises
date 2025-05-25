const NB_SECONDS_PER_DAY = 8 * 3600;
const NB_SECONDS_PER_HOUR = 3600;
const NB_SECONDS_PER_MINUTE = 60;

/**
 * Transforms a time span from the "1d 2h 3m 4s" format to the number of seconds
 * @param {string} timeInStr - time in a "1d 2h 3m 4s" format
 * @returns {number} Time in seconds
 */
export function getTimeValue(timeInStr: string): number {
  let timeInSeconds = 0;
  const timeArr = timeInStr.trim().split(" ");
  for (const timeItem of timeArr) {
    timeInSeconds += getTimeInSeconds(timeItem);
  }

  return timeInSeconds;
}

function getTimeInSeconds(timeNotation: string): number {
  const timeUnit = timeNotation.slice(-1);
  if ("dhms".includes(timeUnit)) {
    const timeFactor = getTimeFactor(timeUnit);
    const numberOfUnits = parseFloat(timeNotation.slice(0, -1));
    return timeFactor * numberOfUnits;
  }

  return parseFloat(timeNotation);
}

/**
 * 
 * @param {number} timeInSeconds - time span in seconds
 * @returns {string} a string representing the timespan in a "1d 2h 3m 4s" format
 */
export function getTimeInFormat(timeInSeconds: number): string {
  /**
   * @type {TimeSecondUnitType[]}
   */
  const timeArr = [
    { seconds: NB_SECONDS_PER_DAY, unit: 'd' },
    { seconds: NB_SECONDS_PER_HOUR, unit: 'h' },
    { seconds: NB_SECONDS_PER_MINUTE, unit: 'm' }
  ];

  let timeNotation = "";
  let arrIndex = 0;
  while (timeInSeconds >= NB_SECONDS_PER_MINUTE) {
    const unitArr = timeArr[arrIndex];
    if (timeInSeconds >= unitArr.seconds) {
      const nbUnits = Math.floor(timeInSeconds / unitArr.seconds);
      timeNotation += `${nbUnits}${unitArr.unit}`;
      timeInSeconds -= nbUnits * unitArr.seconds;
    }

    ++arrIndex;
  }

  if (timeInSeconds > 0)
    timeNotation += `${timeInSeconds}s`;

  return timeNotation;
}

function getTimeFactor(timeUnit: string): number {
  switch (timeUnit) {
    case 'd':
      return NB_SECONDS_PER_DAY;
    case 'h':
      return NB_SECONDS_PER_HOUR;
    case 'm':
      return NB_SECONDS_PER_MINUTE;
    case 's':
      return 1;
    default:
      throw new Error("Invalid Time Unit");
  }
}