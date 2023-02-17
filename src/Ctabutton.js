import React from "react";

export default function Ctabutton(props){
    return(
    
        <div className={props.className} onClick={props.goto}>
            <i className="fa fa-plus"/>
        </div>
    
    )
}