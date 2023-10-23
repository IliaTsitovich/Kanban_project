import React, { Children, useContext, useEffect, useId, useState} from "react";
import ButtonElement from "../Button/Button";
import Input from "../input/input";
import TodoItem from "../Item/Task";
import FormSelect from "../form/form";
import DescriptionsBlock from "../description/informations";
import { Context } from "../../context";
 
import '../Button/style_button.scss';
import '../description/style_blockDescriptions.scss';


const BlockForTasks = (props) => {

    // const [inputValueDescriptions, setInputValueDescriptions] = useState('');
    // useEffect(()=>console.log(inputValueDescriptions),[inputValueDescriptions])


    // const {name,setName} = useContext(Context)
    // useEffect(()=>{console.log(name);},[name])

    // const handleChangeInfo = (value)=> {
    //     console.log(value);
    //     setInputValueDescriptions(value)
    // }
    
 
   

    return (
        <>
            <div className={'block_components'}>
                <p>{props.title}</p>
                {/* {
                    props.showDescribtions?
                    <DescriptionsBlock
                        item =  {props.item}
                        saveInfo={props.saveInfo}
                        onChange = {props.handleChange}
                    />: ""
                } */}
                {
                    props.tasks.lenght !== 0? 
                    props.tasks.map(item=>
                        <TodoItem
                        key={item.id}  
                        item = {item}
                        data-id = {item.id}
                        data-block = {item.status}
                        data-info = {item.descriptions} 
                        className={"item-task"}
                        openDescriptions={(e)=>props.openDescriptions(e,e.currentTarget.dataset.block, e.currentTarget.dataset.id, e.currentTarget.dataset.info)}
                        />
                ): null
                }
                {
                    props.inputActive?
                        <div className="container_newTask">
                            <Input
                                typeInput={"text"}
                                defaultClass={'input-task'}
                                onChange={props.handleChangeInput}
                                value={props.valueInputNewTask}
                                placeholder={"Write new Task..."}
                            /> 
                        </div> : null
                }
                {props.showSelect?
                 <FormSelect 
                    tasksList = {props.tasksSelect} 
                    handleSelectTask={props.handleSelectTask}
                    /> : null
                }
                    <ButtonElement
                        className={props.submit? props.classNameButtonSubmit : props.classNameButtonAdd}
                        handleClick={props.submit? props.handleClickButtonSubmit : props.handleClickButtonAdd}
                        titleName={props.submit? "Submit":'Add Card'}
                        active={props.disabledButton}
                    />
                
            </div>
            
        </>
            
    )
}

export default BlockForTasks;