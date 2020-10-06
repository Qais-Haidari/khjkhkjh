import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Drivers() {
  const [state, setstate] = useState("");
  const [text, settext] = useState("Driver Page");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (p) {
          const data = `Lat : ${p.coords.latitude} Lon : ${p.coords.longitude}`;
          Axios.put(
            `https://111.125.159.243:5000/CarLoc/${localStorage.getItem(
              "Employee_ID"
            )}`,
            { lat: p.coords.longitude, Lon: p.coords.longitude }
          )
            .then((res) => {
              {
                alert("Updated");
              }
            })
            .catch((err) => {
              if (err.dueToNoInternetConnection) {
                alert("Not Internet Connection");
              }
            });
          setstate(data);
        },
        function (e) {
          setstate(
            `PLEASE ALLOW GPS TO GET DATA Or Make Sure You Are Connected To Internet`
          );
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <div>
      <h1 className="display-2 text-center text-light">{text}</h1>
      <h1 className="display-5 text-center text-light mt-5">
        Driver Name : {localStorage.getItem("EmployeeName")}
      </h1>
      <h1 className="display-5 text-center text-light">
        Driver Number : {localStorage.getItem("PhoneNumber")}
      </h1>
      <h1 className="display-5 text-center text-light">
        Car ID : {localStorage.getItem("Employee_ID")}
      </h1>
      <p className="display-5 text-center text-light mt-5">{state}</p>
    </div>
  );
}
