import * as React from "react";
import { useWindowDimensions } from "react-native";
import { Button } from "react-native-paper";

import { Mobile } from "./Mobile";
import { Desktop } from "./Desktop";
import { Spinner } from "../../components/Spinner";

export const NewGame = ({ navigation }) => {
  const { width } = useWindowDimensions();

  // if (width <= 430) {
  //   return <Mobile />;
  // }
  return <Desktop />;
};
