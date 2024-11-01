import { Outlet } from "react-router-dom";
import Navbar from "../Components/NavBar/NavBar";
import { Modal } from "../Components/Modal/Modal";
import OtpInput from "../Components/Verification/OtpInput";

export default function AppLayout() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
        <Modal></Modal>
        <OtpInput />
      </main>
    </>
  );
}
