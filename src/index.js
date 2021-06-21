import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/brooke.css";
import App from "./components/App";

//import Router
import { BrowserRouter as Router} from "react-router-dom"

ReactDOM.render(
    <Router>
        <App />
    </Router>,
     document.getElementById("root"));
