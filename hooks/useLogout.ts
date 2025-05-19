import { useState } from "react";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { router } from "expo-router";
import useUserStore from "../store/userStore";

const useLogout = () => {
  const [isLoading, setLoading] = useState(false);

  const logoutUser = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "https://aicms-api.onrender.com/api/auth/logout"
      );

      if (response.data.success) {
        showMessage({
          message: "Logged out successfully!",
          type: "success",
        });

        useUserStore.getState().setUser(null);
        await AsyncStorage.clear();

        // Navigate to the login screen and reset history
        router.replace("/login");
      } else {
        showMessage({
          message: "Something went wrong. Please try again.",
          type: "danger",
        });
      }
    } catch (error) {
      let errorMessage = "Failed to logout";
      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.message || "An unknown error occurred.";
      }
      showMessage({
        message: errorMessage,
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return { logoutUser, isLoading };
};

export default useLogout;
