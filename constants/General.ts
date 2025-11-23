import { StyleSheet } from "react-native";
import { Colors, FONTS, SCREEN_HEIGHT, SCREEN_WIDTH } from "./theme";

const general = StyleSheet.create({
  AuthContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingVertical: SCREEN_HEIGHT * 0.03,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.06,
    color: Colors.gray,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  text: {
    ...FONTS.h1,
    color: Colors.black,
  },
  overlay: {
    height: SCREEN_HEIGHT * 0.35,
    width: SCREEN_WIDTH * 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:  "rgba(70, 130, 180, 0.12)" ,
  },
  overlayCam: {
    height: SCREEN_HEIGHT * 0.4,
    width: SCREEN_WIDTH * 0.7,
    opacity: 0.7,
 borderColor: 'rgba(70,130,180,0.45)',
borderWidth: 3,
    flex: 1,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: SCREEN_HEIGHT * 0.02,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: SCREEN_WIDTH * 0.06,
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.02,
    width: '90%',
    justifyContent: 'center',
    alignSelf:'center'
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign:'center'
  },
  input: {
    borderRadius: SCREEN_WIDTH * 0.02,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    paddingVertical: SCREEN_HEIGHT * 0.025,
    fontSize: SCREEN_WIDTH * 0.04,
    flex: 1,
  },
  disabled: {
    backgroundColor: Colors.sky,
  },
  label: {
    fontSize: SCREEN_WIDTH * 0.035,
    color: Colors.lightGray,
    marginBottom: SCREEN_HEIGHT * 0.008,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: SCREEN_WIDTH * 0.02,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    paddingVertical: SCREEN_HEIGHT * 0.015,
    fontSize: SCREEN_WIDTH * 0.04,
    color: Colors.black,
  },
  error: {
    color: "#FF3B30",
    fontSize: SCREEN_WIDTH * 0.03,
    marginTop: SCREEN_HEIGHT * 0.005,
  },
  icon: {
    marginRight: SCREEN_WIDTH * 0.02,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: SCREEN_WIDTH * 0.02,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    backgroundColor: Colors.white,
  },
  profile: {
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_WIDTH * 0.11,
    borderRadius: SCREEN_WIDTH * 0.15,
    alignSelf: "center",
    marginVertical: SCREEN_HEIGHT * 0.02,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boldText: { ...FONTS.h3, marginTop: SCREEN_HEIGHT * 0.02 },
});

export default general;
