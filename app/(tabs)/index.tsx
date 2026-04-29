import { QuickActionModal } from "@/components/quickActionModal";
import general from "@/constants/General";
import { Colors, SCREEN_WIDTH, Sizes } from "@/constants/theme";
import { ThemedText } from "@/constants/ThemedText";
import { getTypeConfig } from "@/utils/smartActions";
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
type ScanItem = {
  id: number;
  data: string;
  type: string;
  timestamp: string;
  favorite: boolean;
};

//
//   switch (type) {
//     case "qr":
//       return {
//         bg: "#E1EEF6",
//         color: Colors.primary,
//         label: "QR",
//         icon: "qrcode",
//       };
//     case "text":
//       return {
//         bg: "#fff3e0",
//         color: "#e65100",
//         label: "Text",
//         icon: "text",
//       };
//     case "url":
//       return {
//         bg: "#e8f5e9",
//         color: "#2e7d32",
//         label: "URL",
//         icon: "link",
//       };
//     case "email":
//       return {
//         bg: "#fce4ec",
//         color: "#c2185b",
//         label: "Email",
//         icon: "email",
//       };
//     case "phone":
//       return {
//         bg: "#f3e5f5",
//         color: "#7b1fa2",
//         label: "Phone",
//         icon: "phone",
//       };
//     default:
//       return {
//         bg: Colors.gray,
//         color: Colors.primary,
//         label: type,
//         icon: "crop-square",
//       };
//   }
// };

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

export default function Index() {
  const [recentScans, setRecentScans] = useState<ScanItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ScanItem | null>(null);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadRecentScans = async () => {
        try {
          const history = await AsyncStorage.getItem("scanHistory");
          if (history) {
            const parsed: ScanItem[] = JSON.parse(history);
            setRecentScans(parsed.slice(0, 4));
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
      <TouchableOpacity
        style={styles.scanItem}
        onPress={() => {
          setSelectedItem(item);
          setModalVisible(true);
        }}
      >
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
    <View
      style={[
        general.container,
        { backgroundColor: Colors.background, alignContent: "stretch" },
      ]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.header}>
        <ThemedText type="text3" style={{ color: Colors.bodyText }}>
          {getGreeting()}
        </ThemedText>
        <ThemedText type="text1bold">What are you scanning?</ThemedText>
      </View>
      <View style={styles.scanCards}>
        <TouchableOpacity
          style={[styles.scanCard, { backgroundColor: Colors.text }]}
          onPress={() => router.push("/CameraScreen")}
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
          onPress={() => router.push("/ScanForText")}
        >
          <View style={styles.cardIcon}>
            <Ionicons
              name="document-text"
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
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push("CameraScreen")}
      >
        <Ionicons name="add" size={36} color={"white"} />
      </TouchableOpacity>
      <QuickActionModal
        item={selectedItem}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        iconColor={selectedItem? getTypeConfig(selectedItem.type).color: Colors.primary}
        iconBg={selectedItem? getTypeConfig(selectedItem.type).bg: Colors.primary}
        iconName={selectedItem? getTypeConfig(selectedItem.type).icon: "crop-square"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Sizes.padding,
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
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateScale(4),
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.padding,
    marginHorizontal: Sizes.padding,
    padding: Sizes.padding,
    width: SCREEN_WIDTH * 0.9,
    marginTop: Sizes.navTitle,
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
    paddingVertical: Sizes.padding,
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
  floatingButton: {
    backgroundColor: Colors.primary,
    alignSelf: "flex-end",
    margin: Sizes.padding,
    width: moderateScale(55),
    height: moderateScale(55),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    position: "absolute",
    bottom: 20,
  },
});
