import React, { useState } from "react";
import "./Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, getOpen } from "../../slice/popUpslice";
export const Modal = () => {
  const [phone, setPhone] = useState("");

  const isOpen = useSelector((state) => getOpen(state));
  const dispatch = useDispatch();
  if (!isOpen) return;

  return (
    <div className="modal-overlay visible">
      <div className="modal-container">
        <span onClick={() => dispatch(closePopup())} className="modal-close">
          &times;
        </span>
        <h1>ورود به وی کر</h1>
        <p>
          برای استفاده از خدمات وی‌کِر لازم است وارد شوید. شماره موبایل خود را
          وارد کنید
        </p>
        <form>
          <div className="input-container">
            <input
              type="tel"
              placeholder=" 09-- --- ----"
              maxLength="11"
              pattern="09[0-9]{9}"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            ارسال کد تایید
          </button>
        </form>
      </div>
    </div>
  );
};
