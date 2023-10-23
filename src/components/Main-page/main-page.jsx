import React, { Children, useEffect, useState, useId, useContext} from "react";
import { Context } from "../../context";
import './style-Backlog.scss';
import './style-mainPage.scss';


import BlockForTasks from "../Blocks/BlockForTasks";
import DescriptionsBlock from "../description/informations";

const MainPage = ({...props}) => {

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
            getNewArrayBlock(tasksBacklog,inputvalue,"backlog",'')
            
            localStorage.setItem('backlog', JSON.stringify(tasksBacklog));
        } 
        setInputValue('');
        setInputActive(!inputActive);
        setSubmitButton(!submitButton);
    };
    
    useEffect(()=> {
        inputvalue === ""? setValidated(false) : setValidated(true)
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
    

    function getNewArrayBlock(arr,name,block,newDescriptions) {

        const dayTime = new Date();
        const elemId = Date.now();
        const informations = newDescriptions? 
        newDescriptions : 
        `Task added in block: "${block}" on time: ${dayTime.getHours()}:${dayTime.getMinutes() < 10? `0` + dayTime.getMinutes(): dayTime.getMinutes() } on day: ${dayTime.getDate()}.${dayTime.getMonth() + 1}.${dayTime.getFullYear()}`;
        
        const newArray = [...arr, {
            title: name,
            id: elemId,
            status: block,
            descriptions: informations,
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

    const [valueInfoTask,setValueInfoTask] = useState();
    useEffect(()=>console.log(`value info task to send for new Array task is:` + valueInfoTask),[valueInfoTask])

    function getInformationsCurrentTask(array,value){
        for(let i = 0; i < array.length; i++) {
            if(array[i].id == value) {
                
                return setValueInfoTask(array[i].descriptions);
                
            }
        }
    }

    function SubmitNewReadyTask(e){
        let selectTask = e.target.textContent;
        let selectedId = e.currentTarget.dataset.id;
        console.log(`data-set id Task - selected:` + selectedId);
        getInformationsCurrentTask(tasksBacklog,selectedId)
        const filteredArray = tasksBacklog.filter((item) => selectTask !== item.title);

        setTasksBacklog(filteredArray)

        getNewArrayBlock(tasksReady,selectTask,"ready",valueInfoTask)
        
        saveToLocalStorage('ready', tasksReady)
        setShowSelectReady(!showSelectReady);
    };

    function SubmitNewInProgressTask(e){
        let selectTask = e.target.textContent;
       
        let selectedId = e.currentTarget.dataset.id;
        console.log(`data-set id Task - selected:` + selectedId);
        getInformationsCurrentTask(tasksReady,selectedId)
        const filteredArray = tasksReady.filter((item) => selectTask !== item.title);

        setTasksReady(filteredArray);

        getNewArrayBlock(tasksInPropgress,selectTask,"in progress",valueInfoTask);

        saveToLocalStorage('in progress', tasksInPropgress)
        setShowSelectInProgress(!showSelectInProgress);
    };

    function SubmitNewFinishedTask(e){
        let selectTask = e.target.textContent;
        let selectedId = e.currentTarget.dataset.id;
        console.log(`data-set id Task - selected:` + selectedId);
        getInformationsCurrentTask(tasksInPropgress,selectedId)
        const filteredArray = tasksInPropgress.filter((item) => selectTask !== item.title);

        setTasksInPropgress(filteredArray);

        getNewArrayBlock(tasksFinished,selectTask,"finished",valueInfoTask);

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

    // начало реализации 

    const [nameCurrentTask,setNameCurrentTask] = useState();
    useEffect(()=>console.log(nameCurrentTask),[nameCurrentTask])

    const openDescribtions = (e,block,id)=> {
        setShowDescribtions(!showDescribtions)
        setNameCurrentTask(e.target.textContent)

        console.log(block);
        console.log(`Click item with id №: ` + id);
       
        getItemOfArray(block,id)
    }

    const getItemOfArray = (block,id) => {
        let array;

        if(block == "backlog") {
            array = tasksBacklog;
            setCurrentArray(tasksBacklog);
            setCurrentBlockElem("backlog")
        } else if (block === "ready") {
            array = tasksReady;
            setCurrentArray(tasksReady);
            setCurrentBlockElem("ready")
        } else if (block === "in progress") {
            array = tasksInPropgress;
            setCurrentArray(tasksInPropgress);
            setCurrentBlockElem("in progress")
        } else if (block === 'finished') {
            array = tasksFinished;
            setCurrentArray(tasksFinished);
            setCurrentBlockElem("finished")
        }
        setCurrentIdElem(id)
        for(let i = 0; i < array.length; i++) {
            if(array[i].id == id) {
                
                return setCurrentElementInTasks(array[i]);
                
            }
        }
    }
    
    
    const [showDescribtions, setShowDescribtions] = useState(false);
    const [currentBlockElem, setCurrentBlockElem] = useState('');
    const [currentIdElem, setCurrentIdElem] = useState();
    const [currentArray, setCurrentArray] = useState();
    const [currentElementInTasks, setCurrentElementInTasks] = useState();
    const [describtions, setDescribtions] = useState();
    
    
    const handleChangeInfo = (e) => {
        let newInfo = e.target.value
        setDescribtions(newInfo)
        setValueInfoTask(newInfo)
    }
    
    
    // useEffect(()=>console.log(currentBlockElem),[currentBlockElem])
    useEffect(()=>console.log(`UseEffect: Current idElement is: ${currentIdElem}`),[currentIdElem])
    useEffect(()=> console.log(`currentArray is: ${JSON.stringify(currentArray)}`),[currentArray])
    useEffect(()=>console.log(currentElementInTasks),[currentElementInTasks])
    useEffect(()=>console.log(showDescribtions? "Block Information Tasks opened":"Block Information Tasks closed"),[showDescribtions])
    
    useEffect(()=>{
        console.log(describtions)
    },[describtions])

    
  
    const closeBlockInfo = () => {
        if(describtions != undefined) {
            const newFilter = currentArray.filter((item) => currentIdElem != item.id);
            console.log(newFilter);

            if(currentBlockElem == "backlog") {
                getNewArrayBlock(newFilter,nameCurrentTask,currentBlockElem,describtions)
                saveToLocalStorage(currentBlockElem, tasksBacklog)
            } else if (currentBlockElem === "ready") {
                getNewArrayBlock(newFilter,nameCurrentTask,currentBlockElem,describtions)
                saveToLocalStorage(currentBlockElem, tasksReady)
            } else if (currentBlockElem === "in progress") {
                getNewArrayBlock(newFilter,nameCurrentTask,currentBlockElem,describtions)
                saveToLocalStorage(currentBlockElem, tasksInPropgress)
            } else if (currentBlockElem === 'finished') {
                getNewArrayBlock(newFilter,nameCurrentTask,currentBlockElem,describtions)
                saveToLocalStorage(currentBlockElem, tasksFinished)
             }

        }
        

        setShowDescribtions(false)
    }
    
    
    return (
        <main>
            <div className="blocks">
             {
                showDescribtions?
                    <DescriptionsBlock
                        key = {currentElementInTasks.id + 1}
                        item =  {currentElementInTasks}
                        saveInfo={closeBlockInfo}
                        onChange = {(e)=>handleChangeInfo(e)}
                    />: null
            }
            <BlockForTasks
                classNameButtonSubmit = {validated ? "submit_button validated" : "submit_button"}
                classNameButtonAdd = {'button_add backlog'}
                tasks={tasksBacklog}
                title={"Backlog"}
                inputActive={inputActive}
                handleChangeInput={(e)=>getValueNewTask(e)}
                valueInputNewTask={inputvalue}
                submit={submitButton}
                handleClickButtonAdd={showInputBacklog}
                handleClickButtonSubmit={submitNewTaskBacklog}
                saveInfo={closeBlockInfo}
                handleChange = {(e)=>handleChangeInfo(e)}
                openDescriptions={openDescribtions}
                showDescribtions={showDescribtions}
                item = {currentElementInTasks}
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
                saveInfo={()=>setShowDescribtions(false)}
                openDescriptions={openDescribtions}
                showDescribtions={showDescribtions}
                item = {currentElementInTasks}
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
                openDescriptions={openDescribtions}
                showDescribtions={showDescribtions}
                item = {currentElementInTasks}
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
                openDescriptions={openDescribtions}
                showDescribtions={showDescribtions}
                item = {currentElementInTasks}
                array = {currentArray}
                selectedIdElement = {currentIdElem}
            ></BlockForTasks>
            </div>
       </main>
    )
}

export default MainPage;
