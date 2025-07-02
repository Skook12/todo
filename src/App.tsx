import "./App.css";
import logo from "../src/images/Logo.svg";
import Plus from "../src/images/Plus.svg";
import Clipboard from "../src/images/Clipboard.svg";
import TasksField from "./assets/TasksField/TasksField";
import { useState, type ChangeEvent, type FormEvent } from "react";

interface taskType {
  text: string;
  cleared: boolean;
}

function App() {
  const [task, setTask] = useState<taskType[]>([]);
  const [taskname, setTaskName] = useState("");

  function addTask(event: FormEvent) {
    event?.preventDefault();
    if (taskname != "") {
      setTask([...task, { text: taskname, cleared: false }]);
      setTaskName("");
    }
  }

  function addTaskName(event: ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value);
  }

  function deleteTask(item: taskType) {
    const tasksWithoutDelete = task.filter((task) => {
      return task != item;
    });
    setTask(tasksWithoutDelete);
  }

  function completeTask(item: taskType) {
    const updatedTasks = task.map((t) => {
      if (t === item) {
        return { ...t, cleared: !t.cleared };
      }
      return t;
    });

    setTask(updatedTasks);
  }

  return (
    <div>
      <header className="title h-60 flex flex-row items-center justify-center text-white">
        <img src={logo} className="h-16"></img>
      </header>
      <div className="flex flex-row items-center justify-center gap-4 object-cover h-0 px-5 text-xl">
        <input
          type="text"
          placeholder="Add a new task"
          className="rounded-md p-4 basis-160 input-search"
          onChange={addTaskName}
        ></input>
        <button
          className="rounded-md p-4 flex flex-row gap-2 align-center justify-center text-white"
          onClick={addTask}
        >
          New
          <img src={Plus} />
        </button>
      </div>
      <div className="flex flex-col pb-5">
        <div className="pt-20 px-3 md:px-5 flex justify-center align-center">
          <div className="flex flex-row md:basis-2/4 basis-4/4">
            <div className="flex flex-row gap-4 basis-2/4">
              <h5 className=" color-task font-bold">Tasks created</h5>
              <h5 className="number-task font-bold text-white rounded-full px-2">
                {task.length}
              </h5>
            </div>
            <div className="flex flex-row gap-4 justify-end basis-2/4">
              <h5 className="color-task font-bold">Finished</h5>
              <h5 className="number-task font-bold text-white rounded-full px-2">
                {task.filter((item) => item.cleared).length}
              </h5>
            </div>
          </div>
        </div>

        {task.length === 0 && (
          <div className="pt-8 px-3 md:px-5 flex justify-center align-center">
            <div className="flex flex-col items-center basis-2/4 no-tasks rounded-md task-text">
              <img src={Clipboard} className="h-16 w-16 mt-15" />
              <h5 className="font-bold mt-5">You don't have tasks yet</h5>
              <h5>Create new tasks and organize yourself</h5>
            </div>
          </div>
        )}
        {task.map((item: any, index: any) => {
          return (
            <TasksField
              key={index}
              taskItem={item}
              onDelete={deleteTask}
              onComplete={completeTask}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
