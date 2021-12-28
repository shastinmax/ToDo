import React, {ChangeEvent} from 'react';
import s from "../TodoList.module.css";
import {TaskType} from "../Todolist";

type TaskMapTypeProps={
    tasks: Array<TaskType>
    onChangeCheckbox:(tId: string, value: boolean)=>void
    onClickHandler:(tId:string)=>void
}

export const TaskMap = (props:TaskMapTypeProps) => {
    return (
        <div>{
            props.tasks.map(t => {
                return <li key={t.id} className={t.isDone ? s.isDone : ''}>
                    <input type="checkbox" checked={t.isDone}
                           onChange={(e) => props.onChangeCheckbox(t.id, e.currentTarget.checked)}/>
                    <span>{t.title}</span>
                    <button onClick={() => props.onClickHandler(t.id)}>x</button>
                </li>
            })
        }
        </div>
    );
};

