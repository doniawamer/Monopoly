import { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Pressable,
  useWindowDimensions,
  Text,
} from "react-native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { theme } from "../../utils/styles";
import { useFonts } from "expo-font";
import { PlayerIcon } from "../../components/PlayerIcon";

export const Desktop = () => {
  const [input, onInput] = useState("");

  const [loaded] = useFonts({
    MONOPOLY_INLINE: require("../../assets/fonts/MONOPOLY_INLINE.ttf"),
    CircularStdMedium: require("../../assets/fonts/CircularStd-Medium.otf"),
    CircularStdLight: require("../../assets/fonts//CircularStd-Light.otf"),
  });

  if (!loaded) {
    return null;
  }
  console.log("Desktop");

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <PlayerIcon style={styles.player} player="p1" />
        <Input
          text="Enter player's name"
          input={input}
          onInput={onInput}
          style={styles.input}
        />
        <Button
          icon="account-plus"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Test
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontFamily: "MONOPOLY_INLINE",
    color: theme.colors.teal,
    fontSize: 4,
  },
  inputContainer: {
    flexDirection: "row",
    width: 400,
  },
  input: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  player: {
    paddingRight: theme.spacing[3],
  },
});
