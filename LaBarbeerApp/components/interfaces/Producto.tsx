import { ImageSourcePropType } from 'react-native';
export default interface Producto{
  nombre:string,
  marca:string|null,
  precio:number,
  promocion:string|null,
  pathImagen:ImageSourcePropType
}
