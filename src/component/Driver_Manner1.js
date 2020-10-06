import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

export default function Driver_Manner() {
  const reload = () => window.location.reload();
  const [show, setshow] = useState("false");
  const [star, setstar] = useState(0);
  const [submit, setsubmit] = useState("Submit");
  const [loading, setloading] = useState("false");
  const [text, settext] = useState("Driver FeedBack");
  const [Com, setCom] = useState("");
  const T = (e) => {
    setCom(e.target.value);
  };
  const ratingChanged = (newRating) => {
    if (newRating < 3) {
      setshow("true");
      setstar(newRating);
    } else {
      axios
        .put(
          `https://111.125.159.243:5000/Star/${localStorage.getItem("Car_Id2")}`
        )
        .then((res) => {
          setsubmit("Liked");
          localStorage.setItem("like2", "true");
          reload();
        })
        .catch((err) => alert("error" + err));
    }
  };
  const Submit = () => {
    if (!Com) {
      settext("Invalid Fields");
      setTimeout(() => {
        settext("Driver FeedBack");
      }, 3000);
    } else {
      axios
        .post("https://111.125.159.243:5000/Command", {
          id: localStorage.getItem("Employee_ID"),
          did: localStorage.getItem("Car_Id2"),
          good: Com,
          name: localStorage.getItem("EmployeeName"),
          phone: localStorage.getItem("PhoneNumber"),
          ephone: localStorage.getItem("Driver_Number2"),
        })
        .then((res) => {
          setsubmit("Command Submited");
          localStorage.setItem("like2", "true");
          reload();
        })
        .catch((err) => alert(err));
    }
  };
  return (
    <div>
      <Link to="/ReqStatus">
        <button className="btn btn-danger">Back</button>
      </Link>
      <div className="container TOP">
        {show === "true" && (
          <div>
            <h1 className="display-4 text-center text-light">
              Why {star} Star Let Us Know
            </h1>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="COMMAND"
              onChange={T}
            />
            <button
              onClick={Submit}
              className="btn btn-primary col-md-12 col-12 col-sm-12 mt-2"
            >
              {submit}
            </button>
          </div>
        )}
        {!localStorage.getItem("like2") && (
          <div>
            {show === "false" && (
              <h1 className="display-5 text-center text-light">
                Give Driver A Star
              </h1>
            )}
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={60}
              isHalf={false}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="white"
              classNames="startLayout"
            />
          </div>
        )}
      </div>
    </div>
  );
}
