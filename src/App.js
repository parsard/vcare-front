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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout></AppLayout>}>
            <Route index path="/" element={<h1> </h1>}></Route>
            {/* <Route path="asghar" element={<h1>asghar ensafi </h1>}></Route>
            <Route path="hamid" element={<h1>hamid ensafi </h1>}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
