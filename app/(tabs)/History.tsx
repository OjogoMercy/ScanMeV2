import { images } from "@/assets/images";
import general from "@/constants/General";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import {
  Colors,
  FONTS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  Sizes,
} from "../../constants/theme";

interface ScanData {
  id: number;
  data: any;
  type: string;
  timestamp: string;
  favorite: boolean;
}

const History = () => {
  const [scanHistory, setScanHistory] = useState<ScanData[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredData, setFilteredData] = useState<ScanData[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadScanHistory();
    }, [])
  );

  const loadScanHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("scanHistory");
      if (history) {
        const parsedHistory = JSON.parse(history);
        setScanHistory(parsedHistory);
      }
    } catch (error) {
      console.log("Error loading history:", error);
      Alert.alert("Error", "Failed to load scan history");
    }
  };

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredData(scanHistory);
    } else {
      const filtered = scanHistory.filter((item) => item.type === activeFilter);
      setFilteredData(filtered);
    }
  }, [activeFilter, scanHistory]);

  // Actions
  const deleteScan = async (id: number) => {
    const updatedHistory = scanHistory.filter((item) => item.id !== id);
    setScanHistory(updatedHistory);
    await AsyncStorage.setItem("scanHistory", JSON.stringify(updatedHistory));
  };

  const favoriteScan = async (id: number) => {
    const updatedHistory = scanHistory.map((item) =>
      item.id === id ? { ...item, favorite: !item.favorite } : item
    );
    setScanHistory(updatedHistory);
    await AsyncStorage.setItem("scanHistory", JSON.stringify(updatedHistory));
  };

  const copyToClipboard = async (text: string) => {
    Clipboard.setStringAsync(text);
    Alert.alert("Copied!", "Text copied to clipboard");
  };
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };
  const categories = ["all", "url", "email", "phone", "text", "wifi"];
  const renderCategoryFilter = () => (
    <MotiView
      style={styles.categoryBar}
      from={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{
        type: "timing",
        duration: 700,
      }}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.categoryButton,
            activeFilter === cat && styles.activeButton,
          ]}
          onPress={() => setActiveFilter(cat)}
        >
          <Text
            style={[
              styles.categoryText,
              activeFilter === cat && styles.activeText,
            ]}
          >
            {cat.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </MotiView>
  );
  const renderEmptyContent = () => {
    if (scanHistory.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Image
            style={{
              height: SCREEN_HEIGHT * 0.3,
              width: SCREEN_WIDTH * 0.8,
              resizeMode: "contain",
            }}
            source={require("../../assets/images/emptyScan.png")}
          />
          <Text style={{ ...FONTS.h3, fontWeight: "bold" }}>No Scans Yet!</Text>
          <Text style={styles.emptySubtext}>
            Scan some QR codes to see them here!
          </Text>
        </View>
      );
    }

    if (filteredData.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Image
            style={{
              height: SCREEN_HEIGHT * 0.3,
              width: SCREEN_WIDTH * 0.8,
              resizeMode: "contain",
            }}
            source={images.emptyScan}
          />
          <Text style={{ ...FONTS.h3, fontWeight: "bold" }}>
            No {activeFilter.toLowerCase()} Scans Found
          </Text>
          <Text style={styles.emptySubtext}>
            Try changing your category filter or scanning a new item.
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View
      style={[
        general.container,
        { backgroundColor: Colors.background, paddingTop: Sizes.navTitle },
      ]}
    >
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor={Colors.background} />
      <Text style={styles.title}>Scan History</Text>
      <View>
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <MotiView
              style={styles.historyItem}
              key={item.id}
              from={{ opacity: 0, translateY: 100 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: "timing",
                duration: 1000,
                delay: index * 100,
              }}
            >
              <View style={styles.itemHeader}>
                <Text style={styles.typeText}>{item.type.toUpperCase()}</Text>
                <Text style={styles.dateText}>
                  {formatDate(item.timestamp)}
                </Text>
              </View>
              <Text style={styles.dataText} numberOfLines={2}>
                {item.data}
              </Text>
              <View style={styles.actions}>
                {item.type === "url" && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Linking.openURL(item.data)}
                  >
                    <Text style={styles.actionText}>Open</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => copyToClipboard(item.data)}
                >
                  <Text style={styles.actionText}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => favoriteScan(item.id)}
                >
                  <Text style={[styles.actionText, { color: Colors.accent }]}>
                    {item.favorite ? "★" : "☆"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#ffdbee" }]}
                  onPress={() => deleteScan(item.id)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </MotiView>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={
            filteredData.length === 0
              ? {
                  // flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: Sizes.padding,
                }
              : styles.listContent
          }
          ListHeaderComponent={
            scanHistory.length > 0 ? renderCategoryFilter() : null
          }
          ListEmptyComponent={renderEmptyContent()}
        />
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: moderateScale(20),
    marginTop:moderateScale(50)
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Sizes.padding,
    marginTop: Sizes.padding,
  },
  emptySubtext: {
    marginTop: moderateScale(10),
    color: "#666",
    fontSize: moderateScale(14),
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(50),
  },
  historyItem: {
    backgroundColor: "white",
    padding: moderateScale(16),
    borderRadius: moderateScale(20),
    marginBottom: moderateScale(12),
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateScale(8),
  },
  typeText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: "#666",
    textTransform: "uppercase",
  },
  dateText: {
    fontSize: moderateScale(12),
    color: "#999",
  },
  dataText: {
    fontSize: moderateScale(16),
    marginBottom: moderateScale(12),
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: moderateScale(12),
  },
  actionButton: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    backgroundColor: "#f0f0f0",
    borderRadius: moderateScale(6),
  },
  actionText: {
    fontSize: moderateScale(14),
    fontWeight: "500",
  },
  deleteText: {
    color: "#d32f2f",
    fontWeight: "500",
  },
  categoryBar: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: moderateScale(15),
  },
  categoryButton: {
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(20),
    backgroundColor: "#e0e0e0",
    marginRight: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: moderateScale(14),
    color: "#333",
  },
  activeText: {
    color: "#fff",
  },
});
