import React, { Children, useEffect, useState } from "react";
import ButtonElement from "../Button/Button";
import Input from "../input/input";
import TodoItem from "../Item/Task";
import FormSelect from "../form/form";
import '../Button/style_button.scss';


const BlockForTasks = ( props ) => {

    return (
        <>
            <div className={props.title}>
                <p>{props.title}</p>
                {
                    props.tasks.lenght !== 0? 
                    props.tasks.map(item=>
                        <TodoItem  item = {item} className={"item-task"} key={item.id}/>
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
                {   props.activeButton ?
                    <ButtonElement  
                        className={props.classNameButtonSubmit}
                        handleClick={props.handleClickButtonSubmit}
                        showImage={false}
                        titleName={'Submit'}
                        active={props.disabledButton}
                    />
                    :
                    <ButtonElement
                        className={props.classNameButtonAdd}
                        handleClick={props.handleClickButtonAdd}
                        showImage={true}
                        titleName={'Add Card'}
                        active={props.disabledButton}
                    />
                }                
                
            </div>
        </>
            
    )
}

export default BlockForTasks;