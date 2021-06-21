import React from "react";
import NoteList from "./NoteList";

function Sidebar
({ notesArr, onSideBarLiClick,filteredNotes, notesArrSetter, params}) {

  const handleNewBtn = () => {
    //create a newLiObject
    const newLiObj = {
      userId: params.userId,
      title: "default",
      body: "placeholder",
      dateCreated: `${new Date().getMonth()+1}-${new Date().getDate()}-${new Date().getFullYear()}`, 
      dateEdited: `${new Date().getMonth()+1}-${new Date().getDate()}-${new Date().getFullYear()}`
    }

    //POST newLiObject to database & put newLiObject on DOM
    fetch(`http://localhost:3000/notes`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(newLiObj)
    })
    .then(res => res.json())
    .then(newLiObj => notesArrSetter([...notesArr, newLiObj]) )
    .catch(error => console.error('Error:', error))
  }




  return (
    <div className="master-detail-element sidebar">
      <NoteList notesArr={notesArr}
                onSideBarLiClick={onSideBarLiClick}
                filteredNotes={filteredNotes}
                notesArrSetter={notesArrSetter}
      />
      <button onClick={()=>{handleNewBtn()}}>New</button>
    </div>
  );
}

export default Sidebar;
