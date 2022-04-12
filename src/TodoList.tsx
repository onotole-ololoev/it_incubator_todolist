import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TypePropsTitle = {
    title: string
    task: Array<TypePropsTask>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TypePropsTask = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TypePropsTitle) => {
    const [title, setTitle] = useState<string>('');
    const onClickAddTask = ()=> {
        const trimmedTitle = title.trim(); // не пускаем пустые строки и пробелы для ввода
        if (trimmedTitle) {
            props.addTask(title);
        }
        setTitle('');
    }
    const taskListItems = props.task.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => {props.removeTask(t.id)}}>delete</button>
            </li>
        )
    })

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }
    const changeFilter= (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }



    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    onChange={onChangeSetTitle}
                    value={title}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {taskListItems}
            </ul>
            <div>
                <button onClick={changeFilter('all')}>All</button>
                <button onClick={changeFilter('active')}>Active</button>
                <button onClick={changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;