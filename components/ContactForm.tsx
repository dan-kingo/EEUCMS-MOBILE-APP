import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import formData from "@/assets/constants/formData";
import useContact from "../hooks/useContact";

const ContactForm = () => {
  // Initialize form values based on static formData (no translation)
  const [formValues, setFormValues] = useState(() =>
    formData().reduce((acc, cur) => {
      acc[cur.name] = "";
      return acc;
    }, {} as Record<string, string>)
  );
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { isLoading, onSubmit } = useContact();

  // Basic validation using static labels from formData
  const validate = () => {
    const newErrors: Record<string, string> = {};
    formData().forEach(({ name, label }) => {
      if (!formValues[name]) newErrors[name] = `${label} is required`;
    });
    if (!message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const data = {
      fullname: formValues.fullname,
      email: formValues.email,
      subject: formValues.subject,
      message,
    };
    await onSubmit(data);
  };

  return (
    <View style={styles.card}>
      <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled>
        {formData().map((input) => (
          <View key={input.name} style={styles.formItem}>
            <TextInput
              label={input.label}
              placeholder={input.placeholder}
              value={formValues[input.name]}
              onChangeText={(text) => handleChange(input.name, text)}
              mode="outlined"
              error={!!errors[input.name]}
              autoCapitalize="none"
              style={{ backgroundColor: "#1e1e1e" }}
              theme={{ colors: { primary: "#c6635a", text: "#f2f2f2", placeholder: "#999" } }}
            />
            {errors[input.name] && (
              <HelperText type="error" visible={true} style={{ color: "#ff6b6b" }}>
                {errors[input.name]}
              </HelperText>
            )}
          </View>
        ))}

        <View style={styles.formItem}>
          <TextInput
            label="Message"
            placeholder="Type your message here..."
            value={message}
            onChangeText={setMessage}
            mode="outlined"
            multiline
            numberOfLines={6}
            error={!!errors.message}
            style={[{ height: 120, backgroundColor: "#1e1e1e" }]}
            autoCapitalize="none"
            theme={{ colors: { primary: "#c6635a", text: "#f2f2f2", placeholder: "#999" } }}
          />
          {errors.message && (
            <HelperText type="error" visible={true} style={{ color: "#ff6b6b" }}>
              {errors.message}
            </HelperText>
          )}
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={isLoading}
          contentStyle={{ flexDirection: "row", justifyContent: "center" }}
          style={{ marginTop: 8 }}
          buttonColor="#c6635a"
          textColor="#f2f2f2"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    flex: 1,
  },
  container: {
    paddingBottom: 16,
  },
  formItem: {
    marginBottom: 16,
  },
});

export default ContactForm;
