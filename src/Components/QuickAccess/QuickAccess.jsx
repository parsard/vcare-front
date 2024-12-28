import React, { forwardRef, useEffect, useState } from "react";
import holder from "../../Assets/quick.svg";
import Select from "react-select";
import { color } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCities,
  fetchServices,
  fetchServiceProviders,
} from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";

const QuickAccess = forwardRef((props, quickRef) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cities, services } = useSelector((state) => state.auth);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const [dropDownCity, setDropDownCity] = useState([]);
  const [dropDownServices, setDropDownServices] = useState([]);

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (cities && Array.isArray(cities)) {
      const formattedCityOptions = cities.map((city) => ({
        value: city._id,
        label: city.name,
      }));
      setDropDownCity(formattedCityOptions);
      console.log(cities);
    }
  }, [cities]);

  useEffect(() => {
    if (services && Array.isArray(services)) {
      const formattedServicesOptions = services.map((service) => ({
        value: service._id,
        label: service.title,
      }));
      setDropDownServices(formattedServicesOptions);
    }
  }, [services]);

  //onclick for reserve button

  const handleReserveClick = () => {
    if (selectedCity && selectedService) {
      navigate("/reserve", {
        state: {
          cityId: selectedCity.value,
          serviceId: selectedService.value,
        },
      });
    } else {
      alert("Please select a city and a service.");
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      direction: "rtl",
      textAlign: "right",
      borderColor: state.isFocused ? "#00818D" : "#00818D",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 129, 141, 0.5)" : "none",
      backgroundColor: "white",
      "&:hover": {
        borderColor: "#00818D",
      },
    }),
    menu: (base) => ({
      ...base,
      direction: "rtl",
      color: "#00818D",
    }),
    menuList: (base) => ({
      ...base,
      textAlign: "right", // Align text in the dropdown
    }),
    singleValue: (base) => ({
      ...base,
      direction: "rtl",
      color: "#00818D", // Selected value color
      fontWeight: "bold",
    }),
    placeholder: (base) => ({
      ...base,
      direction: "rtl",
      color: "#00818D", // Placeholder color
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#E0F7F9" : "white", // Highlight the focused option
      color: state.isSelected ? "#00818D" : "#333333", // Selected option text color
      textAlign: "right", // Align text for options
      direction: "rtl",
      "&:hover": {
        backgroundColor: "#E0F7F9", // Background color on hover
      },
    }),
  };

  return (
    <div>
      <div
        className="relative flex flex-col items-center justify-center min-h-screen"
        style={{ transform: "translateX(-30px)", marginTop: "-100px" }}
      >
        <div ref={quickRef} className="relative w-[1150px] h-[350px]">
          <img src={holder} alt="info" className="relative" />
          {/* Heading and Paragraph */}
          <div
            style={{
              // display:'flex',
              position: "absolute",
              top: "150px", // Adjust to align above the dropdowns
              right: "100px",
              textAlign: "right",
              // alignItems:'center',
              // width: '40%',
              lineHeight: "140%",
            }}
          >
            <h1
              style={{
                color: "#00818D",
                fontSize: "36px",
                fontWeight: "900",
                marginBottom: "10px",
              }}
            >
              وی‌کِر
            </h1>
            <p
              style={{
                color: "#00818D",
                fontSize: "20px",
                fontWeight: "400",
                marginRight: 0,
              }}
            >
              ارائه دهنده خدمات بالینی در منزل{" "}
            </p>
          </div>
          {/* Dropdown Container */}
          <div
            className="absolute flex space-x-4"
            style={{
              top: "250px", // Adjust vertical position
              right: "100px", // Adjust horizontal position
            }}
          >
            {/* Dropdown 1 */}
            <div className="w-72">
              <Select
                options={dropDownServices}
                // options
                placeholder="نوع خدمات را انتخاب کنید"
                direction="rtl"
                styles={customStyles}
                onChange={(selectedOption) =>
                  setSelectedService(selectedOption)
                }
              />
            </div>

            {/* Dropdown 2 */}
            <div className="w-28 ">
              <Select
                options={dropDownCity}
                placeholder="شهر"
                direction="rtl"
                styles={customStyles}
                onChange={(selectedOption) => setSelectedCity(selectedOption)}
              />
              <button
                className="w-28 h-10 text-white font-normal"
                style={{
                  backgroundColor: "#00818D",
                  borderRadius: "10px",
                  border: "none",
                  marginTop: "20px",
                }}
                onClick={handleReserveClick}
              >
                ثبت نوبت
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default QuickAccess;
