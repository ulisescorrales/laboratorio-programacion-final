import {useLocalSearchParams} from 'expo-router';
import { View , Text, TextInput} from 'react-native';
import {useState} from 'react'

export default function ConfirmarTurno() {
	const { hora }=useLocalSearchParams<{
		hora?:string;
	}>();
	const [ nombre,setNumber] =useState<string>('');
	const [ apellido,setApellido] =useState<string>('');
	const [ dni,setDni] =useState<string>('');
	return (
		<View>
			<Text>Confirmar turno</Text>
			<Text>Hora:</Text>
			<Text>{hora}</Text>
			<TextInput value={""}
				onChangeText={setNumber}
			/>
			<TextInput value={""}
				onChangeText={setNumber}
			/>
		</View>
	);
}
