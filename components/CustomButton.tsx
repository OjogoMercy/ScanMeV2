import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  KeyboardAvoidingView,
} from "react-native";
import general from "../constants/General";
import { Colors } from "../constants/Theme";

interface Props {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  active?:boolean
}

const CustomButton = ({
  title,
  onPress,
  active = true,
  disabled = false,
  buttonStyle,
  textStyle
}: Props) => {
  const dynamicStyle = {
    backgroundColor: active ? Colors.primary : Colors.sky,
    opacity: disabled ? 0.5 : 1,
  };

  const dynamicTextStyle = {
    color: active ? Colors.white : Colors.black,
  };
  return (
    <KeyboardAvoidingView>
      <TouchableOpacity
        style={[general.button, dynamicStyle, buttonStyle]}
        onPress={onPress}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text style={[general.buttonText, dynamicTextStyle,textStyle]}>{title}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default CustomButton;
