import { Text, View, ScrollView, ImageBackground } from "react-native";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import Cortes from "../componentes/cortes";

export default function HomeScreen() {
  return (
    <ImageBackground source={require("../../assets/images/fondobarberia2.jpg")}>
      <View>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.titleContainer}
        />
        <ScrollView>
          <Cortes />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
export const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    width: 100,
    height: 100,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    backgroundColor: "#000000c0",
    color: "white",
    width: "100%",
    textAlign: "center",
  },
  containerCenter: {
    // display:'flex',
    // justifyContent:'center',
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 10,
  },
  containerTitle: {
    width: "100%",
    alignItems: "center",
  },
  containerCortes: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
