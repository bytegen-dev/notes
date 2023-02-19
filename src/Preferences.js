import React from "react";

export default function Preferences(props){
    return(
        <div className={props.className}>
            <button onClick={props.setRed} className="red"></button>
            <button onClick={props.setBlack} className="black"></button>
            <button onClick={props.setWhite} className="white"></button>
            <button onClick={props.setGreen} className="green"></button>
            <button onClick={props.setPurple} className="purple"></button>
        </div>
    )
}