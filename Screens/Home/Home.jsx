import { useWindowDimensions } from "react-native";
import { Mobile } from "./Mobile";
import { Desktop } from "./Desktop";

export const Home = ({ navigation }) => {
  const { width } = useWindowDimensions();
  if (width <= 430) {
    return <Mobile />;
  }
  return <Desktop />;
};
