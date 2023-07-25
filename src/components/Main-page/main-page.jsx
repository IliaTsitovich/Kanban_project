import React, { Children, useEffect, useState } from "react";
import './style-Backlog.scss';
import scss from '../Button/_button.module.scss';

import BlockForTasks from "../Blocks/BlockForTasks";


const imageAddCard = <svg className="image-add-button" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 7H9V2C9 1.448 8.552 1 8 1C7.448 1 7 1.448 7 2V7H2C1.448 7 1 7.448 1 8C1 8.552 1.448 9 2 9H7V14C7 14.552 7.448 15 8 15C8.552 15 9 14.552 9 14V9H14C14.552 9 15 8.552 15 8C15 7.448 14.552 7 14 7Z" fill="#5E6C84"/>
                </svg>;


function MainPage () {

    const [inputActive, setInputActive] = useState(false);
    const [inputvalue, setInputValue] = useState('');
    const [classNameButton, setClassNameButton] = useState(scss.button_add)
    const [tasksBacklog, setTasksBacklog] = useState(()=> {
        return JSON.parse(localStorage.getItem('list_backlog')) || []
    });

    useEffect(()=> {
        localStorage.setItem('list_backlog', JSON.stringify(tasksBacklog)) 
    }, [tasksBacklog])

   
    
    function getNewTask (e) {
        let newTaskName = e.currentTarget.value;
        setInputValue(newTaskName);
       
    }

    useEffect(()=> console.log(`inputvalue is : ${inputvalue? inputvalue: "no value"}`),[inputvalue])
    useEffect(()=> console.log(`Tasks is : ${tasksBacklog.length? JSON.stringify(tasksBacklog): "no tasks"}`),[tasksBacklog])
    
    
    function showInput(e) {

        setClassNameButton(scss.submit_button)
        if(inputActive === true) {
            setClassNameButton(scss.button_add)

            if(inputvalue !== "") {
                let newTaskTitle = inputvalue;
                let newTasks = [...tasksBacklog, {
                    title: newTaskTitle,
                    id: Date.now(),
                    status: "backlog",
                    describtions: `Task created ${Date.now()} in time :`
                }]
                setTasksBacklog(newTasks);
                setInputValue('');
                localStorage.setItem('list_backlog', JSON.stringify(tasksBacklog))
            }

            setInputActive(!inputActive)
        } else {
            setInputActive(true)
        }
        
      
    }
    
 
    return (
       <>
            <BlockForTasks
                tasks={tasksBacklog}
                title={"Backlog"}
                showInput={inputActive}
                imageForButton={imageAddCard}
                handleChangeInput={(e)=>getNewTask (e)}
                value={inputvalue}
                handleClickButton={showInput}
                classNameButton={classNameButton}
            ></BlockForTasks>
       </>
    )
}

export default MainPage;
