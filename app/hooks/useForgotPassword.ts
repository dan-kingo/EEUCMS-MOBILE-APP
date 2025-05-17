import { useState } from "react";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://aicms-api.onrender.com/api/auth/forgot-password",
        { email }
      );

      if (response.data.success) {
        showMessage({
          message: "Password reset link sent to your email.",
          type: "success",
          icon: "success",
        });
      } else {
        showMessage({
          message: "Failed to send password reset link.",
          type: "danger",
          icon: "danger",
        });
      }
    } catch (error) {
      showMessage({
        message: "Error sending password reset link.",
        type: "danger",
        icon: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { requestPasswordReset, isLoading };
};

export default useForgotPassword;
