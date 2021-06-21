import React from "react";

function NoteViewer({noteOnDisplay, showEditorSetter}) {

  const handlerEditBtn = () => {
    showEditorSetter(true)
  }

  return (
    <>
      <h2>{noteOnDisplay.title}</h2>
      <div className="dateContainerOnViewer">
        <p className="dateOnViewer">Created on {noteOnDisplay.dateCreated}</p>
        <p className="dateOnViewer">Edited on {noteOnDisplay.dateEdited}</p>
      </div>
      <p>{noteOnDisplay.body}</p>
      <button onClick={(e)=>{handlerEditBtn()}}>Edit</button>
    </>
  );
}

export default NoteViewer;
