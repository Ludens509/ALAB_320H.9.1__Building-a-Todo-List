import { useReducer } from "react";
import EditForm from "../components/EditForm";
import Form from "../components/Form";
import Header from "../components/Header";
import TodoListItem from "../components/TodoItem";
import { initialState } from "../utilities/data";

export default function Main() {

    // const [state, dispatch] = useReducer(reducer, initialState);
    // console.log(state);
    const reducer = (state, action) => {
        switch (action.type) {
            case "ADD_TODO":
                return [...state, action.payload];
            case "EDIT_TODO":
                // action.payload expected: { id, title }
                return state.map(todo => todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo);
            case "REMOVE_TODO":
                // payload is expected to be task id
                return state.filter((todo) => todo.id !== action.payload);
            case "TOGGLE_TODO":
                return state.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo);
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    console.log("State",state); 

    return (
        <div>
            <h1>Main Page</h1>
            <Header/>
            <Form dispatch={dispatch} />
            {/* <EditForm/> */}
            <TodoListItem state={state} dispatch={dispatch} />
        </div>
    )
}