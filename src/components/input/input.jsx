import React from "react";

function Input (props) {
    return(
        <input 
        type={props.typeInput}
        className={props.defaultClass}
        onChange={props.onChange}
        placeholder={props.placeholder} 
        value={props.value}
        />
    )
}

export default Input;