const useContactForm = () => {
  const formData = [
    {
      name: "fullname",
      label: "Full Name",
      placeholder: "Enter your full name",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Enter your subject",
    },
  ];

  return formData;
};

export default useContactForm;
