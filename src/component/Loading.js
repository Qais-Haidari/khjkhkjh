import React from "react";
import ReactLoading from "react-loading";
import "../App.css";

const Loading = ({ type, color }) => (
  <ReactLoading
    type={"bubbles"}
    color={"red"}
    height={100}
    width={100}
    className="loading"
  />
);

export default Loading;
