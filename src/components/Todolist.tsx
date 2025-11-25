
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button.tsx";

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type FilterValueType = 'All' | 'Active' | 'Completed';

type TodolistProps = {
    id: string;
    title: string;
    tasks: TasksType[];
    removeTask: (taskId: string) => void;
    changeFilter: (value: FilterValueType) => void;
    addTask: (newTitle: string, todoListId: string) => void;
    changeIsDone: (taskId: string, isDone: boolean) => void;
    removeTodoList: () => void;
};

export const Todolist = ({
                             id,
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeIsDone,
                             removeTodoList
                         }: TodolistProps) => {

    const [newTitle, setNewTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterValueType>('All');

    const changeFilterHandler = (value: FilterValueType) => {
        changeFilter(value);
        setFilter(value);
    };

    // const addTaskHandler = () => {
    //     if (newTitle.trim()) {
    //         addTask(newTitle.trim());
    //         setNewTitle('');
    //     } else {
    //         setError('Title is required!');
    //     }
    // };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTaskHandler();
    };

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
        setError(null);
    };

    const onChangeHandler = (taskId: string, checked: boolean) => {
        changeIsDone(taskId, checked);
    };

    const removeTodoListHandler = () => {
        removeTodoList()
    }

    const addTaskHandler = () => {
        addTask(newTitle, id)
    }



    return (
        <div className="todolist">
            <h3>
                {title}
                <Button title={'x'} onClick={removeTodoListHandler} />
            </h3>
            <div>
                <input
                    value={newTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error' : ''}
                />
                <Button onClick={addTaskHandler} title={'+'} />
                {error && <h4 className='errorMessage'>{error}</h4>}
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                        <Button onClick={() => removeTask(task.id)} title={'x'} id={task.id}/>
                        <input type="checkbox" checked={task.isDone} onChange={e => onChangeHandler(task.id, e.currentTarget.checked)}/>
                        <span>{task.title}</span>
                    </li>
                ))}
            </ul>
            <div>
                <Button title='All' className={filter === 'All' ? 'activeFilter' : ''} onClick={() => changeFilterHandler('All')} id={id}/>
                <Button title='Active' className={filter === 'Active' ? 'activeFilter' : ''} onClick={() => changeFilterHandler('Active')} id={id}/>
                <Button title='Completed' className={filter === 'Completed' ? 'activeFilter' : ''} onClick={() => changeFilterHandler('Completed')} id={id}/>
            </div>
        </div>
    );
};
