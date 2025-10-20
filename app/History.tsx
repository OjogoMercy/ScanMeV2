import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import general from "@/constants/General";
import { useFocusEffect } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import { Colors } from "@/constants/Theme";

interface ScanData {
  id: number;
  data: any;
  type: string;
  timestamp: string;
  favorite: boolean;
}

const History = () => {
  const [scanHistory, setScanHistory] = useState<ScanData[]>([]);

  // Load history when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadScanHistory();
    }, [])
  );

  const loadScanHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("scanHistory");
      if (history) {
        setScanHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log("Error loading history:", error);
      Alert.alert("Error", "Failed to load scan history");
    }
  };

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
    Alert.alert("Copied!", "Text copied to clipboard");
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <View style={[general.container, { backgroundColor: Colors.sky }]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.sky} />
      <Text style={styles.title}>Scan History</Text>
      {scanHistory.length === 0 ? (
        <View style={styles.emptyState}>
          <Text>No scans yet</Text>
          <Text style={styles.emptySubtext}>
            Scan some QR codes to see them here!
          </Text>
        </View>
      ) : (
        <FlatList
          data={scanHistory}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
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
                  <Text style={styles.actionText}>
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
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
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
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptySubtext: {
    marginTop: moderateScale(10),
    color: "#666",
    fontSize: moderateScale(14),
  },
  listContent: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(20),
  },
  historyItem: {
    backgroundColor: "white",
    padding: moderateScale(16),
    borderRadius: moderateScale(20),
    marginBottom: moderateScale(12),
    elevation: 2,
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
});
