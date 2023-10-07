import React, { Children, useEffect, useState, useId} from "react";
import './style-Backlog.scss';
import './style-mainPage.scss';


import BlockForTasks from "../Blocks/BlockForTasks";

function MainPage () {
    
    
    // Array for Tasks - start-
    const [tasksBacklog, setTasksBacklog] = useState(()=> {
        return JSON.parse(localStorage.getItem('backlog')) || []
    });

    const [tasksReady, setTasksReady] = useState(()=> {
        return JSON.parse(localStorage.getItem('ready')) || []
    });

    const [tasksInPropgress, setTasksInPropgress] = useState(()=> {
        return JSON.parse(localStorage.getItem('in progress')) || []
    });
    const [tasksFinished, setTasksFinished] = useState(()=> {
        return JSON.parse(localStorage.getItem('finished')) || []
    });

    useEffect(()=> {
        localStorage.setItem('backlog', JSON.stringify(tasksBacklog)) 
    }, [tasksBacklog]);
    
    useEffect(()=> {
       localStorage.setItem('ready', JSON.stringify(tasksReady)) 
    }, [tasksReady]);
    
    useEffect(()=> {
       localStorage.setItem('in progress', JSON.stringify(tasksInPropgress)) 
    }, [tasksInPropgress]);

    useEffect(()=> {
       localStorage.setItem('finished', JSON.stringify(tasksFinished)) 
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
    
    
    
    
    // function for add new task on list and show on block Backlog
    function submitNewTaskBacklog() {
        if(inputvalue !== "") {
            getNewArrayBlock(tasksBacklog,inputvalue,"backlog")
            
            localStorage.setItem('backlog', JSON.stringify(tasksBacklog));
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

        const filteredBacklog = tasksBacklog.filter((item) => selectTask !== item.title);

        setTasksBacklog(filteredBacklog)

        getNewArrayBlock(tasksReady,selectTask,"ready")

        saveToLocalStorage('ready', tasksReady)
        setShowSelectReady(!showSelectReady);
    };

    function SubmitNewInProgressTask(e){
        let selectTask = e.target.textContent;

        const filteredBacklog = tasksReady.filter((item) => selectTask !== item.title);

        setTasksReady(filteredBacklog);

        getNewArrayBlock(tasksInPropgress,selectTask,"in progress");

        saveToLocalStorage('in progress', tasksInPropgress)
        setShowSelectInProgress(!showSelectInProgress);
    };

    function SubmitNewFinishedTask(e){
        let selectTask = e.target.textContent;

        const filteredBacklog = tasksInPropgress.filter((item) => selectTask !== item.title);

        setTasksInPropgress(filteredBacklog);

        getNewArrayBlock(tasksFinished,selectTask,"finished");

        saveToLocalStorage('finished', tasksFinished)
        setShowSelectFinished(!showSelectFinished);
    };


    function saveToLocalStorage(block, tasks) {
        localStorage.setItem(`${block}`, JSON.stringify(tasks));
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


    function getNewArrayBlock(arr,name,block,newDescriptions) {
        const dayTime = new Date();
        const elemId = Date.now();
        const newArray = [...arr, {
                title: name,
                id: elemId,
                status: block,
                descriptions: newDescriptions? 
                              newDescriptions : 
                              `Task added in block: "${block}" on time: ${dayTime.getHours()}:${dayTime.getMinutes() < 10? `0` + dayTime.getMinutes(): dayTime.getMinutes() } on day: ${dayTime.getDate()}.${dayTime.getMonth() + 1}.${dayTime.getFullYear()}`
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


    // начало реализации 
    function openDescribtions(e) {
        setShowDescribtions(!showDescribtions)
        const newBlock = e.currentTarget.dataset.block
        console.log(`current selected block is : ${newBlock}`)
        setCurrentBlockElem(newBlock)
        const newId = e.currentTarget.dataset.id;
        console.log(`current selected id-task is : ${newId}`)
        setCurrentIdElem(newId)

        console.log(showDescribtions)
        // return currentElementInTasks;
    }

    function getInfoTask(block,newId) {
        console.log("kakakak");
        console.log(block);
        console.log(newId);
    }

    const [showDescribtions, setShowDescribtions] = useState(false);

    const [currentBlockElem, setCurrentBlockElem] = useState('');
    const [currentIdElem, setCurrentIdElem] = useState();
    const [currentArray, setCurrentArray] = useState();
    const [currentElementInTasks, setCurrentElementInTasks] = useState();
    
    
    const [inputValueDescriptions, setInputValueDescriptions] = useState('');


    // useEffect(()=>console.log(currentBlockElem),[currentBlockElem])
    // useEffect(()=>console.log(currentIdElem),[currentIdElem])
    useEffect(()=> console.log(currentArray),[currentArray])
    useEffect(()=>console.log(currentElementInTasks),[currentElementInTasks])
    useEffect(()=>console.log(inputValueDescriptions),[inputValueDescriptions])
    
    
    
    function handleChangeInfoText(e) {
        setInputValueDescriptions(e.currentTarget.value);
    }
    
    //  эту функцию надо закинуть в ончанге
    function getNewDescribtions(block,describtions,currentId) {
        
    }


    function getItemOfArray(array,id) {
        
        for(let i = 0; i < array.length; i++) {
            if(array[i].id == id) {
               setCurrentElementInTasks(array[i]);
                break;
            }
        }
    }

    useEffect(()=>{
        if(currentBlockElem == "backlog") {
            setCurrentArray(tasksBacklog);
            getItemOfArray(tasksBacklog,currentIdElem)
        } else if (currentBlockElem === "ready") {
            setCurrentArray(tasksReady);
            getItemOfArray(tasksReady,currentIdElem)
        } else if (currentBlockElem === "in progress") {
            setCurrentArray(tasksInPropgress);
            getItemOfArray(tasksInPropgress,currentIdElem)
        } else if (currentBlockElem === 'finished') {
            setCurrentArray(tasksFinished);
            getItemOfArray(tasksFinished,currentIdElem)
        }
    },[showDescribtions])

    


    return (
       <div className="blocks">
            <BlockForTasks
                getInfoTask={(e)=>getInfoTask(e)}
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
                handleChangeInfo={(e)=>handleChangeInfoText(e)}
                saveInfo={()=>setShowDescribtions(false)}
                openDescriptions={(e)=>openDescribtions(e)}
                showDescribtions={showDescribtions}
                item = {currentElementInTasks}
                info = {true}
                array = {currentArray}
                selectedIdElement = {currentIdElem}
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
                handleChangeInfo={(e)=>handleChangeInfoText(e)}
                saveInfo={()=>setShowDescribtions(false)}
                openDescriptions={(e)=>openDescribtions(e)}
                showDescribtions={showDescribtions}
                item = {currentElementInTasks}
                info = {true}
                array = {currentArray}
                selectedIdElement = {currentIdElem}
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
                saveInfo={()=>setShowDescribtions(false)}
                openDescriptions={(e)=>openDescribtions(e)}
                showDescribtions={showDescribtions}
                item = {currentElementInTasks}
                info = {true}
                array = {currentArray}
                selectedIdElement = {currentIdElem}
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
                saveInfo={()=>setShowDescribtions(false)}
                openDescriptions={(e)=>openDescribtions(e)}
                showDescribtions={showDescribtions}
                item = {currentElementInTasks}
                info = {true}
                array = {currentArray}
                selectedIdElement = {currentIdElem}
            ></BlockForTasks>
       </div>
    )
}

export default MainPage;
