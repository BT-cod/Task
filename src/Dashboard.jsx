import React, { useState, useEffect } from "react";
import Tasks from "./Tasks";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import initializeFirebaseApp from "./Config";
import { useNavigate } from "react-router-dom";

initializeFirebaseApp();

const Dashboard = () => {
  const navigate = useNavigate();
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isUpModalOpen, setUpModalOpen] = useState(false);
        const [tasks, setTasks] = useState([]);
        const [task, setTask] = useState({
          taskTitle: "",
          taskDesc: "",
        });

        const [editedTask, setEditedTask] = useState({
                taskTitle: "",
                taskDesc: "",
              });
  const auth = getAuth(); // Get the Firebase Auth instance

  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Set up an authentication observer
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the user ID when a user is logged in
      } else {
        setUserId(""); // Clear the user ID when no user is logged in
      }
    });

    // Unsubscribe from the observer when the component is unmounted
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(); // Get the Firestore instance
      const tasksRef = collection(db, "tasks");

      if (userId) {
        // Fetch tasks based on the user ID
        const q = query(tasksRef, where("userId", "==", userId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const data = [];
          snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          setTasks(data);
        });

        return () => unsubscribe();
      } else {
        setTasks([]);
      }
    };

    fetchData();
  }, [userId]);

  const handleUpdateTask = async (e) => {
        e.preventDefault();
    
        const db = getFirestore();
        const taskRef = doc(db, "tasks", editedTask.id); // Use editedTask instead of updatedTask
    
        try {
          await updateDoc(taskRef, {
            taskTitle: editedTask.taskTitle,
            taskDesc: editedTask.taskDesc,
          });
    
          setUpModalOpen(false);
        } catch (error) {
          console.log("Error updating task:", error);
        }
      };
      
      const handleEditTask = (taskId) => {
        // Use the taskId to update the task
        const editedTask = tasks.find((task) => task.id === taskId);
        setEditedTask(editedTask);
        setUpModalOpen(true);
      };
      
    
  const handleAddTask = async (e) => {
    e.preventDefault();

    const db = getFirestore(); // Get the Firestore instance
    const tasksRef = collection(db, "tasks");

    try {
        setIsModalOpen(false)
      const newTask = {
        taskTitle: task.taskTitle,
        taskDesc: task.taskDesc,
        userId: userId,
      };

      await addDoc(tasksRef, newTask);

      setTask({
        taskTitle: "",
        taskDesc: "",
      });
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
        const db = getFirestore();
        const taskRef = doc(db, "tasks", editedTask.id);
      
        try {
          await deleteDoc(taskRef);
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
          console.log("Error deleting task:", error);
        }
      };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout successful");
        navigate("/Task/login");
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  const handleToggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  return (
    <div className="bg-gradient-to-r from-rose-100 to-teal-100 h-screen">
      <div className="p-5 flex justify-between items-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Task
          <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            DashBoard
          </mark>
        </h1>
        <button
          className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
      <div className="flex justify-center">
        <button
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          onClick={handleToggleModal}
        >
          Create Task
        </button>
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`fixed inset-0 flex items-center justify-center z-50 ${
            isModalOpen ? "" : "hidden"
          }`}>
          <div className="relative w-full max-w-md mx-auto">
            <div className="relative bg-white rounded-lg shadow-md dark:bg-gray-800">
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
                data-modal-hide="authentication-modal"
                onClick={handleToggleModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Create Your Task
                </h3>
                <form className="space-y-6" action="/" noValidate>
                  <div>
                    <label
                      htmlFor="Task Title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Task Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="tTitle"
                      value={task.taskTitle}
                      onChange={(e) =>
                        setTask({ ...task, taskTitle: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Shopping"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Task Description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Task Description
                    </label>
                    <input
                      type="description"
                      name="description"
                      id="tDescription"
                      value={task.taskDesc}
                      onChange={(e) =>
                        setTask({ ...task, taskDesc: e.target.value })
                      }
                      placeholder="As Your Wish"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        />
                      </div>
                      <label
                        htmlFor="Remind me"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Remind me
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleAddTask}
                  >
                    Add Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {isUpModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold mb-4">Edit Task</h1>
      <form onSubmit={handleUpdateTask}>
        {/* Display the existing task data for editing */}
        <input
          type="text"
          value={editedTask.taskTitle}
          onChange={(e) =>
            setEditedTask((prevTask) => ({
              ...prevTask,
              taskTitle: e.target.value,
            }))
          }
          className="block w-full p-2 mb-4 bg-gray-100 border border-gray-300 rounded"
          required
        />
        <textarea
          value={editedTask.taskDesc}
          onChange={(e) =>
            setEditedTask((prevTask) => ({
              ...prevTask,
              taskDesc: e.target.value,
            }))
          }
          className="block w-full p-2 mb-4 h-32 bg-gray-100 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Task
        </button>
      </form>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setUpModalOpen(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}
      </div>
      <div>
      <Tasks
  tasks={tasks}
  onDeleteTask={handleDeleteTask}
  onEditTask={handleEditTask} 
/>
      </div>
    </div>
  );
};

export default Dashboard;
