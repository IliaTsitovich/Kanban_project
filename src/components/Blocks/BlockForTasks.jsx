import React, { Children, useEffect, useState } from "react";
import ButtonElement from "../Button/Button";
import Input from "../input/input";
import TodoItem from "../Item/Task";
import FormSelect from "../form/form";
import DescriptionsBlock from "../description/informations";
 
import '../Button/style_button.scss';
import '../description/style_blockDescriptions.scss';


const BlockForTasks = ( props ) => {


    return (
        <>
            <div className={'block_components'}>
                <p>{props.title}</p>
                {
                    props.showDescribtions?
                    <DescriptionsBlock
                        saveInfo={props.saveInfo}
                        handleChangeInfo = {props.handleChangeInfo}
                        item = {props.item}
                        // selectedIdElement={props.selectedIdElement}
                    />:null
                }
                {
                    props.tasks.lenght !== 0? 
                    props.tasks.map(item=>
                        <TodoItem
                        key={item.id}  
                        item = {item}
                        data-id = {item.id}
                        data-block = {item.status} 
                        className={"item-task"}
                        getInfoTask={(e)=>props.getInfoTask(e.currentTarget.dataset.block, e.currentTarget.dataset.id)}
                        // handleChangeInfo={props.handleChangeInfo} 
                        // newDescribtions={props.newDescribtions}
                        // handleChangeInputFormTask = {props.handleChangeInputFormTask}
                        // onChangeNewValueDescribtions={props.onChangeNewValueDescribtions}
                        // key={item.id}
                        // info={item.descriptions}
                        // title={item.title}
                        // saveInfo={props.saveInfo}
                        // showDescribtions={props.showDescribtions}
                        openDescriptions={props.openDescriptions}
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
                                value={props.value}
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