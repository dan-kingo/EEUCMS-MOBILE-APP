import React, { useState } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Button, Text, Portal, Dialog } from "react-native-paper";
import { useDeleteAccount } from "../hooks/useDeleteAccount";

const DeleteAccount = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { deleteAccount } = useDeleteAccount();

  const handleDelete = async () => {
    await deleteAccount();
    setIsVisible(false);
  };

  return (
    <View style={{ margin: 16 }}>
      <Button
        mode="contained"
        onPress={() => setIsVisible(true)}
        style={{ backgroundColor: "#d32f2f" }} // destructive red
      >
        Delete Account
      </Button>

      <Portal>
        <Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Content>
            <Text>
              This action will permanently delete your account. Are you sure you
              want to proceed?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsVisible(false)}>Cancel</Button>
            <Button
              onPress={handleDelete}
              mode="contained"
              style={{ backgroundColor: "#d32f2f" }}
            >
              Confirm Deletion
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DeleteAccount;
