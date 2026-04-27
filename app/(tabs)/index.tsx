import general from "@/constants/General";
import { ThemedText } from "@/constants/ThemedText";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors, SCREEN_WIDTH, Sizes } from "../constants/theme";

type ScanItem = {
  id: number;
  data: string;
  type: string;
  timestamp: string;
  favorite: boolean;
};

const getTypeConfig = (type: string) => {
  switch (type) {
    case "qr":
      return {
        bg: "#E1EEF6",
        color: Colors.primary,
        label: "QR",
        icon: "qrcode",
      };
    case "text":
      return {
        bg: "#fff3e0",
        color: "#e65100",
        label: "Text",
        icon: "text",
      };
    case "url":
      return {
        bg: "#e8f5e9",
        color: "#2e7d32",
        label: "URL",
        icon: "link",
      };
    case "email":
      return {
        bg: "#fce4ec",
        color: "#c2185b",
        label: "Email",
        icon: "email",
      };
    case "phone":
      return {
        bg: "#f3e5f5",
        color: "#7b1fa2",
        label: "Phone",
        icon: "phone",
      };
    default:
      return {
        bg: Colors.gray,
        color: Colors.primary,
        label: type,
        icon: "crop-square",
      };
  }
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning 👋";
  if (hour < 17) return "Good afternoon 👋";
  return "Good evening 👋";
};

const formatTime = (timestamp: string) => {
  const now = new Date();
  const scanned = new Date(timestamp);
  const diffMs = now.getTime() - scanned.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

export default function HomeScreen() {
  const [recentScans, setRecentScans] = useState<ScanItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadRecentScans = async () => {
        try {
          const history = await AsyncStorage.getItem("scanHistory");
          if (history) {
            const parsed: ScanItem[] = JSON.parse(history);
            setRecentScans(parsed.slice(0, 3));
          }
        } catch (error) {
          console.error("Error loading recent scans:", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadRecentScans();
    }, []),
  );

  const renderScanItem = ({ item }: { item: ScanItem }) => {
    const config = getTypeConfig(item.type);
    return (
      <TouchableOpacity style={styles.scanItem} activeOpacity={0.7}>
        <View style={[styles.itemIcon, { backgroundColor: config.bg }]}>
          <MaterialCommunityIcons
            name={config.icon as any}
            size={moderateScale(20)}
            color={config.color}
          />
        </View>
        <View style={styles.itemInfo}>
          <ThemedText type="text4bold" numberOfLines={1}>
            {item.data.length > 30
              ? item.data.substring(0, 30) + "..."
              : item.data}
          </ThemedText>
          <ThemedText type="text5" style={{ color: Colors.placeholder }}>
            {formatTime(item.timestamp)}
          </ThemedText>
        </View>
        <View style={[styles.badge, { backgroundColor: config.bg }]}>
          <ThemedText
            type="text6"
            style={{ color: config.color, fontSize: moderateScale(10) }}
          >
            {config.label}
          </ThemedText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[general.container, { backgroundColor: Colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="text5" style={{ color: Colors.bodyText }}>
          {getGreeting()}
        </ThemedText>
        <ThemedText type="text1bold">What are you scanning?</ThemedText>
      </View>

      {/* Scan Cards */}
      <View style={styles.scanCards}>
        <TouchableOpacity
          style={[styles.scanCard, { backgroundColor: Colors.text }]}
          activeOpacity={0.85}
          onPress={() => router.push("/QRScan")}
        >
          <View style={styles.cardIcon}>
            <MaterialCommunityIcons
              name="qrcode"
              size={moderateScale(26)}
              color={Colors.white}
            />
          </View>
          <ThemedText type="text3bold" style={{ color: Colors.white }}>
            Scan QR
          </ThemedText>
          <ThemedText
            type="text6"
            style={{ color: "rgba(255,255,255,0.6)", fontWeight: "400" }}
          >
            QR codes & barcodes
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.scanCard, { backgroundColor: Colors.primary }]}
          activeOpacity={0.85}
          onPress={() => router.push("/ScanForText")}
        >
          <View style={styles.cardIcon}>
            <Ionicons
              name="text"
              size={moderateScale(26)}
              color={Colors.white}
            />
          </View>
          <ThemedText type="text3bold" style={{ color: Colors.white }}>
            Scan Text
          </ThemedText>
          <ThemedText
            type="text6"
            style={{ color: "rgba(255,255,255,0.6)", fontWeight: "400" }}
          >
            Labels, receipts & more
          </ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="text3bold">Recent Scans</ThemedText>
          <TouchableOpacity onPress={() => router.push("/History")}>
            <ThemedText type="text4bold" style={{ color: Colors.primary }}>
              View All
            </ThemedText>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={Colors.primary}
            style={{ marginTop: moderateScale(20) }}
          />
        ) : recentScans.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="line-scan"
              size={moderateScale(40)}
              color={Colors.placeholder}
            />
            <ThemedText
              type="text4"
              style={{ color: Colors.placeholder, textAlign: "center" }}
            >
              No scans yet. Tap a card above to get started.
            </ThemedText>
          </View>
        ) : (
          <FlatList
            data={recentScans}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderScanItem}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={styles.separator} />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Sizes.padding,
    paddingTop: Sizes.navTitle,
    paddingBottom: Sizes.base,
    gap: moderateScale(4),
  },
  scanCards: {
    flexDirection: "row",
    gap: moderateScale(12),
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.base,
  },
  scanCard: {
    flex: 1,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    gap: moderateScale(8),
    minHeight: moderateScale(120),
    justifyContent: "center",
  },
  cardIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(10),
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateScale(4),
  },
  section: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: moderateScale(20),
    marginHorizontal: Sizes.padding,
    padding: Sizes.padding,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(12),
  },
  scanItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(12),
    paddingVertical: moderateScale(10),
  },
  itemIcon: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  itemInfo: {
    flex: 1,
    gap: moderateScale(2),
  },
  badge: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(20),
  },
  separator: {
    height: 0.5,
    backgroundColor: Colors.gray,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(12),
    paddingVertical: moderateScale(40),
  },
});