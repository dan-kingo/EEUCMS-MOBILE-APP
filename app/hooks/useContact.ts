import { useState } from "react";
import { showMessage } from "react-native-flash-message";

type ContactFormData = {
  fullname: string;
  email: string;
  subject: string;
  message: string;
};

const useContact = () => {
  const [isLoading, setLoading] = useState(false);

  // Basic validation logic can be moved to component or here as needed

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("access_key", "1aab92dc-a0b9-4043-a390-b72203d93691");
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("message", data.message);
    formData.append("subject", data.subject);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        showMessage({
          message: "Form submitted successfully!",
          description: `Thanks for your message, ${data.fullname}!`,
          type: "success",
          icon: "success",
        });
        return true; // you can use this in component to reset form
      } else {
        showMessage({
          message: "Something went wrong. Please try again.",
          type: "danger",
          icon: "danger",
        });
        return false;
      }
    } catch (error) {
      showMessage({
        message: "Failed to send message.",
        type: "danger",
        icon: "danger",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, onSubmit };
};

export default useContact;
