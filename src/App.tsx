import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {
    const [task, setTask] = useState([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'HTML & CSS', isDone: true},
        {id: 5, title: 'JS', isDone: true},
        {id: 6, title: 'ReactJS', isDone: false}
    ])
    const removeTask = (id: number) => {
        setTask(task.filter(f => f.id !== id))
    }
    // let isDoneTrue = task
    // const [filterValue, setFilterValue] = useState<FilterType>('All')
    //
    // if (filterValue === 'Active') {
    //     isDoneTrue = task.filter(f => f.isDone)
    // }
    //
    // if (filterValue === 'Completed') {
    //     isDoneTrue = task.filter(f => !f.isDone)
    // }
    //
    // const filteredTask = (value: FilterType) => {
    //     setFilterValue(value)
    // }


    return (
        <div className="App">
            <Todolist title={'What to learn'} task={task}
                      removeTask={removeTask}

            />
        </div>
    );
}

export default App;
