import { Text, View, FlatList } from "react-native";
import { Image } from "react-native";
import { styles } from "../(tabs)/index";
import Producto from "@/components/interfaces/Producto";

export default function Cortes() {
  const colCortes: Producto[] = [
    {
      nombre: "Corte Clásico",
      marca: null,
      precio: 10000,
      promocion: null,
      pathImagen: "../../assets/images/cortes/corte1.jpg",
    },
    {
      nombre: "Corte facha",
      marca: null,
      precio: 12000,
      promocion: null,
      pathImagen: "../../assets/images/cortes/corte2.jpg",
    },
    {
      nombre: "Corte + afeitada",
      marca: null,
      precio: 15000,
      promocion: null,
      pathImagen: "../../assets/images/cortes/corte3.jpg",
    },
    {
      nombre: "Estilo urbano",
      marca: null,
      precio: 11000,
      promocion: null,
      pathImagen: "../../assets/images/cortes/corte4.jpg",
    },
  ];
  //
  // const cortes = [
  //   require("../../assets/images/cortes/corte1.jpg"),
  //   require("../../assets/images/cortes/corte2.jpg"),
  //   require("../../assets/images/cortes/corte3.jpg"),
  //   require("../../assets/images/cortes/corte4.jpg"),
  // ];
  //
  return (
    <View style={styles.containerCenter}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Nuestros cortes</Text>
      </View>
      <FlatList
        key='flatListCortes'
        numColumns={2}
        scrollEnabled={false}
        data={cortes}
        renderItem={({ item, index }) => (
          <View style={{ margin: 10 }}>
            <Image
              source={item}
              key={index}
              style={[styles.image]}
              borderRadius={16}
            />
          </View>
        )}
      />
    </View>
  );
}
// <View style={styles.containerCortes}>
//   {cortes.map((imgPath, index) => (

//     <Image source={imgPath} style={styles.image} key={index} />
//   ))}
// </View>
// contentContainerStyle={{
//   flexGrow: 1,
//   justifyContent: "space-around",
// }}
