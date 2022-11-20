import {Button, HStack, Text, useTheme, VStack} from 'native-base';
import {X, Check} from 'phosphor-react-native';
import {getName} from 'country-list';

import {Team} from './Team';
import moment from "moment";
import 'moment/locale/pt-br';
import 'moment-timezone';

interface GuessProps {
	id: string;
	gameId: string;
	createdAt: string;
	participantId: string;
	firstTeamPoints: number;
	secondTeamPoints: number;
}

export interface GameProps {
	id: string;
	firstTeamCountryCode: string;
	secondTeamCountryCode: string;
	guess: null | GuessProps;
	date:string;
};

interface Props {
	data: GameProps;
	onGuessConfirm: () => void;
	setFirstTeamPoints: (value: string) => void;
	setSecondTeamPoints: (value: string) => void;
};

export function Game({data, setFirstTeamPoints, setSecondTeamPoints, onGuessConfirm}: Props) {
	const {colors, sizes} = useTheme();
	const openedToGuess = !Boolean(data.guess);
	const calendar = moment(data.date).calendar();

	const when = moment(data.date).format(`DD [de] MMMM YYYY [às] HH:00[h] [(${calendar})] 🕑`);

	return (
		<VStack
			w="full"
			bgColor="gray.800"
			rounded="sm"
			alignItems="center"
			borderBottomWidth={3}
			borderBottomColor={openedToGuess ? "yellow.500" : "red.500"}
			mb={3}
			p={4}
		>
			<Text color="gray.100" fontFamily="heading" fontSize="sm">
				{getName(data.firstTeamCountryCode)} vs. {getName(data.secondTeamCountryCode)}
			</Text>

			<Text color="gray.200" fontSize="xs">
				{when}
			</Text>

			<HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
				<Team
					code={data.firstTeamCountryCode}
					position="right"
					onChangeText={setFirstTeamPoints}
					openToGuess={openedToGuess}
				/>

				<X color={colors.gray[300]} size={sizes[6]}/>

				<Team
					code={data.secondTeamCountryCode}
					position="left"
					onChangeText={setSecondTeamPoints}
					openToGuess={openedToGuess}
				/>
			</HStack>

			{
				!data.guess &&
				<Button size="xs" w="full" bgColor="green.500" mt={4} onPress={onGuessConfirm}>
					<HStack alignItems="center">
						<Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
							CONFIRMAR PALPITE
						</Text>

						<Check color={colors.white} size={sizes[4]}/>
					</HStack>
				</Button>
			}
		</VStack>
	);
}
