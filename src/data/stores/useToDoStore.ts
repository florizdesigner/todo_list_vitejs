import create from 'zustand'

import { generateId } from '../helpers';

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

export const useToDoStore = create<ToDoStore>((set,get) => ({
    tasks: [],
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
        const { tasks } = get()
        set({
            tasks: tasks.map(task => ({
                    ...task,
                    title: task.id === id ? title : task.title
            }))
        })
    },
    deleteTask: (id) => {
        const { tasks } = get()
        set({
            tasks: tasks.filter(task => task.id !== id)
        })
    },
}))