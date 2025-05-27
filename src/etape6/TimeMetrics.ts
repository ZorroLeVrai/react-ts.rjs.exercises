export default class TimeMetrics {
  total: number;
  remaining: number;

  constructor(total: number, remaining: number) {
    this.total = total;
    this.remaining = remaining;
  }

  add(otherTimeMetrics: TimeMetrics): TimeMetrics {
    this.total += otherTimeMetrics.total;
    this.remaining += otherTimeMetrics.remaining;
    return this;
  }
}
