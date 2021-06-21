import React, { useState } from "react";

function NoteEditor({noteOnDisplay, notesArrSetter, notesArr, onCanelBtnClick}) {
  //declare state to track the control form 
  const [editTitle, editTitleSetter] =useState(noteOnDisplay.title)
  const [editBody, editBodySetter] =useState(noteOnDisplay.body)


  //handle save btn
  const saveBtnHandler = (e, noteOnDisplay) => {
    e.preventDefault();

    const newEditing = {
      id: noteOnDisplay.id,
      userId: noteOnDisplay.userId,
      title: editTitle,
      body: editBody, 
      dateCreated: noteOnDisplay.dateCreated,
      dateEdited: `${new Date().getMonth()+1}-${new Date().getDate()}-${new Date().getFullYear()}`
    }

  
    //patch database & update the noteOnDisplay
    fetch(`http://localhost:3000/notes/${noteOnDisplay.id}`, {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(newEditing)
      })
       .then(res => res.json())
      .then(newEditing => console.log(newEditing) )
      .catch(error => console.error('Error:', error))

      //save change the sidebar
      const newSideBar = notesArr.map(note => {
        if (note.id === noteOnDisplay.id ) {
        return newEditing
      } else { return note
      }
    })
    notesArrSetter (newSideBar)
  }
  
  //handle cancel btn
  const cancelBtnHandler = () => {
    //the value back to initial 
    editTitleSetter(noteOnDisplay.title)
    editBodySetter(noteOnDisplay.body)

    //display note
    onCanelBtnClick()
  }

  return (
    <form className="note-editor" onSubmit={(e)=>{saveBtnHandler(e, noteOnDisplay)}}>
      <input type="text" name="title" value={editTitle} onChange={(e)=> {editTitleSetter(e.target.value)}}/>
      <textarea name="body" value={editBody} onChange={(e)=> {editBodySetter(e.target.value)}}/>
      <div className="button-row">
        <input className="button" type="submit" value="Save" />
        <button type="button" onClick={()=>{cancelBtnHandler()}}>Cancel</button>
      </div>
    </form>
  );
}

export default NoteEditor;
