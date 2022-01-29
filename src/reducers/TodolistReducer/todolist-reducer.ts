import {TodolistType} from "../../App";
import {v1} from "uuid";

export const todolistReducer=(state:Array<TodolistType>,action:GeneralType)=>{
    switch (action.type) {
        case "REMOVE-TODOLIST":
            // setTodolists(todolists.filter(tl => tl.id != id));
            // delete tasks[id];
            // setTasks({...tasks});
            let newState=[...state]
            return newState.filter(f=>f.id!==action.payload.id)
        case "ADD-TODOLIST":
            let newsState=[...state]

            let newTodolist: TodolistType = {id: v1(), title: action.payload.title, filter: 'all'};
            return [...newsState,newTodolist]
        default:
            return state
    }
}
type GeneralType=TodolistReducerACType
|AddTodolistAC
export type TodolistReducerACType=ReturnType<typeof removeTodolistReducerAC>
export const removeTodolistReducerAC=(id:string)=>{
    return{
        type:'REMOVE-TODOLIST',
        payload:{
            id
        }
    }as const
}
export type AddTodolistAC=ReturnType<typeof addTodolistAC>
export const addTodolistAC=(title:string)=>{
    return{
        type:'ADD-TODOLIST',
        payload:{
            title
        }
    }as const
}