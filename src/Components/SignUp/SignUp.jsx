import React from "react";
import { openPopup } from "../../slice/popUpslice";

import { useDispatch } from "react-redux";
const SignUp = () => {
  const dispatch = useDispatch();
  const btnStyle =
    "flex items-center justify-between  py-2 px-4 border-none rounded-lg shadow-md cursor-pointer text-base transition-colors duration-300 m-7 hover:shadow-lg";
  return (
    <div>
      <div className="flex border-none">
        <button
          className={btnStyle}
          style={{
            backgroundColor: "white",
            color: "#00818D",
            fontSize: "14px",
            fontWeight: "500",
            fontStyle: "normal",
            marginRight: "12px",
          }}
          onClick={() => dispatch(openPopup())}
        >
          <span> ورود کاربران</span>
        </button>
        <button
          className={btnStyle}
          style={{
            color: "white",
            fontSize: "14px",
            fontWeight: "500",
            fontStyle: "normal",
            marginLeft: "0",
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <span>ورود خدمات دهندگان</span>
        </button>
      </div>
    </div>
  );
};
export default SignUp;
