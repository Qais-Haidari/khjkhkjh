import React from "react";
import "../App.css";
import Login from "./login";
import Uper from "./Uper";
// import Code from "./Code";

export default function Home() {
  if (!localStorage.getItem("Employee_ID")) {
    return (
      <React.Fragment>
        <Login />
      </React.Fragment>
    );
    // } else if (localStorage.getItem("Code")) {
    //   return (
    //     <React.Fragment>
    //       <Code />
    //     </React.Fragment>
    //   );
  } else {
    return (
      <React.Fragment>
        <Uper />
      </React.Fragment>
    );
  }
}
