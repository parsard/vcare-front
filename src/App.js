// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Modal } from "./Components/Modal/Modal";
// import Navbar from "./Components/NavBar/NavBar";
import AppLayout from "./ui/AppLayout";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout></AppLayout>}>
            <Route index path="/" element={<h1>test ensafi </h1>}></Route>
            <Route path="asghar" element={<h1>asghar ensafi </h1>}></Route>
            <Route path="hamid" element={<h1>hamid ensafi </h1>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
