import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

type trashProps={
	style:any;
	onPress:any
}
export const Trash = (props:trashProps) => {
	return (
		<Svg height="45" width="45" viewBox="0 0 1200 1200" fill="none"
		style={props.style}
		onPress={props.onPress}
		>
			<Circle cx="600" cy="600" r="600" fill="white"  />
			<G id="SVGRepo_bgCarrier" strokeWidth={0} />
			<G
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<G id="SVGRepo_iconCarrier" scale={50}>
				<Path
					fill="#000000"
					d="M20 6h-3.155a.949.949 0 0 0-.064-.125l-1.7-2.124A1.989 1.989 0 0 0 13.519 3h-3.038a1.987 1.987 0 0 0-1.562.75l-1.7 2.125A.949.949 0 0 0 7.155 6H4a1 1 0 0 0 0 2h1v11a2 2 0 0 0 1.994 2h10.011A2 2 0 0 0 19 19V8h1a1 1 0 0 0 0-2zm-9.519-1h3.038l.8 1H9.681zm6.524 14H7V8h10z"
				/>
				<Path
					fill="#000000"
					d="M14 18a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1zM10 18a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1z"
				/>
			</G>
		</Svg>
	);
};

export default Trash;
