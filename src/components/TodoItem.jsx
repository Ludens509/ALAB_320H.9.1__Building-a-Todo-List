import { useState } from "react";
import EditForm from "./EditForm";

export default function TodoListItem({ state, dispatch }) {
  const [editingId, setEditingId] = useState(null);

  function handleAction(e, task) {
    const name = e.target.name;
    if (name === "delete") {
      dispatch({ type: "REMOVE_TODO", payload: task.id });
    }
    if (name === "edit") {
      // open edit form for this task only
      setEditingId(task.id);
    }
  }

  function handleToggle(e, task) {
    dispatch({ type: "TOGGLE_TODO", payload: task.id });
  }

  function handleSaveEdit(payload) {
    // payload: { id, title }
    dispatch({ type: "EDIT_TODO", payload });
    setEditingId(null);
  }

  function handleCancelEdit() {
    setEditingId(null);
  }

  return (
    <>
      {state.length !== 0 ? (
        state.map((task) => (
          <div key={task.id}>
            {editingId === task.id ? (
              <EditForm task={task} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
            ) : (
              <form onSubmit={(e) => e.preventDefault()}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    maxWidth: "400px",
                    margin: "8px auto",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={!!task.completed}
                      onChange={(e) => handleToggle(e, task)}
                    />

                    <span style={{ marginLeft: 8 }}>{task.title}</span>
                  </label>

                  <span style={{ margin: "8px" }}>
                    <button
                      name="edit"
                      disabled={task.completed}
                      type="button"
                      className={!task.completed ? "edit-button" : "disabled-button"}
                      onClick={(e) => handleAction(e, task)}
                    >
                      edit
                    </button>
                    <button
                      disabled={!task.completed}
                      name="delete"
                      type="button"
                      className={!task.completed ? "disabled-button" : "delete-button"}
                      onClick={(e) => handleAction(e, task)}
                    >
                      ✕
                    </button>
                  </span>
                </div>
              </form>
            )}
          </div>
        ))
      ) : (
        <div>
          <h2>No Task available</h2>
        </div>
      )}
    </>
  );
}
