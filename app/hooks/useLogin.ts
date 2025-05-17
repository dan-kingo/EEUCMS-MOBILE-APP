import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

export type loginFormData = {
  userName: string;
  password: string;
};

const useLogin = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const loginUser = async (data: loginFormData) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://aicms-api.onrender.com/api/auth/login",
        data
      );

      if (response.data.success && response.data.token) {
        // ✅ Save token to AsyncStorage
        await AsyncStorage.setItem("authToken", response.data.token);

        showMessage({
          message: "Logged in successfully!",
          type: "success",
          backgroundColor: "#4BB543",
          color: "#fff",
        });
        router.push("/(tabs)/home")

      } else {
        showMessage({
          message: "Invalid response from server.",
          type: "danger",
          backgroundColor: "#c6635a",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "An unknown error occurred.";
        showMessage({
          message: errorMessage,
          type: "danger",
          backgroundColor: "#c6635a",
        });
      } else {
        showMessage({
          message: "Failed to login",
          type: "danger",
          backgroundColor: "#c6635a",
        });
        console.error("Unknown login error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, isLoading };
};

export default useLogin;
