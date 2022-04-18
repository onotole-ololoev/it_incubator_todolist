import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FillterValueType} from './App';

type TodoListPropsTitle = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (filter: FillterValueType) => void
    filter: FillterValueType
    changeTaskStatus: (taskID: string, isDone: boolean) => void

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type onChangeInputType = {
    e: void
}
export const TodoList: React.FC<TodoListPropsTitle> = (props: TodoListPropsTitle) => {
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const onClickAddTasks = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        } else {
            setError(true)
        }
          setTitle('')
    }


    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error) setError(false)
    }
    const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onClickAddTasks()
    }
    const changeFilter = (filter: FillterValueType) => {
        return (
            () => props.changeFilter(filter)
        )
    }
    const getTasksForRender = (tasks: Array<TaskType>, filter: FillterValueType) => {
        let tasksForRender;
        switch (filter) {
            case "Completed":
                tasksForRender = tasks.filter(t => t.isDone === true)
                break
            case "Active":
                tasksForRender = tasks.filter(t => t.isDone === false)
                break
            default:
                tasksForRender = tasks
        }
        return tasksForRender
    }
    const tasksForRender: Array<TaskType> = getTasksForRender(props.tasks, props.filter)

    const tasksListItems = tasksForRender.length ? tasksForRender.map(t => { //t=> {id:1, title: "HTML", isDone: true} ?
        const taskClasses = t.isDone ? "is-done" : "";
        const onChangeChangeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked) // чекбокс
        return (
                <li key={t.id}>
                    <input
                        onChange={onChangeChangeStatus}
                        type="checkbox"
                        checked={t.isDone}/>
                    <span className={taskClasses}>{t.title}</span>
                    <button onClick={() => props.removeTask(t.id)}>del</button>
                </li>
            )
        })
        : <span>No tasks with this filter</span>

    const allBtnClass = props.filter === 'All' ? 'active-filter' : ''
    const activeBtnClass = props.filter === 'Active' ? 'active-filter' : ''
    const completedBtnClass = props.filter === 'Completed' ? 'active-filter' : ''
    const inputClasses = error ? "error" : ""

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={title}
                        onChange={onChangeInput} // (e) => setTitle(e.currentTarget.value)}
                        onKeyPress={onKeyPressInput} // (e) => {if (e.key === 'Enter') onClickAddTasks()}}
                        className={ inputClasses }
                    />
                    <button onClick={onClickAddTasks}>+</button>
                    {error && <div className={"error-title"}>ERROR</div>}
                </div>
                <ul>
                    {tasksListItems}
                </ul>
                <div>
                    <button
                        className={allBtnClass}
                        // className={props.filter === "All" ? "active-filter" : ""}
                        onClick={changeFilter('All')}>All
                    </button>
                    {/*() => props.changeFilter('All')}>All</button>*/}
                    <button
                        className={activeBtnClass}
                        onClick={changeFilter('Active')}>Active
                    </button>
                    {/*{() => props.changeFilter('Active')}>Active</button>*/}
                    <button
                        className={completedBtnClass}
                        onClick={changeFilter('Completed')}>Completed
                    </button>
                    {/*{() => props.changeFilter('Completed')}>Completed</button>*/}

                </div>
            </div>
        </div>
    );
};

