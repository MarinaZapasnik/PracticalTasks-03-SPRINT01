import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  children: React.ReactNode
  
}

export const Todolist = (props: PropsType)=> {
  //let [title, setTitle] = useState("")

  const titleRef = useRef<HTMLInputElement>(null)

  const addTask = () => {
    if (titleRef.current && titleRef.current.value) {
      props.addTask(titleRef.current.value);
      titleRef.current.value = "";
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //setTitle(e.currentTarget.value)
  }


  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  }

  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input ref={titleRef}
             onChange={onChangeHandler}
             onKeyDown={onKeyDownHandler}
      />
      <button onClick={addTask}>+</button>
    </div>
    <ul>
      {
        props.tasks.map(t => {

          const onClickHandler = () => props.removeTask(t.id)

          return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onClickHandler}>x</button>
          </li>
        })
      }
    </ul>
    <div>
      <button onClick={onAllClickHandler}>All</button>
      <button onClick={onActiveClickHandler}>Active</button>
      <button onClick={onCompletedClickHandler}>Completed</button>
    </div>
    <div>{props.children}</div>
  </div>
}
