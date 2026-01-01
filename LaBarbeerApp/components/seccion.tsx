import { StyleSheet } from 'react-native'
import { Text, Pressable, View, FlatList } from "react-native";
import { Image } from "react-native";
import { styles } from "../app/(tabs)/index";
import Producto from "@/components/interfaces/Producto";

type seccionProps={
  title:string,
  colProductos:Producto[];
}

export default function Seccion({title,colProductos}:seccionProps){

  return (
    <View style={styles.containerCenter}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        key='flatListCortes'
        numColumns={2}
        scrollEnabled={false}
        data={colProductos}
        renderItem={({ item, index }) => 
		  (<View style={{ margin: 10 }}>
            <Pressable >
              <Image
                source={{uri:item.pathImagen}}
                key={index}
                style={[styles.image]}
                borderRadius={16}
              />
			  <View style={styleItem.itemCard}>
				<Text style={styleItem.textItem}>{item.nombre}</Text>
				<Text style={styleItem.textItem}>{item.precio}$</Text>
			  </View>
            </Pressable>
          </View>
        )}/>
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
