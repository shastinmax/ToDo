
import {FilterValuesType} from "./App";

export const FilterReducer=(state:FilterValuesType,action:GeneralTYpe)=>{
    switch (action.type){
        case 'CHANGE-FILTER':{
            return action.payload.value
        }
        default: return state
    }
}

type GeneralTYpe=changeFilterType

type changeFilterType=ReturnType<typeof changeFilterAC>
export const changeFilterAC=(value:FilterValuesType)=>{
    return {
        type:'CHANGE-FILTER',
        payload:{
            value
        }
    } as const
}