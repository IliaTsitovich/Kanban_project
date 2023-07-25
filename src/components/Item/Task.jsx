import React from "react";

function TodoItem ({item, className}) {
           return (
            <div className={className}
               key={item.id}>
                        <h4>
                        {item.title}
                        </h4>
                </div>
            )
}
export default TodoItem;