import { useState } from "react";
import { Image, StyleSheet, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Surface,
  IconButton,
  TextInput,
  Text,
} from "react-native-paper";

import { theme } from "../../utils/styles";

export const Mobile = () => {
  const [input, onInput] = useState("");
  const [joining, setJoining] = useState(false);
  const navigation = useNavigation();
  const Label = <Text color={styles.label}>Enter Code</Text>;

  return (
    <Surface style={styles.container}>
      <Image
        style={styles.header}
        source={require("../../assets/BoardMobile.png")}
      />
      <Surface style={styles.buttonsContainer} elevation={0}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("New Game")}
          style={styles.buttons}
        >
          New Game
        </Button>
        <Surface style={styles.inputContainer} elevation={0}>
          {!joining ? (
            <Surface
              elevation={0}
              style={{
                backgroundColor: theme.colors.white,
                marginHorizontal: "auto",
              }}
            >
              <Button
                mode="outlined"
                style={[styles.buttons, { borderColor: theme.colors.teal }]}
                onPress={() => setJoining(true)}
              >
                Join Game
              </Button>
            </Surface>
          ) : (
            <>
              <TextInput
                label={Label}
                value={input}
                onChangeText={(text) => onInput(text)}
                style={styles.input}
                textColor={theme.colors.teal}
              />
              <Button
                mode="outlined"
                style={[
                  styles.buttons,
                  {
                    borderColor: theme.colors.teal,
                    marginTop: theme.spacing[1],
                  },
                ]}
                onPress={() => setJoining(true)}
                disabled={input.length === 0}
              >
                Join Game
              </Button>
            </>
          )}
        </Surface>
      </Surface>
      <Image
        style={styles.footer}
        source={require("../../assets/Stacks.png")}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: theme.colors.white,
  },
  header: {
    height: "60%",
    width: "100%",
    marginBottom: "auto",
  },
  buttonsContainer: {
    alignItems: "center",
    width: "100%",
  },
  buttons: {
    width: 140,
    marginHorizontal: "auto",
  },
  go: {
    height: 30,
    width: 30,
    marginLeft: theme.spacing[1],
    resizeMode: "cover",
  },
  footer: {
    marginTop: "auto",
    height: 42,
    width: "100%",
  },
  inputContainer: {
    marginTop: theme.spacing[2],
    backgroundColor: theme.colors.white,
    flexDirection: "column",
    marginHorizontal: "auto",
    alignItems: "center",
  },
  input: {
    backgroundColor: theme.colors.lightestTeal,
    width: 140,
    color: theme.colors.teal,
    marginHorizontal: "auto",
    height: 45,
  },
  label: {
    color: theme.colors.teal,
    paddingBottom: theme.spacing[0],
  },
});
