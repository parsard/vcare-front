import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import axios from "axios";
import PersianDatePicker from "./PersianDatePicker";

export const Reserve = () => {
  const location = useLocation();
  const { cityId, serviceId } = location.state || {};
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //datepicker popup
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (cityId && serviceId) {
      setLoading(true);
      axios
        .get(
          `http://localhost:8080/api/service-providers?serviceId=${serviceId}&cityId=${cityId}`
        )
        .then((response) => {
          setProviders(response.data.data.serviceProviders || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching providers:", error);
          setError("خطا در بارگزاری اطلاعات. لطفا دوباره تلاش کنید.");
          setLoading(false);
        });
    }
  }, [cityId, serviceId]);

  const handleReserveClick = (provider) => {
    setSelectedProvider(provider);
    setShowDatePicker(true);
  };

  const handleDateSelect = (jalaliDate) => {
    setSelectedDate(jalaliDate);
    setShowDatePicker(false);
    console.log(
      `Reserved with ${selectedProvider.firstname} ${selectedProvider.lastname} on ${jalaliDate}`
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div
          dir="rtl"
          className="flex justify-center items-center min-h-screen bg-[#EDF6F9] py-10"
        >
          <p className="text-gray-600 text-lg font-medium">
            در حال بارگزاری...
          </p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div
          dir="rtl"
          className="flex justify-center items-center min-h-screen bg-[#EDF6F9] py-10"
        >
          <p className="text-red-600 text-lg font-medium">{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div
        dir="rtl"
        className="flex justify-center items-start min-h-screen bg-[#EDF6F9] py-10"
      >
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-[90%] mx-auto ">
          <div className="space-y-6">
            {providers.map((provider) => (
              <div
                key={provider._id}
                className="flex items-center bg-white border border-gray-400 rounded-[34px] shadow-sm "
                style={{
                  maxWidth: "843px",
                  height: "139px",
                  margin: "0 auto",
                  marginBottom: "20px",
                }}
              >
                <div
                  className="flex items-center justify-center w-20 h-20 rounded-full shadow-md mr-4"
                  style={{ background: "#00818D" }}
                ></div>
                <div className="flex flex-col justify-between flex-1 text-right mr-5 mb-6">
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-800  ">
                      {provider.firstname} {provider.lastname}
                    </h3>
                    <p className="text-sm text-gray-600 pt-3 mt-0 mb-2">
                      {provider.role}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {provider.city.name}
                  </p>
                </div>
                <button
                  className=" text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-teal-600 transition ml-6"
                  style={{ background: "#00818D" }}
                  onClick={() => handleReserveClick(provider)}
                >
                  نوبت بگیرید
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Popup for Date Picker */}
      {showDatePicker && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <PersianDatePicker onDateSelect={handleDateSelect} />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setShowDatePicker(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}

      {selectedDate && selectedProvider && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 p-4 rounded-lg shadow-md">
          <p>
            تاریخ انتخاب شده برای {selectedProvider.firstname}{" "}
            {selectedProvider.lastname}: {selectedDate}
          </p>
        </div>
      )}
    </>
  );
};
