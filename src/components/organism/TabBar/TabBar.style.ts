import { StyleSheet, Platform } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { LAYOUT, isIphoneX } from "../../../helpers/layout";

export const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    height: LAYOUT.TAB_BAR_HEIGHT,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    marginHorizontal: 0,
    marginBottom: 0,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 10,
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
    paddingVertical: 12,
    zIndex: 1001,
  },
  tabLabel: {
    fontSize: 12,
    color: COLORS.tabBarInactiveTint,
    marginTop: 4,
    fontWeight: "500",
  },
  activeTabLabel: {
    color: COLORS.tabBarActiveTint,
    fontWeight: "bold",
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    padding: 8,
  },
  activeIconContainer: {
    backgroundColor: COLORS.buttonPrimaryLight,
  },
  addButton: {
    position: "absolute",
    backgroundColor: COLORS.buttonPrimary,
    width: 54,
    height: 54,
    borderRadius: 27,
    bottom: LAYOUT.TAB_BAR_HEIGHT - 27,
    left: "50%",
    marginLeft: -27,
    justifyContent: "center",
    alignItems: "center",
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
        elevation: 8,
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
