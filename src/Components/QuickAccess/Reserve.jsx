import { React } from "react";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export const Reserve = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">
          Reserve Page Content
        </h1>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
