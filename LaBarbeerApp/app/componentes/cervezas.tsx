
import { Text, View, FlatList } from "react-native";
import { Image } from "react-native";
import { styles } from "../(tabs)/index";


export default function Cervezas() {
  

  const cortes = [
    require("../../assets/images/cervezas/kuruf1.jpg"),
    require("../../assets/images/cervezas/kuruf2.jpg"),
    require("../../assets/images/cervezas/kuruf3.jpg"),
    require("../../assets/images/cervezas/kuruf4.jpg"),
    require("../../assets/images/cervezas/kuruf5.jpg"),
    require("../../assets/images/cervezas/kuruf6.jpg"),
    require("../../assets/images/cervezas/kuruf7.jpg")
  ];
  return (
    <View style={styles.containerCenter}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Nuestros cervezas</Text>
      </View>
      <FlatList
        key='flatListCortes'
        numColumns={2}
        scrollEnabled={false}
        data={cortes}
        renderItem={({ item, index }) => (
		  <View style={{margin:10}}>
			<Image source={item} key={index} style={[styles.image,]} borderRadius={16} />
		  </View>
        )}
      />
    </View>
  );
}
