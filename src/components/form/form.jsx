import React from "react";
import { useState } from 'react';
import './style_selectItems.scss';

export default function FormSelect (props) {

    const [openSelect, setOpenSelect]=useState(false);
    
    function openSelectMenu(e) {
        setOpenSelect(!openSelect)
    }

    return (
        <>
        <div className="custom-select-container" onClick={openSelectMenu}>
           
        </div>
        <div className="container-select">
            {openSelect?
                <ul className="options">
                    {props.tasksList.map((item) => (
                    <li key={item.id} data-id = {item.id} className="select" onClick={props.handleSelectTask} >
                        <h4 className="option-item" >{item.title}</h4>
                    </li>
                    ))}
                </ul> : null
            }
            </div>
        </>
      
      )
    }