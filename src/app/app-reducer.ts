import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}
const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
        }
    } catch (err) {

    }
})

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state: InitialStateType, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state: InitialStateType, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC} = slice.actions
// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.payload.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.payload.error}
//         case 'APP/SET-IS-INITIALIED':
//             return {...state, isInitialized: action.payload.value}
//         default:
//             return {...state}
//     }
// }


// export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
// export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
// export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIED', value} as const)


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>


// type ActionsType =
//     | SetAppErrorActionType
//     | SetAppStatusActionType
//     | ReturnType<typeof setAppInitializedAC>
