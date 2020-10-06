import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";
import Loading from "./Loading";
import "../bootstrap.css";
import { Offline, Online } from "react-detect-offline";
import OOfline from "./Offline";

export default function ReqStatus(props) {
  const [loading, setloading] = useState("false");
  const reload = () => window.location.reload();
  const [text, settext] = useState("Request Status");
  const ReqSend = localStorage.getItem("ReqSend2");
  const ReqConfirmed = localStorage.getItem("ReqConfirmed2");
  const cancelReq = () => {
    setloading("true");
    axios
      .put(
        `https://111.125.159.243:5000/ReqUpdateCar/${localStorage.getItem(
          "Car_Id2"
        )}`
      )
      .then((res) => {
        setTimeout(() => {
          settext("Request Status");
        }, 1500);
      })
      .catch((err) => console.log(err));
    axios
      .put(
        `https://111.125.159.243:5000/UPClientCancel/${localStorage.getItem(
          "req2"
        )}`
      )
      .then((res) => {
        localStorage.removeItem("ReqSend2");
        localStorage.removeItem("ReqConfirmed2");
        localStorage.removeItem("ReqConfirmed2", true);
        localStorage.removeItem("Car_Id2");
        localStorage.removeItem("DTime2");
        localStorage.removeItem("PTime2");
        localStorage.removeItem("Way2");
        localStorage.removeItem("Car_Type2");
        localStorage.removeItem("Destination2");
        localStorage.removeItem("Driver_Number2");
        localStorage.removeItem(`req2`);
        localStorage.removeItem("like2");
        localStorage.removeItem("Travel2");
        localStorage.removeItem("date1");
        setloading("false");
        settext("Request Cancled");
        setTimeout(() => {
          settext("Request Status");
        }, 1500);
      })
      .catch((err) => console.log(err));
    axios
      .put(
        `https://111.125.159.243:5000/SaveReqID/${localStorage.getItem(
          "Employee_ID"
        )}`,
        {
          req1: localStorage.getItem("req1"),
          req2: "",
          req3: localStorage.getItem("req3"),
        }
      )
      .then((res) => {})
      .catch((err) => {
        alert(err);
      });
  };
  const startTravel = () => {
    axios
      .put(
        `https://111.125.159.243:5000/TUpdate/${localStorage.getItem(
          "Car_Id2"
        )}`,
        {
          start: localStorage.getItem("PTime2"),
          end: localStorage.getItem("DTime2"),
          d: localStorage.getItem("Destination2"),
        }
      )
      .then((res) => {
        localStorage.setItem("Travel2", true);
        settext("Travel Status Updated");
        setTimeout(() => {
          settext("Request Status");
        }, 3000);
      })
      .catch((err) => alert(err));
    axios
      .put(
        `https://111.125.159.243:5000/ReqSend/${localStorage.getItem(
          "Employee_ID"
        )}`,
        { travel: true }
      )
      .then((res) => {})
      .catch((err) => {});
  };
  const getReqData = () => {
    if (localStorage.getItem("ReqSend2")) {
      axios
        .get(`https://111.125.159.243:5000/REQ/${localStorage.getItem("req2")}`)
        .then((res) => {
          if (res.data.Confirm === "false") {
            settext("Request Still Not Confirmed");
            setTimeout(() => {
              settext("Request Status");
            }, 2000);
            setloading("false");
          } else if (res.data.Confirm === "true") {
            settext("Request Confirmed");
            setTimeout(() => {
              settext("Request Status");
            }, 3000);
            localStorage.setItem("ReqConfirmed2", true);
            localStorage.removeItem("ReqSend2");
            localStorage.setItem("Car_Id2", res.data.Car_Id);
            localStorage.setItem("DTime2", res.data.DTime);
            localStorage.setItem("PTime2", res.data.PTime);
            localStorage.setItem("Way2", res.data.Way);
            localStorage.setItem("Car_Type2", res.data.Car_Type);
            localStorage.setItem("Destination2", res.data.Destination);
            localStorage.setItem("Driver_Number2", res.data.N);
            reload();
          } else {
            axios
              .put(
                `https://111.125.159.243:5000/SaveReqID/${localStorage.getItem(
                  "Employee_ID"
                )}`,
                {
                  req2: "",
                }
              )
              .then((res) => {})
              .catch((err) => {
                alert(err);
              });
            settext("Request Rejected");
            setTimeout(() => {
              settext("Request Status");
            }, 3000);
            localStorage.removeItem("ReqConfirmed2");
            localStorage.removeItem("ReqSend2");
            localStorage.removeItem(`req2`);
            localStorage.removeItem("date2");
          }
        })
        .catch((err) => alert(err));
    }
  };
  if (localStorage.getItem("ReqConfirmed2")) {
    axios
      .put(
        `https://111.125.159.243:5000/REQ/${localStorage.getItem(
          "Employee_ID"
        )}`,
        {
          carid: localStorage.getItem("Car_Id2"),
          dtime: localStorage.getItem("DTime2"),
          ptime: localStorage.getItem("PTime2"),
          way: localStorage.getItem("Way2"),
          cartype: localStorage.getItem("Car_Type2"),
          destination: localStorage.getItem("Destination2"),
          drivernumber: localStorage.getItem("Driver_Number2"),
        }
      )
      .then((res) => {})
      .catch((err) => {});
  }
  const endTravel = () => {
    axios
      .put(
        `https://111.125.159.243:5000/FalseUpdateCar/${localStorage.getItem(
          "Car_Id2"
        )}`
      )
      .then((res) => {
        localStorage.removeItem("ReqSend2");
        localStorage.removeItem("ReqConfirmed2");
        localStorage.removeItem("ReqConfirmed2");
        localStorage.removeItem("Car_Id2");
        localStorage.removeItem("DTime2");
        localStorage.removeItem("PTime2");
        localStorage.removeItem("Way2");
        localStorage.removeItem("Car_Type2");
        localStorage.removeItem("Destination2");
        localStorage.removeItem("Driver_Number2");
        localStorage.removeItem("ReqSend2");
        localStorage.removeItem(`req2`);
        localStorage.removeItem("like2");
        localStorage.removeItem("Travel2");
        localStorage.removeItem("date2");
        reload();
      })
      .catch((err) => {
        alert(err);
        document.body.innerHTML = err;
      });
  };
  return (
    <div>
      {/* <Online> */}
      <div className="container">
        <Link to="/">
          <button className="btn btn-danger">Back</button>
        </Link>
        {loading === "true" ? (
          <Loading />
        ) : (
          <h1 className="text-center text-light display-3">{text}</h1>
        )}
        <div>
          <h1 className="text-center text-light lead mt-3">
            {ReqSend ? "Your Request Was Sended" : ""}
          </h1>
          {ReqConfirmed ? (
            <React.Fragment>
              <ul className="list-group list-group-sm">
                <li className="list-group-item">
                  Car ID : <span>{localStorage.getItem("Car_Id2")}</span>
                </li>
                <li className="list-group-item">
                  Pick up Time : <span>{localStorage.getItem("PTime2")}</span>
                </li>
                <li className="list-group-item">
                  Drop Time : <span>{localStorage.getItem("DTime2")}</span>
                </li>
                <li className="list-group-item">
                  Destination :
                  <span>{localStorage.getItem("Destination2")}</span>
                </li>
                <li className="list-group-item">
                  Car Type : <span>{localStorage.getItem("Car_Type2")}</span>
                </li>
                <li className="list-group-item">
                  Way : <span>{localStorage.getItem("Way2")}</span>
                </li>
                <li className="list-group-item">
                  Driver Number :
                  <span>{localStorage.getItem("Driver_Number2")}</span>
                </li>
              </ul>
            </React.Fragment>
          ) : (
            ""
          )}
          {ReqSend ||
            (ReqConfirmed && (
              <button
                onClick={cancelReq}
                className="btn btn-danger mt-1 col-12 col-md-12 col-lg-12 BTN"
              >
                Cancel Request
              </button>
            ))}
          {ReqSend && (
            <button
              onClick={cancelReq}
              className="btn btn-danger mt-2 col-12 col-md-12 col-lg-12 BTN"
            >
              Cancel Request
            </button>
          )}
          {ReqSend && (
            <button
              onClick={getReqData}
              className="btn btn-danger mt-1 col-12 col-md-12 col-lg-12 BTN"
            >
              Check For Acception Of Your Request
            </button>
          )}
          {!ReqConfirmed ||
            (!localStorage.getItem("Travel2") && (
              <button
                className="btn btn-danger mt-1 col-12 col-md-12 col-lg-12 BTN"
                onClick={startTravel}
              >
                Start Travel
              </button>
            ))}
          {ReqConfirmed && (
            <Link to="/Driver_Manner1">
              <button className="btn btn-danger mt-1 col-12 col-md-12 col-lg-12 BTN">
                Driver FeedBack
              </button>
            </Link>
          )}
          {ReqConfirmed && (
            <button
              onClick={endTravel}
              className="btn btn-danger mt-1 col-12 col-md-12 col-lg-12 BTN"
            >
              End Travel
            </button>
          )}
        </div>
      </div>
      {/* </Online>
      <Offline>
        <OOfline />
      </Offline> */}
    </div>
  );
}
