import React, { useEffect, useState } from "react";
import { Children } from "react";
import ButtonElement from "../Button/Button";

import '../Item/style-task.scss';


function TodoItem ({item, className, openDescriptions},props) {

           return (
            <div 
                className={className}
                data-id = {item.id}
                data-block = {item.status}
                key={item.id}>
                    <h4 type="text" 
                        onClick={openDescriptions}
                        data-id = {item.id}
                        onChange = {(e)=>props.getInfoTask}
                        data-block = {item.status}
                        >
                            {item.title}
                        </h4>
            </div>
            )
}
export default TodoItem;