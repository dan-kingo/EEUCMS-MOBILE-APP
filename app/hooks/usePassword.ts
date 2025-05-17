import axios from "axios";
import { useState } from "react";
import changePasswordSchema, { changePasswordData } from "../utils/changePasswordSchema";

const usePassword = () => {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof changePasswordData, string>>>({});

  const validate = (data: changePasswordData) => {
    const parsed = changePasswordSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof changePasswordData, string>> = {};
    parsed.error.errors.forEach((err: { path: (string | number)[]; message: string }) => {
      if (err.path.length > 0) {
        const key = err.path[0] as keyof changePasswordData;
        fieldErrors[key] = err.message;
      }
    });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const onSubmit = async (
    data: changePasswordData,
    showMessage: (message: { message: string; type: "success" | "danger" }) => void
  ) => {
    if (!validate(data)) return;

    setLoading(true);
    let isComponentMounted = true;

    try {
      const response = await axios.post(
        "https://aicms-api.onrender.com/api/user/change-password",
        data,
        { withCredentials: true }
      );

      const result = response.data;

      if (isComponentMounted) {
        if (result.success) {
          showMessage({ message: "Password changed successfully!", type: "success" });
        } else {
          showMessage({ message: result.message || "Something went wrong. Please try again.", type: "danger" });
        }
      }
    } catch (error) {
      console.log(error);
      if (isComponentMounted) {
        showMessage({ message: "Failed to update. Please try again.", type: "danger" });
      }
    } finally {
      if (isComponentMounted) setLoading(false);
    }

    return () => {
      isComponentMounted = false;
    };
  };

  return { isLoading, errors, onSubmit };
};

export default usePassword;
