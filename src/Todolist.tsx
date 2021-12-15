import React from "react";

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
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map((item,i) => {
                    return (<li key={item.id}>
                        <button onClick={()=>props.removeTask(item.id)}>X</button>
                        <input type="checkbox" checked={item.isDone}/>
                        <span>{item.title}</span>

                    </li>)
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}