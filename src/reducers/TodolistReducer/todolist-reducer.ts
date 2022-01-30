import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";

export const todolistReducer=(state:Array<TodolistType>,action:GeneralType)=>{
    let newState
    switch (action.type) {
        case "REMOVE-TODOLIST":
             newState=[...state]
            return newState.filter(f=>f.id!==action.payload.id)
        case "ADD-TODOLIST":
             newState=[...state]
            let newTodolist: TodolistType = {id: v1(), title: action.payload.title, filter: 'all'};
            return [...newState,newTodolist]
        case'CHANGE-TODOLIST-TITLE':
            let newsState=[...state]
            return newsState.map(m=>m.id===action.payload.id?{...m,title:action.payload.title}:m)
        case "CHANGE-TODOLIST-FILTER":{
            let newState=[...state]
           return newState.map(m=>m.id===action.payload.id?{...m,filter:action.payload.filter}:m)
        }

        default:
            return state
    }
}
type GeneralType=TodolistReducerACType
|AddTodolistAC
|ChangeTodolistTitleACType
|ChangeFilterACType
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
export type ChangeTodolistTitleACType=ReturnType<typeof changeTodolistTitleAC >
export const changeTodolistTitleAC=(id: string, title: string)=>{
    return{
        type:'CHANGE-TODOLIST-TITLE',
        payload:{
            id,
            title
        }
    }as const
}
type ChangeFilterACType=ReturnType<typeof changeFilterAC>
export const changeFilterAC=(filter: FilterValuesType, id: string)=>{
    return{
        type:'CHANGE-TODOLIST-FILTER',
        payload:{
            id,
            filter
        }
    }as const
}