import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { idGenerator, statusMap } from '../taskTools';
import { composeStyles } from "../../tools";
import { TaskStatus } from '../../taskStatus';
import { getTimeValue } from "../../timeConverter";
import styles from "./TaskForm.module.css";
import type { TaskType } from "../types";

const datePattern = /^(\d+[dhms]\s*)+$/;

const timeToCompleteField = "timeToComplete";
const totalTimeField = "totalTime";

const schema = z.object({
  taskName: z.string({required_error: "champ requis"})
    .min(1, "Saisissez le nom de la tâche"),
  totalTime: z.string({required_error: "champ requis"})
    .min(1, "Saisissez le temps total")
    .refine(value => datePattern.test(value ?? ""), "Le temps total doit être au format '1d 2h 3m 4s'"),
  timeToComplete: z.string({required_error: "champ requis"})
    .min(1, "Saisissez le temps restant")
    .refine(value => datePattern.test(value ?? ""), "Le temps restant doit être au format '1d 2h 3m 4s'"),
  taskStatus: z.string({required_error: "champ requis"})
    .min(1, "Sélectionnez un status pour la tâche")
}).refine(schema => {
  const { totalTime, timeToComplete } = schema;
  if (totalTime && timeToComplete) {
    return getTimeValue(totalTime) >= getTimeValue(timeToComplete);
  }
  return true;
}, {message: "Le reste à faire doit être inférieur au temps total de la tâche", path: [timeToCompleteField]});

type FormValues = z.infer<typeof schema>;

const defaultFormValues: FormValues = {
  taskName: "",
  totalTime: "",
  timeToComplete: "",
  taskStatus: ""
};

interface TaskFormProps {
  formTitle: string;
  taskData?: TaskType;
  handleFormSubmit: (task: TaskType) => void;
};

const TaskForm = ({formTitle, taskData, handleFormSubmit}: TaskFormProps) => {
  const taskFormValue: TaskType = taskData ? {...taskData} : defaultFormValues;

  const { register, formState, handleSubmit, reset, getValues, setValue }
    = useForm({resolver: zodResolver(schema), mode: "onChange", defaultValues: taskFormValue});
  const { errors, isValid } = formState;

  const { gridFormContainer, gridDoubleItem } = styles;
  const warningStyle = composeStyles("center-text", "warning-text", gridDoubleItem);

  const timePlaceHolder = "1d 2h 3m 4s (Nombre de jours heures minutes secondes)";

  const submitHandler = (formData: FormValues) => {
    const { taskName, totalTime, timeToComplete, taskStatus } = formData;
    const myTask: TaskType = {
      id: taskFormValue.id ?? idGenerator.next().value,
      totalTime,
      timeToComplete: timeToComplete,
      taskStatus: TaskStatus[taskStatus as keyof typeof TaskStatus],
      taskName
    };

    handleFormSubmit(myTask);
    reset();
  };

  const resetFormData = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    reset();
  };

  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let newTimeToComplete = null;
    const taskStatusValue = event.target.value;
    switch (taskStatusValue) {
      case TaskStatus.NOT_STARTED: {
          const totalTime = getValues(totalTimeField);
          if (datePattern.test(totalTime ?? "")) {
            newTimeToComplete = totalTime;
          }
        }
        break;
      case TaskStatus.COMPLETED:
        newTimeToComplete = "0d";
        break;
    }

    if (newTimeToComplete) {
      setValue(timeToCompleteField, newTimeToComplete, { shouldValidate: true });
    }
  };
  
  return (
    <form className="form-margin" onSubmit={handleSubmit(submitHandler)}>
      <h2 className="center-text">{formTitle}</h2>
      <div className={gridFormContainer}>
        {errors.taskName && <div className={warningStyle}>{errors.taskName.message}</div>}
        <label htmlFor="task-name">Nom de la tâche</label>
        <input {...register("taskName")} id="task-name" type="text" placeholder="Nom de la tâche"/>

        {errors.totalTime && <div className={warningStyle}>{errors.totalTime.message}</div>}
        <label htmlFor="task-total-time">Temps total estimé</label>
        <input {...register(totalTimeField)} id="task-total-time" type="text" placeholder={timePlaceHolder}/>

        {errors.taskStatus && <div className={warningStyle}>{errors.taskStatus.message}</div>}
        <label htmlFor="task-status">Statut de la tâche</label>
        <select {...register("taskStatus", {onChange: handleStatusSelect})} id="task-status">
          <option value="">Sélectionnez un statut...</option>
          {Array.from(statusMap).map((statusItem, index) => <option key={index} value={statusItem[0]}>{statusItem[1]}</option>)}
        </select>

        {errors.timeToComplete && <div className={warningStyle}>{errors.timeToComplete.message}</div>}
        <label htmlFor="task-remaining-time">Temps restant estimé</label>
        <input {...register(timeToCompleteField)} id="task-remaining-time" type="text" placeholder={timePlaceHolder}/>
      </div>
      
      <div className="flexSpaceBetween">
        <div className={styles.buttonVerticalMargin}>
          <button onClick={resetFormData}>
            Initialiser
          </button>
        </div>
        <div className="flexItemRightAlign">
          <input disabled={!isValid} type="submit" />
        </div>
      </div>
    </form>
  )
};

export default TaskForm;
