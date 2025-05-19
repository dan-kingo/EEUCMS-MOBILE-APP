import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
const { width: screenWidth } = Dimensions.get("window");

const slides = [
  {
    title: "Welcome to EEU Complaint System",
    subtitle: "Submit, track, and resolve complaints right now!",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AIcons8_flat_flash_on.svg&psig=AOvVaw15M-J1C3advyuoGoUQDiZt&ust=1747721229083000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNDAvvruro0DFQAAAAAdAAAAABA", // customer service
  },
  {
    title: "AI-Powered Categorization",
    subtitle: "Smart complaint classification for faster resolutions.",
    image:
      "https://eeucms.netlify.app/assets/AI_brain-removebg-preview-Ds5uPSQU.png", // AI system
  },
  {
    title: "Real-Time Tracking",
    subtitle: "Stay informed every step.",
    image:
      "https://eeucms.netlify.app/assets/realtime-removebg-preview-DmLBbAyo.png", // tracking progress
  },
  {
    title: "Automated Responses",
    subtitle: "Instant solutions for common electricity issues.",
    image:
      "https://eeucms.netlify.app/assets/automation-removebg-preview-CdAw7FK1.png", // chat or bot
  },
  {
    type: "cta",
  },
];

const Home = () => {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item, index }: any) => {
    if (item.type === "cta") {
  return (
    <Card style={[styles.card, styles.ctaSlide]} key={index}>
      <Card.Content style={styles.ctaContentColumn}>
        <Text style={styles.ctaTitle}>Ready to get started?</Text>

        <View style={styles.ctaRow}>
          <Text style={styles.ctaSubtitle}>Create an account now</Text>
          <Button
            mode="text"
            onPress={() => router.push("/register")}
            labelStyle={styles.linkButtonLabel}
            compact
          >
            Register here
          </Button>
        </View>

        <View style={styles.learnMoreContainer}>
          <Text style={styles.learnText}>Do you wanna learn more?</Text>
          <TouchableOpacity onPress={() => router.push("https://eeucms.netlify.app/faqs")}>
            <Text style={styles.learnLink}> Click here</Text>
          </TouchableOpacity>
        </View>

        {/* New Login Prompt */}
        <View style={styles.loginPromptContainer}>
          <Text style={styles.learnText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.learnLink}> Login here</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
}


    return (
      <Card style={[styles.card, { position: "relative" }]} key={index}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity
        onPress={() => router.push("/register")}
        style={styles.skipButton}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>

      {/* Center Carousel Vertically */}
      <View style={styles.carouselWrapper}>
        <Carousel
          data={slides}
          width={screenWidth}
          height={250}
          onSnapToItem={(index) => setActiveSlide(index)}
          renderItem={renderItem}
          scrollAnimationDuration={500}
          loop={false}
        />

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressBar,
                activeSlide === index && styles.activeProgressBar,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    paddingTop: 68,
  },
  skipButton: {
    position: "absolute",
    top: 36,
    right: 20,
    zIndex: 1,
  },
  skipButtonText: {
    color: "#ff784b",
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: "Palanquin",
  },
  carouselWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#333",
    marginHorizontal: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Palanquin",
    color: "#f2f2f2",
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: "Palanquin",
    color: "#cfcfcf",
    textAlign: "center",
    marginTop: 6,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginPromptContainer: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: 8,
},

  progressBar: {
    width: 30,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#888",
    marginHorizontal: 4,
  },
  activeProgressBar: {
    backgroundColor: "#ff784b",
  },
  ctaSlide: {
    height: 250,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  ctaContentColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Palanquin",
    color: "#f2f2f2",
    textAlign: "center",
    marginBottom: 4,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: "#cfcfcf",
    fontFamily: "Palanquin",
    textAlign: "center",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  linkButtonLabel: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#ff784b",
    fontFamily: "Palanquin",
  },
  ctaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 8,
    gap: 4,
  },
  learnMoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  learnText: {
    fontSize: 14,
    color: "#cfcfcf",
    fontFamily: "Palanquin",
  },
  learnLink: {
    fontSize: 14,
    color: "#ff784b",
    textDecorationLine: "underline",
    fontFamily: "Palanquin",
  },
});
