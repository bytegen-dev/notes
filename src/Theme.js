import React from "react";

export default function Theme(props){
    return(
    
        <div className={props.className}>
            <div className="theme-changer">
                <i className="fa fa-adjust" />
            </div>
        </div>
    
    )
}