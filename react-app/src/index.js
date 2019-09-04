import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";

// const Index = () => {
//   return <div>Hello React!</div>;
// };

// ReactDOM.render(<Index />, document.getElementById("index"));


import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById("index")
);
