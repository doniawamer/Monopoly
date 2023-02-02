import { useEffect, useState, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { ref, onValue, set } from "firebase/database";
import { db } from "../firebaseConfig";
import { Spinner } from "../components/Spinner";

const pieces = ["thimble", "wheel", "iron", "boot", "horse", "$bag"];
const id = Math.floor(Math.random() * 100000);
const rand = Math.floor(Math.random() * 6);

const INITIAL_AMOUNT = 1500;
const PASS_GO = 200;
const BANK_INITIAL_AMOUNT = 20580;

// get id first check if it doesnt exist

const gameIdtemp = "thimble 97288";

export default function PlayerScreen() {
  const gameRef = ref(db, "game/" + gameIdtemp);

  const [game, setGame] = useState({});
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   getGameData();
  //   console.log("mounted");
  // }, []);

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

  // useEffect(() => {
  //   console.log(">>> useEffect ", players, currentPlayer, game);
  // }, [game, players, currentPlayer]);

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
    return <Spinner />;
  }

  return <View style={styles.container}></View>;
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
