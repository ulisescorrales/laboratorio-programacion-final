import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { View, Text } from 'react-native';
import { useState, useMemo, useEffect } from 'react';
export default function TurnosCliente() {
	const today = new Date().toISOString().split('T')[0];
	const [disabledDays, setDisabledDays] = useState<{}>([]);
	useEffect(() => {
		const result: any = {};
		fetch('https://api.argentinadatos.com/v1/feriados/2026')
			.then((data) => data.json())
			.then((json) => {
				for (const feriado of json) {
					const dateString = feriado.fecha
					result[dateString] = {
						disabled: true,
						disableTouchEvent: true
					};
				}
				setDisabledDays(result)
			});
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth(); // 0-based

		const daysInMonth = new Date(year, month + 1, 0).getDate();

		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month, day);
			const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

			if (dayOfWeek === 0 || dayOfWeek === 6) {
				const dateString = date.toISOString().split('T')[0];
				result[dateString] = {
					disabled: true,
					disableTouchEvent: true
				};
			}
		}
	}, []);

	return (
		<View>
			<Text>Hola</Text>
			<Calendar
				markedDates={disabledDays}
				minDate={today}
				onDayPress={(day) => {
					console.log('selected day', day);
				}}
				disableArrowLeft={true}
				disableArrowRight={true}
			/>
		</View>
	);
}
