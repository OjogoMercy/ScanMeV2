import { Colors, Sizes } from "../constants/theme";
import { ThemedText } from "@/constants/ThemedText";
import { getSmartActions, getTypeConfig } from "@/utils/smartActions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import CustomButton from "./CustomButton";


type QuickActionModalProps = {
  item: ScanItem | null;
  visible: boolean;
  onClose: () => void;
  iconColor: string;
  iconName: string;
  iconBg: string;
};

 export const QuickActionModal = ({
  item,
  visible,
  onClose,iconColor,iconName,iconBg
}: QuickActionModalProps) => {
  if (!item) return null;
  const actions = getSmartActions(item.data, item.type);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalBackdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalSheet}>
          <View style={styles.modalHandle} />
          <View style={styles.modalHeader}>
            <View style={[styles.modalIcon, { backgroundColor: iconBg }]}>
              <MaterialCommunityIcons
                name={iconName}
                size={moderateScale(22)}
                color={iconColor}
              />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText type="text4bold" numberOfLines={1}>
                {item.title || item.data.substring(0, 40)}
              </ThemedText>
              <ThemedText
                type="text5"
                style={{ color: Colors.placeholder }}
                numberOfLines={1}
              >
                {item.data.substring(0, 50)}
              </ThemedText>
            </View>
          </View>
          <View style={styles.modalDivider} />
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionRow}
              activeOpacity={0.7}
              onPress={async () => {
                await action.action();
                onClose();

              }}
            >
              <MaterialCommunityIcons
                name={action.icon as any}
                size={moderateScale(20)}
                color={Colors.primary}
              />
              <ThemedText type="text4bold" style={{ color: Colors.text }}>
                {action.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
          <CustomButton title="Cancel" onPress={onClose} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    padding: Sizes.padding,
    paddingBottom: moderateScale(40),
    gap: moderateScale(4),
  },
  modalHandle: {
    width: moderateScale(40),
    height: moderateScale(4),
    backgroundColor: Colors.gray,
    borderRadius: moderateScale(2),
    alignSelf: "center",
    marginBottom: moderateScale(16),
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(12),
    marginBottom: moderateScale(12),
  },
  modalIcon: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
  },
  modalDivider: {
    height: 0.5,
    backgroundColor: Colors.gray,
    marginBottom: moderateScale(8),
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(16),
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(4),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray,
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: moderateScale(16),
    marginTop: moderateScale(4),
  },
});
