import React from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useTheme, FAB, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useMessage from '../hooks/useMessage';

const Chatbot = () => {
  const {
    input,
    setInput,
    isOpen,
    setIsOpen,
    sendMessage,
    messages,
    loading,
  } = useMessage();

  const theme = useTheme();

  return (
    <>
      {/* Floating Button */}
      <FAB
        icon="robot"
        onPress={() => setIsOpen(true)}
        style={styles.fab}
        color="white"
        customSize={56}
      />

      {/* Full-screen Modal */}
      <Modal
        visible={isOpen}
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: '#212121' }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>AI Chatbot</Text>
            <IconButton
              icon="close"
              iconColor="#fff"
              onPress={() => setIsOpen(false)}
            />
          </View>

          {/* Chat Messages */}
          <FlatList
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.messageList}
            renderItem={({ item }) => (
              <View style={styles.messageBlock}>
                {/* User Message */}
                <View style={styles.messageRow}>
                  <MaterialCommunityIcons
                    name="account"
                    size={20}
                    color="#fff"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.userMessage}>{item.user}</Text>
                </View>

                {/* Bot Reply */}
                {item.bot && (
                  <View style={styles.messageRow}>
                    <MaterialCommunityIcons
                      name="robot"
                      size={20}
                      color="#fff"
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.botMessage}>{item.bot}</Text>
                  </View>
                )}
              </View>
            )}
          />

          {/* Input + Send Button */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={80}
          >
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Ask something..."
                placeholderTextColor="#ccc"
                value={input}
                onChangeText={setInput}
                editable={!loading}
              />
              <TouchableOpacity
                style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}
                onPress={sendMessage}
                disabled={loading}
              >
                <MaterialCommunityIcons
                  name={loading ? 'loading' : 'send'}
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
};

export default Chatbot;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 56,
    right: 6,
    backgroundColor: '#ff784b',
    zIndex: 999,
  },
  modalContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  messageList: {
    paddingBottom: 16,
  },
  messageBlock: {
    marginBottom: 16,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  userMessage: {
    color: '#fff',
    backgroundColor: '#1e3a8a',
    padding: 8,
    borderRadius: 6,
    flexShrink: 1,
  },
  botMessage: {
    color: '#fff',
    backgroundColor: '#374151',
    padding: 8,
    borderRadius: 6,
    flexShrink: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: Platform.OS === 'ios' ? 20 : 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
    height: 44,
  },
  sendButton: {
    marginLeft: 8,
    borderRadius: 8,
    padding: 10,
  },
});
