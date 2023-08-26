import React, { Children, useEffect, useState } from "react";
import './style-Backlog.scss';
import './style-mainPage.scss';


import BlockForTasks from "../Blocks/BlockForTasks";

function MainPage () {

    //-- start -- for Block-BackLog -- start
    const [inputActive, setInputActive] = useState(false);
    const [inputvalue, setInputValue] = useState('');
    const [submitButton, setSubmitButton] = useState(false);
    const [validated, setValidated] = useState(false);

    const [tasksBacklog, setTasksBacklog] = useState(()=> {
        return JSON.parse(localStorage.getItem('list_backlog')) || []
    });
    
    // function for get new task in backlog input
    function getNewTask (e) {
        let newTaskName = e.currentTarget.value;
        setInputValue(newTaskName);
    };

    useEffect(()=> console.log(`inputvalue is : ${inputvalue? inputvalue: "no value"}`),[inputvalue])

    // funtion for view input backlog and write new Task
    function showInputBacklog() {
        setSubmitButton(!submitButton);
        setInputActive(!inputActive);
    };
    
    useEffect(()=> console.log(`Tasks is : ${tasksBacklog.length? JSON.stringify(tasksBacklog): "no tasks"}`),[tasksBacklog])
    useEffect(()=> console.log(`Submit button is ${submitButton}`),[submitButton])
    
    const DayTime = new Date();

 

    // function for add new task on list and show on block Backlog
    function submitNewTaskBacklog() {
        if(inputvalue !== "") {
            getNewArrayBlock(tasksBacklog,inputvalue,"backlog")
            
            localStorage.setItem('list_backlog', JSON.stringify(tasksBacklog));
        } 
        setInputValue('');
        setInputActive(!inputActive);
        setSubmitButton(!submitButton);
    };

    useEffect(()=> {
        localStorage.setItem('list_backlog', JSON.stringify(tasksBacklog)) 
    }, [tasksBacklog]);

    //-- end -- for Block-BackLog

     //-- start -- for Block-Ready -- start
     
     const [showSelect, setShowSelect] = useState(false);
     const [activeButtonReady, setActiveButtonReady] = useState(true);
     const [classNameForButtonReady, setClassNameForButtonReady] = useState('button_add');

     const [tasksReady, setTasksReady] = useState(()=> {
         return JSON.parse(localStorage.getItem('list_ready')) || []
     });

     useEffect(()=> {
        localStorage.setItem('list_ready', JSON.stringify(tasksReady)) 
    }, [tasksReady]);

     const [selectedTask, setSelectedTask] = useState('');

   
    function showSelectTasks() {
        setShowSelect(!showSelect)
        // setActiveButtonReady(true)
    }
    
    function SubmitNewReadyTask(e){
        let selectTask = e.target.textContent;
        setSelectedTask(selectTask);

        const filteredBacklog = tasksBacklog.filter((item) => selectTask !== item.title);

        setTasksBacklog(filteredBacklog)

        getNewArrayBlock(tasksReady,selectTask,"ready")

        localStorage.setItem('list_ready', JSON.stringify(tasksReady));
        setShowSelect(!showSelect)
    }

    useEffect(()=> {
        if(tasksBacklog.length !== 0) {
            setActiveButtonReady(false) 
            setClassNameForButtonReady('button_add active')
        } else {
            setActiveButtonReady(true)
            setClassNameForButtonReady('button_add')
        }
    },[tasksBacklog]);

    useEffect(()=> {
        if(inputvalue === "") {
            setValidated(false)
        } else {
            setValidated(true)
        }
    },[inputvalue])

    useEffect(()=> console.log(`Current selected Task From Ready Block is: ${selectedTask? selectedTask: "don`t select"}`),[selectedTask])

    function getNewArrayBlock(arr,name,block) {

        const newArray = [...arr, {
                title: name,
                id: Date.now(),
                status: block,
                describtions: `Task added in block:${block} ${Date.now()} in time: ${DayTime.getUTCHours()}`
            }]

            if(block === "backlog") {
                setTasksBacklog(newArray);
            } else if (block === "ready") {
                setTasksReady(newArray)
            }
    }
 
    return (
       <div className="blocks">
            <BlockForTasks
                classNameButtonSubmit = {validated ? "submit_button validated" : "submit_button"}
                classNameButtonAdd = {'button_add backlog'}
                tasks={tasksBacklog}
                title={"Backlog"}
                inputActive={inputActive}
                handleChangeInput={(e)=>getNewTask(e)}
                value={inputvalue}
                submit={submitButton}
                handleClickButtonAdd={showInputBacklog}
                handleClickButtonSubmit={submitNewTaskBacklog}
            ></BlockForTasks>
            
            <BlockForTasks
                tasks={tasksReady}
                tasksSelect={tasksBacklog}
                title={"Ready"}
                submit={false}
                disabledButton = {activeButtonReady}
                showSelect={showSelect}
                handleSelectTask={SubmitNewReadyTask}
                handleClickButtonAdd={activeButtonReady? null: showSelectTasks}
                classNameButtonAdd={classNameForButtonReady}
            ></BlockForTasks>

       </div>
    )
}

export default MainPage;
