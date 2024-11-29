import { Outlet } from "react-router-dom";
import Navbar from "../Components/NavBar/NavBar";
import { Modal } from "../Components/Modal/Modal";
import OtpInput from "../Components/Verification/OtpInput";
import Footer from "../Components/Footer/Footer";
import Article from "../Components/Articles/Article";
import About from "../Components/About us/About";
export default function AppLayout() {
  return (
    <>
      <div className="flex-wrapper bg-[#EDF6F9]">
        <Navbar></Navbar>
        <main className="content ">
          <Outlet></Outlet>
          <Modal></Modal>
          <Article />
          <About />
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
