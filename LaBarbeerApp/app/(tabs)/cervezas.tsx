import Seccion from "@/components/Seccion";
import {useState} from "react";

export default function Cortes(){
	const [rol, setRol] = useState<string | null>(null);
	return(
		<Seccion
			title={'Nuestros Cortes'}
			rol={rol}
			tipoProducto={'corte'}
		/>
	)
}
