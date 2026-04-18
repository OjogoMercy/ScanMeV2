import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Theme";
import { ThemedText } from "@/constants/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Review = () => {
  const [extractedText, setExtractedText] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()
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
      setIsLoading(false)
    }
  };
  useEffect(() => {
    loadResult();
  }, []);
if(isLoading)return <ActivityIndicator size={"large"} color={Colors.primary2}/>;
if(error){
  return(
    <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
      <ThemedText type="text3bold" style={{color:Colors.primary}}></ThemedText>
      <CustomButton title="Go Back" onPress={()=> navigation.goBack() }/>
    </View>
  )
}

  return (
    <View>
      <Text>Review</Text>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({});
