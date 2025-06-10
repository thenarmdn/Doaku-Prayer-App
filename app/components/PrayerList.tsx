import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";

interface Prayer {
  id: string;
  name: string;
}

interface PrayerListProps {
  searchQuery?: string;
  onPrayerSelect?: (id: string) => void;
}

export default function PrayerList({
  searchQuery = "",
  onPrayerSelect,
}: PrayerListProps) {
  const router = useRouter();
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [filteredPrayers, setFilteredPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for prayers
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockPrayers: Prayer[] = [
        { id: "1", name: "Doa Sebelum Makan" },
        { id: "2", name: "Doa Sesudah Makan" },
        { id: "3", name: "Doa Sebelum Tidur" },
        { id: "4", name: "Doa Bangun Tidur" },
        { id: "5", name: "Doa Masuk Masjid" },
        { id: "6", name: "Doa Keluar Masjid" },
        { id: "7", name: "Doa Masuk Rumah" },
        { id: "8", name: "Doa Keluar Rumah" },
        { id: "9", name: "Doa Naik Kendaraan" },
        { id: "10", name: "Doa Bepergian" },
        { id: "11", name: "Doa Untuk Orang Tua" },
        { id: "12", name: "Doa Memohon Ilmu" },
      ];
      setPrayers(mockPrayers);
      setFilteredPrayers(mockPrayers);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter prayers based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPrayers(prayers);
    } else {
      const filtered = prayers.filter((prayer) =>
        prayer.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredPrayers(filtered);
    }
  }, [searchQuery, prayers]);

  const handlePrayerPress = (id: string) => {
    if (onPrayerSelect) {
      onPrayerSelect(id);
    } else {
      router.push(`/prayer/${id}`);
    }
  };

  const renderPrayerItem = ({ item }: { item: Prayer }) => (
    <TouchableOpacity
      className="p-4 border-b border-gray-100 active:bg-[#ADEED9]"
      onPress={() => handlePrayerPress(item.id)}
    >
      <Text className="text-lg font-medium text-gray-800">{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0ABAB5" />
        <Text className="mt-2 text-[#0ABAB5]">Memuat daftar doa...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {filteredPrayers.length > 0 ? (
        <FlatList
          data={filteredPrayers}
          renderItem={renderPrayerItem}
          keyExtractor={(item) => item.id}
          className="flex-1"
        />
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <Search size={48} color="#ADEED9" />
          <Text className="text-lg text-gray-500 mt-4 text-center">
            Tidak ada doa yang ditemukan dengan kata kunci "{searchQuery}"
          </Text>
          <TouchableOpacity
            className="mt-4 bg-[#0ABAB5] py-2 px-4 rounded-md"
            onPress={() => setFilteredPrayers(prayers)}
          >
            <Text className="text-white font-medium">Tampilkan Semua</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
