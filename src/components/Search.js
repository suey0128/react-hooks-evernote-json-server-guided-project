import React from "react";

function Search({filterInputSetter}) {




  return (

    <div className="filter">
      <input id="search-bar" type="text" placeholder="Search Notes" 
             onChange={(e)=>{filterInputSetter(e.target.value)}}/>
    </div>
  );
}

export default Search;
