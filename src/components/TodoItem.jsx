import { useState } from "react";

export default function TodoListItem({ data }) {
  const [checkedItem, setCheckedItem] = useState(false);

  return (
    <>
      {data.map((task) => (
        <div
          key={task.id}
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
              checked={task.completed}
              onChange={(e) => {
                setCheckedItem(e.target.checked);
              }}
            />

            <span>{task.title}</span>
          </label>

          <span style={{ margin: "8px" }}>
            <button
              disabled={checkedItem}
              type="button"
              className={!checkedItem ? "edit-button" : "disabled-button"}
            >
              {/* {task.completed ? "↺" : "✓"} */} edit
            </button>
            <button
              disabled={!checkedItem}
              type="button"
              className={!checkedItem ? "disabled-button" : "delete-button"}
            >
              ✕
            </button>
          </span>
        </div>
      ))}
    </>
  );
}
