import { useEffect, useState } from "react";
import React from "react";
import Home from "./Home";
import Theme from "./Theme";
import Newnote from "./Newnote";
import Ctabutton from "./Ctabutton";
import Editnote from "./Editnote";
import Preloader from "./Preloader";
import Downloadbtn from "./Doawnload";
import Element from "./Element";
import Preferences from "./Preferences";

export default function App(){
    const [uiSettings, setUiSettings] = useState({
        menuShow: false,
        darkmode: false,
        navbarColor: false,
        newNote: false,
        editNote: false,
        downloadNote: false,
    })

    const [downloadPreferences, setDownloadPreferences] = useState({
        bgColor: "white",
        textColor: "black",
    })

    function bgColorRed(){
        setDownloadPreferences((prevState)=>{
            return({
                textColor: "white",
                bgColor: "red"
            })
        })
    }

    function bgColorBlack(){
        setDownloadPreferences((prevState)=>{
            return({
                textColor: "white",
                bgColor: "black"
            })
        })
    }

    function bgColorWhite(){
        setDownloadPreferences((prevState)=>{
            return({
                textColor: "black",
                bgColor: "white"
            })
        })
    }

    function bgColorGreen(){
        setDownloadPreferences((prevState)=>{
            return({
                textColor: "white",
                bgColor: "green"
            })
        })
    }

    function bgColorPurple(){
        setDownloadPreferences((prevState)=>{
            return({
                textColor: "white",
                bgColor: "purple"
            })
        })
    }

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
        setNotes((prevState)=>{
            const newState = [
                ...prevState,
                {
                    name: currentNote.noteName,
                    content: currentNote.noteContent,
                    id: currentNote.noteName + Math.ceil(Math.random()*1000000),
                }
            ]
            localStorage.setItem('notes', JSON.stringify(newState));
            return(newState)})

        setTimeout(
            function(){
                setCurrentNote({noteName: "",
                noteContent: "",})
                gotoNewNoteX()
                setSaving(false)
                // localStorage.setItem('notes', JSON.stringify(notes));
            }, 500
        )
    }

    function deleteNote(id){
        setNotes((prevState)=>{
            const newState = prevState.filter((note)=>{
                return note.id !== id
            })
            localStorage.setItem('notes', JSON.stringify(newState));
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
        // localStorage.setItem('notes', JSON.stringify(notes));
        
        setTimeout(function(){
            setNotes((prevState)=>{
                const newState = prevState.filter((note)=>{
                    return note.id !== id
                })
                return (newState)
            })
            // localStorage.setItem('notes', JSON.stringify(notes));
        }, 500)
    }

    function toggleTheme(){
        setUiSettings((prevState)=>{
            return({...prevState, darkmode: !prevState.darkmode})
        })
    }

    function gotoDownload(){
        setUiSettings((prevState)=>{
            return({
                ...prevState, downloadNote: true
            })
        })
    }

    function gotoDownloadX(){
        setUiSettings((prevState)=>{
            return({
                ...prevState, downloadNote: false
            })
        })
    }

    useEffect(
        function(){
            const notesInStorage = JSON.parse(localStorage.getItem('notes')||'[]')
            console.log(notesInStorage)
            setNotes(notesInStorage)
        }, []
    )

    // useEffect(
    //     function(){
    //         const today = new Date()
    //         console.log(today)
    //         const hours = today.getHours()

    //         if(hours > 16 || hours < 0){
    //             setUiSettings((prevState)=>{
    //                 return({
    //                     ...prevState, darkmode: true
    //                 })
    //             })
    //         }
    //     }, []
    // )



    return(
        <div className={uiSettings.darkmode ? "dark container" : "container"}>
            <Home className="home" allNotes={notes} onDelete={deleteNote} editNote={editNote}/>
            <Theme className="theme" toggleTheme={toggleTheme}/>
            <Newnote
            className={uiSettings.newNote ? "show new-note type-big" : "new-note type-big"}
            goback={gotoNewNoteX}
            submit={addNote}
            onchange={handleChange}
            noteName={currentNote.noteName}
            noteContent={currentNote.noteContent}
            isSaving={saving}
            gotoDownload={gotoDownload}
            />
            <Editnote
            className={uiSettings.editNote ? "show new-note type-big" : "new-note type-big"}
            goback={gotoNewNoteX}
            submit={addNote}
            onchange={handleChange}
            noteName={currentNote.noteName}
            noteContent={currentNote.noteContent}
            isSaving={saving}
            gotoDownload={gotoDownload}
            />
            <div style={{color: downloadPreferences.textColor}} onClick={gotoDownloadX} className={uiSettings.downloadNote ? "show downloadX": "downloadX"}><i className="fa fa-arrow-left"/></div>
            <Ctabutton className="cta-button" goto={gotoNewNote}/>
            <Preloader />
            <Preferences
            setRed={bgColorRed}
            setBlack={bgColorBlack}
            setWhite={bgColorWhite}
            setGreen={bgColorGreen}
            setPurple={bgColorPurple}
            className={uiSettings.downloadNote?"show preferences" : "preferences"}
            />
            <Element bgColor={downloadPreferences.bgColor} textColor={downloadPreferences.textColor} className={uiSettings.downloadNote ? "show element" : "element"} name={currentNote.noteName} content={currentNote.noteContent}/>
            <Downloadbtn border={downloadPreferences.textColor} className={uiSettings.downloadNote ? "show download" : "download"}  />
        </div>
    )
}