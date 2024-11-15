// import { useState } from "react";
// index.js or App.js
import "typeface-source-sans-pro";

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Modal } from "./Components/Modal/Modal";
// import Navbar from "./Components/NavBar/NavBar";

import "./index.css";
import AppLayout from "./ui/AppLayout";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./Components/NavBar/NavBar";
import UserProfile from "./Components/UserDashbord/UserProfile";
import { validateToken } from "./slice/authSlice";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);
  return (
    <Routes>
      <Route element={<AppLayout></AppLayout>}>
        <Route index path="/" element={<h1> </h1>}></Route>
        <Route path="/profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
