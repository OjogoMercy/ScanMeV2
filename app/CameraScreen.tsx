import general from "@/constants/General";
import { ThemedText } from "@/constants/ThemedText";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Animated,
  AppState,
  Easing,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from "../constants/theme";

const CameraScreen = () => {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useCameraPermissions();
  const [lastScannedData, setLastScannedData] = useState("");
  const [scanned, setScanned] = useState(false);
  const [textModalVisible, setTextModalVisible] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [cameraActive, setCameraActive] = useState(true);

  const SCAN_BOX_SIZE = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.7;
  const scanLineAnim = React.useRef(new Animated.Value(0)).current;
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        setCameraActive(true);
      } else {
        setCameraActive(false);
      }
    });

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      scanLineAnim.setValue(0);
      const loop = Animated.loop(
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      loop.start();
      return () => loop.stop();
    })();
    return () => subscription.remove();
  }, []);
  useFocusEffect(
    useCallback(() => {
      setCameraActive(true);
      return () => {
        setCameraActive(false);
      };
    }, []),
  );

  // to Save scan to history
  const saveToHistory = async (scanData: any, type: string) => {
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
  const showTextModal = (text: React.SetStateAction<string>) => {
    setCurrentText(text);
    setTextModalVisible(true);
  };
  const showWifiConnection = (wifiData: any) => {
    Alert.alert(
      "WiFi Network Detected",
      "This app can't automatically connect to WiFi networks for security reasons. Please check your device settings.",
      [{ text: "OK" }],
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
                  Haptics.NotificationFeedbackType.Error,
                );
                Alert.alert("Error", "Unable to perform the action.");
              } finally {
                resetScanner();
              }
            },
          },
        ],
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
      {cameraActive && (
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          enableTorch={flash}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "ean8", "code128", "pdf417", "upc_e"],
          }}
        />
      )}
      <View style={styles.topPanel} />

      <View
        style={[
          styles.middleRow,
          {
            height: SCAN_BOX_SIZE,
            transform: [{ translateY: -SCAN_BOX_SIZE / 2 }],
          },
        ]}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(10, 20, 35, 0.5)" }} />

        <View
          style={{
            width: SCAN_BOX_SIZE,
            height: SCAN_BOX_SIZE,
            backgroundColor: "transparent",
          }}
        >
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [
                  {
                    translateY: scanLineAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, SCAN_BOX_SIZE - 4],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>

        <View style={{ flex: 1,
  backgroundColor: "rgba(10, 20, 35, 0.5)",}} />
      </View>
      <View style={styles.bottomPanel} />
      <View style={styles.instruction}>
        <ThemedText type="text4white">
          Align QR code within the frame
        </ThemedText>
      </View>

      <View style={general.overlay}></View>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => router.back()}>
          <View style={[styles.flash, { backgroundColor: Colors.primary }]}>
            <FontAwesome6 name="xmark" size={20} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFlash(!flash)}
          style={[
            styles.flash,
            {
              backgroundColor: flash
                ? Colors.primary
                : "rgba(232, 241, 255,0.2)",
            },
          ]}
        >
          <Ionicons
            name={flash ? "flashlight" : "flashlight-outline"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
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
   middleRow: {
    flexDirection: "row",
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
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
  overlayFull: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 20, 35, 0.5)",
  },
  viewfinderContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  corner: {
    position: "absolute",
    width: moderateScale(24),
    height: moderateScale(24),
    borderColor: Colors.primary2,
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: moderateScale(6),
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: moderateScale(6),
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: moderateScale(6),
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: moderateScale(6),
  },
  scanLine: {
    position: "absolute",
    left: 4,
    right: 4,
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 1,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  instruction: {
    padding: Sizes.base,
    backgroundColor: "rgba(232, 241, 255,0.2)",
    position: "absolute",
    bottom: 230,
    alignSelf: "center",
    borderRadius: Sizes.navTitle,
    borderColor: "rgba(232, 241, 255,0.3)",
    borderWidth: 1,
  },
  flash: {
    borderRadius: moderateScale(30),
    height: moderateScale(50),
    width: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(232, 241, 255,0.2)",
    paddingHorizontal: Sizes.padding,
    borderRadius: Sizes.padding * 3,
    alignSelf: "center",
    borderColor: "rgba(232, 241, 255,0.3)",
    borderWidth: 1,
    paddingVertical: Sizes.padding,
  },
  topPanel: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "34.5%",
    backgroundColor: "rgba(10, 20, 35, 0.5)",
  },
  bottomPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "34.5%",
    backgroundColor: "rgba(10, 20, 35, 0.5)",
  },
});
