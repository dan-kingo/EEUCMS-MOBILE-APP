import useProfileForm from "@/assets/constants/profileData";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import useUpdate from "../../hooks/useUpdate";
import useUserStore from "../../store/userStore";

const ProfileScreen = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const { formData, isLoading, onChange, onSubmit } = useUpdate();
  const profileData = useProfileForm();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Image Placeholder */}
      <View style={styles.imagePlaceholderContainer}>
        
        <View style={styles.placeholderCircle}>
          <Text style={styles.placeholderText}>
            {user?.firstName?.[0]?.toUpperCase() || "U"}
          </Text>
        </View>
        
      </View>

      {/* Profile Header */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {user?.firstName + " " + user?.lastName}
        </Text>
        <Text style={styles.username}>{user?.userName}</Text>
      </View>

      {/* Profile Edit Form */}
      <View style={styles.formContainer}>
        {profileData.map((fieldData, index) => (
          <View key={index} style={styles.inputGroup}>
            <TextInput
              label={fieldData.label}
              placeholder={fieldData.placeholder}
              value={formData[fieldData.name as keyof typeof formData] || ""}
              onChangeText={(text) =>
                onChange(fieldData.name as keyof typeof formData, text)
              }
              keyboardType={
                fieldData.name === "phoneNumber"
                  ? "phone-pad"
                  : fieldData.type === "email"
                  ? "email-address"
                  : "default"
              }
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: "#ff784b" } }}
            />
          </View>
        ))}

        <Button
          mode="contained"
          onPress={onSubmit}
          loading={isLoading}
          disabled={isLoading}
          style={styles.saveButton}
        >
          {isLoading ? "Saving..." : "Save Now"}
        </Button>

        <Text style={styles.changePassword}>
          Do you want to change your password?{" "}
          <Text
            style={styles.linkText}
            onPress={() => router.push("/(tabs)/settings")}
          >
            Click Here
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#121212",
    flexGrow: 1,
  },
  imagePlaceholderContainer: {
    marginTop: 32,
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ff784b",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Palanquin",
  },
  username: {
    color: "#ff784b",
    fontSize: 16,
  },
  formContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#1e1e1e",
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: "#ff784b",
    borderRadius: 24,
  },
  changePassword: {
    color: "#ccc",
    textAlign: "center",
    marginTop: 24,
  },
  linkText: {
    color: "#ff784b",
    textDecorationLine: "underline",
  },
});
