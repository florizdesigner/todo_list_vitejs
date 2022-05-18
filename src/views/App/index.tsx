import React, {useEffect} from 'react';

import { useToDoStore } from '../../data/stores/useToDoStore'
import { InputPlus } from '../components/InputPlus';

import styles from './index.module.scss'
import {TaskTemplate} from '../components/TaskTemplate';

export const App: React.FC = () => {
    const [tasks, createTask, updateTask, deleteTask] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.deleteTask
    ])
    return (
        <article className={styles.article}>
            <section className={styles.articleSection}>
                <h1 className={styles.articleTitle}>to do app</h1>
                <InputPlus onAdd={(title) => { if (title) {createTask(title)}}}/>
            </section>
            <hr className={styles.articleLine} />
            <section className={styles.articleSection}>
                {(tasks.length == 0) ? <div className={styles.articleText}>Тут ничего нет</div> : tasks.map(task => {
                    return <TaskTemplate key={task.id} id={task.id} title={task.title} createdAt={task.createdAt} onDone={deleteTask} onEdited={updateTask} onRemove={deleteTask} />
                })}
            </section>
        </article>
    )
}