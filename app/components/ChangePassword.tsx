import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { Button, Text, TextInput, Title } from "react-native-paper";
import usePassword from "../hooks/usePassword";

const ChangePassword = () => {
  const { isLoading, errors: validationErrors, onSubmit } = usePassword();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});

  const validateLocal = () => {
    const newErrors: { [key: string]: string } = {};
    if (!currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!newPassword) newErrors.newPassword = "New password is required";
    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateLocal()) return;
    const data = { currentPassword, newPassword, confirmPassword };
    onSubmit(data, showMessage);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoid}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>

          <TextInput
            label="Current Password"
            mode="outlined"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
            error={
              !!localErrors.currentPassword ||
              !!validationErrors.currentPassword
            }
            style={styles.input}
            theme={{
              colors: {
                primary: "#c6635a",
                background: "#121212",
                text: "#f2f2f2",
                placeholder: "#999",
              },
            }}
          />
          {(localErrors.currentPassword ||
            validationErrors.currentPassword) && (
            <Text style={styles.errorText}>
              {localErrors.currentPassword || validationErrors.currentPassword}
            </Text>
          )}

          <TextInput
            label="New Password"
            mode="outlined"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            error={!!localErrors.newPassword || !!validationErrors.newPassword}
            style={styles.input}
            theme={{
              colors: {
                primary: "#c6635a",
                background: "#121212",
                text: "#f2f2f2",
                placeholder: "#999",
              },
            }}
          />
          {(localErrors.newPassword || validationErrors.newPassword) && (
            <Text style={styles.errorText}>
              {localErrors.newPassword || validationErrors.newPassword}
            </Text>
          )}

          <TextInput
            label="Confirm Password"
            mode="outlined"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={!!localErrors.confirmPassword}
            style={[styles.input, { marginBottom: 20 }]}
            theme={{
              colors: {
                primary: "#c6635a",
                background: "#121212",
                text: "#f2f2f2",
                placeholder: "#999",
              },
            }}
          />
          {localErrors.confirmPassword && (
            <Text style={styles.errorText}>{localErrors.confirmPassword}</Text>
          )}

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            contentStyle={{ borderRadius: "100%" }}
            buttonColor="#c6635a"
            textColor="#f2f2f2"
        
          >
            {isLoading ? "Changing..." : "Change Password"}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,

    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#f2f2f2",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#1e1e1e",
  },
  errorText: {
    color: "#ff6b6b",
    marginBottom: 8,
  },
});

export default ChangePassword;
