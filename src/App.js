import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Modal } from "./Components/Modal/Modal";
import Navbar from "./Components/NavBar/NavBar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/modal" element={<Modal />} />
      </Routes>
    </Router>
  );
}

export default App;
