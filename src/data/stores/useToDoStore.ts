import create, {State, StateCreator} from 'zustand'

import {generateId} from '../helpers';
import {devtools} from 'zustand/middleware';

interface Task {
    id: string;
    title: string;
    createdAt: number;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    deleteTask: (id: string) => void;
}

function isToDoStore(object: any): object is ToDoStore {
    return 'tasks' in object
}

// localStorageUpdate is middleware

const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
    if (isToDoStore(nextState)) {
        window.localStorage.setItem('tasks', JSON.stringify(
            nextState.tasks
        ))
    }
    set(nextState, ...args)
}, get, api)

const getCurrentState = () => {
    try {
        return JSON.parse(window.localStorage.getItem('tasks') || '[]' ) as Task [];
    } catch (err) {
        window.localStorage.setItem('tasks', '[]')
        alert(err)
    }

    return []

}

export const useToDoStore = create<ToDoStore>(localStorageUpdate(devtools((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title) => {
        const {tasks} = get()
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now()
        }

        set({
            tasks: [newTask].concat(tasks)
        })

        console.log(tasks)
    },
    updateTask: (id, title) => {
        const {tasks} = get()
        set({
            tasks: tasks.map(task => ({
                ...task,
                title: task.id === id ? title : task.title
            }))
        })
    },
    deleteTask: (id) => {
        const {tasks} = get()
        set({
            tasks: tasks.filter(task => task.id !== id)
        })
    },
}))))