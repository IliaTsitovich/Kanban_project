import React, { Children, useEffect, useState } from "react";
import './style-Backlog.scss';
import './style-mainPage.scss';


import BlockForTasks from "../Blocks/BlockForTasks";

function MainPage () {

    //-- start -- for Block-BackLog -- start
    const [inputActive, setInputActive] = useState(false);
    const [inputvalue, setInputValue] = useState('');
    const [activeButtonBacklog, setActiveButtonBacklog] = useState(false);
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
        setActiveButtonBacklog(!activeButtonBacklog);
        setInputActive(!inputActive);
    };
    
    useEffect(()=> console.log(`Tasks is : ${tasksBacklog.length? JSON.stringify(tasksBacklog): "no tasks"}`),[tasksBacklog])
    
    const DayTime = new Date();

    function getNewArrayBlock(arr,name,block) {

        const newArray = [...arr, {
                title: name,
                id: Date.now(),
                status: block,
                describtions: `Task created ${Date.now()} in time: ${DayTime.getUTCHours()}`
            }]

            setTasksBacklog(newArray);
    }

    // function for add new task on list and show on block Backlog
    function submitNewTaskBacklog() {
        if(inputvalue !== "") {
            getNewArrayBlock(tasksBacklog,inputvalue,"backlog")
            // let newTaskTitle = inputvalue;
            // let newTasks = [...tasksBacklog, {
            //     title: newTaskTitle,
            //     id: Date.now(),
            //     status: "backlog",
            //     describtions: `Task created ${Date.now()} in time: ${DayTime.getUTCHours()}`
            // }];
            // setTasksBacklog(newArray);
            setInputValue('');
            localStorage.setItem('list_backlog', JSON.stringify(tasksBacklog));
        } else {
           console.log("write new Task");
        }
        setInputActive(!inputActive);
        setActiveButtonBacklog(false);
    };

    useEffect(()=> {
        localStorage.setItem('list_backlog', JSON.stringify(tasksBacklog)) 
    }, [tasksBacklog]);

    //-- end -- for Block-BackLog

     //-- start -- for Block-Ready -- start
     
     const [showSelect, setShowSelect] = useState(false);
     const [activeButtonReady, setActiveButtonReady] = useState(false);
     const [tasksReady, setTasksReady] = useState(()=> {
         return JSON.parse(localStorage.getItem('list_ready')) || []
     });
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

        localStorage.setItem('list_ready', JSON.stringify(tasksReady));
    }

    

    useEffect(()=> console.log(`Current text content Selected Value is ${selectedTask}`),[selectedTask])
    


    // function showInput(e) {

    //     if(inputActive === true) {

    //         if(inputvalue !== "") {
                
    //             let newTaskTitle = inputvalue;
    //             let newTasks = [...tasksBacklog, {
    //                 title: newTaskTitle,
    //                 id: Date.now(),
    //                 status: "backlog",
    //                 describtions: `Task created ${Date.now()} in time: ${Date().getTime()}`
    //             }]
    //             setTasksBacklog(newTasks);
    //             setInputValue('');
    //             localStorage.setItem('list_backlog', JSON.stringify(tasksBacklog))
    //         }
    //         setInputActive(!inputActive)
    //     } else {
    //         setActiveButtonBacklog(false);
    //         setInputActive(true)
    //     }
    // }
    
 
    return (
       <container className="blocks">
            <BlockForTasks
                activeButton={activeButtonBacklog}
                tasks={tasksBacklog}
                title={"Backlog"}
                inputActive={inputActive}
                handleChangeInput={(e)=>getNewTask(e)}
                value={inputvalue}
                handleClickButtonAdd={showInputBacklog}
                handleClickButtonSubmit={submitNewTaskBacklog}
            ></BlockForTasks>
            
            <BlockForTasks
                tasks={tasksReady}
                tasksSelect={tasksBacklog}
                title={"Ready"}
                activeButton={activeButtonReady}
                showSelect={showSelect}
                handleSelectTask={SubmitNewReadyTask}
                handleClickButtonAdd={showSelectTasks}
            ></BlockForTasks>
       </container>
    )
}

export default MainPage;
