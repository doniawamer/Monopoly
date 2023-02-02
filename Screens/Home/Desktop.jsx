import { useState } from "react";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Surface,
  IconButton,
  TextInput,
  Text,
} from "react-native-paper";
import { theme } from "../../utils/styles";

export const Desktop = () => {
  const { width } = useWindowDimensions();
  const [input, onInput] = useState("");
  const [joining, setJoining] = useState(false);
  const navigation = useNavigation();

  const Label = <Text color={styles.label}>Enter Code</Text>;
  return (
    <Surface style={styles.container}>
      <Image
        style={[
          styles.header,
          width < 820 ? styles.headerTablet : styles.headerDesktop,
        ]}
        source={require("../../assets/Board.png")}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("New Game")}
        style={styles.buttons}
      >
        New Game
      </Button>
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />
      <Surface style={styles.inputContainer} elevation={0}>
        {joining ? (
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
            <IconButton
              icon="chevron-right-circle"
              iconColor={theme.colors.teal}
              size={32}
              onPress={() => console.log("check code")}
              style={styles.gos}
              disabled={input.length === 0}
            />
          </>
        )}
      </Surface>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginVertical: "auto",
    overflow: "hidden",
    backgroundColor: theme.colors.white,
  },
  inputContainer: {
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    marginHorizontal: "auto",
    width: 240,
    height: 58,
  },
  header: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  headerDesktop: {
    resizeMode: "contain",
  },
  headerTablet: {
    resizeMode: "cover",
  },
  label: {
    color: theme.colors.teal,
    paddingBottom: theme.spacing[0],
  },
  input: {
    backgroundColor: theme.colors.lightestTeal,
    width: 140,
    color: theme.colors.teal,
    marginHorizontal: "auto",
    height: 45,
  },
  buttons: {
    width: 140,
    marginHorizontal: "auto",
  },
  logo: {
    marginHorizontal: "auto",
    marginVertical: theme.spacing[2],
    height: 157,
    width: 300,
  },
  go: {
    marginLeft: theme.spacing[0],
  },
});
