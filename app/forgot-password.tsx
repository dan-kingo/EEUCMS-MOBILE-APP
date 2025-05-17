import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Button, TextInput, Card, Title } from "react-native-paper";
import FlashMessage, { showMessage } from "react-native-flash-message";
import useForgotPassword from "./hooks/useForgotPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { requestPasswordReset, isLoading } = useForgotPassword(); // keep your hook

  const handleSubmit = () => {
    if (!email.trim()) {
      showMessage({
        message: "Please enter your email",
        type: "warning",
        icon: "warning",
      });
      return;
    }
    requestPasswordReset(email);
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Forgot Password</Title>
            <TextInput
              label="Email"
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Enter your email"
              textContentType="emailAddress"
            />
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              style={styles.button}
              contentStyle={{ paddingVertical: 8 }}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Card.Content>
        </Card>
      </KeyboardAvoidingView>

      <FlashMessage position="top" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121", // dark color
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

export default ForgotPassword;
