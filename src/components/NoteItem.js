import React from "react";

function NoteItem({ note, onSideBarLiClick, notesArrSetter, notesArr }) {

  const sideBarLiClickHandler = (note) => {
    onSideBarLiClick(note);
  }

  const handleDelBtn = (e,delNote) => {
    e.stopPropagation();
    //make it disapprear from the DOM
    const deletedNoteArr = notesArr.filter((note) => note !== delNote )
    notesArrSetter(deletedNoteArr)

    //delete from server
    fetch(`http://localhost:3000/notes/${note.id}`, {
      method: 'DELETE',
      })
      .catch(error => console.error('Error:', error))

  }

  return (
    <li onClick={()=>{sideBarLiClickHandler(note)}}>
      <h2>{note.title}</h2>
      <p className="dateOnSideBar">
        {"Created on: " + note.dateCreated}
        <span>{" Edited on: " + note.dateEdited}</span>
      </p>
      <p>{note.body.slice(0,20)+'...'}</p>
      <button onClick={(e)=>{handleDelBtn(e,note)}}>Delete</button>
    </li>
  );
}

export default NoteItem;
