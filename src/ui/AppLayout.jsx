import { Outlet,useLocation } from "react-router-dom";
import Navbar from "../Components/NavBar/NavBar";
import { Modal } from "../Components/Modal/Modal";
import OtpInput from "../Components/Verification/OtpInput";
import Footer from "../Components/Footer/Footer";
import Article from "../Components/Articles/Article";
import About from "../Components/About us/About";
import { useRef } from "react";
import { Block } from "@mui/icons-material";
import QuickAccess from "../Components/QuickAccess/QuickAccess"; 
export default function AppLayout() {
  const whyUsRef = useRef(null);
  const articleRef = useRef(null);
  const scrollToWhyUs = ()=>{
    if (whyUsRef.current){
      whyUsRef.current.scrollIntoView({behavior:'smooth',block:"start"})
    }
  }
  const scrollToArticle = () => {
    if (articleRef.current) {
      articleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const location = useLocation();

  const isArticleDetail = location.pathname.startsWith("/article");

  return (
    <>
      <div className="flex-wrapper bg-[#EDF6F9]">
        <Navbar onAboutClick={scrollToWhyUs} onArticleClick={scrollToArticle}></Navbar>
        <main className="content ">
          <Outlet></Outlet>
          { !isArticleDetail && (
            <>
          <Modal></Modal>
          <QuickAccess />
          <Article ref={articleRef} />
          <About ref={whyUsRef} />
            </>
          )}
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
