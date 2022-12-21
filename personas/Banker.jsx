import { useEffect, useState, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { ref, onValue, set } from "firebase/database";
import { db } from "../firebaseConfig";

const pieces = ["thimble", "wheelbarrow", "iron", "boot", "horse", "moneybag"];
const id = Math.floor(Math.random() * 100000);
const rand = Math.floor(Math.random() * 6);

const INITIAL_AMOUNT = 1500;
const PASS_GO = 200;
const BANK_INITIAL_AMOUNT = 20580;

const gameIdtemp = "thimble 97288";

export default function Banker() {
  const gameRef = ref(db, "game/" + gameIdtemp);

  const [game, setGame] = useState({});
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getGameData();
    console.log("mounted");
  }, []);

  const getGameData = () => {
    onValue(gameRef, (game) => {
      const data = game.val();

      getPlayers(data);
      setGame(data);
      setCurrentPlayer(data.turn);
      setIsLoading(false);
    });
  };

  const getPlayers = (data) => {
    const playerArray = Object.keys(data);
    playerArray.splice(playerArray.indexOf("turn"), 1);
    playerArray.splice(playerArray.indexOf("bank"), 1);
    setPlayers(playerArray);
  };

  useEffect(() => {
    console.log(">>> useEffect ", players, currentPlayer, game);
  }, [game, players, currentPlayer]);

  // Turn enders/ new game
  const endTurn = () => {
    const currentIndex = players.indexOf(currentPlayer);
    const totalPlayers = players.length - 1;
    let turn = "";

    if (currentIndex < totalPlayers) {
      turn = players[currentIndex + 1];
    } else {
      turn = players[0];
    }
    set(gameRef, {
      ...game,
      turn,
    });
  };

  const createNewGame = () => {
    const newGameId = pieces[rand] + id;
    try {
      set(ref(db, "game/" + gameId), {
        p1: {
          name: "Farah",
          wallet: INITIAL_AMOUNT,
          banker: true,
        },
        p2: {
          name: "Saif",
          wallet: INITIAL_AMOUNT,
          banker: false,
        },
        turn: "p1",
      });
      setGameId(newGameId);
    } catch (error) {
      // retry
      console.log("retry", error);
    }
  };

  // Wallet manipulation
  //[pass go] [pay the bank] [pay rent]
  const passGO = () => {
    const wallet = getWallet();
    const bank = getBank();
    if (bank - PASS_GO < 0) {
      //dispatch some opps modal!
    } else {
      setGame((prevState) => ({
        ...prevState,
        bank: bank - PASS_GO,
        [currentPlayer]: {
          ...prevState[currentPlayer],
          wallet: wallet + PASS_GO,
        },
      }));
    }
  };
  const payBank = (amount) => {
    const wallet = getWallet();
    const bank = getBank();
    setGame((prevState) => ({
      ...prevState,
      bank: bank + amount,
      [currentPlayer]: {
        ...prevState[currentPlayer],
        wallet: wallet - amount,
      },
    }));
  };

  const payPlayer = (amount, payee) => {
    const wallet = getWallet();
    const payeeWallet = game[currentPlayer].wallet;

    if (payee === currentPlayer) {
      //some error
    } else {
      setGame((prevState) => ({
        ...prevState,
        [currentPlayer]: {
          ...prevState[currentPlayer],
          wallet: wallet - amount,
        },
        [payee]: {
          ...prevState[payee],
          wallet: payeeWallet + amount,
        },
      }));
    }
  };

  const getWallet = () => {
    return game[currentPlayer].wallet;
  };

  const getBank = () => {
    return game.bank;
  };

  if (isLoading) {
    return <Text>Loading....</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Turn: {currentPlayer}</Text>
      <Text style={styles.space}>Wallet: {getWallet()}</Text>

      <View style={styles.buttons}>
        <Button onPress={passGO} title="Pass GO" />
        <Button onPress={() => payBank(250)} title="Pay bank" />
        <Button onPress={() => payPlayer(150, "p2")} title="Pay player" />
      </View>
      <Button onPress={endTurn} title="End Turn" />
      <Text style={styles.space}></Text>
      <Button onPress={getWallet} title="New Game" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flexDirection: "row",
    marginBottom: 50,
    justifyContent: "space-around",
    width: "80%",
  },
  space: {
    marginBottom: 50,
  },
});
