// app/(tabs)/home.tsx
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function ComplaintsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Complaints Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
