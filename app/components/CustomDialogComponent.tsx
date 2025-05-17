import { format } from "date-fns";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Modal, Paragraph, Portal, Title } from "react-native-paper";

export interface Complaint {
  user: string;
  description: string;
  createdAt: string;
  category: string;
  status: string;
}

interface Props {
  selectedComplaint: Complaint | null;
  onClose: () => void;
}

const CustomDialogComponent = ({ selectedComplaint, onClose }: Props) => {
  if (!selectedComplaint) return null;

  return (
    <Portal>
      <Modal
        visible={!!selectedComplaint}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <ScrollView>
          <Title style={styles.title}>Submit Complaint</Title>
          <Paragraph style={styles.description}>
            Details of the selected complaint.
          </Paragraph>

          <View style={styles.detailRow}>
            <Text style={styles.detailText}>
              <Text style={styles.label}>ID: </Text>
              {selectedComplaint.user}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Description: </Text>
              {selectedComplaint.description}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Category: </Text>
              {selectedComplaint.category}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Status: </Text>
              {selectedComplaint.status}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Date: </Text>
              {format(new Date(selectedComplaint.createdAt), "hh:mm a, MM-dd-yyyy")}
            </Text>
          </View>

          <Button mode="contained" onPress={onClose} style={styles.closeButton}>
            Close
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#1e1e1e",
    margin: 20,
    borderRadius: 8,
    padding: 16,
    maxHeight: "80%",
  },
  title: {
    color: "#ff784b",
    marginBottom: 8,
  },
  description: {
    color: "#ccc",
    marginBottom: 16,
  },
  detailRow: {
    marginBottom: 12,
  },
  detailText: {
    color: "#ddd",
    flexWrap: "wrap",
  },
  label: {
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: "#ff784b",
  },
});

export default CustomDialogComponent;
