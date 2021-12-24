import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (NewTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    console.log(typeof useState(),'-typeof useState()')

    const onClickHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(title)
            setTitle('')
        }

    }


    const changeFilterHandler=(valueFilter:FilterValuesType)=>{
        props.changeFilter(valueFilter)
    }

    const removeTaskHandler=(id:string)=>{
        props.removeTask(id)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone} />
                    <span>{t.title}</span>
                    <button onClick={() => {
                        removeTaskHandler(t.id)
                    }} >x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={()=>
                changeFilterHandler('all')
            }>
                All
            </button>
            <button onClick={()=>
                changeFilterHandler('active')
            }>
                Active
            </button>
            <button onClick={()=>
                changeFilterHandler('completed')
            }>
                Completed
            </button>
        </div>
    </div>
}
