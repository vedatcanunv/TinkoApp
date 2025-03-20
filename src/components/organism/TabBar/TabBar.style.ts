import { StyleSheet, Platform, Dimensions } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { LAYOUT, isIphoneX } from "../../../helpers/layout";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    height: Platform.OS === "android" ? 65 : LAYOUT.TAB_BAR_HEIGHT - 8,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor:
      Platform.OS === "android" ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.05)",
    marginHorizontal: 0,
    marginBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 15,
        borderTopWidth: 1.5,
        borderTopColor: "rgba(0,0,0,0.03)",
      },
    }),
    position: "absolute",
    bottom: LAYOUT.HOME_INDICATOR_HEIGHT,
    left: 0,
    right: 0,
    justifyContent: "space-around",
    zIndex: 1000,
    width: "100%",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Platform.OS === "android" ? 10 : 8,
    zIndex: 1001,
  },
  tabLabel: {
    fontSize: Platform.OS === "android" ? 12 : 11,
    color: COLORS.tabBarInactiveTint,
    marginTop: Platform.OS === "android" ? 2 : 1,
    fontWeight: "500",
  },
  activeTabLabel: {
    color: COLORS.tabBarActiveTint,
    fontWeight: "bold",
  },
  iconContainer: {
    width: Platform.OS === "android" ? 46 : 42,
    height: Platform.OS === "android" ? 46 : 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Platform.OS === "android" ? 23 : 21,
    padding: 8,
  },
  addButton: {
    position: "absolute",
    backgroundColor: COLORS.buttonPrimary,
    width: Platform.OS === "android" ? 56 : 60,
    height: Platform.OS === "android" ? 56 : 60,
    borderRadius: Platform.OS === "android" ? 28 : 30,
    bottom:
      Platform.OS === "android"
        ? LAYOUT.TAB_BAR_HEIGHT - 8 - 30 + 5
        : LAYOUT.TAB_BAR_HEIGHT - 8 - 30,
    left: "50%",
    marginLeft: Platform.OS === "android" ? -28 : -30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 6,
      },
      android: {
        elevation: 10,
      },
    }),
    zIndex: 1002,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "bold",
  },
});
