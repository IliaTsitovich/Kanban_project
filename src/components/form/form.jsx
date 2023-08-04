import React from "react";
import { useState } from 'react';
import './style_selectItems.scss';
import TodoItem from "../Item/Task";

export default function FormSelect (props) {

    const arrowDownSelect = <svg width="18" height="12.5" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 0.5L11 13L19 0.5" stroke="black"/>
    </svg>
    
    const [openSelect, setOpenSelect] = useState(false);
    const [selectValue, setSelectValue]=useState('');

    function openSelectMenu(e) {
        e.preventDefault();
        setOpenSelect(!openSelect)
    }

    return (
        <>
        <div className="custom-select-container">
             <div className="selected-option" onClick={openSelectMenu}>
                {selectValue}{arrowDownSelect}
            </div>
        </div>
        <div className="container-select">
            {openSelect?
                <div className="options">
                    {props.tasksList.map((item) => (
                    <div key={item.id} className="select" onClick={() =>{}}>
                        <p className="select-item">{item.title}</p>
                    </div>
                    ))}
                </div> : null
            }
            </div>
        
        </>
      
    )
}