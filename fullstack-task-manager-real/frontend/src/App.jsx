
import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Backend not connected yet");
    }
  };

  useEffect(() => { load(); }, []);

  const add = async (data) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  const update = async (id, data) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const upd = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? upd : t)));
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const remove = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const toggleComplete = async (id, currentTask) => {
    try {
      const updatedTask = { ...currentTask, completed: !currentTask.completed };
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask)
      });
      const upd = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? upd : t)));
    } catch (err) {
      // If backend fails, update locally
      setTasks(tasks.map((t) => 
        t._id === id ? { ...t, completed: !t.completed } : t
      ));
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">✨ Task Manager ✨</h1>
        <p className="app-subtitle">Stay organized and productive</p>
      </div>
      <div className="app-content">
        <TaskForm onAdd={add} editing={editing} onUpdate={update} clearEdit={() => setEditing(null)} />
        <TaskList tasks={tasks} onDelete={remove} onEdit={setEditing} onUpdate={update} onToggleComplete={toggleComplete} />
      </div>
    </div>
  );
}
