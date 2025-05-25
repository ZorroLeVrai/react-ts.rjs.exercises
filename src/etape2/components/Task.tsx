import { ErrorBoundary } from "react-error-boundary";
import styles from "./Task.module.css";
import { getTimeValue } from '../../timeConverter';
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { GoMoveToTop, GoMoveToBottom } from "react-icons/go";
import ProgressStatusWithTooltip from "./ProgressStatusWithTooltip";

interface TaskProps {
  totalTime: string; // e.g., "2h30"
  timeToComplete: string; // e.g., "1h15"
  status: string; // e.g., "in_progress"
  taskName: string; // e.g., "Task 1"
  isFirst?: boolean; // Indicates if this is the first task
  isLast?: boolean; // Indicates if this is the last task
}

const Task = ({ totalTime, timeToComplete, status, taskName, isFirst = false, isLast = false }: TaskProps) => {
  const totalTimeInSeconds = getTimeValue(totalTime);
  const timeToCompleteInSeconds = getTimeValue(timeToComplete);
  const progressTimeInSeconds = totalTimeInSeconds - timeToCompleteInSeconds;

  return (
    <ErrorBoundary fallback={<div>Erreur dans la tâche</div>} >
      <div className={styles.task}>
        <div className={styles.container}>
          <span className={styles.text}>{taskName}</span>
          <span className={styles.icon}>
            {isFirst || <GoMoveToTop data-testid="task_movetop" />}
            {isLast || <GoMoveToBottom data-testid="task_movebottom" />}
            <FaEdit />
            <TiDelete />
          </span>
        </div>
        <ProgressStatusWithTooltip
          progressValue={progressTimeInSeconds}
          progressMax={totalTimeInSeconds}
          status={status}
          taskName={taskName}
          totalTime={totalTime}
          timeToComplete={timeToComplete} />
      </div>
    </ErrorBoundary>
  );
}

export default Task;