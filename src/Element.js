import React from "react";

export default function Element(props){
    return(
        <div className={props.className} id="element">
            <h2>{props.name ? props.name : "Header"}</h2>
            <span>{props.content ? props.content : "There is no content here. this is a preview of the element page"}</span>
        </div>
    )
}