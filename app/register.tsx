import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import useRegisterForm from "@/assets/constants/registerData";
import useRegister from "./hooks/useRegister";
import registerSchema, { registerFormData } from "./utils/registerFormSchema";
import { z } from "zod";
import { showMessage } from "react-native-flash-message";

export default function RegisterScreen() {
  const router = useRouter();
  const registerData = useRegisterForm();
  const { isLoading, registerUser } = useRegister();

  const [formValues, setFormValues] = useState<registerFormData>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof registerFormData, string>>>({});

  const handleChange = (name: keyof registerFormData, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    try {
      registerSchema.parse(formValues);
      setFormErrors({});

      registerUser(formValues, () =>
        setFormValues({
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        })
      );
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Partial<Record<keyof registerFormData, string>> = {};
        err.errors.forEach((e) => {
          const field = e.path[0] as keyof registerFormData;
          errors[field] = e.message;
        });
        setFormErrors(errors);

        showMessage({
          message: "Validation Error",
          description: "Please check your inputs and try again.",
          type: "danger",
          backgroundColor: "#c6635a",
        });
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create Your Account</Text>

      {registerData.map((item, index) => (
        <View style={styles.inputWrapper} key={index}>
          <TextInput
            label={item.label}
            mode="outlined"
            placeholder={item.placeholder}
            value={formValues[item.name as keyof registerFormData]}
            onChangeText={(value) => handleChange(item.name as keyof registerFormData, value)}
            secureTextEntry={item.type === "password"}
            style={styles.input}
            theme={{ colors: { text: "#f2f2f2" } }}
          />
          {formErrors[item.name as keyof registerFormData] && (
            <Text style={styles.error}>{formErrors[item.name as keyof registerFormData]}</Text>
          )}
        </View>
      ))}

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
        labelStyle={{ fontFamily: "Palanquin-Regular" }}
      >
        Register
      </Button>

      <Text style={styles.loginText}>
        Already a member?{" "}
        <Text onPress={() => router.push("/login")} style={styles.loginLink}>
          Login
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
  error: {
    color: "#ff784b",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "Palanquin-Regular",
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: "#ff784b",
    borderRadius: 24,
  },
  loginText: {
    marginTop: 20,
    color: "#f2f2f2",
    textAlign: "center",
    fontFamily: "Palanquin-Regular",
  },
  loginLink: {
    color: "#ff784b",
    textDecorationLine: "underline",
  },
});
