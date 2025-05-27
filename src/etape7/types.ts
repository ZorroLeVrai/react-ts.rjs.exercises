export interface MousePosition {
  x: number;
  y: number;
}

export interface TaskType {
  id?: number | void;
  totalTime: string;
  timeToComplete: string;
  taskStatus: string;
  taskName: string;
}
