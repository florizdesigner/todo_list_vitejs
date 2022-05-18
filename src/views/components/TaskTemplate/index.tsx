import React, {useCallback, useState} from 'react'

import styles from './index.module.scss'

interface TaskTemplateProps {
    id: string;
    title: string;
    createdAt: number;
    onDone: (id: string) => void;
    onEdited: (id: string, title: string) => void;
    onRemove: (id: string) => void;
}

export const TaskTemplate: React.FC<TaskTemplateProps> = ({id, title, onDone, onRemove, onEdited}) => {

    const [checked, setChecked] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [value, setValue] = useState(title)


    return <div className={styles.template}>
        <div className={styles.templateInputCheck}>
            <input type='checkbox'
                   checked={checked}
                   className={styles.templateCheckbox}
                   disabled={isEditMode}
                   onChange={(e) => {
                setChecked(e.target.checked)

                if (e.target.checked) {
                    onDone(id)
                }
            }}/>
        </div>

        {isEditMode ? <input className={styles.templateTitleEdit} value={value} onChange={(e) => setValue(e.target.value)} /> :
        <div className={styles.templateTitle} onClick={() => {

        }}>{title}</div>}
        <div className={styles.templateButtons}>
            <input type='button' className={isEditMode ? styles.templateButtonsDone : styles.templateButtonsEdit} onClick={() => {
                setIsEditMode(!isEditMode)
                if(isEditMode) {
                    onEdited(id, value)
                }
            }}/>
            <input type='button' className={styles.templateButtonsDelete} onClick={() => {
                if (confirm('are you sure?')) {
                    onRemove(id)
                }
            }}/>
        </div>
    </div>
}