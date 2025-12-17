
import { useEffect, useState } from "react";
import "./TaskForm.css";

export default function TaskForm({ onAdd, editing, onUpdate, clearEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDesc(editing.description);
    }
  }, [editing]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (editing) {
      onUpdate(editing._id, { title, description });
      clearEdit();
    } else {
      onAdd({ title, description });
    }
    setTitle("");
    setDesc("");
  };

  return (
    <form onSubmit={submit} className="task-form">
      <div className="form-header">
        <h2>{editing ? "✏️ Edit Task" : "➕ Create New Task"}</h2>
      </div>
      <div className="form-group">
        <input
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to do?"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          className="form-textarea"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Add some details..."
          rows="3"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editing ? "💾 Update Task" : "🚀 Add Task"}
        </button>
        {editing && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setTitle("");
              setDesc("");
              clearEdit();
            }}
          >
            ✕ Cancel
          </button>
        )}
      </div>
    </form>
  );
}
