import axios from "axios";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useRouter } from "expo-router";

const generateRandomToken = (length = 32) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

const useResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      showMessage({
        message: "Passwords do not match.",
        type: "danger",
        icon: "danger",
      });
      return;
    }

    if (newPassword.length < 8) {
      showMessage({
        message: "Password must be at least 8 characters.",
        type: "danger",
        icon: "danger",
      });
      return;
    }

    setIsLoading(true);
    const resetToken = generateRandomToken(32);

    try {
      await axios.post(`https://aicms-api.onrender.com/api/auth/reset-password`, {
        resetToken,
        newPassword,
      });

      showMessage({
        message: "Password reset successfully!",
        type: "success",
        icon: "success",
      });

      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error Response:", error.response?.data);
        showMessage({
          message: error.response?.data?.message || "Error resetting password.",
          type: "danger",
          icon: "danger",
        });
      } else {
        console.error("Unknown Error:", error);
        showMessage({
          message: "An unexpected error occurred.",
          type: "danger",
          icon: "danger",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resetPassword,
    isLoading,
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
  };
};

export default useResetPassword;
