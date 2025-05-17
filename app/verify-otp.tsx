import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, TextInput, Button } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import useRegister from "./hooks/useRegister";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { verifyOTP, resendOTP } = useRegister();

  const handleVerify = () => {
    if (otp.length !== 6) {
      showMessage({
        message: "Please enter a valid 6-digit OTP",
        type: "danger",
        backgroundColor: "#c6635a", // optional custom color
      });
      return;
    }

    setIsVerifying(true);
    verifyOTP(otp).finally(() => setIsVerifying(false));
  };

  const handleResend = () => {
    setIsResending(true);
    resendOTP().finally(() => setIsResending(false));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Enter OTP</Text>
          <TextInput
            label="OTP"
            mode="outlined"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleVerify}
            loading={isVerifying}
            disabled={isVerifying}
            style={styles.button}
          >
            Verify OTP
          </Button>
          <Button
            mode="text"
            onPress={handleResend}
            loading={isResending}
            disabled={isResending}
            style={styles.resendButton}
          >
            Resend OTP
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 8,
  },
  resendButton: {
    alignSelf: "center",
  },
});

export default OTPVerification;
