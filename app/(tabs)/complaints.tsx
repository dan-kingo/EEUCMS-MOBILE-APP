import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet, TextInput } from "react-native";
import { Card, Title, ActivityIndicator } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import CustomDialogComponent, { Complaint } from "../components/CustomDialogComponent";
import CustomTable from "../components/CustomTable";
import { useUserComplaints } from "../hooks/useUserComplaints";

export default function ComplaintHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const { complaints, loading } = useUserComplaints();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Complaint History" titleStyle={styles.cardTitle} />
        <Card.Content>
          {/* Search Input */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search complaints..."
            placeholderTextColor="#aaa"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          {/* Complaints List */}
          <CustomTable
            complaints={filteredComplaints}
            onSelectComplaint={setSelectedComplaint}
          />

          {/* Dialog for selected complaint */}
          <CustomDialogComponent
            selectedComplaint={selectedComplaint}
            onClose={() => setSelectedComplaint(null)}
          />
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#212121",
  },
  card: {
    backgroundColor: "#1e1e1e",
    flex: 1,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 20,
  },
  searchInput: {
    height: 40,
    backgroundColor: "#181818",
    borderRadius: 4,
    paddingHorizontal: 12,
    marginBottom: 16,
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212121",
  },
});
