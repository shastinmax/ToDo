import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    let [task,setTask]=useState([
        {id:1, title:'HTML & CSS', isDone:true},
        {id:2, title:'JS', isDone:true},
        {id:3, title:'ReactJS', isDone:false}
    ])

    const removeTask=(id:number)=>{
        task=task.filter(f=>f.id!==id)
        setTask(task)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'} task={task}
            removeTask={removeTask}/>
        </div>
    );
}

export default App;
