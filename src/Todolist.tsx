import React, {useState} from "react";
import {FilterType} from "./App";

type propsType={
    title:string
    task:Array<InArray>
    removeTask:(id:number)=>void

}

type InArray={
    id:number
    title:string
    isDone:boolean
}

export const Todolist=(props:propsType)=>{

    let isDoneTrue = props.task
    const [filterValue, setFilterValue] = useState<FilterType>('All')

    if (filterValue === 'Active') {
        isDoneTrue = props.task.filter(f => f.isDone)
    }

    if (filterValue === 'Completed') {
        isDoneTrue = props.task.filter(f => !f.isDone)
    }

    const filteredTask = (value: FilterType) => {
        setFilterValue(value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {isDoneTrue.map((item,i) => {
                    return (<li key={item.id}>
                        <button onClick={()=>props.removeTask(item.id)}>X</button>
                        <input type="checkbox" checked={item.isDone}/>
                        <span>{item.title}</span>

                    </li>)
                })}
            </ul>
            <div>
                <button onClick={()=>filteredTask('All')}>All</button>
                <button onClick={()=>filteredTask('Active')}>Active</button>
                <button onClick={()=>filteredTask('Completed')}>Completed</button>
            </div>
        </div>
    )
}