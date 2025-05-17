import React from "react";
import { ScrollView, View } from "react-native";
import { Text, Button, Divider } from "react-native-paper";
import ChangePassword from "../components/ChangePassword";
import useLogout from "../hooks/useLogout";
import DeleteAccount from "../components/DeleteAccount";
import ContactForm from "../components/ContactForm";

const SettingsScreen = () => {
  const { isLoading, logoutUser } = useLogout();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#121212", paddingHorizontal: 2, paddingVertical: 24 }}
      contentContainerStyle={{ paddingBottom: 48 }} // <-- added bottom padding
    >
      <Text variant="titleLarge" style={{ color: "#f2f2f2", marginBottom: 16, marginLeft: 16 }}>
        Settings & Privacy
      </Text>

      {/* Change Password Section */}
      <View>
        <Text variant="titleMedium" style={{ marginBottom: 12, marginLeft: 16 }}>
          Change Password Settings
        </Text>
        <ChangePassword />
      </View>

      {/* Contact Support Section */}
      <View>
        <Text variant="titleMedium" style={{ marginBottom: 12,marginLeft: 16 }}>
          Contact Support
        </Text>
        <ContactForm />
      </View>

      {/* Account Actions Section */}
      <View>
        <Text variant="titleMedium" style={{ marginBottom: 12,marginLeft: 16 }}>
          Account Actions
        </Text>
        <DeleteAccount />
        <Divider style={{ marginVertical: 12 , marginHorizontal:16}} />
        <Button
          mode="contained"
          onPress={logoutUser}
          loading={isLoading}
          buttonColor="#c6635a"
          textColor="#ffffff"
        >
          {isLoading ? "Logging Out..." : "Log Out"}
        </Button>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
