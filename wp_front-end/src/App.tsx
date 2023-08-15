import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
function App() {
  return (
    <>
      <BrowserRouter>
        <React.Fragment>
          <Routes>
            <div className="appBg">
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/" element={<Login />} />
            </div>
          </Routes>
        </React.Fragment>
      </BrowserRouter>
    </>
  );
}

export default App;
