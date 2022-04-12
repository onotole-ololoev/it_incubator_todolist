import React, {useState} from 'react';
import './App.css';
import TodoList, {TypePropsTask} from "./TodoList";
import {v1} from "uuid";



export type FilterValuesType = "all" | "active" | "completed";

function App() {
    console.log(v1())

    const title = 'What to learn';
    let [tasks, setTasks] = useState<Array<TypePropsTask>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false}
    ])





    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
// добавляем новую таску
    const addTask = (title: string) => {
        // const newTask: TypePropsTask = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        // const copyTasks = [...tasks]
        // copyTasks.push(newTask)
        // setTasks(copyTasks)

        setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>("all");
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
        console.log(filter)
    }

    let tasksForRender;
    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(t => t.isDone === true)
            break
        case "active":
            tasksForRender = tasks.filter(t => t.isDone === false)
            break
        default:
            tasksForRender = tasks
    }

    return (
        <div className="App">
            <TodoList
                title={title}
                task={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
