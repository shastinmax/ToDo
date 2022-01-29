import {TodolistType} from "../../App";

export const todolistReducer=(state:Array<TodolistType>,action:GeneralType)=>{
    switch (action.type) {
        case "REMOVE-TODOLIST":
            // setTodolists(todolists.filter(tl => tl.id != id));
            // delete tasks[id];
            // setTasks({...tasks});
            let newState=[...state]
            return newState.filter(f=>f.id!==action.payload.id)
        default:
            return state
    }
}
type GeneralType=TodolistReducerACType
export type TodolistReducerACType=ReturnType<typeof removeTodolistReducerAC>
export const removeTodolistReducerAC=(id:string)=>{
    return{
        type:'REMOVE-TODOLIST',
        payload:{
            id
        }
    }as const
}