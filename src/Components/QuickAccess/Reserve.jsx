import React from "react";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export const Reserve = () => {
  const providers = [
    { name: "دکتر جان دو", role: "پزشک", city: "تهران" },
    { name: "پرستار امیلی", role: "پرستار", city: "مشهد" },
    { name: "دکتر سارا لی", role: "پزشک", city: "شیراز" },
  ];

  return (
    <>
      <Navbar />
      <div
        dir="rtl"
        className="flex justify-center items-start min-h-screen bg-[#EDF6F9] py-10"
      >
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-[90%] mx-auto">
          <div className="space-y-6">
            {providers.map((provider, index) => (
              <div
                key={index}
                className="flex items-center bg-white border border-gray-400 rounded-[34px] shadow-sm p-4"
                style={{ maxWidth: "843px", height: "139px", margin: "0 auto" }}
              >
                {/* Profile Avatar */}
                <div className="flex items-center justify-center w-20 h-20 bg-teal-300 rounded-full shadow-md">
                  <span className="text-2xl font-bold text-white">
                    {provider.name[0]}
                  </span>
                </div>

                {/* Profile Details */}
                <div className="flex flex-col justify-between flex-1 text-right">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {provider.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {provider.role}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="material-icons text-gray-500 align-middle"></span>{" "}
                    {provider.city}
                  </p>
                </div>

                {/* Reserve Button */}
                <button className="bg-teal-500 text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-teal-600 transition ml-6">
                  ثبت نوبت
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
