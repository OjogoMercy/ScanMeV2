import CustomButton from "@/components/CustomButton";
import general from "@/constants/General";
import { ThemedText } from "@/constants/ThemedText";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import { CameraView } from "expo-camera";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/theme";
import * as ImageManipulator from 'expo-image-manipulator';

const ScanForText = () => {
  const SCAN_BOX_SIZE = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.7;
  const scanLineAnim = React.useRef(new Animated.Value(0)).current;
  const [flash, setFlash] = useState(false);
  const [textModalVisible, setTextModalVisible] = useState(false);
  const [scanned, setScanned] = useState(false);
  const CameraRef = useRef<CameraView>(null);
  const [capturing, setCapturing] = useState(false);
  const [scanStatus,setScanStatus] = useState("Capturing Text...")
  const router = useRouter();
  useEffect(() => {
    (() => {
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
  }, []);


  const handleCapture = async () => {
    if (!CameraRef.current || capturing) return;
    try {
      setCapturing(true);
      const photo = await CameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: false,
        skipProcessing: false,
      });
      const compressedImage = await ImageManipulator.manipulateAsync(
        photo.uri,
      [{ resize: { width: 1080 } }],
      {compress:0.5,format:ImageManipulator.SaveFormat.JPEG}

      )
      

      if (!photo?.uri) throw new Error("No image was found ");

      const result = await TextRecognition.recognize(compressedImage.uri);
      if (!result?.text || result.text.trim() === "") {
        setCapturing(false);
        return;
      }
      const blocks = result.blocks;
      const foundText = result.text;

      await AsyncStorage.setItem(
        "pendingResult",
        JSON.stringify({
          pendingBlocks: blocks,
          pendingText: foundText,
        }),
      );
      router.push("/Review");
      setCapturing(false);
    } catch (error) {
      console.error("Capture error", error);
      setCapturing(false);
    }
  };

  return (
    <View style={general.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        enableTorch={flash}
        ref={CameraRef}
        onTouchEnd={handleCapture}
      />
      {capturing && (
        <View style={styles.capturingOverlay}>
          <ActivityIndicator size="large" color="white" />
          <ThemedText type="text3white" style={{marginTop:15}}>Capturing Text...</ThemedText>
        </View>
      )}
      <View style={{ height: "100%", width: "100%" }}>
        <View style={general.overlay}></View>
        <View style={styles.middleRow}>
          <View style={styles.overlay} />
          <View style={general.overlayCam}>
            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [
                    {
                      translateY: scanLineAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, SCAN_BOX_SIZE - 2],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
          <View style={styles.overlay} />
        </View>

        <View style={general.overlay}></View>
        <View
          style={{
            position: "absolute",
            bottom: moderateScale(50),
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: moderateScale(20),
            alignItems: "center",
          }}
        >
          <Link href="/">
            <View style={[styles.flash, { backgroundColor: Colors.primary }]}>
              <FontAwesome6 name={"xmark"} size={28} color="white" />
            </View>
          </Link>

          <CustomButton
            title="Scan"
            onPress={handleCapture}
            buttonStyle={{ width: SCREEN_WIDTH * 0.35 }}
          />
          <TouchableOpacity
            onPress={() => setFlash(!flash)}
            style={[
              styles.flash,
              { backgroundColor: flash ? "black" : Colors.primary },
            ]}
          >
            <Ionicons
              name={flash ? "flashlight-outline" : "flashlight"}
              size={28}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={textModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Scanned Text</Text>
            <Text style={styles.modalText}>text</Text>
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

export default ScanForText;
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(70, 130, 180, 0.12)",
    width: SCREEN_WIDTH * 0.18,
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
  scanLine: {
    position: "absolute",
    left: 2,
    right: 2,
    height: 5,
    backgroundColor: "rgba(52, 125, 185, 1)",
    borderRadius: 1,
  },
  instruction: {
    position: "absolute",
    bottom: moderateScale(10),
    color: "white",
    fontSize: moderateScale(13),
    backgroundColor: "transparent",
    textAlign: "center",
    paddingHorizontal: moderateScale(8),
    opacity: 0.9,
  },
  flash: {
    borderRadius: moderateScale(30),
    height: moderateScale(50),
    width: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  capturingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
