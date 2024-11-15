import axios from "axios";

const Verify = async (formattedPhone, otp) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/otp/confirm`,
      { phone: formattedPhone, otp }
    );
    console.log(response);
    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error sending OTP:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response ? error.response.data.message : "server error"
    );
  }
};

export default Verify;
