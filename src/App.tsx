import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';

// GUI
//CLI - command line interface
// C - create
// R - read
// U - update
// D - delete
export type FillterValueType = 'All' | 'Active' | 'Completed'

function App() {

    const todoListTitle: string = 'what to learn'

    const [tasks, setTasks] = useState([ //state, setState
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title, isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
    }

    const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All')

    const changeFilter = (filter: FillterValueType) => {
        setFilter(filter)
        console.log(filter)
    }
//UI^


    const removeTask = (taskID: string) => { //2
        setTasks(tasks.filter(t => t.id !== taskID)) // false
        return undefined
    }
//BLL:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasks}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                filter={filter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
