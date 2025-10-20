import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CameraView, Camera } from "expo-camera";
import general from "@/constants/General";
import { SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from "@/constants/Theme";
import * as Linking from "expo-linking";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale } from "react-native-size-matters";

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [lastScannedData, setLastScannedData] = useState("");
  const [scanned, setScanned] = useState(false);
  const [textModalVisible, setTextModalVisible] = useState(false);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // to Save scan to history
  const saveToHistory = async (scanData, type) => {
    try {
      const newScan = {
        id: Date.now(),
        data: scanData,
        type: type,
        timestamp: new Date().toISOString(),
      };

      const existingHistory = await AsyncStorage.getItem("scanHistory");
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      const updatedHistory = [newScan, ...history.slice(0, 49)]; // keep only as much as 50 scans

      await AsyncStorage.setItem("scanHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.log("Error saving to history:", error);
    }
  };

  const showTextModal = (text) => {
    setCurrentText(text);
    setTextModalVisible(true);
  };

  const showWifiConnection = (wifiData) => {
    Alert.alert(
      "WiFi Network Detected",
      "This app can't automatically connect to WiFi networks for security reasons. Please check your device settings.",
      [{ text: "OK" }]
    );
  };

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned || data === lastScannedData) return;

    setScanned(true);
    setLastScannedData(data);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const scannedData = data.trim();
    let result = {
      type: "unknown",
      displayData: scannedData,
      action: null,
    };
    try {
      if (await Linking.canOpenURL(scannedData)) {
        result = {
          type: "url",
          displayData: scannedData,
          action: () => Linking.openURL(scannedData),
        };
      } else if (scannedData.includes("@") && scannedData.includes(".")) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(scannedData)) {
          result = {
            type: "email",
            displayData: scannedData,
            action: () => Linking.openURL(`mailto:${scannedData}`),
          };
        } else {
          result = {
            type: "text",
            displayData: scannedData,
            action: () => showTextModal(scannedData),
          };
        }
      } else if (
        /^[\+]?[1-9][\d]{0,15}$/.test(scannedData.replace(/[-\s\(\)]/g, ""))
      ) {
        result = {
          type: "phone",
          displayData: scannedData,
          action: () => Linking.openURL(`tel:${scannedData}`),
        };
      } else if (scannedData.startsWith("WIFI:")) {
        result = {
          type: "wifi",
          displayData: "WiFi Network Configuration",
          action: () => showWifiConnection(scannedData),
        };
      } else {
        result = {
          type: "text",
          displayData: scannedData,
          action: () => showTextModal(scannedData),
        };
      }

      await saveToHistory(scannedData, result.type);

      Alert.alert(
        `Detected: ${result.type.toUpperCase()}`,
        result.displayData.length > 100
          ? result.displayData.substring(0, 100) + "..."
          : result.displayData,
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => resetScanner(),
          },
          {
            text: result.type === "wifi" ? "View" : "Open",
            onPress: async () => {
              try {
                if (result.action) {
                  await result.action();
                }
              } catch (error) {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error
                );
                Alert.alert("Error", "Unable to perform the action.");
              } finally {
                resetScanner();
              }
            },
          },
        ]
      );
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Scan Error", "Failed to process QR code.");
      resetScanner();
    }
  };

  const resetScanner = () => {
    setScanned(false);
    setLastScannedData("");
  };

  if (hasPermission === null) {
    return (
      <View style={general.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={general.container}>
        <Text>No access to camera</Text>
        <Text style={{ marginTop: 10, fontSize: 12 }}>
          Please enable camera permissions in your device settings
        </Text>
      </View>
    );
  }

  return (
    <View style={general.container}>
      <StatusBar hidden />
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "code128", "pdf417"],
        }}
      />
      {/* Overlay */}
      <View style={{ height: "100%", width: "100%" }}>
        <View style={general.overlay}></View>
        <View style={styles.middleRow}>
          <View style={styles.overlay} />
          <View style={general.overlayCam}></View>
          <View style={styles.overlay} />
        </View>
        <View style={general.overlay}></View>
      </View>
      {/* Text Modal */}
      <Modal
        visible={textModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Scanned Text</Text>
            <Text style={styles.modalText}>{currentText}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setTextModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {scanned && (
        <View style={styles.scanningIndicator}>
          <Text style={styles.scanningText}>Processing...</Text>
        </View>
      )}
    </View>
  );
};

export default CameraScreen;
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "black",
    opacity: 0.5,
    width: SCREEN_WIDTH * 0.17,
    height: SCREEN_HEIGHT * 0.4,
  },
  middleRow: {
    flexDirection: "row",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: moderateScale(20),
    borderRadius: moderateScale(10),
    width: SCREEN_WIDTH * 0.8,
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginBottom: moderateScale(10),
  },
  modalText: {
    fontSize: moderateScale(16),
    marginBottom: moderateScale(20),
  },
  modalButton: {
    backgroundColor: "#007AFF",
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: moderateScale(14),
  },
  scanningIndicator: {
    position: "absolute",
    top: moderateScale(50),
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(20),
  },
  scanningText: {
    color: "white",
    fontWeight: "bold",
    fontSize: moderateScale(18),
  },
});
