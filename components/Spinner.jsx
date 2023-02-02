import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "../utils/styles";

export const Spinner = (style) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator animating={true} color={theme.colors.teal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
