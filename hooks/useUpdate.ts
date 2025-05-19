import { useEffect, useState } from "react";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import getUser from "./useUser";
import useUserStore from "../store/userStore";

interface ProfileFormState {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
}

const useUpdate = () => {
  const [formData, setFormData] = useState<ProfileFormState>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    const userData = await getUser();
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        userName: userData.userName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber?.toString() || "",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onChange = (field: keyof ProfileFormState, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const user = useUserStore.getState().user;

    if (!user?._id) {
      showMessage({
        message: "User not found in local store.",
        type: "danger",
      });
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
      };

      const response = await axios.put(
        `https://aicms-api.onrender.com/api/user/update-user/${user._id}`,
        payload,
        { withCredentials: true }
      );

      if (response.data.success) {
        showMessage({
          message: "Updated successfully!",
          type: "success",
        });

        useUserStore.getState().updateUser(response.data.user);

        setFormData({
          firstName: response.data.user.firstName || "",
          lastName: response.data.user.lastName || "",
          userName: response.data.user.userName || "",
          email: response.data.user.email || "",
          phoneNumber: response.data.user.phoneNumber?.toString() || "",
        });
      } else {
        showMessage({
          message: response.data.message || "Something went wrong.",
          type: "danger",
        });
      }
    }catch (error: any) {
  console.error("Update error:", error?.response?.data || error.message);
  showMessage({
    message: error?.response?.data?.message || "Failed to update! Please try again.",
    type: "danger",
  });
}
finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    formData,
    onChange,
    onSubmit,
  };
};

export default useUpdate;
