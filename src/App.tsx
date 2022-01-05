import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type todolistsType={
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todoListId1=v1()
    let todoListId2=v1()

    let [todolists, setTodolists] = useState<Array<todolistsType>>(
        [{id: todoListId1, title: 'What to learn', filter: 'all'},
                {id: todoListId2, title: 'What to buy', filter: 'all'}]
    )

    let [tasks, setTasks] = useState({
        [todoListId1]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListId2]:[
        {id: v1(), title: "HTML&CSS222", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false},
    ]
});


    function removeTask(todolistId:string,id: string) {
        setTasks({...tasks,[todolistId]:tasks[todolistId].filter(t=>t.id!==id)})

    }

    function addTask(todolistId:string,title: string) {
         let task = {id: v1(), title: title, isDone: false};
         setTasks({...tasks,[todolistId]:[task,...tasks[todolistId]]})

    }

    function changeStatus(todolistId:string,taskId: string, isDone: boolean) {
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(m=>m.id===taskId?{...m,isDone }:m)})
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }
    const removeTodolist=(todolistId:string)=>{
        setTodolists(todolists.filter(f=>f.id!==todolistId))
        delete tasks[todolistId]
    }


    function changeFilter(todolistId:string,value: FilterValuesType) {
        setTodolists(todolists.map(m=>m.id===todolistId?{...m,filter:value}:m))
    }


    return (
        <div className="App">
            {todolists.map(t=>{
                let tasksForTodolist = tasks[t.id];
                if (t.filter === "active") {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
                }
                if (t.filter === "completed") {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
                }
                // debugger
                return(
                    <Todolist title={t.title}
                              key={t.id}
                              todolistId={t.id}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={t.filter}
                              removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}

export default App;
