// @ts-ignore
// @ts-ignore
// @ts-ignore

import {
    addTodolistAC,
    AddTodolistActionType,
    removeTodolistAC,
    RemoveTodolistActionType,
    setTodolistsAC,
    SetTodolistsActionType
} from './todolists-reducer'
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: any = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkApi) => {
    thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
    // thunkApi.dispatch(setTasksAC({tasks, todolistId}))
    return {tasks, todolistId}
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todolistId: string }, thunkApi) => {
    const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
    return {taskId: param.taskId, todolistId: param.todolistId}
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { title: string, todolistId: string }, {dispatch,rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return task
        } else {
            handleServerAppError(res.data, dispatch);
           return  rejectWithValue(null)
        }
    } catch (error) {
        // @ts-ignore
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, {dispatch,rejectWithValue,getState}) => {
    const state = getState() as AppRootStateType

    // @ts-ignore
    const task = state.tasks[param.todolistId].find((t: { id: string }) => t.id === param.taskId)
    if (!task) {
        //throw new Error("task not found in the state");
        return rejectWithValue('task not found in the state')
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model
    }

   const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
        try {
            if (res.data.resultCode === 0) {
               return param
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)

            }
        }
        catch(error){
            // @ts-ignore
            handleServerNetworkError(error, dispatch);
        }
})


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        updateTaskAC(state: any, action: PayloadAction<{ taskId: string, model: any, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t: any) => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        // setTasksAC(state: any, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
        //     state[action.payload.todolistId] = action.payload.tasks
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
            // [addTodolistAC.type]:(state:TasksStateType,action:PayloadAction<{}>)=>{},
            // [removeTodolistAC.type]:(state:TasksStateType,action:PayloadAction<{}>)=>{},
            // [setTodolistsAC.type]:(state:TasksStateType,action:PayloadAction<{}>)=>{},
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t: any) => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            // @ts-ignore
            const tasks = state[action.payload.todolistId]
            // @ts-ignore
            const index = tasks.findIndex((t: any) => t.id === action.payload.taskId)
            if (index > -1) {
                // @ts-ignore
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})
export const tasksReducer = slice.reducer

// export const tasksReducer = (state: TasksStateType = initialState, action: any): TasksStateType => {
//     switch (action.type) {
//         case 'REMOVE-TASK':
//             return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
//         case 'ADD-TASK':
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//         case 'UPDATE-TASK':
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId]
//                     .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
//             }
//         case addTodolistAC.type:
//             return {...state, [action.payload.todolist.id]: []}
//         case removeTodolistAC.type:
//             const copyState = {...state}
//             delete copyState[action.payload.id]
//             return copyState
//         case setTodolistsAC.type: {
//             const copyState = {...state}
//             action.payload.todolists.forEach((tl:any) => {
//                 copyState[tl.id] = []
//             })
//             return copyState
//         }
//         case 'SET-TASKS':
//             return {...state, [action.todolistId]: action.tasks}
//         default:
//             return state
//     }
// }

// actions
// export const removeTaskAC = (taskId: string, todolistId: string) =>
//     ({type: 'REMOVE-TASK', taskId, todolistId} as const)
// export const addTaskAC = (task: TaskType) =>
//     ({type: 'ADD-TASK', task} as const)
// export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
//     ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
// export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
//     ({type: 'SET-TASKS', tasks, todolistId} as const)

// thunks
//         export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
//             dispatch(setAppStatusAC({status: 'loading'}))
//             todolistsAPI.getTasks(todolistId)
//                 .then((res) => {
//                     const tasks = res.data.items
//                     dispatch(setTasksAC({tasks, todolistId}))
//                     dispatch(setAppStatusAC({status: 'succeeded'}))
//                 })
//         }
//         export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
//             todolistsAPI.deleteTask(todolistId, taskId)
//                 .then(res => {
//                     const action = removeTaskAC({taskId, todolistId})
//                     dispatch(action)
//                 })
//         }



// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
// type ActionsType =
//     | ReturnType<typeof removeTaskAC>
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof updateTaskAC>
//     | AddTodolistActionType
//     | RemoveTodolistActionType
//     | SetTodolistsActionType
//     | ReturnType<typeof setTasksAC>
// type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
