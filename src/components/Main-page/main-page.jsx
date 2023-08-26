import React, { Children, useEffect, useState } from "react";
import './style-Backlog.scss';
import './style-mainPage.scss';


import BlockForTasks from "../Blocks/BlockForTasks";

function MainPage () {
    
    // Array for Tasks - start-
    const [tasksBacklog, setTasksBacklog] = useState(()=> {
        return JSON.parse(localStorage.getItem('list_backlog')) || []
    });

    const [tasksReady, setTasksReady] = useState(()=> {
        return JSON.parse(localStorage.getItem('list_ready')) || []
    });

    const [tasksInPropgress, setTasksInPropgress] = useState(()=> {
        return JSON.parse(localStorage.getItem('list_inProgress')) || []
    });
    const [tasksFinished, setTasksFinished] = useState(()=> {
        return JSON.parse(localStorage.getItem('list_finished')) || []
    });

    useEffect(()=> {
        localStorage.setItem('list_backlog', JSON.stringify(tasksBacklog)) 
    }, [tasksBacklog]);
    
    useEffect(()=> {
       localStorage.setItem('list_ready', JSON.stringify(tasksReady)) 
    }, [tasksReady]);
    
    useEffect(()=> {
       localStorage.setItem('list_inProgress', JSON.stringify(tasksInPropgress)) 
    }, [tasksInPropgress]);

    useEffect(()=> {
       localStorage.setItem('list_finished', JSON.stringify(tasksFinished)) 
    }, [tasksFinished]);


    //-- start -- for Block-BackLog -- start
    const [inputActive, setInputActive] = useState(false);
    const [inputvalue, setInputValue] = useState('');
    const [submitButton, setSubmitButton] = useState(false);
    const [validated, setValidated] = useState(false);

    // function for get new task in backlog input
    function getValueNewTask (e) {
        let newTaskName = e.currentTarget.value;
        setInputValue(newTaskName);
    };
    
    // function for view input backlog and write new Task
    function showInputBacklog() {
        setSubmitButton(!submitButton);
        setInputActive(!inputActive);
    };
    
    
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
        if(inputvalue === "") {
            setValidated(false)
        } else {
            setValidated(true)
        }
    },[inputvalue])

    useEffect(()=> console.log(`inputvalue is : ${inputvalue? inputvalue: "no value"}`),[inputvalue])
    useEffect(()=> console.log(`Tasks is : ${tasksBacklog.length? JSON.stringify(tasksBacklog): "no tasks"}`),[tasksBacklog])
    useEffect(()=> console.log(`Submit button is ${submitButton}`),[submitButton])
    //-- end -- for Block-BackLog
    
    
    const [showSelectReady, setShowSelectReady] = useState(false);
    const [showSelectInProgress, setShowSelectInProgress] = useState(false);
    const [showSelectFinished, setShowSelectFinished] = useState(false);
    
    
    const [activeButtonReady, setActiveButtonReady] = useState(true);
    const [classNameForButtonReady, setClassNameForButtonReady] = useState('button_add');

    const [activeButtonInProgress, setActiveButtonInProgress] = useState(true);
    const [classNameForButtonInProgress, setClassNameForButtonInProgress] = useState('button_add');

    const [activeButtonFinished, setActiveButtonFinished] = useState(true);
    const [classNameForButtonFinished, setClassNameForButtonFinished] = useState('button_add');
    
    


    //  const [selectedTask, setSelectedTask] = useState('');

   
    function showSelectTasks(block) {
        if(block === 'ready') {
            setShowSelectReady(!showSelectReady)
        } 
        if(block === 'in progress') {
            setShowSelectInProgress(!showSelectInProgress)
        } 
        if(block === 'finished') {
            setShowSelectFinished(!showSelectFinished)
        } 
    }
    
    function SubmitNewReadyTask(e){
        let selectTask = e.target.textContent;
        // setSelectedTask(selectTask);

        const filteredBacklog = tasksBacklog.filter((item) => selectTask !== item.title);

        setTasksBacklog(filteredBacklog)

        getNewArrayBlock(tasksReady,selectTask,"ready")

        localStorage.setItem('list_ready', JSON.stringify(tasksReady));
        setShowSelectReady(!showSelectReady);
    };

    function SubmitNewInProgressTask(e){
        let selectTask = e.target.textContent;
        // setSelectedTask(selectTask);

        const filteredBacklog = tasksReady.filter((item) => selectTask !== item.title);

        setTasksReady(filteredBacklog);

        getNewArrayBlock(tasksInPropgress,selectTask,"in progress");

        localStorage.setItem('list_inProgress', JSON.stringify(tasksInPropgress));
        setShowSelectInProgress(!showSelectInProgress);
    };

    function SubmitNewFinishedTask(e){
        let selectTask = e.target.textContent;
        // setSelectedTask(selectTask);

        const filteredBacklog = tasksInPropgress.filter((item) => selectTask !== item.title);

        setTasksInPropgress(filteredBacklog);

        getNewArrayBlock(tasksFinished,selectTask,"finished");

        localStorage.setItem('list_finished', JSON.stringify(tasksFinished));
        setShowSelectFinished(!showSelectFinished);
    };



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
        if(tasksReady.length !== 0) {
            setActiveButtonInProgress(false) 
            setClassNameForButtonInProgress('button_add active')
        } else {
            setActiveButtonInProgress(true)
            setClassNameForButtonInProgress('button_add')
        }
    },[tasksReady]);

    useEffect(()=> {
        if(tasksInPropgress.length !== 0) {
            setActiveButtonFinished(false) 
            setClassNameForButtonFinished('button_add active')
        } else {
            setActiveButtonFinished(true)
            setClassNameForButtonFinished('button_add')
        }
    },[tasksInPropgress]);


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
            } else if (block === "in progress") {
                setTasksInPropgress(newArray)
            } else if (block === 'finished') {
                setTasksFinished(newArray)
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
                handleChangeInput={(e)=>getValueNewTask(e)}
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
                showSelect={showSelectReady}
                handleSelectTask={SubmitNewReadyTask}
                handleClickButtonAdd={activeButtonReady? null: ()=>showSelectTasks('ready')}
                classNameButtonAdd={classNameForButtonReady}
            ></BlockForTasks>

            <BlockForTasks
                tasks={tasksInPropgress}
                tasksSelect={tasksReady}
                title={"In Progress"}
                submit={false}
                disabledButton = {activeButtonInProgress}
                showSelect={showSelectInProgress}
                handleSelectTask={SubmitNewInProgressTask}
                handleClickButtonAdd={activeButtonInProgress? null: ()=>showSelectTasks('in progress')}
                classNameButtonAdd={classNameForButtonInProgress}
            ></BlockForTasks>

            <BlockForTasks
                tasks={tasksFinished}
                tasksSelect={tasksInPropgress}
                title={"Finished"}
                submit={false}
                disabledButton = {activeButtonFinished}
                showSelect={showSelectFinished}
                handleSelectTask={SubmitNewFinishedTask}
                handleClickButtonAdd={activeButtonFinished? null: ()=>showSelectTasks('finished')}
                classNameButtonAdd={classNameForButtonFinished}
            ></BlockForTasks>
       </div>
    )
}

export default MainPage;
