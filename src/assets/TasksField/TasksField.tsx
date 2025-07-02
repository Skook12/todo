import "./TasksField.css";
import Trash from "../../images/Trash.svg";

interface taskType {
  text: string;
  cleared: boolean;
}

interface taskField {
  taskItem: taskType;
  onDelete: (item: taskType) => void;
  onComplete: (item: taskType) => void;
}

function TasksField({ taskItem, onDelete, onComplete }: taskField) {
  function handleDeleteTask() {
    onDelete(taskItem);
  }

  function handleCompleteTask() {
    onComplete(taskItem);
  }

  return (
    <div className="pt-4 px-3 md:px-5 flex justify-center align-center">
      <div className="flex flex-row align-center basis-4/4 md:basis-2/4 rounded-md bg-taskfield p-5">
        <div className="basis-1/10 flex items-center ps-2">
          <label className="checkbox-container">
            <input
              className="flex items-center"
              type="checkbox"
              onChange={handleCompleteTask}
              checked={taskItem.cleared}
            />
            <span className="custom-checkbox ">
              <svg viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </label>
        </div>
        <h5
          className={`basis-8/10 w-8/10 ps-1 ${
            taskItem.cleared ? "taskcleared line-through" : ""
          }`}
        >
          {taskItem.text}
        </h5>
        <div className="ps-1 flex items-center basis-1/10 justify-center">
          <img src={Trash} className="h-8" onClick={handleDeleteTask} />
        </div>
      </div>
    </div>
  );
}

export default TasksField;
