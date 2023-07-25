import React, { Children, useEffect, useState } from "react";
import ButtonElement from "../Button/Button";
import Input from "../input/input";
import TodoItem from "../Item/Task";


const BlockForTasks = ( props ) => {

    return (
            <div className={props.title}>
                <p>{props.title}</p>
                {
                    props.tasks.lenght !== 0? 
                    props.tasks.map(item=>
                        <TodoItem item = {item} className={"item-task"} key={item.id}/>
                ): ""
                }
                {
                    props.showInput?
                        <div className="container_newTask">
                            <Input
                                typeInput={"text"}
                                defaultClass={'input-task'}
                                onChange={props.handleChangeInput}
                                value={props.value}
                            /> 
                        </div> : null
                }
                {
                    <ButtonElement 
                        className={props.classNameButton}
                        handleClick={props.handleClickButton}
                        >
                        {props.showInput? '': props.imageForButton}{props.showInput? "Submit": "Add Card"}   
                    </ButtonElement>
                   
                }                
                
            </div>
    )
}

export default BlockForTasks;