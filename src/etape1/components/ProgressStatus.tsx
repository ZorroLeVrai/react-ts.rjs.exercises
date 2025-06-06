import { getStatusName } from '../taskTools';
import { TaskStatus } from '../../taskStatus';
import styles from "./ProgressStatus.module.css";
import { composeStyles } from '../../tools';

interface ProgressStatusProps {
  progressValue: number;
  progressMax: number;
  status: string;
  taskName: string;
}

function ProgressStatus({ progressValue, progressMax, status, taskName }: ProgressStatusProps) {
  const factor = 100 / progressMax;
  const progress = Math.round(100 * factor * progressValue) / 100;
  const statusName = getStatusName(status);
  const statusStyle = getStatusStyle(status);
  const className = composeStyles(styles.task, statusStyle);

  function getStatusStyle(statusSymbol: string): string {
    switch (statusSymbol) {
      case TaskStatus.NOT_STARTED:
        return styles.not_started;
      case TaskStatus.IN_PROGRESS:
        return styles.in_progress;
      case TaskStatus.PAUSED:
        return styles.paused;
      case TaskStatus.COMPLETED:
        return styles.completed;
      default:
        return styles.unknown; // Fallback style for unknown status
    }
  }

  return (
    <progress className={className} value={progress} max={100} data-status={statusName}>{taskName}</progress>
  )
}

export default ProgressStatus;