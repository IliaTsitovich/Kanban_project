import React, { Children, useEffect, useState } from "react";
import ButtonElement from "../Button/Button";
import Input from "../input/input";
import TodoItem from "../Item/Task";
import FormSelect from "../form/form";
 
import '../Button/style_button.scss';


const BlockForTasks = ( props ) => {

    return (
        <>
            <div className={'block_components'}>
                <p>{props.title}</p>
                {
                    props.tasks.lenght !== 0? 
                    props.tasks.map(item=>
                        <TodoItem  
                        item = {item} 
                        className={"item-task"} 
                        newDescribtions={props.newDescribtions}
                        handleSubmitForm={props.handleSubmitForm}
                        handleChangeInputFormTask = {props.handleChangeInputFormTask}
                        changeContent={props.changeContent}
                        onChangeNewValueDescribtions={props.onChangeNewValueDescribtions}
                        key={item.id} />
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