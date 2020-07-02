import react from "react";
import { store } from "./Store";
import { Model } from "../Models";
import ResponseActions from "./ResponseActions";
var responseActions = new ResponseActions();
class EmpService {
  getDetails() {
    console.log("requested");
    fetch("https://onboardingdetails.azurewebsites.net/Employee")
      .then((response) => response.json())
      .then((data) =>
        store.dispatch(responseActions.GetEmpDetailsSuccessAction(data))
      )
      .catch((error) => {
        store.dispatch(responseActions.GetEmpDetailsFailureAction(error));
        console.error(error);
      });

    console.log("responded");
  }
}
export default EmpService;
