import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4, v4 } from "uuid";
import "../App.css";
import Loading from "./Loading";
import TimeKeeper from "react-timekeeper";
import { Link } from "react-router-dom";

export default function Model() {
  const [loading, setloading] = useState("false");
  const reload = () => window.location.reload();
  const [text, settext] = useState("Request 2");
  const [Way, setWay] = useState("");
  const [Destination, setDestination] = useState("");
  const [deportment, setdeportment] = useState("");
  const [CarType, setCarType] = useState("");
  const [time, setTime] = useState("00:00pm");
  const [time1, setTime1] = useState("00:00pm");
  const [showTime1, setShowTime1] = useState(false);
  const [showTime2, setShowTime2] = useState(false);
  const [Pick, setPick] = useState("");
  const [Date, setDate] = useState("");

  const Submit = () => {
    if (
      !Way ||
      time === "00:00pm" ||
      time === "00:00pm" ||
      !Destination ||
      !Pick ||
      !Date ||
      !CarType ||
      !deportment
    ) {
      settext("Invalid Fields");
      setTimeout(() => {
        settext("Request Vehicle");
      }, 3000);
    } else {
      const reqid = v4();
      setloading("true");
      axios
        .post("https://111.125.159.243:5000/ReqCar", {
          reqid: reqid,
          Id: localStorage.getItem("Employee_ID"),
          name: localStorage.getItem("EmployeeName"),
          department: deportment,
          ptime: time.toUpperCase(),
          dtime: time1.toUpperCase(),
          destination: Destination,
          pick: Pick,
          cartype: CarType,
          reqDate: Date,
          Way: Way,
          Em_Id: localStorage.getItem("Employee_ID"),
          Confirm: "false",
          Number: localStorage.getItem("PhoneNumber"),
        })
        .then((res) => {
          settext("Request Sended");
          setTimeout(() => {
            settext("Request Vehicle");
          }, 1000);
          localStorage.setItem("ReqSend2", true);
          localStorage.setItem("req2", res.data.Req_Id);
          axios
            .put(
              `https://111.125.159.243:5000/SaveReqID/${localStorage.getItem(
                "Employee_ID"
              )}`,
              {
                req1: localStorage.getItem("req1") || "",
                req2: res.data.Req_Id,
                req3: localStorage.getItem("req3") || "",
              }
            )
            .then((res) => {
              setloading("false");
            })
            .catch((err) => {
              alert(err);
            });
          reload();
        })
        .catch((err) => {
          settext("Your Request Failed");
          setTimeout(() => {
            settext("Request Vehicle");
          }, 3000);
        });
    }
  };
  {
    return (
      <div>
        {!localStorage.getItem("req2") ? (
          <button
            type="button"
            className="btn btn-primary mt-2 col-12 col-md-12"
            data-toggle="modal"
            data-target="#example"
          >
            Request (2)
          </button>
        ) : (
          <Link to="/ReqStatus1">
            <button className="btn btn-primary mt-2 col-12 col-md-12">
              Request Status 2
            </button>
          </Link>
        )}

        <div
          className="modal fade"
          id="example"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="">
                  {loading === "true" ? (
                    <Loading />
                  ) : (
                    <h1 className="text-center text-danger display-3 mb-2">
                      {text}
                    </h1>
                  )}
                  <select
                    className="form-select col-md-12 col-12 col-sm-12"
                    onChange={(e) => setdeportment(e.target.value)}
                  >
                    <option className="from-select">Deportment</option>
                    <option className="from-select">IT</option>
                    <option className="from-select">Internal Audit</option>
                    <option className="from-select">Corporate Social </option>
                    <option className="from-select">Management Office</option>
                    <option className="from-select">Controlling-MIS</option>
                    <option className="from-select">Finance-Accounting</option>
                    <option className="from-select">Management-Office</option>
                    <option className="from-select">Revenue-Assurance</option>
                    <option className="from-select">Taxation-Regulatory</option>
                    <option className="from-select">Facilities</option>
                    <option className="from-select">HR Operations</option>
                    <option className="from-select">Management Office</option>
                    <option className="from-select">
                      International-Roaming{" "}
                    </option>
                    <option className="from-select">Operations</option>
                    <option className="from-select">Management Office</option>
                    <option className="from-select">Legal Operations</option>
                    <option className="from-select">M Paisa Operations</option>
                    <option className="from-select">Management Office</option>
                    <option className="from-select">
                      Marketing-Communication
                    </option>
                    <option className="from-select">Product-Pricing</option>
                    <option className="from-select">Network Engineering</option>
                    <option className="from-select">
                      Network Operations and Maintenance
                    </option>
                    <option className="from-select">Customer Care</option>
                    <option className="from-select">Customer Experience</option>
                    <option className="from-select">Strategy</option>
                    <option className="from-select">
                      Project Management Office - Management Office
                    </option>
                    <option className="form-select">Public Relation</option>
                    <option className="form-select">Quality and Travel</option>
                    <option className="form-select">
                      Regional - Management Office
                    </option>
                    <option className="form-select">Regional - North</option>
                    <option className="form-select">Corporate Sales</option>
                    <option className="form-select">
                      Enterprise Solution and Military
                    </option>
                    <option className="form-select">M-Paisa</option>
                    <option className="form-select">Indirect Channels</option>
                    <option className="form-select">Retail Shops</option>
                    <option className="form-select">Customer Care - CRI</option>
                    <option className="form-select">Management Office</option>
                    <option className="form-select">Sales- Operations</option>
                    <option className="form-select">
                      Security - Management Office
                    </option>
                    <option className="form-select">Security Operations</option>
                    <option className="form-select">Logistics</option>
                    <option className="form-select">Management Office</option>
                    <option className="form-select">Procurement</option>
                    <option className="form-select">
                      Information Technology
                    </option>
                    <option className="form-select">Management Office</option>
                    <option className="form-select">Operations Support</option>
                  </select>
                  <div>
                    {showTime1 && (
                      <TimeKeeper
                        time={time}
                        onChange={(newTime) => setTime(newTime.formatted12)}
                        onDoneClick={() => setShowTime1(false)}
                        defaultValue=""
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTime1 && (
                      <input
                        className="form-control col-md-12 col-12 col-sm-12"
                        onClick={() => setShowTime1(true)}
                        defaultValue=""
                        placeholder="PickUp Time"
                        value={time === "00:00pm" ? "" : time}
                      />
                    )}
                  </div>
                  <div>
                    {showTime2 && (
                      <TimeKeeper
                        time={time}
                        onChange={(newTime) => setTime1(newTime.formatted12)}
                        onDoneClick={() => setShowTime2(false)}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTime2 && (
                      <input
                        className="form-control col-md-12 col-12 col-sm-12"
                        onClick={() => setShowTime2(true)}
                        placeholder="Drop Time"
                        value={time1 === "00:00pm" ? "" : time1}
                      />
                    )}
                  </div>
                </div>
                <input
                  type="date"
                  name="bday"
                  min="2020-01-01"
                  max="2021-12-31"
                  className="form-control"
                  onChange={(e) => setDate(e.target.value)}
                ></input>
                <select
                  type="text"
                  onChange={(e) => setPick(e.target.value)}
                  className="form-select mt-2"
                >
                  <option>Pick Address</option>
                  <option>Roshan Tower</option>
                  <option>Roshan WH</option>
                  <option>Roshan KBL003</option>
                  <option>Roshan NOC</option>
                  <option>Roshan KBL144</option>
                  <option>Roshan GulBahar Shop 2</option>
                </select>
                <input
                  type="text"
                  onChange={(e) => setDestination(e.target.value)}
                  className="form-control mt-2"
                  placeholder="Drop Address"
                />
                <select
                  onChange={(e) => setWay(e.target.value)}
                  className="form-select mt-2 col-12 col-sm-12 col-md-12"
                >
                  <option className="form-select col-10 col-sm-12 col-md-10">
                    One Way | Two Way
                  </option>
                  <option className="col-10 col-sm-12 col-md-10">
                    One Way
                  </option>
                  <option className="col-10 col-sm-12 col-md-10">
                    Two Way
                  </option>
                </select>
                <select
                  onChange={(e) => setCarType(e.target.value)}
                  className="form-select mt-2 col-md-12 col-12"
                >
                  <option>Corolla | Super Custom</option>
                  <option>Corolla</option>
                  <option>Super Custom</option>
                </select>
                <button
                  className="btn btn-primary col-md-6 col-6 col-sm-6 mt-3"
                  onClick={Submit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary col-md-6 col-6 col-sm-6 mt-3"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
