import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { Offline, Online } from "react-detect-offline";
import OOfline from "./Offline";

export default function About() {
  return (
    <div>
      <Online>
        <Link to="/">
          <button className="btn btn-danger">Back</button>
        </Link>
        <div className="container TOPMIN">
          <h1 className="display-4 text-center text-light">
            Roshan Tracking App Detail
          </h1>
          <ul className="list-group">
            <li className="list-group-item mt-1 text-primary text-center">
              Your Information Has Been Stored When Your Logined In First Glance
            </li>
            <li className="list-group-item mt-1 text-primary text-center">
              Your Information Send With Your Request Details
            </li>
            <li className="list-group-item mt-1 text-center text-primary">
              Car Location Updaing Every 2 Minutes
            </li>
            <li className="list-group-item mt-1 text-center text-primary">
              Car Reqeust And Driver Detail Are Stored In Request Status Page
            </li>
            <li className="list-group-item mt-1 text-center text-primary">
              Information
            </li>
          </ul>
        </div>
      </Online>
      <Offline>
        <OOfline />
      </Offline>
    </div>
  );
}
