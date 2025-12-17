
import "./TaskList.css";

export default function TaskList({ tasks, onDelete, onEdit, onToggleComplete }) {
  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📋</p>
          <p className="empty-text">No tasks yet! Create one to get started 🎯</p>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map((t, index) => (
            <li key={t._id} className={`task-item ${t.completed ? 'completed' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="task-checkbox">
                <input
                  type="checkbox"
                  checked={t.completed || false}
                  onChange={() => onToggleComplete(t._id, t)}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
              </div>
              <div className="task-content">
                <div className="task-header">
                  <h3 className="task-title">{t.title}</h3>
                </div>
                {t.description && <p className="task-description">{t.description}</p>}
              </div>
              <div className="task-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => onEdit(t)}
                  title="Edit this task"
                >
                  ✏️
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => onDelete(t._id)}
                  title="Delete this task"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
