import { ErrorBoundary } from "react-error-boundary";
import { getTimeValue } from '../../timeConverter';
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { GoMoveToTop, GoMoveToBottom } from "react-icons/go";
import ProgressStatusWithTooltip from "./ProgressStatusWithTooltip";
import TaskForm from "./TaskForm";
import { getStatusName } from "../taskTools";
import React, { useState } from "react";
import type { TaskType } from "../types";
import { useAppDispatch } from "../hooks";
import { deleteTask, editTask, moveDownTask, moveUpTask } from "../slices/taskGroupSlice";
import { useTranslation } from "react-i18next";
import styles from "./Task.module.css";

export interface TaskProps {
  taskData: TaskType;
  isFirst: boolean; // Indicates if this is the first task
  isLast: boolean; // Indicates if this is the last task
}

const Task = ({taskData, isFirst, isLast}: TaskProps) => {
  const { id, totalTime, timeToComplete, taskStatus, taskName } = taskData;
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const totalTimeInSeconds = getTimeValue(totalTime);
  const timeToCompleteInSeconds = getTimeValue(timeToComplete);
  const progressTimeInSeconds = totalTimeInSeconds - timeToCompleteInSeconds;
  const statusName = t(getStatusName(taskStatus));

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditTask = () => {
    setIsEditMode(current => !current);
  };

  const handleFormEdit = (currentTask: TaskType) => {
    setIsEditMode(false);
    dispatch(editTask(currentTask));
  };

  const handleTaskDelete = () => {
    dispatch(deleteTask(taskData));
  }

  const handleTaskMoveUp = () => {
    dispatch(moveUpTask(taskData));
  }

  const handleTaskMoveDown = () => {
    dispatch(moveDownTask(taskData));
  }

  const formTitle = t("modify_task", {task_name: taskName});

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
        {isEditMode && <TaskForm
          formTitle={formTitle}
          taskData={{id, totalTime, timeToComplete, taskStatus, taskName}}
          handleFormSubmit={handleFormEdit}/>}
      </div>
    </ErrorBoundary>
  );
}

export default React.memo(Task);