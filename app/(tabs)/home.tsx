import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { Text, View } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Button, TextInput } from "react-native-paper";
import useComplaint from "../../hooks/useComplaint";

export default function ComplaintForm() {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null
  );
  const { submitComplaint, isLoading } = useComplaint();

  const handleFilePick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf", "audio/*"],
      copyToCacheDirectory: true,
    });

    if (result.assets && result.assets[0]) {
      const selected = result.assets[0];
      if (selected.size && selected.size > 5 * 1024 * 1024) {
        showMessage({
          message: "File size must be less than 5MB.",
          type: "danger",
        });
        return;
      }
      setFile(selected);
    }
  };

  const onSubmit = async () => {
    if (!description.trim()) {
      showMessage({
        message: "Complaint description is required.",
        type: "danger",
      });
      return;
    }

    if (file) {
      const formData = new FormData();
      formData.append("description", description.trim());
      formData.append("supportingFile", {
        uri: file.uri,
        type: file.mimeType || "application/octet-stream",
        name: file.name || "upload",
      } as any);

      submitComplaint(formData, true);
    } else {
      const jsonData = { description: description.trim() };
      submitComplaint(jsonData, false);
    }

    setFile(null);
    setDescription("");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#121212",
      }}
    >
      {/* Card Container */}
      <View
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: 16,
          padding: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 6,
        }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Make Complaint
        </Text>

        {/* Label */}
        <Text style={{ fontSize: 16, color: "#fff", marginBottom: 8 }}>
          Complaint Description
        </Text>

        {/* Textarea */}
        <TextInput
          multiline
          numberOfLines={6}
          mode="outlined"
          placeholder="Describe your complaint..."
          value={description}
          onChangeText={setDescription}
          style={{
            marginBottom: 20,
            backgroundColor: "#1e1e1e",
            minHeight: 120,
          }}
          textColor="#fff"
          theme={{ colors: { primary: "#ff784b" } }}
        />

        {/* File Picker */}
        <Button
          mode="contained"
          onPress={handleFilePick}
          style={{ marginBottom: 10, backgroundColor: "#c6635a" }}
        >
          {file ? `Selected: ${file.name}` : "Pick Supporting File (Optional)"}
        </Button>

        {/* Submit Button */}
        <Button
          mode="contained"
          onPress={onSubmit}
          loading={isLoading}
          disabled={isLoading}
          style={{ backgroundColor: "#ff784b", marginTop: 16 }}
        >
          Submit Complaint
        </Button>
      </View>

      {/* Flash message container */}
      <FlashMessage position="top" />
    </View>
  );
}
