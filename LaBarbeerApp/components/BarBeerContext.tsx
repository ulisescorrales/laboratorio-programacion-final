import { createContext, useState, useContext } from 'react';

const BarberContext = createContext(null);

export default function BarbeerProvider({ children }) {
	const [sesion, setSesion] = useState(null);

	return (
		<BarberContext.Provider value={{ sesion, setSesion }}>
			{children}
		</BarberContext.Provider>
	);
}

// Hook personalizado para usarlo fácilmente
export const useBarber = () => useContext(BarberContext);
