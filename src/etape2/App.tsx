import Task from "./components/Task"
import { TaskStatus } from "../taskStatus";

interface Task {
  id: number;
  totalTime: string;
  timeToComplete: string;
  status: string;
  name: string;
}

const tasks: Task[] = [
  { id: 1, totalTime: "3d", timeToComplete: "1d", status: TaskStatus.IN_PROGRESS, name: "Première tâche" },
  { id: 2, totalTime: "5d", timeToComplete: "4d", status: TaskStatus.PAUSED, name: "Seconde tâche" }
];

function App() {
  function taskToComponent(task: Task, index: number, taskArray: Task[]) {
    const isFirst = (index === 0);
    const isLast = (index === taskArray.length - 1);
    const { id, totalTime, timeToComplete, status, name: taskName } = task;

    return <Task
      key={id}
      totalTime={totalTime}
      timeToComplete={timeToComplete}
      status={status}
      taskName={taskName}
      isFirst={isFirst}
      isLast={isLast} />
  }

  return (
    <>
      <h1 className="center-text">Gestion des tâches  (étape 2)</h1>
      {tasks.map(taskToComponent)}
    </>
  )
}

export default App;