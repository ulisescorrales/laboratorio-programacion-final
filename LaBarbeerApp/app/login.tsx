import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	TextInput,
	StyleSheet,
	Text,
	Switch,
	View,
	Button,
	Keyboard
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
export default function Login() {
	const { mensaje } = useLocalSearchParams();
	const router = useRouter();
	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const [user, setUser] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	// const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isEnabled, setIsEnabled] = useState<boolean>(false);

	const toggleSwitch = () =>
		setIsEnabled((previousState: boolean) => !previousState);

		useEffect(() => {
			if(mensaje){
				Toast.show({
					type: 'info',
					text1: mensaje,
					position: 'bottom'
				})
			}
		}, [mensaje]);

	const login = () => {
		if(user.length==0){
			Keyboard.dismiss()
			Toast.show({
				type:'error',
				text1:'Indique usuario',
				position:'bottom'
			})
			return
		}
		if(password.length==0){
			Keyboard.dismiss()
			Toast.show({
				type:'error',
				text1:'Indique la contraseña',
				position:'bottom'
			})
			return
		}
		fetch(backendHost + '/api/login/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user: user,
				password: password
			})
		}).then((data: any) => {
			if (data.status == 200) {
				// TODO: esto se muestra en pantalla principal
				// Toast.show({
				// 	type: 'success',
				// 	text1: 'Logueado correctamente',
				// 	position: 'bottom'
				// });
				data.json().then((json: any) => {
					AsyncStorage.setItem('role', json.role);
					AsyncStorage.setItem('token', json.token);
					AsyncStorage.setItem('user', user);
					router.replace({
						pathname: '/',
						params: {
							role: json.role,
							mensaje: 'Logueado correctamente',
							nombreUsuario: user
						}
					});
					//
					// router.setParams({
					// 	role: json.role,
					// 	mensaje: 'Logueado correctamente',
					// 	type:'error'
					// });
					// router.back();
				});
			} else {
				Toast.show({
					type: 'error',
					text1: 'Error, usuario o contraseña incorrecta',
					position: 'bottom'
				});
			}
		});
	};

	return (
		<View style={{height:'100%'}}>
			<Text style={styles2.label}>Usuario:</Text>
			<TextInput
				value={user}
				onChangeText={setUser}
				style={styles2.input}
			/>
			<Text style={styles2.label}>Contraseña:</Text>
			<TextInput
				value={password}
				onChangeText={setPassword}
				secureTextEntry={!isEnabled}
				style={styles2.input}
			/>
			<View style={styles2.inputGroup}>
				<Text style={styles2.label}>Mostrar contraseña:</Text>
				<Switch
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isEnabled}
					style={{ alignSelf: 'flex-start' }}
				/>
			</View>
			<Button title={'Login'} onPress={login} />
			<Toast />
		</View>
	);
}

const styles2 = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#F8F9FA' // Fondo ligeramente gris para resaltar los inputs blancos
	},
	inputGroup: {
		marginBottom: 10
	},
	label: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
		marginBottom: 8,
		marginLeft: 4
	},
	input: {
		backgroundColor: '#FFF',
		height: 40,
		borderRadius: 12,
		paddingHorizontal: 16,
		fontSize: 16,
		color: '#000',
		borderWidth: 1,
		borderColor: '#DDD',
		// Sombra para iOS
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		// Sombra para Android
		elevation: 2
	},
	textArea: {
		height: 120,
		paddingTop: 15
	},
	priceInputWrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	currencySymbol: {
		backgroundColor: '#EEE',
		height: 50,
		paddingHorizontal: 15,
		justifyContent: 'center',
		lineHeight: 50,
		borderTopLeftRadius: 12,
		borderBottomLeftRadius: 12,
		borderWidth: 1,
		borderColor: '#DDD',
		color: '#555',
		fontWeight: 'bold'
	}
});
