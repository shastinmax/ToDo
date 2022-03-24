import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";

export const handleServerAppError = (dispatch: any, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: any, data: any) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occured'))
    }
}