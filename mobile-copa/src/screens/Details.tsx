import {VStack, useToast, HStack} from "native-base";
import {Header} from "../components/Header";
import {useRoute} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {Loading} from "../components/Loading";
import {api} from "../services/api";
import {PoolCardProps} from "../components/PoolCard";
import {PoolHeader} from "../components/PoolHeader";
import {EmptyMyPoolList} from "../components/EmptyMyPoolList";
import {Option} from "../components/Option";
import {Share} from "react-native";
import {Guesses} from "../components/Guesses";

interface RouteParams {
	id: string;
}

export function Details() {
	const route = useRoute();
	const toast = useToast();
	const [isLoading, setIsloading] = useState(false);
	const [optinSelected, setOptinSelected] = useState<'guesses' | 'ranking'>('guesses');
	const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps);

	const {id} = route.params as RouteParams;

	/**
	 * Compartilha código do bolão
	 */
	async function handleCodeShare (){
		const MENSAGEM = `Olá, que tal participar do meu bolão da copa do mundo ? 
Basta copiar esse código e inserir no App: ${poolDetails.code}
		`;
		await Share.share({
			message:MENSAGEM
		})
	}

	async function fetchPoolsDetails() {
		try {
			setIsloading(true);
			const response = await api.get(`/pools/${id}`);

			setPoolDetails(response.data.pool);
		} catch (e) {
			console.log(e);
			toast.show({
				title: 'Não foi possível carregar os detalhes do bolão',
				placement: 'bottom',
				bgColor: 'red.500'
			})
		} finally {
			setIsloading(false);
		}
	}

	useEffect(() => {
		fetchPoolsDetails();
	}, [id])
	if (isLoading) {
		return <Loading/>
	}

	return (
		<VStack>
			<Header title={poolDetails.title} showBackButton showShareButton onShare={handleCodeShare}/>
			{
				poolDetails._count?.participants > 0
					?
					<VStack>
						<PoolHeader data={poolDetails}/>
						<HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
							<Option
								title="Seus palpites"
								isSelected={optinSelected === 'guesses'}
								onPress={_ => setOptinSelected('guesses')}
							/>
							<Option
								title="Ranking do grupo"
								isSelected={optinSelected === 'ranking'}
								onPress={_ => setOptinSelected('ranking')}
							/>
						</HStack>
						<Guesses poolId={poolDetails.id} code={poolDetails.code}/>
					</VStack>
					: <EmptyMyPoolList code={poolDetails.code}/>
			}
		</VStack>
	);
}
