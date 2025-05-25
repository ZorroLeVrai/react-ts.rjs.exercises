import { ErrorBoundary } from "react-error-boundary";
import styles from "./Task.module.css";
import { getTimeValue } from '../../timeConverter';
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { GoMoveToTop, GoMoveToBottom } from "react-icons/go";
import ProgressStatusWithTooltip from "./ProgressStatusWithTooltip";
import TaskForm from "./TaskForm";
import { TaskGroupAction } from "../tasksReducer";
import { getStatusName } from "../taskTools";
import { useState } from "react";
import type { TaskType } from "../types";

export interface TaskProps {
  taskData: TaskType;
  isFirst: boolean; // Indicates if this is the first task
  isLast: boolean; // Indicates if this is the last task
  tasksDispatcher: React.Dispatch<{ type: string; payload: TaskType }>;
}

const Task = ({taskData, isFirst, isLast, tasksDispatcher}: TaskProps) => {
  const { id, totalTime, timeToComplete, taskStatus, taskName } = taskData;

  const totalTimeInSeconds = getTimeValue(totalTime);
  const timeToCompleteInSeconds = getTimeValue(timeToComplete);
  const progressTimeInSeconds = totalTimeInSeconds - timeToCompleteInSeconds;
  const statusName = getStatusName(taskStatus);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditTask = () => {
    setIsEditMode(current => !current);
  };

  const handleFormEdit = (currentTask: TaskType) => {
    setIsEditMode(false);
    tasksDispatcher({type: TaskGroupAction.EDIT_TASK, payload: currentTask});
  };

  const handleTaskDelete = () => {
    tasksDispatcher({type: TaskGroupAction.DELETE_TASK, payload: taskData});
  }

  const handleTaskMoveUp = () => {
    tasksDispatcher({type: TaskGroupAction.MOVE_UP_TASK, payload: taskData});
  }

  const handleTaskMoveDown = () => {
    tasksDispatcher({type: TaskGroupAction.MOVE_DOWN_TASK, payload: taskData});
  }

  return (
    <ErrorBoundary fallback={<div>Erreur dans la tâche</div>} >
      <div className={styles.task}>
        <div className={styles.container}>
          <span className={styles.text}>{taskName}</span>
          <span className={styles.icon}>
            {isFirst || <GoMoveToTop onClick={handleTaskMoveUp} data-testid="task_movetop" />}
            {isLast || <GoMoveToBottom onClick={handleTaskMoveDown} data-testid="task_movebottom" />}
            <FaEdit onClick={handleEditTask}/>
            <TiDelete onClick={handleTaskDelete}/>
          </span>
        </div>
        <ProgressStatusWithTooltip
          progressValue={progressTimeInSeconds}
          progressMax={totalTimeInSeconds}
          title={statusName}
          status={taskStatus}
          taskName={taskName}
          totalTime={totalTime}
          timeToComplete={timeToComplete} />
        {isEditMode && <TaskForm formTitle={`Modifiez la tâche ${taskName}`} taskData={{id, totalTime, timeToComplete, taskStatus, taskName}} handleFormSubmit={handleFormEdit}/>}
      </div>
    </ErrorBoundary>
  );
}

export default Task;