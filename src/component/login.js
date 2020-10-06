import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import Loading from "./Loading";

export default function Login() {
  const [loading, setloading] = useState("false");
  const [text, settext] = useState("Login With ID");
  const Reload = () => window.location.reload();
  const one = () => {
    const ID = document.getElementById("ID").value;
    if (!ID) {
      settext("Please Provide ID");
      setTimeout(() => {
        settext("Login With ID");
      }, 3000);
    } else {
      setloading("true");
      axios
        .get("https://111.125.159.243:5000/Logins/" + ID)
        .then((res) => {
          localStorage.setItem("Employee_ID", res.data.ID);
          // localStorage.setItem("Code", Math.floor(Math.random() * 100000));
          localStorage.setItem("EmployeeName", res.data.name);
          localStorage.setItem("PhoneNumber", res.data.Phone);
          settext("Registered");
          // axios
          //   .post(
          //     `http://10.10.48.66:3133/Default.aspx?msisdn=${
          //       res.data.Phone
          //     }&msg=${localStorage.getItem("Code")}`
          //   )
          //   .then((res) => {
          //     console.log(res);
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
          setloading("false");
          Reload();
        })
        .catch((err) => {
          if (err) {
            settext("We Cant Find Your ID");
            setTimeout(() => {
              settext("Login With ID");
            }, 3000);
          }
        });
    }
  };
  return (
    <div className="container">
      {loading === "true" ? (
        <React.Fragment>
          <h1 className="text-center text-light display-2">Loading ...</h1>
          <Loading />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1 className="text-center display-2 text-light">{text}</h1>
          <input
            id="ID"
            className="form-control text-center mt-3 col-md-12 col-sm-12 col-xs-12"
            placeholder="Employee ID"
          />
          <button
            onClick={one}
            className="btn btn-primary BTN mt-2 col-12 col-md-12 col-sm-12 col-xs-12"
          >
            Submit
          </button>
        </React.Fragment>
      )}
    </div>
  );
}
