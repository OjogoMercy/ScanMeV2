import React from "react";
import { StyleSheet, Text, type TextProps } from "react-native";
import { Colors, FONTS } from "./theme";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "text1"
    | "text1bold"
    | "text2"
    | "text2bold"
    | "text2boldwhite"
    | "text3"
    | "text3bold"
    | "text3gray"
    | "text3white"
    | "text3boldwhite"
    | "text3green"
    | "text4"
    | "text4bold"
    | "text4gray"
    | "text4white"
    | "text4green"
    | "text4greenbold"
    | "text5"
    | "text5bold"
    | "text5white"
    | "text6";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "text3",
  children,
  onPress,
  ...rest
}: ThemedTextProps) {
  const translatedText = typeof children === "string" ? children : children;

  return (
    <Text
      onPress={onPress}
      style={[
        type === "text1" ? styles.text1 : undefined,
        type === "text1bold" ? styles.text1bold : undefined,
        type === "text2" ? styles.text2 : undefined,
        type === "text2bold" ? styles.text2bold : undefined,
        type === "text2boldwhite" ? styles.text2boldwhite : undefined,
        type === "text3" ? styles.text3 : undefined,
        type === "text3bold" ? styles.text3bold : undefined,
        type === "text3gray" ? styles.text3gray : undefined,
        type === "text3boldwhite" ? styles.text3boldwhite : undefined,
        type === "text3white" ? styles.text3white : undefined,
        type === "text3green" ? styles.text3green : undefined,
        type === "text4" ? styles.text4 : undefined,
        type === "text4bold" ? styles.text4bold : undefined,
        type === "text4gray" ? styles.text4gray : undefined,
        type === "text4white" ? styles.text4white : undefined,
        type === "text4green" ? styles.text4green : undefined,
        type === "text4greenbold" ? styles.text4greenbold : undefined,
        type === "text5" ? styles.text5 : undefined,
        type === "text5bold" ? styles.text5bold : undefined,
        type === "text5white" ? styles.text5white : undefined,
        type === "text6" ? styles.text6 : undefined,
        style,
      ]}
      {...rest}
    >
      {translatedText}
    </Text>
  );
}

const styles = StyleSheet.create({
  text1: {
    ...FONTS.h1,
    color: Colors.black,
  },
  text1bold: {
    ...FONTS.h1,
    color: Colors.black,
    fontWeight: 'bold',
  },
  text2: {
    ...FONTS.h2,
    color: Colors.black,
  },
  text2bold: {
    ...FONTS.h2,
    color: Colors.black,
    fontWeight: 'bold',
  },
  text2boldwhite: {
    ...FONTS.h2,
    color: Colors.white,
    fontWeight: "bold",
  },
  text3: {
    ...FONTS.h3,
    color: Colors.black,
  },
  text3bold: {
    ...FONTS.h3,
    color: Colors.black,
    fontWeight: "600",
  },
  text3boldwhite: {
    ...FONTS.h3,
    color: Colors.white,
    fontWeight: "bold",
  },
  text3gray: {
    ...FONTS.h3,
    color: Colors.gray,
  },
  text3white: {
    ...FONTS.h3,
    color: Colors.white,
    fontWeight: 'bold',
  },
  text3green: {
    ...FONTS.h3,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  text4: {
    ...FONTS.h4,
    color: Colors.black,
  },
  text4bold: {
    ...FONTS.h4,
    color: Colors.black,
    fontWeight: "bold",
  },
  text4gray: {
    ...FONTS.h4,
    color: Colors.gray,
    fontWeight: 'bold',
  },
  text4white: {
    ...FONTS.h4,
    color: Colors.white,
    fontWeight: 'bold',
  },
  text4green: {
    ...FONTS.h4,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  text4greenbold: {
    ...FONTS.h4,
    color: Colors.primary,
    fontWeight: "bold",
  },
  text5: {
    ...FONTS.h5,
    color: Colors.black,
    fontWeight: 'bold'
  },
  text5bold: {
    ...FONTS.h5bold,
    color: Colors.black,
    fontWeight: "bold",
  },
  text5white: {
    ...FONTS.h5,
    color: Colors.white,
    fontWeight:'bold'
  },
  text6: {
    ...FONTS.h6,
    color: Colors.black,
    fontWeight: 'bold',
  },
});
