import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type ActionsType = RemoveTasksActionType
    | AddTasksACType
    | ChangeTaskStatusACType
    | СhangeTaskTitleAC
    | AddTodolistActionType
    | RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(i => i.id !== action.taskId)}
        case 'ADD-TASK': {
            let task = {id: "0", title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]}
        }
        case 'CHANGE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.taskId ? {
                    ...m,
                    isDone: action.payload.isDone
                } : m)
            }
        }
        case 'CHANGE-TITLE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.taskId ? {
                    ...m,
                    title: action.payload.newTitle
                } : m)
            }
        }
        case 'ADD-TODOLIST': {
            let newKey = action.todolist
            return {
                [newKey]: [], ...state
            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            throw new Error("I don't understand this type")
    }
}
type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    } as const
}

type AddTasksACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK',
        payload: {
            taskId,
            isDone,
            todolistId
        }
    } as const
}

type СhangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        payload: {
            taskId,
            newTitle,
            todolistId
        }
    } as const
}



