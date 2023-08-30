import React, { useEffect, useState } from "react";
import { Children } from "react";
import ImageCross from '../../components/svg/cross-svgrepo-com.png';
import ButtonElement from "../Button/Button";
import Input from "../input/input";

import '../Item/style-task.scss';


function TodoItem ({item, className, changeContent,handleSubmitForm,handleChangeInputFormTask,newDescription},props) {

const [showDescribtions, setShowDescribtions] = useState(false);
const [inputValueDescriptions, setInputValueDescriptions] = useState('');

function openDescribtions() {
    setShowDescribtions(!showDescribtions)
}


useEffect(()=>console.log(`open dd if ${showDescribtions}`),[showDescribtions])
useEffect(()=>console.log(`value ddd ${inputValueDescriptions}`),[showDescribtions])

           return (
            <div 
                className={className}
                key={item.id}
                // onClick={openDescribtions}
                >
                        <h4 onClick={openDescribtions}>
                        {item.title}
                        </h4>
                {showDescribtions? 
                    <div className="block_describeTask">
                        <label className="title-descriptions">{item.title}</label>
                        {/* <div  className="icon-changeInfo"></div> */}
                        <div className="container_text-area" >
                        <form onSubmit={handleSubmitForm}>
                                <textarea value={newDescription} onChange={handleChangeInputFormTask} />
                            <input type="submit" value="Send" />
                        </form>
                            <div 
                                key={item.id}
                                data-value={item.status}
                                data-ok={item.id} 
                                data-title= {item.title}
                                onClick={changeContent}
                                onChange={props.onChangeNewValueDescribtions}
                                className="text-dscrbt">{item.describtions}</div>
                            <ButtonElement data-value={item.status} className="svg-icon" handleClick={openDescribtions}>
                                <svg  
                                    viewBox="0 0 1024 1024" 
                                    version="1.1" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M62.5371425 96.45714312A34.28571469 34.28571469 0 0 1 111.08571406 48.00000031l845.71428563 845.71428563a34.28571469 34.28571469 0 0 1-48.45714281 48.45714281L62.5371425 96.45714312z" fill="#515151" />
                                    <path d="M908.25142812 48.00000031a34.28571469 34.28571469 0 0 1 48.50285719 48.45714281l-845.71428562 845.71428563a34.28571469 34.28571469 0 0 1-48.45714281-48.45714281l845.71428562-845.71428563z" fill="#515151" />
                                </svg>
                            </ButtonElement>
                        </div>
                    </div>: null
                }
                </div>
            )
}
export default TodoItem;