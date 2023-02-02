import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../utils/styles";

export const Input = (props) => {
  const { text, input, style, onInput, children } = props;
  const [focus, setFocus] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.buttonContainer, style]}>
        <TextInput
          placeholder={text}
          style={[
            styles.input,
            focus ? styles.inputOnFocus : styles.inputOnBlur,
            style,
          ]}
          onChangeText={onInput}
          value={input}
          placeholderTextColor={theme.colors.lightTeal}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
  },
  buttonContainer: {
    borderColor: theme.colors.teal,
    borderWidth: 0,
    borderBottomWidth: 2,
    height: 42,
    width: "100%",
  },
  inputOnFocus: {
    backgroundColor: theme.colors.lightestTeal,
  },
  inputOnBlur: { backgroundColor: "transparent" },
  input: {
    outlineStyle: "none",
    padding: 10,
    color: theme.colors.teal,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
    letterSpacing: 0.25,
    height: 42,
    width: "100%",
  },
});
