import React, { useState } from "react";
import Delete from "./assets/Idelete.png";
import Update from "./assets/update.png";

const Tasks = ({ tasks, onDeleteTask, onEditTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDelete = (taskId) => {
    onDeleteTask(taskId);
  };

  const handleEdit = (task) => {
    onEditTask(task.id); // Pass the task ID to the onEditTask function
  };

  return (
    <div className="p-10 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-gradient-to-r from-rose-100 to-teal-100">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {task.taskTitle}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {task.taskDesc}
          </p>
          <div className="flex flex-row space-x-10">
            <img
              src={Delete}
              alt="Delete"
              className="bg-transparent w-6 h-8 cursor-pointer"
              onClick={() => handleDelete(task.id)}
            />
            <img
              src={Update}
              alt="Update"
              className="bg-transparent w-6 h-8 cursor-pointer"
              onClick={() => handleEdit(task)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
