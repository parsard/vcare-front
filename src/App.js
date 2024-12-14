// import { useState } from "react";
// index.js or App.js
import "typeface-source-sans-pro";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Modal } from "./Components/Modal/Modal";
// import Navbar from "./Components/NavBar/NavBar";

import "./index.css";
import AppLayout from "./ui/AppLayout";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./Components/NavBar/NavBar";
import UserProfile from "./Components/UserDashbord/UserProfile";
import ArticleDetail from "./Components/Articles/ArticleDetail";
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
          <Route path="/" element={<AppLayout />}>
            {/* Nested Route for the Home page content */}
            {/* <Route index element={<div>Home Content</div>} /> */}
            
            {/* Route for Article Details */}
            <Route path="/article/:id" element={<ArticleDetail />} />

          </Route>
        </Routes>
     
  );
}

export default App;
