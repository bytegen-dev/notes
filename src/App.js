import { useState } from "react";
import React from "react";
import Home from "./Home";
import Theme from "./Theme";
import Newnote from "./Newnote";
import Ctabutton from "./Ctabutton";
import Editnote from "./Editnote";
import Preloader from "./Preloader";

export default function App(){
    const [uiSettings, setUiSettings] = useState({
        menuShow: false,
        darkmode: false,
        navbarColor: false,
        newNote: false,
        editNote: false
    })

    const [notes, setNotes] = useState([])

    const [currentNote, setCurrentNote] = useState({
        noteName: "",
        noteContent: "",
    })

    function gotoNewNote(){
        setUiSettings((prevState)=>{
            return({...prevState, newNote: true})
        })
    }

    function gotoNewNoteX(){
        setUiSettings((prevState)=>{
            return({...prevState, newNote: false, editNote:false})
        })
    }

    function handleChange(event){
        const {name, value} = event.target

        setCurrentNote((prevState)=>{return({
            ...prevState, [name]: value
        })})
    }

    const [saving, setSaving] = useState(false)

    function addNote(event){
        event.preventDefault()
        setSaving(true)
        setNotes((prevState)=>{return(
            [
                ...prevState,
                {
                    name: currentNote.noteName,
                    content: currentNote.noteContent,
                    id: currentNote.noteName + Math.ceil(Math.random()*1000000),
                }
            ]
        )})

        setTimeout(
            function(){
                setCurrentNote({noteName: "",
                noteContent: "",})
                gotoNewNoteX()
                setSaving(false)
            }, 500
        )
    }

    function deleteNote(id){
        setNotes((prevState)=>{
            const newState = prevState.filter((note)=>{
                return note.id !== id
            })
            return (newState)
        })
    }
    
    function editNote(name, content, id){
        console.log("DELETE " + name, content, id)
        setUiSettings((prevState)=>{
            return({...prevState, editNote: true})
        })
        setCurrentNote({
            noteName: name,
            noteContent: content,
        })
        
        setTimeout(function(){
            setNotes((prevState)=>{
                const newState = prevState.filter((note)=>{
                    return note.id !== id
                })
                return (newState)
            })
        }, 500)
    }



    return(
        <div className="container">
            <Home className="home" allNotes={notes} onDelete={deleteNote} editNote={editNote}/>
            <Theme className="theme"/>
            <Newnote
            className={uiSettings.newNote ? "show new-note type-big" : "new-note type-big"}
            goback={gotoNewNoteX}
            submit={addNote}
            onchange={handleChange}
            noteName={currentNote.noteName}
            noteContent={currentNote.noteContent}
            isSaving={saving}
            />
            <Editnote
            className={uiSettings.editNote ? "show new-note type-big" : "new-note type-big"}
            goback={gotoNewNoteX}
            submit={addNote}
            onchange={handleChange}
            noteName={currentNote.noteName}
            noteContent={currentNote.noteContent}
            isSaving={saving}
            />
            <Ctabutton className="cta-button" goto={gotoNewNote}/>
            <Preloader />
        </div>
    )
}