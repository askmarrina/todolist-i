import './App.css'
import { Todolist, TasksType } from "./components/Todolist.tsx";
import { useState } from "react";
import { v1 } from "uuid";
import { FilterValueType } from "./components/Todolist.tsx";

function App() {
    type TodoListType = {
        id: string;
        title: string;
        tasks: TasksType[];
        filter: FilterValueType;
    };

    const [todolists, setTodolists] = useState<TodoListType[]>([
        {
            id: v1(),
            title: "What to learn-1",
            tasks: [
                { id: v1(), title: "HTML&CSS", isDone: true },
                { id: v1(), title: "JS & TS", isDone: false },
            ],
            filter: 'All'
        },
        {
            id: v1(),
            title: "What to learn-2",
            tasks: [
                { id: v1(), title: "React", isDone: false },
                { id: v1(), title: "Redux", isDone: true },
            ],
            filter: 'All'
        },
    ]);

    const removeTask = (todolistId: string, taskId: string) => {
        setTodolists(todolists.map(tl =>
            tl.id === todolistId ? { ...tl, tasks: tl.tasks.filter(t => t.id !== taskId) } : tl
        ));
    };

    const addTask = (todolistId: string, title: string) => {
        const newTask: TasksType = { id: v1(), title, isDone: false };
        setTodolists(todolists.map(tl =>
            tl.id === todolistId ? { ...tl, tasks: [newTask, ...tl.tasks] } : tl
        ));
    };

    const changeIsDone = (todolistId: string, taskId: string, isDone: boolean) => {
        setTodolists(todolists.map(tl =>
            tl.id === todolistId ? {
                ...tl,
                tasks: tl.tasks.map(t => t.id === taskId ? { ...t, isDone } : t)
            } : tl
        ));
    };

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
    };

    const changeFilter = (todolistId: string, value: FilterValueType) => {
        setTodolists(todolists.map(tl =>
            tl.id === todolistId ? { ...tl, filter: value } : tl
        ));
    };

    return (
        <div className="app">
            {todolists.map(tl => {
                // фильтруем задачи по фильтру
                let tasksForTodolist = tl.tasks;
                if (tl.filter === 'Active') tasksForTodolist = tl.tasks.filter(t => !t.isDone);
                if (tl.filter === 'Completed') tasksForTodolist = tl.tasks.filter(t => t.isDone);

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={(taskId) => removeTask(tl.id, taskId)}
                        addTask={(title) => addTask(tl.id, title)}
                        changeIsDone={(taskId, isDone) => changeIsDone(tl.id, taskId, isDone)}
                        removeTodoList={() => removeTodolist(tl.id)}
                        changeFilter={(value) => changeFilter(tl.id, value)}
                    />
                );
            })}
        </div>
    );
}

export default App;
