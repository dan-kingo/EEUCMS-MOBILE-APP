import { useState } from "react";
import axios, { AxiosError } from "axios";
import { showMessage } from "react-native-flash-message";
import { useRouter } from "expo-router";

type RegisterUserFunction = (
  data: { email: string; password: string },
  reset: () => void
) => Promise<void>;

const useRegister = () => {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOTPSent, setOTPSent] = useState<boolean>(false);

  const registerUser: RegisterUserFunction = async (data, _reset) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://aicms-api.onrender.com/api/auth/register",
        data,
        { withCredentials: true }
      );

      if (response.data.success) {
        setOTPSent(true);
        showMessage({
          message: "OTP sent!",
          description: "Please verify your email.",
          type: "success",
          backgroundColor: "#4CAF50", // optional: green color
        });
        router.push("/verify-otp");
      } else {
        showMessage({
          message: "Something went wrong.",
          description: "Please try again.",
          type: "danger",
          backgroundColor: "#c6635a",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showMessage({
          message: error.response?.data?.message || "An unknown error occurred.",
          type: "danger",
          backgroundColor: "#c6635a",
        });
      } else {
        showMessage({
          message: "Failed to register.",
          type: "danger",
          backgroundColor: "#c6635a",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://aicms-api.onrender.com/api/auth/verify-otp",
        { otp },
        { withCredentials: true }
      );

      if (response.data.success) {
        showMessage({
          message: "OTP verified!",
          description: "Redirecting to login...",
          type: "success",
          backgroundColor: "#4CAF50",
        });
        setTimeout(() => router.push("/login"), 1500);
      } else {
        showMessage({
          message: "Invalid OTP.",
          description: "Please try again.",
          type: "danger",
          backgroundColor: "#c6635a",
        });
      }
    } catch (error) {
      showMessage({
        message: "Invalid OTP.",
        description: "Please try again.",
        type: "danger",
        backgroundColor: "#c6635a",
      });
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://aicms-api.onrender.com/api/auth/resend-otp",
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        showMessage({
          message: "OTP resent successfully!",
          type: "success",
          backgroundColor: "#4CAF50",
        });
      } else {
        showMessage({
          message: "Failed to resend OTP.",
          type: "danger",
          backgroundColor: "#c6635a",
        });
      }
    } catch (error) {
      showMessage({
        message: "Error resending OTP.",
        type: "danger",
        backgroundColor: "#c6635a",
      });
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, verifyOTP, resendOTP, isLoading, isOTPSent };
};

export default useRegister;
