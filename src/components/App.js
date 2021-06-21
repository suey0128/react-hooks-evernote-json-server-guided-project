import React, { useState, useEffect } from "react";
import { Route,Switch, useHistory } from "react-router-dom"
import Header from "./Header";
import NoteContainer from "./NoteContainer";
import BeforeLogin from "./BeforeLogin";
import SignUp from "./SignUp";
import Login from "./Login";



function App() {
  //user database 
  const [userArr, userArrSetter] =useState ([])

  //useHistoy 
  const history = useHistory();

  //fetch userdata from database
  useEffect(()=>{
    fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(data => userArrSetter(data) )
    .catch(error => console.error('Error:', error))

  },[])

    
  const onSignUpSubmit = (signUpUN, signUpE, signUpPD) => {
    console.log(signUpUN, signUpE, signUpPD);
    const newUser = {
      name:signUpUN,
      email: signUpE,
      password: signUpPD
    }

    //POST to the database 
    fetch(`http://localhost:3000/users`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(newUser)
      })
       .then(res => res.json())
       //push to NoteContainer page, pass down the userId to fetch data correctly
      .then(newUser => {
        history.push(`/${newUser.id}`);
      } )
      .catch(error => console.error('Error:', error))
  }

  const onLoginSubmit = (loginName,loginPD) => {
    // console.log(loginName,loginPD, userArr)

    //verify the loginName and loginPD
    const loginResult = userArr.filter(user => user.name === loginName && user.password === loginPD);
    if (loginResult.length > 0) {
      // console.log(loginResult[0].id)
      history.push(`/${loginResult[0].id}`);
    } else {
      alert("Incorrect username or password, please re-enter")
    }
  }


  return (
    <div className="app">
      <Header />

      <Switch>
        
        {/* <Route path="/beforelogin">
          <BeforeLogin />
        </Route> */}

        <Route path="/signup">
          <SignUp onSignUpSubmit={onSignUpSubmit}/>
        </Route>

        <Route path="/login">
          <Login onLoginSubmit={onLoginSubmit}/>
        </Route>
        
        <Route exact path="/">
           <BeforeLogin />
        </Route>

        <Route  path="/:userId">
          <NoteContainer history={history}/> 
        </Route>

      </Switch>
    </div>
  );
}

export default App;
