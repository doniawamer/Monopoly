import { useState } from "react";
import { Image, StyleSheet, View, Pressable, Text } from "react-native";
import { useFonts } from "expo-font";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { theme } from "../../utils/styles";

export const Mobile = () => {
  const [input, onInput] = useState("");
  const [loaded] = useFonts({
    MONOPOLY_INLINE: require("../../assets/fonts/MONOPOLY_INLINE.ttf"),
    CircularStdMedium: require("../../assets/fonts/CircularStd-Medium.otf"),
    CircularStdLight: require("../../assets/fonts//CircularStd-Light.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>hi</Text>
      <Button
        icon="account-plus"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Press me
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  header: {
    fontFamily: "MONOPOLY_INLINE",
    fontSize: 45,
    color: theme.colors.teal,
  },
});
