import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import useUser from "./useUser";

export const useDeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await useUser();
      if (user && user._id) {
        setUserId(user._id);
      } else {
        console.error("User not found or unauthorized");
      }
    };
    fetchUser();
  }, []);

  const deleteAccount = async () => {
    if (!userId) {
      showMessage({
        message: "User not authenticated or ID missing.",
        type: "danger",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(
        `https://aicms-api.onrender.com/api/user/delete-user/${userId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        showMessage({
          message: "Your account has been deleted successfully.",
          type: "success",
        });
        await AsyncStorage.removeItem("token");
        router.replace("/login");
      } else {
        showMessage({
          message: "Failed to delete account.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      showMessage({
        message: "Failed to delete account.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteAccount };
};
