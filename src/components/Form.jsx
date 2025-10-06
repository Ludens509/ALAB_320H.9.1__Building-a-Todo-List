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
    <div className="form-container">
      <form className="form" onClick={handleAddTask}>
        
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
              placeholder="What needs to be done?"
              maxLength={100}
              className="input-task"
            />
           
          </div>
          <button type="submit" className="add-button">
            Add Task
          </button>
        
      </form>
      </div>
    </>
  );
}
