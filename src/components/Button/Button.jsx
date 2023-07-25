import React from "react";

function ButtonElement ({ 
    className, 
    handleClick,
    active,
    image,
    titleName,
    children
    }) {
    return (
        <button 
            className={className}
            onClick={handleClick}
            disabled={active}
            >
            {image}{titleName}{children}

    </button>
    )
}

export default ButtonElement;