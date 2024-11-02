import axios from "axios";

const sendSms = async (phone) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/otp/phone`,
    { phone }
  );
  return response;
};
export default sendSms;
