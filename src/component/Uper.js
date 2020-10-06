import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import img from "./img/Roshan-Afghanistan.jpg";
import Model from "./Model";
import Model2 from "./Model1";
import Model3 from "./Model2";
import { Offline, Online } from "react-detect-offline";
import OOfline from "./Offline";
import Drivers from "./Drivers";
import Loading from "./Loading";

export default function Uper() {
  const [text, settext] = useState("Updating Location");
  const [state, setstate] = useState({});
  const [loading, setloading] = useState("false");
  const reload = () => window.location.reload();
  useEffect(() => {
    setloading("true");
    axios
      .get(
        `https://111.125.159.243:5000/Logins/${localStorage.getItem(
          "Employee_ID"
        )}`
      )
      .then((res) => {
        if (res.data.Req1) {
          axios
            .get(`http://localhost:5000/REQ/${res.data.Req1}`)
            .then((res) => {
              console.log(res.data);
              if (res.data.Req_Id && res.data.Confirm === "false") {
                localStorage.setItem("req1", res.data.Req_Id);
                localStorage.setItem("ReqSend1", true);
              } else {
                localStorage.removeItem("req1", res.data.Req_Id);
                localStorage.removeItem("ReqSend1", true);
              }
              if (res.data.Req_Id && res.data.Confirm === "true") {
                localStorage.setItem("ReqConfirmed1", true);
                localStorage.setItem("Car_Id1", res.data.Car_Id);
                localStorage.setItem("DTime1", res.data.DTime);
                localStorage.setItem("PTime1", res.data.PTime);
                localStorage.setItem("Way1", res.data.Way);
                localStorage.setItem("Car_Type1", res.data.Car_Type);
                localStorage.setItem("Destination1", res.data.Destination);
                localStorage.setItem("Driver_Number1", res.data.N);
                localStorage.setItem("req1", res.data.Req_Id);
              }
            })
            .catch((err) => console.log(err));
        }
        if (res.data.Req2) {
          axios
            .get(`http://localhost:5000/REQ/${res.data.Req2}`)
            .then((res) => {
              if (res.data.Req_Id && res.data.Confirm === "false") {
                localStorage.setItem("req2", res.data.Req_Id);
                localStorage.setItem("ReqSend2", true);
              } else {
                localStorage.removeItem("req2", res.data.Req_Id);
                localStorage.removeItem("ReqSend2", true);
              }
              if (res.data.Confirm === "true") {
                localStorage.setItem("ReqConfirmed2", true);
                localStorage.removeItem("ReqSend2");
                localStorage.setItem("Car_Id2", res.data.Car_Id);
                localStorage.setItem("DTime2", res.data.DTime);
                localStorage.setItem("PTime2", res.data.PTime);
                localStorage.setItem("Way2", res.data.Way);
                localStorage.setItem("Car_Type2", res.data.Car_Type);
                localStorage.setItem("Destination2", res.data.Destination);
                localStorage.setItem("Driver_Number2", res.data.N);
                localStorage.setItem("req2", res.data.Req_Id);
              }
            })
            .catch((err) => console.log(err));
        }
        if (res.data.Req3) {
          axios
            .get(`http://localhost:5000/REQ/${res.data.Req3}`)
            .then((res) => {
              if (res.data.Req_Id && res.data.Confirm === "false") {
                localStorage.setItem("req3", res.data.Req_Id);
                localStorage.setItem("ReqSend3", true);
              } else {
                localStorage.removeItem("req3", res.data.Req_Id);
                localStorage.removeItem("ReqSend3", true);
              }
              if (res.data.Confirm === "true") {
                localStorage.setItem("ReqConfirmed3", true);
                localStorage.removeItem("ReqSend3");
                localStorage.setItem("Car_Id3", res.data.Car_Id);
                localStorage.setItem("DTime3", res.data.DTime);
                localStorage.setItem("PTime3", res.data.PTime);
                localStorage.setItem("Way3", res.data.Way);
                localStorage.setItem("Car_Type3", res.data.Car_Type);
                localStorage.setItem("Destination3", res.data.Destination);
                localStorage.setItem("Driver_Number3", res.data.N);
                localStorage.setItem("req3", res.data.Req_Id);
              }
              setloading("false");
            })
            .catch((err) => console.log(err));
        }
        if (res.data.Req1 === "") {
          localStorage.removeItem("req1");
          localStorage.removeItem("ReqSend1");
          localStorage.removeItem("ReqConfirmed1");
        }
        if (res.data.Req2 === "") {
          localStorage.removeItem("req2");
          localStorage.removeItem("ReqSend2");
          localStorage.removeItem("ReqConfirmed2");
        }
        if (res.data.Req3 === "") {
          localStorage.removeItem("req3");
          localStorage.removeItem("ReqSend3");
          localStorage.removeItem("ReqConfirmed3");
        }
        setloading("false");
      })
      .catch((err) => console.log(err));
    // reload();
  }, []);

  const Time = () => {
    let time = new Date(),
      Houre = time.getHours(),
      min = time.getMinutes();

    Houre = Houre % 12 || 12;
    const ampm = Houre >= 12 ? "AM" : "PM";
    let D = `${Houre}:${min}${ampm}`;
    return D;
  };
  setInterval(() => {
    Time();
  }, 1000);
  setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const data = {
          Lat: p.coords.latitude,
          Lon: p.coords.longitude,
        };
        setstate(data);
      },
      (e) => {
        setstate(`PLEASE ALLOW GPS TO GET DATA ${e}`);
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );
  }, 1000);

  const update = () => {
    axios
      .put(
        `http://LOCALHOST:5000/EMLOC/${localStorage.getItem("Employee_ID")}`,
        {
          lat: state.Lat,
          lon: state.Lon,
        }
      )
      .then((res) => {
        alert("Done");
      })
      .catch((err) => console.log(err));
  };

  if (localStorage.getItem("Employee_ID").split("").length < 5) {
    return (
      <React.Fragment>
        <Drivers />
      </React.Fragment>
    );
    // } else if (Time() > "5:00AM" && "12:00AM" < Time()) {
    //   return (
    //     <React.Fragment>
    //       <h1 className="text-center text-light display-4">
    //         Out Of Bussiness Houre
    //       </h1>
    //       <p className="display-4 text-light text-center">{Time()}</p>
    //     </React.Fragment>
    //   );
  } else {
    return (
      <div className="container">
        <Online>
          {loading === "true" ? (
            <React.Fragment>
              <h1 className="text-center text-light display-4">Loading ...</h1>
              <Loading />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <img src={img} alt="" />
              <div className="btn-div">
                <Model />
                <Model2 />
                <Model3 />
                <Link to={"/Map"}>
                  <button className="btn btn-primary mt-2 col-12 col-md-12">
                    View Map
                  </button>
                </Link>
                <Link to="/About">
                  <button className="btn btn-primary mt-2 col-12 col-md-12">
                    About
                  </button>
                </Link>
                <button
                  className="btn btn-primary mt-2 col-12 col-md-12"
                  onClick={update}
                >
                  {text}
                </button>
              </div>
            </React.Fragment>
          )}
        </Online>
        <Offline>
          <OOfline />
        </Offline>
      </div>
    );
  }
}
