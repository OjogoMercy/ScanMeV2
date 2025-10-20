import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH, Colors, Sizes } from '../constants/Theme'
import general from "../constants/General";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  error?: string;
  iconName?: string;
  secure?:boolean
};

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secure,
  secureTextEntry = false,
  inputStyle,
  containerStyle,
  error,iconName
}: Props) => {

    const [show, setShow] = React.useState(false);
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={general.label}>{label}</Text>}
      <View style={general.inputWrapper}>
        {iconName && (
          <MaterialIcons
            name={iconName as any}
            size={SCREEN_WIDTH * 0.06}
            color={Colors.black}
            style={general.icon}
          />
        )}
        <TextInput
          style={[general.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secure && !show}
          placeholderTextColor={Colors.black}
        />
        {secure && (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setShow(!show)}>
            <Ionicons
              name={show ? "eye-sharp" : "eye-off"}
              color={Colors.black}
              size={Sizes.body2}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={general.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
 
});

export default CustomInput;
