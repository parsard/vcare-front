import { Outlet, useLocation } from "react-router-dom";
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
  const quickRef = useRef(null);
  const scrollToWhyUs = () => {
    if (whyUsRef.current) {
      whyUsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const scrollToArticle = () => {
    if (articleRef.current) {
      articleRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const scrollToQuick = () => {
    if (quickRef.current) {
      quickRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const location = useLocation();
  const showNavbarFooter = !location.pathname.startsWith("/reserve");

  const isArticleDetail = location.pathname.startsWith("/article");

  return (
    <>
      <div className="flex-wrapper bg-[#EDF6F9]">
        {showNavbarFooter && (
          <Navbar
            onAboutClick={scrollToWhyUs}
            onArticleClick={scrollToArticle}
          />
        )}
        <main className="content ">
          <Outlet></Outlet>
          {!isArticleDetail && showNavbarFooter && (
            <>
              <Modal></Modal>
              <QuickAccess ref={quickRef} />
              <Article ref={articleRef} />
              <About ref={whyUsRef} />
            </>
          )}
        </main>
        {showNavbarFooter && (
          <Footer
            onAboutClick={scrollToWhyUs}
            onArticleClick={scrollToArticle}
            onQuickClick={scrollToQuick}
          />
        )}
      </div>
    </>
  );
}
