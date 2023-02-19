import React from "react";
import html2canvas from "html2canvas";

export default function Downloadbtn(props){
    var element = document.getElementById("element")
    // var download = document.getElementById("download")
    
    function downloadasImage(){
        console.log("download " + element)
        html2canvas(element)
        .then(function(canvas){
            const link = document.createElement("a")
            link.download = "note.png"
            link.href = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, "data:application/octet-stream");
            link.click()
        })
        

    }

    return(
        <div style={{borderColor: props.border}} className={props.className} onClick={downloadasImage}>
            <i className="fa fa-download" />
        </div>
    )
}