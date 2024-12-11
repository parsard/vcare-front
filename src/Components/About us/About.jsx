import React, { forwardRef } from "react";
import info from "../../Assets/info.svg";

const About = forwardRef((props,whyUsRef) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ transform: "translateX(-30px)", marginTop: "10px",marginBottom:'50px' }}
    >
      <h1
      ref={whyUsRef}
        className="text-xl font-bold text-[#00818d] mb-4 self-end "
        style={{ marginTop: "-30px", marginRight:'60px' }}
      >
        چرا وی کر؟
      </h1>

      <div className="relative w-[1150px] h-[350px]">
        <img
          src={info}
          alt="info"
          className=""
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-lg text-center pb-10 pl-5"
          style={{ lineHeight: "53px", color: "#00818d", margingLeft: "30px" }}
        >
          دسترسی آسان و فوری به خدمات، پوشش انواع خدمات با بهترین کیفیت، پرسنل
          مجرب و قابل اطمینان، حفظ حریم خصوصی بیمار و پشتیبانی بیست و چهار ساعته{" "}
        </div>
      </div>
    </div>
  );
});

export default About;
