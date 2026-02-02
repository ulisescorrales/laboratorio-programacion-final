import { TextInput, Text, Switch, View, Button } from 'react-native';
import { useState } from 'react';
export default function Login() {
	const [user, setUser] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isEnabled, setIsEnabled] = useState<boolean>(false);

	const toggleSwitch = () =>
		setIsEnabled((previousState: boolean) => !previousState);

	const login = () => {
		fetch('http://192.168.1.7', {
			method: 'POST'
		}).then((data) => {
			if (data.status == 200) {
			} else {
				console.log('Error');
			}
		});
	};
	return (
		<View>
			<Text>Usuario:</Text>
			<TextInput value={user} onChangeText={setUser} />
			<Text>Contraseña:</Text>
			<TextInput
				value={password}
				onChangeText={setPassword}
				secureTextEntry={!isEnabled}
			/>
			<Switch
				trackColor={{ false: '#767577', true: '#81b0ff' }}
				thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
				ios_backgroundColor="#3e3e3e"
				onValueChange={toggleSwitch}
				value={isEnabled}
			/>
			<Button title={'Login'} onPress={login} />
		</View>
	);
}
