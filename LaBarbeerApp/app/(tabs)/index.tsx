import { View, ScrollView, ImageBackground } from "react-native";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import Cortes from "../componentes/cortes";
import Cervezas from "../componentes/cervezas";
import Seccion from "../componentes/seccion"
import Producto from "../../components/interfaces/Producto"
export default function HomeScreen() {
  const colCortes: Producto[] = [
    {
      nombre: "Corte Clásico",
	  descripcion:"Corte tradicional y prolijo, ideal para quienes buscan un look formal y atemporal. Se trabaja principalmente con tijera y terminaciones limpias.",
      marca: null,
      precio: 10000,
      promocion: null,
      pathImagen: require("../../assets/images/cortes/corte1.jpg")
    },
    {
      nombre: "Corte a tijera",
	  descripcion: "Corte realizado íntegramente con tijera, logrando un acabado natural, con volumen y movimiento.",
      marca: null,
      precio: 12000,
      promocion: null,
      pathImagen: require("../../assets/images/cortes/corte2.jpg")
    },
    {
      nombre: "Corte + afeitada",
	  descripcion:"Todo el cabello al mismo largo, ofreciendo un estilo simple y uniforme.",
      marca: null,
      precio: 15000,
      promocion: null,
      pathImagen: require("../../assets/images/cortes/corte3.jpg")
    },
    {
      nombre: "Estilo urbano",
	  descripcion:"Corte sencillo y práctico, fácil de mantener, ideal para niños y adolescentes.",
      marca: null,
      precio: 11000,
      promocion: null,
      pathImagen: require("../../assets/images/cortes/corte4.jpg")
    },
  ];
  const cortes = [
    require("../../assets/images/cervezas/kuruf1.jpg"),
    require("../../assets/images/cervezas/kuruf2.jpg"),
    require("../../assets/images/cervezas/kuruf3.jpg"),
    require("../../assets/images/cervezas/kuruf4.jpg"),
    require("../../assets/images/cervezas/kuruf5.jpg"),
    require("../../assets/images/cervezas/kuruf6.jpg"),
    require("../../assets/images/cervezas/kuruf7.jpg")]

  

  return (
    <ImageBackground source={require("../../assets/images/fondobarberia2.jpg")} style={{height:"100%"}} >
      <View>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.titleContainer}
        />
        <ScrollView>
		  <Seccion title={"Nuestros Cortes"} colProductos={colCortes} />
		  <Cervezas />
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
    height: 170,
    width: 170,
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
