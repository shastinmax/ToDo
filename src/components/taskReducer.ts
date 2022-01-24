import {TaskType} from "../Todolist";
import {v1} from "uuid";

export const TaskReducer=(state:Array<TaskType>,action:GeneralTYpe)=>{
    switch(action.type){
        case 'REMOVE-TASK':{
            return state.filter(f=>f.id!==action.payload.id)
        }
        case 'ADD-TASK':{
            let task = { id: v1(), title: action.payload.title, isDone: false };

            return [task,...state]
        }
        default:return state
    }
}
type GeneralTYpe=removeTaskACType
| addTaskType
type removeTaskACType=ReturnType<typeof removeTaskAC>

export const removeTaskAC=(id:string)=>{
    return {
        type:'REMOVE-TASK',
        payload:{
            id
        }
    } as const
}
type addTaskType=ReturnType<typeof addTaskAC>
export const addTaskAC=(title:string)=>{
    return {
        type:'ADD-TASK',
        payload:{
            title
        }
    }as const
}

