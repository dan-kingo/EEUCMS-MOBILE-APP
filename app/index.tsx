import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { Linking } from "react-native";


const Home = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to EEU Complaint System</Text>
        <Text style={styles.subtitle}>
          Submit, track, and resolve complaints right now!
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => router.push("/register")}
            style={styles.primaryButton}
            labelStyle={styles.buttonLabel}
          >
            Submit a Complaint
          </Button>
          <Button
  mode="outlined"
  onPress={() => Linking.openURL("https://eeucms.netlify.app/faqs")}
  style={styles.outlinedButton}
  labelStyle={styles.buttonLabel}
  textColor="#f2f2f2"
>
  Learn More
</Button>

        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 68,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#212121",
  },
  content: {
    alignItems: "center",
    textAlign: "center",
    gap: 12,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "600",
    fontFamily: "Palanquin",
    color: "#f2f2f2",
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    textAlign: "center",
    color: "#cfcfcf",
    fontFamily: "Palanquin",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 24,
    gap: 12,
  },
  primaryButton: {
    borderRadius: 8,
    backgroundColor: "#ff784b",
  },
  outlinedButton: {
    borderRadius: 8,
    borderColor: "#f2f2f2",
  },
  buttonLabel: {
    fontFamily: "Palanquin",
  },
});
