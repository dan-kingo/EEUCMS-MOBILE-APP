import { useState } from "react";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { useRouter } from "expo-router";
import { useComplaintStore } from "../store/useComplaintStore";

const useComplaint = () => {
  const { resetComplaint, setLoading } = useComplaintStore();
  const [isLoading, setLoadingState] = useState(false);
  const router = useRouter();

  const submitComplaint = async (
    data: FormData | { description: string },
    isFormData: boolean
  ) => {
    setLoadingState(true);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://aicms-api.onrender.com/api/complaints",
        data,
        {
          headers: {
            ...(isFormData
              ? { "Content-Type": "multipart/form-data" }
              : { "Content-Type": "application/json" }),
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        showMessage({
          message: "Complaint submitted successfully!",
          type: "success",
        });
        resetComplaint();
        router.replace("/(tabs)/complaints");
      } else {
        showMessage({
          message: "Something went wrong. Please try again.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error(error);
      showMessage({
        message: "Failed to submit complaint",
        type: "danger",
      });
    } finally {
      setLoadingState(false);
      setLoading(false);
    }
  };

  return { submitComplaint, isLoading };
};

export default useComplaint;
