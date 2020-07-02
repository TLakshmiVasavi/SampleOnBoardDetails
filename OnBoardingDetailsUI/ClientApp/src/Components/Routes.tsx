import React from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import SelectComponent from "./SelectComponent/Select";
import DateComponent from "./DateComponent/Date";
import OnBoardingDetails from "./OnBoardingDetails/OnBoardingDetails";
import { BrowserRouter as Router, BrowserRouterProps } from "react-router-dom";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/(OnBoardingDetails|)/" component={OnBoardingDetails} />
        <Route path="/Date" component={DateComponent} />
        <Route path="/Select" component={SelectComponent} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
