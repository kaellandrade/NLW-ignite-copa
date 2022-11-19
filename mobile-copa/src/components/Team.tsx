import {HStack} from 'native-base';
import CountryFlag from "react-native-country-flag";

import {Input} from './Input';

interface Props {
	code: string;
	position: 'left' | 'right';
	onChangeText: (value: string) => void;
	openToGuess: boolean;
}

export function Team({code, position, onChangeText, openToGuess = true}: Props) {
	const FLAG_SIZE = 36;
	return (
		<HStack alignItems="center">
			{position === 'left' && <CountryFlag isoCode={code} size={FLAG_SIZE} style={{marginRight: 12}}/>}

			{openToGuess ?
				<Input
					w={10}
					h={9}
					textAlign="center"
					fontSize="xs"
					keyboardType="numeric"
					onChangeText={onChangeText}
				/> : null
			}

			{position === 'right' && <CountryFlag isoCode={code} size={FLAG_SIZE} style={{marginLeft: 12}}/>}
		</HStack>
	);
}
