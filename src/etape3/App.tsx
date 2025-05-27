import { TaskStatus } from "../taskStatus";
import { useReducer } from "react";
import { tasksReducer } from "./tasksReducer";
import type { TaskType } from "./types";
import { TaskGroup } from "./components/TaskGroup";

const initialTasks: TaskType[] = [
  { id: 1, totalTime: "3d", timeToComplete: "1d", taskStatus: TaskStatus.IN_PROGRESS, taskName: "Première tâche" },
  { id: 2, totalTime: "5d", timeToComplete: "4d", taskStatus: TaskStatus.PAUSED, taskName: "Seconde tâche" }
];

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <>
      <h1 className="center-text">Gestion des tâches (étape 3)</h1>
      <TaskGroup groupName="Mon premier groupe" tasks={tasks} tasksDispatcher={dispatch}/>
    </>
  )
}

export default App;