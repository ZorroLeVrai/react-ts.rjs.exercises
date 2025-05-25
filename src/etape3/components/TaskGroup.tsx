import { getTimeInFormat, getTimeValue } from '../../timeConverter';
import Task from './Task';
import { IoMdArrowDropright, IoMdArrowDropdown, IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import ProgressStatusWithTooltip from './ProgressStatusWithTooltip';
import { TaskStatus } from '../../taskStatus';
import { useState } from 'react';
import styles from "./TaskGroup.module.css";
import { composeStyles } from '../../tools';
import TaskForm from './TaskForm';
import { TaskGroupAction } from '../tasksReducer';
import type { TaskType } from '../types';

interface TaskGroupProps {
  groupName: string,
  tasks: TaskType[],
  tasksDispatcher: React.Dispatch<{ type: string; payload: TaskType }>
}

export const TaskGroup = ({groupName, tasks, tasksDispatcher}: TaskGroupProps) => {
  const [showTasks, setShowTasks] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const timeMetricsSum = tasks
    .map(task => new TimeMetrics(getTimeValue(task.totalTime), getTimeValue(task.timeToComplete)))
    .reduce((accumulator, current) => accumulator.add(current), new TimeMetrics(0, 0));

  const { total: totalTimeInSeconds, remaining: remainingTimeInSeconds } = timeMetricsSum;

  const totalTime = getTimeInFormat(totalTimeInSeconds);
  const totalTimeToComplete = getTimeInFormat(remainingTimeInSeconds);
  const ArrowComponent = showTasks ? IoMdArrowDropdown : IoMdArrowDropright;
  const EditIcon = showForm ? IoMdRemoveCircle : IoMdAddCircle;
  const arrowGroupStyles = tasks.length ? styles.groupTaskIcon : composeStyles(styles.groupTaskIcon, styles.hidden);
  const groupNameStyles = composeStyles("flexSpaceBetween", styles.groupNameMargin);

  const groupTitle = (tasks.length > 0) ? `${groupName} (${tasks.length})`:groupName;

  const handleShowTasks = () => {
    setShowTasks(current => !current);
  };

  const handleShowForm = () => {
    setShowForm(current => !current);
  };

  const handleSubmitForm = (newTask: TaskType) => {
    tasksDispatcher({type: TaskGroupAction.ADD_TASK, payload: newTask});
  }

  return (
    <>
      <div className={groupNameStyles}>
        <span>{groupTitle}</span>
        <span className={styles.icon}>
          <EditIcon onClick={handleShowForm}/>
        </span>
      </div>
      <div className={styles.groupTaskContainer}>
        <div className={arrowGroupStyles}>
          <ArrowComponent onClick={handleShowTasks}/>
        </div>
        <div className={styles.groupTaskItemGrow}>
          <ProgressStatusWithTooltip
              progressValue={totalTimeInSeconds - remainingTimeInSeconds}
              progressMax={totalTimeInSeconds}
              title={groupName}
              status={TaskStatus.COMPLETED}
              taskName={groupName}
              totalTime={totalTime}
              timeToComplete={totalTimeToComplete}/>
          {showForm && <TaskForm formTitle="Ajoutez une tâche" handleFormSubmit={handleSubmitForm}/>}
          {
            showTasks && <div>
              {tasks.map(taskToComponent)}
            </div>
          }
        </div>
      </div>
    </>
  );

  function taskToComponent(task: TaskType, index: number, tasks: TaskType[]) {
    const isFirst = (index === 0);
    const isLast = (index === tasks.length - 1);
  
    return <Task 
      key={task.id}
      taskData={task}
      isFirst={isFirst}
      isLast={isLast}
      tasksDispatcher={tasksDispatcher}/>
  }
};

class TimeMetrics {
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
