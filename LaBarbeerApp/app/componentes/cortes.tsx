import { Text, View } from "react-native";
import { Image } from "react-native";
import {styles} from "../(tabs)/index"
export default function Cortes(){
  const cortes = [
    require("../../assets/images/cortes/corte1.jpg"),
    require("../../assets/images/cortes/corte2.jpg"),
    require("../../assets/images/cortes/corte3.jpg"),
    require("../../assets/images/cortes/corte4.jpg"),
  ];
  return(
          <View style={styles.containerCenter}>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>Nuestros cortes</Text>
            </View>
            <View style={styles.containerCortes}>
              {cortes.map((imgPath, index) => (
                <Image source={imgPath} style={styles.image} key={index} />
              ))}
            </View>
          </View>
  )
}
