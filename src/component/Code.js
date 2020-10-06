import React, { useState } from "react";
import axios from "axios";

export default function Code() {
  const [Code, setCode] = useState(0);
  const [state, setstate] = useState("Secret Code");
  const code = (e) => setCode(e.target.value);
  const reload = () => window.location.reload();
  const submit = () => {
    if (Code === localStorage.getItem("Code")) {
      localStorage.removeItem("Code");
      reload();
    } else {
      setstate("UnKnown Secret Code");
      setTimeout(() => {
        setstate("Secret Code");
      }, 3000);
    }
  };
  const resend = () => {
    axios
      .post(
        `http://10.10.48.66:3133/Default.aspx?msisdn=${localStorage.getItem(
          "PhoneNumber"
        )}&msg=${localStorage.getItem("Code")}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <h1 className="display-4 text-center text-light">{state}</h1>
      <input
        placeholder="Secret Code"
        className="form-control"
        onChange={code}
      />
      <button
        className="btn btn-danger col-md-12 col-sm-12 col-12"
        onClick={submit}
      >
        Submit
      </button>
      <button className="btn btn-danger btn-sm" onClick={resend}>
        Resend Code
      </button>
    </div>
  );
}
