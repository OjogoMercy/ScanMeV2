import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/constants/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,Image
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors, SCREEN_WIDTH, Sizes } from "../constants/theme";

const Review = () => {
 const [extractedText, setExtractedText] = useState("")
const [scanTitle, setScanTitle] = useState("")
const [pendingUri, setPendingUri] = useState<string | null>(null)
const [error, setError] = useState(false)
const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  const cleanText = (raw: string) => {
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .map((line) => line.replace(/\s+/g, " "))
      .join("\n");
  };
 const loadResult = async () => {
  try {
    const pending = await AsyncStorage.getItem("pendingResult")
    if (!pending) {
      setError(true)
      return
    }
    const parsed = JSON.parse(pending)
    if (parsed && parsed.pendingText) {
      const processedText = cleanText(parsed.pendingText)
      setExtractedText(processedText)
      const firstLine = processedText.split("\n")[0].substring(0, 40)
      setScanTitle(firstLine)
    }
    if (parsed?.pendingUri) {
      setPendingUri(parsed.pendingUri)
    }
  } catch (error) {
    console.error("Error loading result:", error)
    setError(true)
  } finally {
    setIsLoading(false)
  }
}

  useEffect(() => {
    loadResult();
  }, []);
  const clearPending = async () => {
    await AsyncStorage.removeItem("pendingResult");
  };
 const handleSave = async () => {
  try {
    const newSave = {
      id: Date.now(),
      data: extractedText,
      type: "text",
      timestamp: new Date().toISOString(),
      favorite: false,
      title: scanTitle || extractedText.substring(0, 40),
      uri: pendingUri,
    }
    const existingHistory = await AsyncStorage.getItem("scanHistory")
    const history = existingHistory ? JSON.parse(existingHistory) : []
    const updatedHistory = [newSave, ...history.slice(0, 49)]
    await AsyncStorage.setItem("scanHistory", JSON.stringify(updatedHistory))
    await clearPending()
   router.push("/History")
  } catch (error) {
    console.error("Error saving:", error)
  }
}
if (isLoading) return (
  <View style={styles.centered}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
)

if (error) return (
  <View style={styles.centered}>
    <ThemedText type="text3bold" style={{ color: Colors.primary }}>
      Could not load scanned text. Please try again.
    </ThemedText>
    <CustomButton title="Go Back" onPress={() => router.back()} />
  </View>
)

return (
  <View style={styles.container}>
    
    <View style={styles.header}>
      <TouchableOpacity onPress={async () => {
        await clearPending()
        router.back()
      }}>
        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>
      <ThemedText type="text2bold">Review Scan</ThemedText>
      <View style={{ width: 24 }} />
    </View>

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {pendingUri && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: pendingUri }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.card}>
        <ThemedText type="text4" style={styles.cardLabel}>
          Scanned Text Content
        </ThemedText>
        <TextInput
          value={extractedText}
          onChangeText={setExtractedText}
          multiline
          style={styles.textInput}
          textAlignVertical="top"
          placeholder="Scanned text will appear here..."
          placeholderTextColor={Colors.placeholder}
        />
        <ThemedText type="text6" style={styles.charCount}>
          {extractedText.length} characters
        </ThemedText>
      </View>

      <View style={styles.card}>
        <ThemedText type="text4" style={styles.cardLabel}>
          Scan Title
        </ThemedText>
        <TextInput
          value={scanTitle}
          onChangeText={setScanTitle}
          style={styles.titleInput}
          placeholder="Enter a title for this scan..."
          placeholderTextColor={Colors.placeholder}
          maxLength={60}
        />
      </View>

      <CustomButton
        title="Save Scan"
        onPress={handleSave}
        buttonStyle={styles.saveButton}
      />

      <TouchableOpacity
        style={styles.retakeButton}
        onPress={async () => {
          await clearPending()
          router.back()
        }}
      >
        <Ionicons name="camera-outline" size={18} color={Colors.primary} />
        <ThemedText type="text4bold" style={{ color: Colors.primary }}>
          Retake
        </ThemedText>
      </TouchableOpacity>

    </ScrollView>
  </View>
)
};

export default Review;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(12),
    padding: Sizes.padding,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.padding,
    paddingTop: Sizes.navTitle,
    paddingBottom: Sizes.base,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Sizes.padding,
    gap: moderateScale(12),
    paddingBottom: moderateScale(40),
  },
  imageContainer: {
    width: "100%",
    height: moderateScale(200),
    borderRadius: moderateScale(16),
    overflow: "hidden",
    backgroundColor: Colors.gray,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(16),
    padding: Sizes.padding,
    gap: moderateScale(8),
  },
  cardLabel: {
    color: Colors.bodyText,
    fontWeight: "bold",
  },
  textInput: {
    minHeight: moderateScale(120),
    fontSize: moderateScale(14),
    color: Colors.text,
    lineHeight: moderateScale(22),
  },
  charCount: {
    textAlign: "right",
    color: Colors.placeholder,
  },
  titleInput: {
    height: moderateScale(44),
    fontSize: moderateScale(14),
    color: Colors.text,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingBottom: moderateScale(8),
  },
  saveButton: {
    width: "100%",
    marginTop: moderateScale(4),
  },
  retakeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(6),
    paddingVertical: moderateScale(12),
  },
})
