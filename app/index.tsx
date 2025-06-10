import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Search } from "lucide-react-native";
import { Link } from "expo-router";
import PrayerList from "./components/PrayerList";
import { Platform } from "react-native";

// AdMob Banner Component (only for native platforms)
const AdMobBanner = () => {
  if (Platform.OS === "web") {
    return null;
  }

  try {
    const {
      BannerAd,
      BannerAdSize,
      TestIds,
    } = require("react-native-google-mobile-ads");

    return (
      <View className="items-center py-2">
        <BannerAd
          unitId="ca-app-pub-3940256099942544/9214589741"
          size={BannerAdSize.ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    );
  } catch (error) {
    console.log("AdMob not available:", error);
    return null;
  }
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [adMobInitialized, setAdMobInitialized] = useState(false);

  useEffect(() => {
    // Initialize AdMob only on native platforms
    if (Platform.OS !== "web") {
      try {
        const { mobileAds } = require("react-native-google-mobile-ads");
        mobileAds()
          .initialize()
          .then(() => {
            console.log("AdMob initialized successfully");
            setAdMobInitialized(true);
          })
          .catch((error) => {
            console.log("AdMob initialization failed:", error);
          });
      } catch (error) {
        console.log("AdMob not available:", error);
      }
    }
  }, []);

  // Mock data for prayers
  const prayers = [
    { id: "1", name: "Doa Sebelum Makan" },
    { id: "2", name: "Doa Setelah Makan" },
    { id: "3", name: "Doa Sebelum Tidur" },
    { id: "4", name: "Doa Bangun Tidur" },
    { id: "5", name: "Doa Masuk Kamar Mandi" },
    { id: "6", name: "Doa Keluar Kamar Mandi" },
    { id: "7", name: "Doa Bepergian" },
    { id: "8", name: "Doa Masuk Rumah" },
    { id: "9", name: "Doa Keluar Rumah" },
    { id: "10", name: "Doa Masuk Masjid" },
  ];

  // Filter prayers based on search query
  const filteredPrayers = prayers.filter((prayer) =>
    prayer.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FFEDF3]">
      <StatusBar barStyle="dark-content" backgroundColor="#FFEDF3" />
      <View className="flex-1 px-4 pt-12 pb-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-[#0ABAB5]">Doaku</Text>
          <Text className="text-sm text-gray-600">
            Kumpulan Doa Sehari-hari
          </Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-6 border border-[#ADEED9]">
          <Search size={20} color="#0ABAB5" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Cari Doa..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Text className="text-[#0ABAB5]">Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* AdMob Banner */}
        {Platform.OS !== "web" && adMobInitialized && <AdMobBanner />}

        {/* Prayer List */}
        <PrayerList prayers={filteredPrayers} />
      </View>
    </SafeAreaView>
  );
}
