import React from "react";

export default function TodoListItem({ state, dispatch }) {

  function handleAction(e, task) {
    const name = e.target.name;
    if (name === "delete") {
      dispatch({ type: "REMOVE_TODO", payload: task.id });
    }
    if (name === "edit") {
      // placeholder for edit action
      console.log('Edit', task.id);
    }
  }

  function handleToggle(e, task) {
    dispatch({ type: "TOGGLE_TODO", payload: task.id });
  }

  return (
    <>
      {state.map((task) => (
        <form key={task.id} onSubmit={(e) => e.preventDefault()}>
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

              <span style={{ marginLeft: 8 }}>{task.title || task.text}</span>
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
      ))}
    </>
  );
}
