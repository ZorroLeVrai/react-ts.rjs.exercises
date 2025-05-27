import { TaskStatus } from "../taskStatus";

export const statusMap = new Map<string, string>();
statusMap.set(TaskStatus.NOT_STARTED, "not_started");
statusMap.set(TaskStatus.IN_PROGRESS, "in_progress");
statusMap.set(TaskStatus.PAUSED, "paused");
statusMap.set(TaskStatus.COMPLETED, "completed");

/**
 * Returns a description for a given status symbol.
 * @param {string} statusSymbol - Status name
 * @returns {string} a description for the status
 */
export function getStatusName(statusSymbol: string): string {
  const statusDescribtion = statusMap.get(statusSymbol);
  return statusDescribtion ?? "";
}

/**
 * Generate id numbers
 * @generator
 * @yields {number}
 * @returns {Generator<number>}
 */
function* createIdGenerator() {
  let index = 0;
  while (true) {
    yield ++index;
  }
}

/**
 * @type {Generator<number>}
 */
export const idGenerator = createIdGenerator();
