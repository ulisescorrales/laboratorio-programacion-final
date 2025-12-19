import { StyleSheet } from 'react-native'
import { useRef } from "react";
import { Text,GestureResponderEvent, Pressable, View, FlatList } from "react-native";
import { Image } from "react-native";
import { styles } from "../(tabs)/index";
import Producto from "@/components/interfaces/Producto";

export default function Cortes() {
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
  const cortes = colCortes.map((corte) => corte.pathImagen);

  const cortesRef = useRef(null);
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
        data={colCortes}
        renderItem={({ item, index }) => (
          <View style={{ margin: 10 }}>
            <Pressable
			onPress={(event:GestureResponderEvent)=>{
			  // event.currentTarget.
			}}
			>
              <Image
                source={item.pathImagen}
                key={index}
                style={[styles.image]}
                borderRadius={16}
              />
			  //Info del corte
			  <View style={styleItem.itemCard}>
				<Text style={styleItem.textItem}>{item.nombre}</Text>
				<Text style={styleItem.textItem}>{item.precio}$</Text>
			  </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
const styleItem=StyleSheet.create({
  textItem:{
	textAlign:'center',
	color:'black',
	fontSize:16
  },
  itemCard:{
	backgroundColor:'white',
    borderRadius:15
  }
})
// <View style={styles.containerCortes}>
//   {cortes.map((imgPath, index) => (

//     <Image source={imgPath} style={styles.image} key={index} />
//   ))}
// </View>
// contentContainerStyle={{
//   flexGrow: 1,
//   justifyContent: "space-around",
// }}
