import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

// Mock data for prayers
const mockPrayers = [
  {
    id: "1",
    name: "Doa Sebelum Makan",
    arabic:
      "اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    translation:
      "Ya Allah, berkahilah rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.",
  },
  {
    id: "2",
    name: "Doa Sesudah Makan",
    arabic:
      "اَلْحَمْدُ ِللهِ الَّذِىْ اَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِيْنَ",
    translation:
      "Segala puji bagi Allah yang telah memberi makan kami dan minuman kami, serta menjadikan kami sebagai orang-orang islam.",
  },
  {
    id: "3",
    name: "Doa Sebelum Tidur",
    arabic: "بِسْمِكَ اللّٰهُمَّ اَحْيَا وَاَمُوْتُ",
    translation: "Dengan menyebut nama-Mu ya Allah, aku hidup dan aku mati.",
  },
  {
    id: "4",
    name: "Doa Bangun Tidur",
    arabic:
      "اَلْحَمْدُ ِللهِ الَّذِىْ اَحْيَانَا بَعْدَمَآ اَمَاتَنَا وَاِلَيْهِ النُّشُوْرُ",
    translation:
      "Segala puji bagi Allah yang telah menghidupkan kami sesudah kami mati (membangunkan dari tidur) dan hanya kepada-Nya kami dikembalikan.",
  },
  {
    id: "5",
    name: "Doa Masuk Masjid",
    arabic: "اَللّٰهُمَّ افْتَحْ لِيْ اَبْوَابَ رَحْمَتِكَ",
    translation: "Ya Allah, bukalah untukku pintu-pintu rahmat-Mu.",
  },
];

export default function PrayerDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Find the current prayer based on id
  const currentPrayerIndex = mockPrayers.findIndex(
    (prayer) => prayer.id === id,
  );
  const currentPrayer = mockPrayers[currentPrayerIndex] || mockPrayers[0];

  // Handle navigation to next prayer
  const handleNextPrayer = () => {
    const nextIndex = (currentPrayerIndex + 1) % mockPrayers.length;
    const nextPrayerId = mockPrayers[nextIndex].id;
    router.push(`/prayer/${nextPrayerId}`);
  };

  // Handle back to dashboard
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#0ABAB5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doaku</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Prayer name */}
        <Text style={styles.prayerName}>{currentPrayer.name}</Text>

        {/* Arabic text */}
        <View style={styles.arabicContainer}>
          <Text style={styles.arabicText}>{currentPrayer.arabic}</Text>
        </View>

        {/* Translation */}
        <View style={styles.translationContainer}>
          <Text style={styles.translationTitle}>Arti:</Text>
          <Text style={styles.translationText}>
            {currentPrayer.translation}
          </Text>
        </View>
      </ScrollView>

      {/* Next prayer button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNextPrayer}>
        <Text style={styles.nextButtonText}>Doa Berikutnya</Text>
        <ArrowRight size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEDF3",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "#ADEED9",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#0ABAB5",
    marginRight: 40, // To offset the back button and center the title
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  prayerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0ABAB5",
    textAlign: "center",
    marginBottom: 24,
  },
  arabicContainer: {
    backgroundColor: "#ADEED9",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  arabicText: {
    fontSize: 24,
    lineHeight: 40,
    textAlign: "right",
    color: "#0ABAB5",
  },
  translationContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
  },
  translationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0ABAB5",
    marginBottom: 8,
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0ABAB5",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    margin: 16,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
});
