import './App.css';
import Home from './pages/Home';
import Main from './pages/Main';
import {initialState} from './utilities/data'
import { useState } from 'react';

function App() {
  // const [count, setCount] = useState(0)
 const [tasks, setTasks] = useState(initialState);
 console.log("Task",tasks);
  return (
    <>
      <div>
      <Main data={tasks}/>
      </div>
    </>
  )
}

export default App
