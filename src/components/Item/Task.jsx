import React from "react";

function TodoItem ({item, className},props) {
           return (
            <div 
                className={className}
                key={item.id}
                onClick={props.onClickItem}
                >
                        <h4>
                        {item.title}
                        </h4>
                </div>
            )
}
export default TodoItem;