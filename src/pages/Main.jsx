import { initialState } from "../utilities/data"
import { useReducer } from "react";
import Form from "../components/Form";
import Header from "../components/Header";
import TodoListItem from "../components/TodoItem";

export default function Main() {

    // const [state, dispatch] = useReducer(reducer, initialState);
    // console.log(state);
    const reducer = (state, action) => {
        switch (action.type) {
            case "ADD_TODO":
                return [...state, action.payload];
            case "REMOVE_TODO":
                return state.filter((todo, index) => index !== action.payload); 
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
            <TodoListItem data={state} />
            {/* <TodoListItem state={state}  dispatch={dispatch}/> */}
        </div>
    )
}