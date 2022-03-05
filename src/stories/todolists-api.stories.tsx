import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    debugger
    useEffect(() => {

        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                debugger
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'AXIOS'
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, {
            withCredentials: true,
            headers: {
                'API-KEY': '1be3afd1-cb12-4713-953a-273c84cfad9b'
            }
        }).then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '847fb2e7-2dbb-418d-9ec9-f366fb125a4d'
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {
                withCredentials: true,
                headers: {
                    'API-KEY': '1be3afd1-cb12-4713-953a-273c84cfad9b'
                }
            }
        )
            .then(res => setState(res.data))

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'max'
        let todolistId = '40109dfd-fc29-46e8-b8bd-08a62a1e3657'
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, {
            withCredentials: true,
            headers: {
                'API-KEY': '1be3afd1-cb12-4713-953a-273c84cfad9b'
            }
        })
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
