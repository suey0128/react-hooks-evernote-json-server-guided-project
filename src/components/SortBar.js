import React from "react";

function SortBar({ onSortBarChange }) {

const sortBarHandler = (e) => {
    onSortBarChange(e.target.value)
}


    return (
  
      <div className="sortBar">  
        <select name="sortBar" onChange={(e)=>{sortBarHandler(e)}}>
          <option value="sortBy">Sort Notes By</option>
          <option value="dateCreated">Date Created</option>
          <option value="dateEdited">Date Edited</option>
      </select>
  
      </div>
    );
  }
  
  export default SortBar;