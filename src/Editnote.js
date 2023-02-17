import React from "react";

export default function Editnote(props){
    const savingBtn = document.getElementById('save')

    function touchStarted(){
        savingBtn.classList.add("anim")
    }

    function touchEnd(){
        savingBtn.classList.remove("anim")
    }


    return(
    
        <div className={props.className}>
            <div className="new-note-details">
                <h2>Edit Note</h2>
                <form onSubmit={props.submit}>
                    <input required onChange={props.onchange} value={props.noteName} name="noteName" placeholder="Title"/>
                    <textarea onChange={props.onchange} value={props.noteContent} name="noteContent" placeholder="your note"/>
                    <div className="advanced"></div>
                    <div className="buttons">
                        {/* <button id="cancel">cancel</button> */}
                        <button onTouchStart={touchStarted} onTouchEnd={touchEnd} id="save">{props.isSaving ? "saving" : "save"}</button>
                    </div>
                </form>
            </div>
            <div className="success"></div>
        </div>
    
    )
}