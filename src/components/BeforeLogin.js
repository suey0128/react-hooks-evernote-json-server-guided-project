import React from "react";
import { Link } from "react-router-dom";

function BeforeLogin() {

  return (
    <div id="beforeLogin" maxWidth="sm">
        <h1>Welcome to Ever Note</h1>

        <h3>Ever Note gets your note safely stored and organized.</h3>

        <div>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
    </div>
  );
}

export default BeforeLogin;
