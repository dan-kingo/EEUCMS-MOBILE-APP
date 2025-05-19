import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Button, Text, TextInput } from "react-native-paper";
import useForgotPassword from "../hooks/useForgotPassword";

const ForgotPassword = () => {
  const { requestPasswordReset, isLoading } = useForgotPassword();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) {
      showMessage({
        message: "Please enter your email",
        type: "danger",
        icon: "danger",
      });
      return;
    }
    requestPasswordReset(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <TextInput
        mode="outlined"
        label="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}
      >
        {isLoading ? "Sending..." : "Send Reset Link"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});

export default ForgotPassword;
