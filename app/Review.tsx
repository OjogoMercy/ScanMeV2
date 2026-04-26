import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/constants/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors, SCREEN_WIDTH, Sizes } from "../constants/theme";

const Review = () => {
  const [extractedText, setExtractedText] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
      const pendingText = await AsyncStorage.getItem("pendingResult");
      if (!pendingText) {
        setError(true);
        return;
      }
      const parsed = JSON.parse(pendingText);

      if (parsed && parsed.pendingText) {
        const processedText = cleanText(parsed.pendingText);
        setExtractedText(processedText);
      }
    } catch (error) {
      console.error("Error loading result:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        favourite: false,
      };

      const existingHistory = await AsyncStorage.getItem("scanHistory");
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      const updatedHistory = [newSave, ...history.slice(0, 49)];

      await AsyncStorage.setItem("scanHistory", JSON.stringify(updatedHistory));
      clearPending();
      router.push("History");
    } catch (error) {
      clearPending();
      console.log("Error saving to history:", error);
    }
  };
  if (isLoading)
    return <ActivityIndicator size={"large"} color={Colors.primary2} />;
  if (error) {
    return (
      <View
        style={{
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          flex: 1,
          padding: Sizes.padding,
        }}
      >
        <ThemedText type="text3bold" style={{ color: Colors.primary }}>
          {" "}
          Could not load scanned text. Please try again.
        </ThemedText>
        <CustomButton title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={async () => {
            await clearPending();
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={26} color={Colors.primary} />
        </TouchableOpacity>
        <ThemedText type="text2">Review Scanned Text</ThemedText>
      </View>

      <ThemedText style={styles.instruction}>
        Review and edit the scanned text before saving
      </ThemedText>

      <TextInput
        value={extractedText}
        onChangeText={setExtractedText}
        multiline
        style={styles.textInput}
        placeholder="Scanned text will appear here..."
        textAlignVertical="top"
      />

      <ThemedText style={styles.charCount}>
        {extractedText.length} characters
      </ThemedText>

      <View style={styles.actions}>
        <CustomButton
          title="Discard"
          onPress={async () => {
            await clearPending();
            router.back();
          }}
        />
        <CustomButton title="Save to History" onPress={handleSave} />
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
    backgroundColor: "rgb(250, 247, 247)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(12),
    marginVertical: moderateScale(16),
  },
  instruction: {
    color: Colors.black,
    marginBottom: moderateScale(12),
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    fontSize: moderateScale(14),
    color: Colors.primary,
    marginBottom: moderateScale(8),
  },
  charCount: {
    textAlign: "right",
    color: Colors.black,
    fontSize: moderateScale(12),
    marginBottom: moderateScale(16),
  },
  actions: {
    width: SCREEN_WIDTH * 0.9,
    paddingBottom: Sizes.base,
  },
  discardButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  saveButton: {
    flex: 1,
  },
});
