import React, { useState } from "react";
import { Save } from "@mui/icons-material";
import profileIcon from "../../Assets/profileIcon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  validateToken,
  updateProfile,
  fetchUserProfile,
  fetchCities,
} from "../../slice/authSlice";
import { useEffect } from "react";
import AlertPopup from "../AlertPopUp/AlertPopUp";
import { logOutUser } from "../../slice/authSlice";

const UserProfile = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cities = useSelector((state) => state.auth.cities);
  const [citieName, setCityName] = useState("");
  console.log("cities :", cities);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    city: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);
  useEffect(() => {
    console.log("Fetched cities:", cities);
  }, [cities]);
  console.log(user);
  useEffect(() => {
    // پر کردن فرم با اطلاعات فعلی کاربر در صورت وجود
    if (
      user &&
      user.data &&
      Array.isArray(user.data.user) &&
      user.data.user.length > 0
    ) {
      const userData = user.data.user[0];
      setFormData({
        firstName: userData?.firstname || "",
        lastName: userData?.lastname || "",
        gender: userData?.gender || "",
        age: userData?.age || "",
        city: userData?.city?._id || "",
        phoneNumber: userData?.phone || "",
        address: userData?.address || "",
      });
    }
  }, [user]);

  const labelTextStyle = { color: "#00818D", fontWeight: 600 };
  const inputStyle =
    "mt-1 block w-full border border-solid rounded-lg focus:outline-none";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "city") {
      const selectedCity = cities.find((city) => city._id === value);
      setCityName(selectedCity?.name || "");

      setFormData((prev) => ({
        ...prev,
        city: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const { firstName, lastName, age, phoneNumber, city } = formData;
    const nameRegex = /^[\u0600-\u06FF\s]+$/; // Regex for Persian letters and spaces
    const phoneRegex = /^09\d{9}$/; // Starts with 09 and is 11 digits long

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      alert("لطفا نام خود را درست وارد کنید");
      return false;
    }

    if (!city) {
      alert("لطفا نام شهر را درست وارد کنید");
      return false;
    }

    if (isNaN(age) || age <= 0) {
      alert("لطفا سن خود را صحیح وارد کنید");
      return false;
    }

    if (!phoneRegex.test(phoneNumber)) {
      alert("شماره تلفن باید با 09 شروع شده و 11 رقم باشد.");
      return false;
    }

    return true;
  };

  const handleLogOut = async () => {
    try {
      await dispatch(logOutUser()).unwrap();
      setAlert({
        type: "success",
        message: "با موفقیت از حساب خارج شدید",
      });
      toggleModal();
    } catch (error) {
      setAlert({
        type: "error",
        message: "خطا در خروج از حساب",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSend = {
        //username: formData.phoneNumber,
        firstname: formData.firstName,
        lastname: formData.lastName,
        age: parseInt(formData.age, 10),
        gender: formData.gender,
        city: formData.city,
        address: formData.address,
      };
      console.log("Form Data to Send:", {
        username: formData.phoneNumber,
        firstname: formData.firstName,
        lastname: formData.lastName,
        age: parseInt(formData.age, 10),
        gender: formData.gender,
        city: formData.city,
      });

      try {
        console.log("before send", dataToSend);
        await dispatch(updateProfile(dataToSend)).unwrap();
        //alert("اطلاعات با موفقیت به‌روزرسانی شد!");
        setAlert({
          type: "success",
          message: "اطلاعات با موفقیت به‌روزرسانی شد!",
        });
        setTimeout(() => {
          setAlert(null);
          toggleModal();
        }, 2000);
      } catch (error) {
        const errorMessage = error.toString();
        setAlert({
          type: "error",
          message: `خطا در بروزرسانی پروفایل:${errorMessage}`,
        });
        setTimeout(() => {
          setAlert(null);
        }, 2000);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ paddingTop: "5rem" }}
    >
      <div
        className="bg-white p-10 rounded-lg shadow-lg w-11/12 max-w-lg"
        dir="rtl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">ویرایش پروفایل</h2>
          <button onClick={toggleModal} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>

        <div className="flex justify-start items-center mb-4">
          <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center">
            <img
              src={profileIcon}
              alt="profile icon"
              className="w-full h-full rounded-full"
            />
          </div>
        </div>

        <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm" style={labelTextStyle}>
              نام:
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`${inputStyle} rounded-2xl border-2`}
              style={{
                borderRadius: "18px",
                border: "2.772px solid rgba(0, 129, 141, 0.20)",
              }}
              required
            />
          </div>
          <div>
            <label className="block text-sm" style={labelTextStyle}>
              نام خانوادگی:
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`${inputStyle} rounded-2xl border-2`}
              style={{
                borderRadius: "18px",
                border: "2.772px solid rgba(0, 129, 141, 0.20)",
              }}
              required
            />
          </div>
          <div>
            <label className="block text-sm" style={labelTextStyle}>
              جنسیت:
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`${inputStyle} rounded-2xl border-2`}
              style={{
                borderRadius: "18px",
                border: "2.772px solid rgba(0, 129, 141, 0.20)",
              }}
              required
            >
              <option value="" disabled>
                انتخاب کنید
              </option>
              <option value="مرد">مرد</option>
              <option value="زن">زن</option>
            </select>
          </div>
          <div>
            <label className="block text-sm" style={labelTextStyle}>
              سن:
            </label>
            <input
              type="number"
              min="0"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`${inputStyle} rounded-2xl border-2`}
              style={{
                borderRadius: "18px",
                border: "2.772px solid rgba(0, 129, 141, 0.20)",
              }}
              required
            />
          </div>
          <div>
            <label className="block text-sm" style={labelTextStyle}>
              شهر:
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`${inputStyle} rounded-2xl border-2`}
              style={{
                borderRadius: "18px",
                border: "2.772px solid rgba(0, 129, 141, 0.20)",
              }}
              required
            >
              <option value="" disabled>
                انتخاب کنید
              </option>
              {Array.isArray(cities) && cities.length > 0 ? (
                cities.map((city, index) => (
                  <option key={index} value={city._id}>
                    {city.name}
                  </option>
                ))
              ) : (
                <option disabled> شهری یافت نشد</option>
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm" style={labelTextStyle}>
              شماره موبایل:
            </label>
            <input
              type="text"
              pattern="09\d{9}"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`${inputStyle} rounded-2xl border-2`}
              style={{
                borderRadius: "18px",
                border: "2.772px solid rgba(0, 129, 141, 0.20)",
              }}
              placeholder="09xxxxxxxxx"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm" style={labelTextStyle}>
              آدرس:
            </label>
            <textarea
              name="address"
              value={formData.address}
              className={`${inputStyle} rounded-2xl border-2`}
              style={{
                borderRadius: "18px",
                border: "2.772px solid rgba(0, 129, 141, 0.20)",
              }}
              rows={3}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2 flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center"
            >
              تایید و ذخیره
            </button>
            <button
              type="button"
              className="text-red-600"
              onClick={handleLogOut}
            >
              خروج از حساب کاربری
            </button>
          </div>
        </form>
        {/* Modify the AlertPopup rendering */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex justify-center pl-50">
          {alert && alert.type && alert.message && (
            <AlertPopup
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
