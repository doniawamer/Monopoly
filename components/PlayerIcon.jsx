import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../utils/styles";
import { useFonts } from "expo-font";

const colors = [
  "pink",
  "butter",
  "orange",
  "sun",
  "leaf",
  "sky",
  "indigo",
  "peach",
];

export const PlayerIcon = (props) => {
  const { player } = props;
  const [loaded] = useFonts({
    MONOPOLY_INLINE: require("../assets/fonts/MONOPOLY_INLINE.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const index = parseInt(player[player.length - 1]) - 1;

  return (
    <View
      style={[styles.circle, { backgroundColor: theme.colors[colors[index]] }]}
    >
      <Text style={styles.letter}>{player.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontSize: 35,
    fontFamily: "MONOPOLY_INLINE",
    color: theme.colors.white,
  },
});
