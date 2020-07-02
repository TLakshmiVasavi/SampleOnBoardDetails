import React from "react";
import logo from "./logo.svg";
import "./App.css";
import OnBoardingDetails from "./Components/OnBoardingDetails/OnBoardingDetails";
import { Provider } from "react-redux";
import { store } from "./Components/Redux/Store";
import Routes from "./Components/Routes";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        {/* <OnBoardingDetails /> */}
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
