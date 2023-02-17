import React from "react";

export default function Home(props){
    const styles = {
        notesHolder:{
            width: '100%',
            height: '100%',
            padding: '30px',
            // backgroundColor: 'red',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            justifyContent: 'flex-start',
            alignItems: 'center',
            overflowY: 'scroll',
            overflowX: 'hidden'
        },
        note:{
            backgroundColor: '#333',
            color: '#fff',
            borderRadius: '10px',
            width: '100%',
            minHeight: '50px',
            maxWidth: '300px',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        },
        noteButtonHolder:{
            position: 'absolute',
            width: '100%',
            height:'100%',
            top: 0,
            left: 0,
            // backgroundColor: 'red',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
        },
        noteButtonI:{
            width: '50px',
            // height: '100%',
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '5px'
        },
        noteButtonII:{
            width: '50px',
            // height: '100%',
            backgroundColor: 'green',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '5px'
        },
        noteButtonIII:{
            width: '50px',
            // height: '100%',
            backgroundColor: 'red',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '5px'
        },
        closeAbout:{
            width: '30px',
            height: '30px',
            position: 'absolute',
            top:'10px',
            left:'10px',
            border:'none',
            borderRadius:'50%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            transition: 'all 0.5s ease'
        }
    }

    
    const notesTotal = props.allNotes.map((note)=>{
        function copyNote(){
            navigator.clipboard.writeText(`title : "${note.name} " \n content: "${note.content}"`)
            document.querySelector(".button-copy").classList.add("anim")
            
            setTimeout(function(){
                document.querySelector(".button-copy").classList.remove("anim")
            }, 3000)
        }


        return(
            <div style={styles.note} key={note.id} className="note">
                <div className="note-name">{note.name}</div>
                <div className="note-button-holder" style={styles.noteButtonHolder}>
                    <button className="button-copy" onClick={copyNote} style={styles.noteButtonI} ><i className="fa fa-copy"/></button>
                    <button onClick={props.editNote.bind(this, note.name, note.content, note.id)} style={styles.noteButtonII}><i className="fa fa-edit"/></button>
                    <button onClick={props.onDelete.bind(this,note.id)} style={styles.noteButtonIII}><i className="fa fa-trash"/></button>
                </div>
            </div>
        )
    })
    return(
    
        <div className={props.className}>
            <div className="navbar">NOTES</div>
            <div className="about" id="about" style={{transition: 'all 0.5s ease'}}>
                <span>
                    <p>*Notes was built</p>
                    <p>as a part of XoXo quick apps</p>
                    <p>compilation in 2023</p>
                </span>
                <a href="https://github.com/tertiux" rel="noreferrer" target="_blank">Learn more</a>
            </div>
            <div className="notes-holder" id="notesholder">
                {props.allNotes.length > 0 ? 
                <div className="notes" style={styles.notesHolder}>
                    {notesTotal}
                </div>:
                <div className="no-notes">
                    No Notes
                </div>}
            </div>
        </div>
    
    )
}