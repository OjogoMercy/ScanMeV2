import general from "@/constants/General";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors, FONTS, Sizes } from "../../constants/theme";
import { MotiView, MotiText } from 'moti';

interface ScanData {
  id: number;
  data: any;
  type: string;
  timestamp: string;
  favorite: boolean;
}

const History = () => {
  const [scanHistory, setScanHistory] = useState<ScanData[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
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

  // Filter data whenever scanHistory or activeFilter changes
  useEffect(() => {
    if (activeFilter === 'all') {
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

  const categories = ['all', 'url', 'email', 'phone', 'text', 'wifi'];


  const renderCategoryFilter = () => (
    <MotiView style={styles.categoryBar}
      from={{ translateY: 100 , opacity:0}}
      animate={{ translateY: 0, opacity:1 }}
      transition={{
        type: 'timing',
        duration:700
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

  return (
    <View style={[general.container, { backgroundColor: Colors.background , marginTop:Sizes.bigRadius}]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <Text style={styles.title}>Scan History</Text>
      {scanHistory.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={{...FONTS.h3, fontWeight:'bold'}}>No scans yet</Text>
          <Text style={styles.emptySubtext}>
            Scan some QR codes to see them here!
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item ,index}) => (
            <MotiView style={styles.historyItem}
              key={item.id}
              from={{opacity:0, translateY:100}}
              animate={{ opacity:1, translateY: 0 }}
              transition={{
                type:"timing",
                duration: 1000,
                delay: index * 100,
                // easing:'ease-in'

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
                  <Text style={[styles.actionText, {color:Colors.accent}]}>
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
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={renderCategoryFilter()}
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