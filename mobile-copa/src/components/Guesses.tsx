import React from 'react';
import { useToast, FlatList} from 'native-base';
import {useEffect, useState} from "react";
import {api} from "../services/api";
import {Game, GameProps} from "./Game";
import {Loading} from "./Loading";
import {EmptyMyPoolList} from "./EmptyMyPoolList";

interface Props {
	poolId: string;
	code: string;
}

export function Guesses({poolId, code}: Props) {
	const [isLoading, setIsloading] = useState(true);
	const [games, setGames] = useState<GameProps[]>([]);
	const [firstTeamPoints, setFirstTeamPoints] = useState('');
	const [secondTeamPoints, setSecondTeamPoints] = useState('');
	const [messageError, setMessageError] = useState<string>('');
	const toast = useToast();

	async function handleGuessConfirm(gameId: string) {
		setIsloading(true);
		setMessageError('');
		try {
			if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
				return toast.show({
					title: 'Informe o placar para ambos os times ❗',
					placement: 'bottom',
					bgColor: 'red.500'
				});
			}
			await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
				firstTeamPoints: Number(firstTeamPoints),
				secondTeamPoints: Number(secondTeamPoints)
			});

			toast.show({
				title: 'Palpite registrado com sucesso 🤞',
				placement: 'bottom',
				bgColor: 'green.500'
			});
			fetchGames();

		} catch (e) {
			console.log(e.message);
			toast.show({
				title: messageError || 'Não foi possível registrar seu palpite',
				placement: 'bottom',
				bgColor: 'red.500'
			});

		} finally {
			setIsloading(false);
			setMessageError('');

		}
	}

	async function fetchGames() {
		try {
			setIsloading(true);

			const response = await api.get(`/pools/${poolId}/games`);
			setGames(response.data.games);

		} catch (e) {
			console.log(e);
			toast.show({
				title: 'Não foi possível carregar os jogos',
				placement: 'bottom',
				bgColor: 'red.500'
			});
		} finally {
			setIsloading(false);
		}
	}

	useEffect(() => {
		fetchGames();
	}, [poolId])

	if (isLoading) {
		return <Loading/>
	}
	return (
		<FlatList
			contentContainerStyle={{paddingBottom:200}}
			data={games}
			marginBottom={400}
			keyExtractor={(item) => item.id}
			renderItem={({item}) =>
				<Game
					data={item}
					setFirstTeamPoints={setFirstTeamPoints}
					setSecondTeamPoints={setSecondTeamPoints}
					onGuessConfirm={() => handleGuessConfirm(item.id)}
				/>
			}
			ListEmptyComponent={() => <EmptyMyPoolList code={code}/>}
		/>
	);
}
