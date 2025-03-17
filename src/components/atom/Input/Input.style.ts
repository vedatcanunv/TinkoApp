import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    borderColor: "#E5E5EA",
    paddingHorizontal: 12,
    height: 48,
    position: "relative",
  },
  focusedInput: {
    borderColor: "#007AFF",
  },
  errorInput: {
    borderColor: "#FF3B30",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    height: "100%",
  },
  // Variants
  default: {
    borderColor: "#E5E5EA",
  },
  outline: {
    borderColor: "#007AFF",
    backgroundColor: "transparent",
  },
  filled: {
    borderColor: "transparent",
    backgroundColor: "#F2F2F7",
  },
  // Sizes
  small: {
    height: 36,
    paddingHorizontal: 12,
  },
  medium: {
    height: 44,
    paddingHorizontal: 16,
  },
  large: {
    height: 52,
    paddingHorizontal: 20,
  },
  // States
  focused: {
    borderColor: "#007AFF",
  },
  error: {
    borderColor: "#FF3B30",
  },
  disabled: {
    opacity: 0.5,
  },
  // Icons
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  errorText: {
    marginTop: 4,
  },
  eyeIcon: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
