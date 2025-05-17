const useProfileForm = () => {
  const profileData = [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "Enter your first name",
      type: "text",
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholder: "Enter your last name",
      type: "text",
    },
    {
      name: "userName",
      label: "Username",
      placeholder: "Enter your username",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email address",
      type: "email",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      type: "number",
    },
  ];

  return profileData;
};

export default useProfileForm;
