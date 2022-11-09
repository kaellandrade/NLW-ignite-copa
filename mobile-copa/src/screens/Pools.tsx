import {VStack, Icon, useToast, FlatList} from "native-base";
import {Button} from "../components/Button";
import {Header} from "../components/Header";
import {Octicons} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {api} from "../services/api";
import {useCallback, useState} from "react";
import {PoolCard, PoolCardProps} from "../components/PoolCard";
import {Loading} from "../components/Loading";
import {EmptyPoolList} from "../components/EmptyPoolList";
import {useFocusEffect} from '@react-navigation/native';

/**
 * Lista todos os bolões criados.
 * @constructor
 */
export function Pools() {
	const toast = useToast();
	const [pools, setPools] = useState<PoolCardProps[]>([]);
	const {navigate} = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	useFocusEffect(useCallback(() => {
		fetchPools();
	}, []));

	/**
	 * Recupera todos os bolões criados.
	 */
	async function fetchPools() {
		try {
			setIsLoading(true);
			const response = await api.get('/pools');
			setPools(response.data.pools);
		} catch (e) {
			toast.show({
				title: 'Não foi possível carregar os bolões! 😥',
				placement: 'bottom',
				bgColor: 'red.500'
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<VStack flex={1}>
			<Header title='Meus bolões'/>

			<VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor='gray.600' pb={4} mb={4}>
				<Button
					width='full'
					leftIcon={<Icon as={Octicons} name='search' color='black' size='md'/>}
					title='BUSCAR BOLÃO POR CÓDIGO'
					onPress={() => navigate('find')}
				/>
			</VStack>
			{isLoading
				? <Loading/>
				: <FlatList
					data={pools}
					keyExtractor={(pool) => pool.id}
					renderItem={({item}) => <PoolCard data={item}/>}
					px={5}
					showsVerticalScrollIndicator={false}
					_contentContainerStyle={{pb: 10}}
					ListEmptyComponent={<EmptyPoolList/>
					}
				/>}
		</VStack>
	)
}
