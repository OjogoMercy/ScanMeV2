import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import * as Haptics from "expo-haptics";
import { Share } from "react-native";

export type SmartAction = {
  label: string;
  icon: string;
  action: () => Promise<void>;
};

export const getSmartActions = (data: string, type: string): SmartAction[] => {
  const actions: SmartAction[] = [];

  actions.push({
    label: "Copy",
    icon: "content-copy",
    action: async () => {
      await Clipboard.setStringAsync(data);
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    },
  });

  actions.push({
    label: "Share",
    icon: "share-variant",
    action: async () => {
      await Share.share({ message: data });
    },
  });

  // type specific actions
  switch (type) {
    case "url":
      actions.unshift({
        label: "Open Link",
        icon: "open-in-new",
        action: async () => {
          if (await Linking.canOpenURL(data)) {
            await Linking.openURL(data);
          }
        },
      });
      break;

    case "email":
      actions.unshift({
        label: "Send Email",
        icon: "email-outline",
        action: async () => {
          await Linking.openURL(`mailto:${data}`);
        },
      });
      break;

    case "phone":
      actions.unshift(
        {
          label: "Call",
          icon: "phone-outline",
          action: async () => {
            await Linking.openURL(`tel:${data}`);
          },
        },
        {
          label: "WhatsApp",
          icon: "whatsapp",
          action: async () => {
            const number = data.replace(/[-\s\(\)+]/g, "");
            await Linking.openURL(`whatsapp://send?phone=${number}`);
          },
        }
      );
      break;

    case "wifi":
      actions.unshift({
        label: "View Details",
        icon: "wifi",
        action: async () => {},
      });
      break;
  }

  return actions;
};