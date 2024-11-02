import axios from "axios";

const Verify = async (formattedPhone, otp) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/otp/confirm`,
    {
      phone: formattedPhone,
      otp,
    }
  );
  return response.data;
};
export default Verify;
