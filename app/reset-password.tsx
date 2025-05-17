import React from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Card, Title, TextInput, Button } from "react-native-paper";
import useResetPassword from "./hooks/useResetPassword";

const ResetPassword = () => {
  const {
    resetPassword,
    newPassword,
    confirmPassword,
    setConfirmPassword,
    setNewPassword,
    isLoading,
  } = useResetPassword();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Reset Your Password</Title>

          <TextInput
            label="New Password"
            mode="outlined"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
            placeholder="Enter New Password"
            textContentType="password"
          />

          <TextInput
            label="Confirm Password"
            mode="outlined"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            placeholder="Confirm New Password"
            textContentType="password"
          />

          <Button
            mode="contained"
            onPress={resetPassword}
            disabled={isLoading}
            loading={isLoading}
            style={styles.button}
            contentStyle={{ paddingVertical: 8 }}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </Card.Content>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121", // dark background
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  card: {
    width: 320,
    backgroundColor: "#121212", // dark card background
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
    color: "#ff784b", // primary color
    marginBottom: 20,
    fontFamily: "Palanquin",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#212121",
    color: "#f2f2f2",
  },
  button: {
    backgroundColor: "#ff784b",
  },
});

export default ResetPassword;
