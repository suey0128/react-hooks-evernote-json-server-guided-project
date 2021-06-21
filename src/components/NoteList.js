import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notesArr, onSideBarLiClick, filteredNotes, notesArrSetter }) {

  return (
    <ul>
      {
      filteredNotes.map((note)=><NoteItem key={note.id} 
                                     note={note}
                                     onSideBarLiClick={onSideBarLiClick}
                                     notesArrSetter={notesArrSetter}
                                     notesArr={notesArr}
                                     />)
      }
    </ul>
  );
}

export default NoteList;
