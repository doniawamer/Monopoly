import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { theme } from "../utils/styles";

export const Button = (props) => {
  const { onPress, title = "Save", style, variant = "primary" } = props;
  const buttonStyle =
    variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary;
  const textStyle =
    variant === "primary" ? styles.textPrimary : styles.textSecondary;

  return (
    <Pressable style={[styles.button, buttonStyle, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing[0],
    paddingHorizontal: theme.spacing[3],
    height: 42,
    width: 150,
    borderRadius: 20,
    marginHorizontal: "auto",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
    letterSpacing: 0.25,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.teal,
  },
  textPrimary: {
    color: theme.colors.white,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: theme.colors.teal,
  },
  textSecondary: {
    color: theme.colors.teal,
  },
});
