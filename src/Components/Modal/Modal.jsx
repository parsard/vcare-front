import React, { useState } from "react";
import person from "../../Assets/person.png";
import "./Modal.css";
export const Modal = () => {
  return (
    <div className="modal-overlay visible">
      <div className="modal-container">
        <span className="modal-close">&times;</span>
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
