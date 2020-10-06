import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import "../App.css";
import { Offline, Online } from "react-detect-offline";
import OOfline from "./Offline";

const Map = () => {
  const [state, setstate] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("ReqConfirmed")) {
      axios
        .get(
          `http://111.125.159.243:5000/Car/${localStorage.getItem("Car_Id")}`
        )
        .then((res) => {
          let a = { Lat: res.data.Lat, Lon: res.data.Lon };
          setstate(a);
        })
        .catch((err) => console.log(err));
    } else {
    }
  }, []);
  const data = {
    center: {
      lat: 34.5553,
      lng: 69.2075,
    },
    zoom: 12,
  };
  return (
    <div>
      <Online>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAQC2kvOCZoGJGgpxj-c3VoUvG183pjdjQ",
            }}
            defaultCenter={data.center}
            defaultZoom={data.zoom}
          >
            <Marker lat={state.Lat} lng={state.Lon} color="red" />
          </GoogleMapReact>
        </div>
      </Online>
      <Offline>
        <OOfline />
      </Offline>
    </div>
  );
};

export default Map;
