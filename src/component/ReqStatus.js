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
  const ReqSend = localStorage.getItem("ReqSend1");
  const ReqConfirmed = localStorage.getItem("ReqConfirmed1");
  const cancelReq = () => {
    setloading("true");
    axios
      .put(
        `https://111.125.159.243:5000/ReqUpdateCar/${localStorage.getItem(
          "Car_Id1"
        )}`
      )
      .then((res) => {})
      .catch((err) => console.log(err));
    axios
      .put(
        `https://111.125.159.243:5000/UPClientCancel/${localStorage.getItem(
          "req1"
        )}`
      )
      .then((res) => {
        localStorage.removeItem("ReqSend1");
        localStorage.removeItem("ReqConfirmed1");
        localStorage.removeItem("ReqConfirmed1", true);
        localStorage.removeItem("Car_Id1");
        localStorage.removeItem("DTime1");
        localStorage.removeItem("PTime1");
        localStorage.removeItem("Way1");
        localStorage.removeItem("Car_Type1");
        localStorage.removeItem("Destination1");
        localStorage.removeItem("Driver_Number1");
        localStorage.removeItem(`req1`);
        localStorage.removeItem("like1");
        localStorage.removeItem("Travel1");
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
          req1: "",
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
          "Car_Id1"
        )}`,
        {
          start: localStorage.getItem("PTime1"),
          end: localStorage.getItem("DTime1"),
          d: localStorage.getItem("Destination1"),
        }
      )
      .then((res) => {
        localStorage.setItem("Travel1", true);
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
    if (localStorage.getItem("ReqSend1")) {
      axios
        .get(`https://111.125.159.243:5000/REQ/${localStorage.getItem("req1")}`)
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
            localStorage.setItem("ReqConfirmed1", true);
            localStorage.removeItem("ReqSend1");
            localStorage.setItem("Car_Id1", res.data.Car_Id);
            localStorage.setItem("DTime1", res.data.DTime);
            localStorage.setItem("PTime1", res.data.PTime);
            localStorage.setItem("Way1", res.data.Way);
            localStorage.setItem("Car_Type1", res.data.Car_Type);
            localStorage.setItem("Destination1", res.data.Destination);
            localStorage.setItem("Driver_Number1", res.data.N);
            reload();
          } else {
            axios
              .put(
                `https://111.125.159.243:5000/SaveReqID/${localStorage.getItem(
                  "Employee_ID"
                )}`,
                {
                  req1: "",
                  req2: localStorage.getItem("req2"),
                  req3: localStorage.getItem("req3"),
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
            localStorage.removeItem("ReqConfirmed1");
            localStorage.removeItem("ReqSend1");
            localStorage.removeItem(`req1`);
            localStorage.removeItem("date1");
          }
        })
        .catch((err) => alert(err));
    }
  };
  if (localStorage.getItem("ReqConfirmed")) {
    axios
      .put(
        `https://111.125.159.243:5000/REQ/${localStorage.getItem(
          "Employee_ID"
        )}`,
        {
          carid: localStorage.getItem("Car_Id1"),
          dtime: localStorage.getItem("DTime1"),
          ptime: localStorage.getItem("PTime1"),
          way: localStorage.getItem("Way1"),
          cartype: localStorage.getItem("Car_Type1"),
          destination: localStorage.getItem("Destination1"),
          drivernumber: localStorage.getItem("Driver_Number1"),
        }
      )
      .then((res) => {})
      .catch((err) => {});
  }
  const endTravel = () => {
    axios
      .put(
        `https://111.125.159.243:5000/FalseUpdateCar/${localStorage.getItem(
          "Car_Id"
        )}`
      )
      .then((res) => {
        localStorage.removeItem("ReqSend1");
        localStorage.removeItem("ReqConfirmed1");
        localStorage.removeItem("Car_Id");
        localStorage.removeItem("DTime");
        localStorage.removeItem("PTime");
        localStorage.removeItem("Way");
        localStorage.removeItem("Car_Type");
        localStorage.removeItem("Destination");
        localStorage.removeItem("Driver_Number");
        localStorage.removeItem("ReqSend");
        localStorage.removeItem("req1");
        localStorage.removeItem("like");
        localStorage.removeItem("Travel");
        localStorage.removeItem("date1");
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
                  Car ID : <span>{localStorage.getItem("Car_Id1")}</span>
                </li>
                <li className="list-group-item">
                  Pick up Time : <span>{localStorage.getItem("PTime1")}</span>
                </li>
                <li className="list-group-item">
                  Drop Time : <span>{localStorage.getItem("DTime1")}</span>
                </li>
                <li className="list-group-item">
                  Destination :
                  <span>{localStorage.getItem("Destination1")}</span>
                </li>
                <li className="list-group-item">
                  Car Type : <span>{localStorage.getItem("Car_Type1")}</span>
                </li>
                <li className="list-group-item">
                  Way : <span>{localStorage.getItem("Way1")}</span>
                </li>
                <li className="list-group-item">
                  Driver Number :
                  <span>{localStorage.getItem("Driver_Number1")}</span>
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
            (!localStorage.getItem("Travel1") && (
              <button
                className="btn btn-danger mt-1 col-12 col-md-12 col-lg-12 BTN"
                onClick={startTravel}
              >
                Start Travel
              </button>
            ))}
          {ReqConfirmed && (
            <Link to="/Driver_Manner">
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
