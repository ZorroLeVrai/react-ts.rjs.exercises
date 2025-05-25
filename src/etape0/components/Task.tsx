import styles from "./Task.module.css";
import ProgressStatus from './ProgressStatus';
import { getTimeValue } from '../../timeConverter';

interface TaskProps {
  totalTime: string; // e.g., "2h30"
  timeToComplete: string; // e.g., "1h15"
  status: string; // e.g., "in_progress"
  taskName: string; // e.g., "Task 1"
}

const Task = ({ totalTime, timeToComplete, status, taskName }: TaskProps) => {
  const totalTimeInSeconds = getTimeValue(totalTime);
  const timeToCompleteInSeconds = getTimeValue(timeToComplete);
  const progressTimeInSeconds = totalTimeInSeconds - timeToCompleteInSeconds;

  return (
    <div className={styles.task}>
      <div className={styles.container}>
        <span className={styles.text}>{taskName}</span>
      </div>
      <ProgressStatus
        progressValue={progressTimeInSeconds}
        progressMax={totalTimeInSeconds}
        status={status}
        taskName={taskName} />
    </div>
  );
}

export default Task;