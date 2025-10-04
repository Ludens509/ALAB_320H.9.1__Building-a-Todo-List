import { useState } from "react";
// import { initialState } from "../utilities/data";
// import { useReducer } from "react";

export default function Form({dispatch}) {
  const [taskInput, setTaskInput] = useState("");


//   const reducer = (state, action) => {
//     switch (action.type) {
//       case "ADD_TODO":
//         return [...state, action.payload];
//       case "REMOVE_TODO":
//         return state.filter((todo, index) => index !== action.payload);

//       default:
//         return state;
//     }
//   };


//   const [state, dispatch] = useReducer(reducer, initialState);
//   console.log("State", state);



  function handleAddTask(e) {
    e.preventDefault();
    const trimmed = taskInput.trim();
    if (trimmed === "") return; // make sure to not save empty value
    // add Task;
    dispatch({
      type: "ADD_TODO",
      payload: { id: Date.now(), title: taskInput , completed: false},
    });

    setTaskInput("");
  }

  function handleInputChange(e) {
    setTaskInput(e.target.value);
  }

  return (
    <>
      <form className="form" onClick={handleAddTask}>
        <div className="form-container">
          {/* {errorMessage && (
                        <div className="error-message">
                          {errorMessage}
                        </div>
                      )} */}

          <div className="input-group">
            <input
              type="text"
              value={taskInput}
              onChange={handleInputChange}
              //   onKeyDown={handleKeyPress}
              placeholder="What needs to be done?"
              maxLength={100}
              className="input"
            />
            {/* <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className={styles.select}
                        >
                          <option value="">Choose category</option>
                          <option value="work">🏢 Work</option>
                          <option value="home">🏠 Home</option>
                          <option value="study">📚 Study</option>
                        </select> */}
          </div>
          <button type="submit" className="add-button">
            Add Task
          </button>
        </div>
      </form>
    </>
  );
}
