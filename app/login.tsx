import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import useLogin from "./hooks/useLogin";
import { showMessage } from "react-native-flash-message";

export default function LoginForm() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, isLoading } = useLogin();

  const handleLogin = async () => {
    if (!userName || !password) {
      showMessage({
        message: "Please enter both username and password",
        type: "danger",
        backgroundColor: "#c6635a",
      });
      return;
    }

    try {
      await loginUser({ userName, password });
    } catch (error: any) {
      showMessage({
        message: error?.message || "Login failed",
        type: "danger",
        backgroundColor: "#c6635a",
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Welcome Back</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          label="Username"
          value={userName}
          onChangeText={setUserName}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { text: "#f2f2f2" } }}
        />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          theme={{ colors: { text: "#f2f2f2" } }}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
        labelStyle={{ fontFamily: "Palanquin-Regular" }}
      >
        Login
      </Button>

      <Text
        onPress={() => router.push("/forgot-password")}
        style={styles.forgotText}
      >
        Forgot Password?
      </Text>

      <Text style={styles.registerText}>
        Don't have an account?{" "}
        <Text onPress={() => router.push("/register")} style={styles.registerLink}>
          Register
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212121",
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  heading: {
    fontFamily: "Palanquin-SemiBold",
    fontSize: 24,
    color: "#f2f2f2",
    textAlign: "center",
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#212121",
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: "#ff784b",
    borderRadius: 24,
  },
  forgotText: {
    marginTop: 16,
    color: "#ff784b",
    textAlign: "center",
    fontFamily: "Palanquin-Regular",
    textDecorationLine: "underline",
  },
  registerText: {
    marginTop: 20,
    color: "#f2f2f2",
    textAlign: "center",
    fontFamily: "Palanquin-Regular",
  },
  registerLink: {
    color: "#ff784b",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
