import CustomButton from "@/components/CustomButton";
import { Images } from "@/constants/Images";
import {
  Colors,
  FONTS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  Sizes,
} from "@/constants/theme";
import { ThemedText } from "@/constants/ThemedText";
import { useRouter } from "expo-router";
import React from "react";
import {
  Animated,
  Image,
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding1 = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const SLIDES = [
    {
      id: "1",
      title: "Scan Everything Easily",
      description:
        "Point your camera at QRcodes, barcodes or text and let ScanMe do the rest",
      image: Images.onBoarding1,
    },
    {
      id: "2",
      title: "Extract Text With OCR",
      description:
        "Capture printed text from any surface, edit it and save instantly, no more manual typing",
      image: Images.onBoarding2,
    },
    {
      id: "3",
      title: "Your History Organized",
      description:
        "All your scans are automatically tagged, timestamped and stored in a searchable local history",
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
      router.replace("/Index");
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
          backgroundColor: isActive ? Colors.primary : Colors.placeholder,
          borderColor: isActive ? Colors.primary : Colors.placeholder,
        },
      ]}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.primary2}
        barStyle="dark-content"
        translucent
      />
    
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
            <ThemedText style={{textAlign:'center'}} type="text1bold"> {currentSlide.title}</ThemedText>
            <ThemedText style={{textAlign:'center',color:Colors.secondaryText}} type="text4" >
              {currentSlide.description}
            </ThemedText>
          </View>    
        </Animated.View>
         <View style={styles.paginationContainer}>
        {SLIDES.map((_, i) => (
          <Dot key={i} isActive={i === currentIndex} />
        ))}
      </View>
      </View>

      <View style={styles.footer}>
        <View style={{ flex: 1 ,width:'100%',marginBottom:Sizes.padding}}>
          <CustomButton
            title={isLastSlide ? "Get Started" : "Next"}
            onPress={handleNextBtn}
            buttonStyle={{width:'100%'}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    width: SCREEN_WIDTH,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  
  image: {
    width: "90%",
    height:SCREEN_HEIGHT*0.5,
    resizeMode: "contain",
  },

  textContainer: {
    alignItems: "center",
    paddingHorizontal: Sizes.padding,
    marginTop: Sizes.base,
  },


  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Sizes.padding * 2,
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
    borderColor: Colors.lightGray,
    width: "45%",
  },
  backBtnText: {
    ...FONTS.h4bold,
    color: Colors.gray,
  },
  backBtnTextDisabled: {
    color: Colors.lightGray,
  },
  nextBtn: {
    flex: 1,
  },
});
