import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import {
  CreateTask,
  DeleteTaskById,
  GetAllTasks,
  UpdateTaskById,
} from "../api";
import { notify } from "../utils";

function TaskManager() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  const handleTask = () => {
    if (updateTask && input) {
      // Update task API call
      console.log("update api call");
      const obj = {
        taskName: input,
        isDone: updateTask.isDone,
        _id: updateTask._id,
      };
      handleUpdateItem(obj);
    } else if (updateTask === null && input) {
      console.log("create api call");
      // Create task API call
      handleAddTask();
    }
    setInput("");
  };

  useEffect(() => {
    if (updateTask) {
      setInput(updateTask.taskName);
    }
  }, [updateTask]);

  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };
    try {
      const { success, message } = await CreateTask(obj);
      if (success) {
        // Show success toast
        notify(message, "success");
      } else {
        // Show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const fetchAllTasks = async () => {
    try {
      const { data } = await GetAllTasks();
      setTasks(data);
      setCopyTasks(data);
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await DeleteTaskById(id);
      if (success) {
        // Show success toast
        notify(message, "success");
      } else {
        // Show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to delete task", "error");
    }
  };

  const handleCheckAndUncheck = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: !isDone,
    };
    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        // Show success toast
        notify(message, "success");
      } else {
        // Show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to update task", "error");
    }
  };

  const handleUpdateItem = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: isDone,
    };
    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        // Show success toast
        notify(message, "success");
      } else {
        // Show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to update task", "error");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const oldTasks = [...copyTasks];
    const results = oldTasks.filter((item) =>
      item.taskName.toLowerCase().includes(term)
    );
    setTasks(results);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Task Manager App
      </h1>
      {/* Input and Search Box */}
      <div className="flex justify-between items-center w-full mb-6 space-x-4">
        <div className="flex w-full sm:w-2/3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Add a new Task"
          />
          <button
            onClick={handleTask}
            className="bg-green-500 text-white p-3 rounded-lg ml-2 hover:bg-green-600 transition-all"
          >
            <FaPlus />
          </button>
        </div>

        <div className="flex items-center w-full sm:w-1/3">
          <input
            onChange={handleSearch}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            type="text"
            placeholder="Search tasks"
          />
          <FaSearch className="absolute text-gray-500 right-3 top-3" />
        </div>
      </div>

      {/* List of tasks */}
      <div className="w-full space-y-4">
        {tasks.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center p-4 bg-white shadow-lg rounded-lg border border-gray-200"
          >
            <span
              className={`text-lg ${
                item.isDone ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {item.taskName}
            </span>

            <div className="flex space-x-2">
              <button
                onClick={() => handleCheckAndUncheck(item)}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-all"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => setUpdateTask(item)}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => handleDeleteTask(item._id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default TaskManager;
