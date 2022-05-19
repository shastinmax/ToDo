import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const fetchTodolistsTC = createAsyncThunk('todolist/fetchTodolists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error) {
        // @ts-ignore
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null)
    }
})
export const removeTodolistTC = createAsyncThunk('todolist/removeTodolist', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(todolistId)
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {id: todolistId}
})

export const addTodolistTC = createAsyncThunk('todolist/addTodolist', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTodolist(title)
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todolist: res.data.data.item}
})

export const changeTodolistTitleTC = createAsyncThunk('todolist/changeTodolistTitle', async (param: { id: string, title: string}, {
    dispatch,
    rejectWithValue
}) => {
  await todolistsAPI.updateTodolist(param.id, param.title)
       return {id: param.id, title: param.title}

})



const initialState: Array<TodolistDomainType> = []
const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        changeTodolistFilterAC(state: any, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex((tl: { id: string; }) => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state: any, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex((tl: { id: string; }) => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },

    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state: any, action) => {
            return action.payload.todolists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: 'idle'
            }))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state: any, action) => {
            const index = state.findIndex((tl: { id: string; }) => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state: any, action) => {
            state.unshift({
                ...action.payload.todolist,
                filter: 'all',
                entityStatus: 'idle'
            })
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state: any, action) => {
            const index = state.findIndex((tl: { id: string; }) => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})

export const todolistsReducer = slice.reducer
export const {
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
} = slice.actions
// export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
//     switch (action.type) {
//         // case 'REMOVE-TODOLIST':
//         //     return state.filter(tl => tl.id != action.id)
//         // case 'ADD-TODOLIST':
//         //     return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
//         //
//         // case 'CHANGE-TODOLIST-TITLE':
//         //     return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
//         // case 'CHANGE-TODOLIST-FILTER':
//         //     return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//         // case 'CHANGE-TODOLIST-ENTITY-STATUS':
//         //     return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
//         case 'SET-TODOLISTS':
//             return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
//         default:
//             return state
//     }
// }

// actions
// export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
// export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
// export const changeTodolistTitleAC = (id: string, title: string) => ({
//     type: 'CHANGE-TODOLIST-TITLE',
//     id,
//     title
// } as const)
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
//     type: 'CHANGE-TODOLIST-FILTER',
//     id,
//     filter
// } as const)
// export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
//     type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status } as const)
// export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
