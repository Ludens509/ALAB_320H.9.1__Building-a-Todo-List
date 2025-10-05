import { useState } from "react";

export default function EditForm({ task, onSave, onCancel }) {
  const [value, setValue] = useState(task.title || task.text || "");

  function handleSave() {
    const trimmed = value.trim();
    if (!trimmed) return; // do not save empty
    onSave({ id: task.id, title: trimmed });
  }

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
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
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Edit task"
          maxLength={100}
          className="input"
        />

        <span style={{ margin: "8px" }}>
          <button name="save" type="button" className={"save-button"} onClick={handleSave}>
            save
          </button>
          <button name="cancel" type="button" className={"cancel-button"} onClick={onCancel}>
            cancel
          </button>
        </span>
      </div>
    </form>
  );
}
