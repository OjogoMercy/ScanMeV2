import general from "@/constants/General";
import { Colors, FONTS, Sizes,SCREEN_WIDTH,SCREEN_HEIGHT } from "@/constants/theme";
import Ionicon from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Images } from "@/constants/Images";
import {
  Animated,
  Image,
  ImageBackground,
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "@/constants/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

const Onboarding1 = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  
const SLIDES = [
  {
    id: "1",
    title:"Scan Everything Easily",
    description:"Point your camera at QRcodes, barcodes or text and let ScanMe do the rest",
    image: Images.onBoarding1,
  },
  {
    id: "2",
    title:"Extract Text With OCR",
    description:"Capture printed text from any surface, edit it and save instantly, no more manual typing",
    image: Images.onBoarding2,
  },
  {
    id: "3",
    title: "Your History Organized"
    description:"All your scans are automatically tagged, timestamped and stored in a searchable local history ",
    image: Images.onBoarding3,
  },

];

  const fadeAnim = React.useRef(new Animated.Value(1)).current;
    const changeSlide = (newIndex: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(newIndex);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNextBtn = () => {
    if (currentIndex < SLIDES.length - 1) {
      changeSlide(currentIndex + 1);
    } else {
      router.replace("/index");
    }
  };

  const handleBackBtn = () => {
    if (currentIndex > 0) changeSlide(currentIndex - 1);
  };

  const handleSkipBtn = () => router.replace("/index");

  const currentSlide = SLIDES[currentIndex];
  const isLastSlide = currentIndex === SLIDES.length - 1;
  const isFirstSlide = currentIndex === 0;
  const Dot = ({ isActive }: { isActive: boolean }) => (
  <View
    style={[
      styles.dot,
      {
        width: isActive ? 28 : 7,
        backgroundColor: isActive ? Colors.primary : Colors.gray,
        borderColor: isActive ? Colors.primary : Colors.gray,
      },
    ]}
  />
);
  return (
 <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.primary2}
        barStyle="light-content"
        translucent
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkipBtn} style={styles.skipTopButton}>
          <Text style={styles.skipTopText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            alignItems: "center",
            width: "100%",
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.97, 1],
                }),
              },
            ],
          }}
        >
            <Image
              source={currentSlide.image}
              style={styles.image}
              resizeMode="contain"
            />

          <View style={styles.textContainer}>
            <Text style={styles.slideTitle}>
              {currentSlide.highlight ? (
                <>
                  <Text style={styles.slideTitleNormal}>
                    {currentSlide.title[0]}
                  </Text>
                  <Text style={styles.slideTitleHighlight}>
                    {currentSlide.title[1]}
                  </Text>
                </>
              ) : (
                <Text style={styles.slideTitleNormal}>
                  {currentSlide.title[0]}
                  {currentSlide.title[1]}
                </Text>
              )}
            </Text>

            <ThemedText type="text4gray" style={styles.slideDescription}>
              {currentSlide.description}
            </ThemedText>
          </View>
        </Animated.View>
      </View>

      <View style={styles.paginationContainer}>
        {SLIDES.map((_, i) => (
          <Dot key={i} isActive={i === currentIndex} />
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.backBtn, isFirstSlide && styles.backBtnDisabled]}
          onPress={handleBackBtn}
          disabled={isFirstSlide}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.backBtnText,
              isFirstSlide && styles.backBtnTextDisabled,
            ]}
          >
            Back
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <CustomButton
            title={isLastSlide ? "Create Account" : "Next"}
            onPress={handleNextBtn}
          />
        </View>
      </View>

      <View style={styles.legalContainer}>
        <Text style={styles.legalText}>
          Paylinc is licensed by the{" "}
          <Text style={styles.legalLink}>Central Bank of Nigeria</Text>. All
          transactions are insured by <Text style={styles.legalLink}>NDIC</Text>
          .
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary2,
    width: SCREEN_WIDTH,
  },

  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: Sizes.padding,
    paddingTop: Sizes.base,
  },
  skipTopButton: {
    paddingVertical: Sizes.base * 0.8,
    paddingHorizontal: Sizes.base * 1.5,
    borderRadius: Sizes.padding * 2,
    backgroundColor: Colors.veryLightGray,
    position: "absolute",
    top: 30,
    right: -30,
    width: Sizes.padding * 4,
    height: Sizes.padding * 4,
    alignItems: "center",
    justifyContent: "center",
  },
  skipTopText: {
    ...FONTS.h4,
    color: Colors.gray2,
    marginLeft: -Sizes.base,
  },

  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  imagePlaceholder: {
    width: width * 0.85,
    height: height * 0.42,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  },

  textContainer: {
    alignItems: "center",
    paddingHorizontal: Sizes.padding,
    marginTop: Sizes.base,
  },
  slideTitle: {
    textAlign: "center",
    marginBottom: Sizes.base,
  },
  slideTitleNormal: {
    ...FONTS.h2bold,
    color: Colors.white,
  },
  slideTitleHighlight: {
    ...FONTS.h2bold,
    color: Colors.primary,
  },
  slideDescription: {
    ...FONTS.h4,
    color: Colors.gray,
    textAlign: "center",
    marginTop: Sizes.base * 0.5,
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Sizes.base * 2,
    gap: 4,
  },
  dot: {
    height: 7,
    borderRadius: 5,
    borderWidth: 1,
  },

  footer: {
    flexDirection: "row",
    paddingHorizontal: Sizes.padding,
    paddingBottom: Sizes.base * 2,
    gap: Sizes.base * 1.5,
    alignItems: "center",
    width: SCREEN_WIDTH,
    justifyContent: "space-between",
  },
  backBtn: {
    flex: 1,
    paddingVertical: Sizes.base * 1.6,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
  },
  backBtnDisabled: {
    borderColor: Colors.gray3,
    width: "45%",
  },
  backBtnText: {
    ...FONTS.h4bold,
    color: Colors.gray2,
  },
  backBtnTextDisabled: {
    color: Colors.gray3,
  },
  nextBtn: {
    flex: 1,
  },

  legalContainer: {
    paddingHorizontal: Sizes.padding,
    paddingBottom: Sizes.base * 1.5,
    alignItems: "center",
  },
  legalText: {
    ...FONTS.h6,
    color: Colors.gray,
    textAlign: "center",
    lineHeight: 16,
  },
  legalLink: {
    ...FONTS.h6,
    color: Colors.primary,
  },
});
