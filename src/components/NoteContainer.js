import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";
import SortBar from "./SortBar"

function NoteContainer({ history }) {
  //store the data comes back in to an state Array
  const [notesArr, notesArrSetter] = useState([])
  //the display object on NoteView
  const [noteOnDisplay, noteOnDisplaySetter] = useState({})
  //capture the in filter put value on Search
  const [filterInput, filterInputSetter] = useState("");
  //determine if show Editor or viewer
  const [showEditor, showEditorSetter] = useState(false)
  const [showViewer, showViewerSetter] = useState(false)



  //use param
  const params = useParams()

  //fetch data and display on the side bar
  useEffect(()=>{
    fetch("http://localhost:3000/notes")
    .then(res => res.json())
    //dateCreated and dateEdited key and value are added to the array that comes back when the keys are exist
    //fliter out the fetch data with userId
    .then(data => {
      const filteredByUserId = data.filter(note => note.userId === Number(params.userId))
      notesArrSetter(filteredByUserId.map((note) => 
        { 
          if(note.dateCreated === undefined ) { 
            return {id:note.id, userId: note.userId, title: note.title, body: note.body, dateCreated: "6-1-2021", dateEdited: "6-1-2021"}
          } else { return note }
        }))
    })
    .catch(error => console.error('Error:', error))
  },[params.userId])




  //handle the side bar click on NoteItem
  const onSideBarLiClick = (note) => {
    noteOnDisplaySetter(note);
    showViewerSetter(true)
    showEditorSetter(false)
  }

  //handle the filter change on Search
  const filteredNotes = notesArr.filter((note)=> 
    note.title.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase()) || 
    note.body.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase()))
  

  //handle the sortBarDate change on SortBar
  const onSortBarChange = (value) => {
    console.log(value) 

    if (value !== "SortingBy") {
      let originalArr = [...notesArr]
      const sortedArray =originalArr.sort((currentNote, nextNote) => {
        let currentNoteValue = new Date(`${currentNote[value].split("-")}`)
        let nextNoteValue = new Date(`${nextNote[value].split("-")}`)
      
        if (currentNoteValue < nextNoteValue) return 1;
        if (currentNoteValue > nextNoteValue) return -1;
        return 0;
      })
      notesArrSetter(sortedArray)
    }
  }

  //handle logout click 
  const logoutClickHandler = () => {
    history.push("/")
  }

  return (
    <>
      <button id="logoutBtn" onClick={()=>{logoutClickHandler()}}>Logout</button>
      <Search filterInputSetter={filterInputSetter}/>

      <SortBar onSortBarChange={onSortBarChange}
               notesArrSetter={notesArrSetter}
              
      />

      <div className="container">
        <Sidebar notesArr={notesArr}
                 onSideBarLiClick={onSideBarLiClick}
                 filteredNotes={filteredNotes}
                 notesArrSetter={notesArrSetter}
                 params={params}
        />

        <Content noteOnDisplay={noteOnDisplay}
                 showViewer={showViewer}
                 showEditor={showEditor}
                 showEditorSetter={showEditorSetter}
                 notesArrSetter={notesArrSetter}
                 showViewerSetter={showViewerSetter}
                 notesArr={notesArr}
        
        />
      </div>
    </>
  );
}

export default NoteContainer;
