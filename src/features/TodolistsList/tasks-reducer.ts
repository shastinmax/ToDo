// @ts-ignore
// @ts-ignore
// @ts-ignore

import {addTodolistTC, fetchTodolistsTC, removeTodolistTC,} from './todolists-reducer'
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {AppRootStateType} from '../../app/store'
import {setAppStatusAC} from '../../app/app-reducer'
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
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
