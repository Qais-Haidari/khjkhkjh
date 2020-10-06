import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import Map from "./component/map";
import ReqStatus from "./component/ReqStatus";
import ReqStatus2 from "./component/ReqStatus1";
import ReqStatus3 from "./component/ReqStatus2";
import Driver_Manner from "./component/Driver_Manner";
import Driver_Manner1 from "./component/Driver_Manner1";
import Driver_Manner2 from "./component/Driver_Manner2";
function App(props) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Map" component={Map} />
        <Route exact path="/About" component={About} />
        <Route exact path="/ReqStatus" component={ReqStatus} />
        <Route exact path="/ReqStatus1" component={ReqStatus2} />
        <Route exact path="/ReqStatus2" component={ReqStatus3} />
        <Route exact path="/Driver_Manner" component={Driver_Manner} />
        <Route exact path="/Driver_Manner1" component={Driver_Manner1} />
        <Route exact path="/Driver_Manner2" component={Driver_Manner2} />
      </Switch>
    </div>
  );
}

export default App;
