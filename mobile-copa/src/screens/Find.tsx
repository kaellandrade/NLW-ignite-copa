import {useState} from "react";
import {Heading, useToast, VStack} from "native-base";
import {Header} from "../components/Header";
import {Input} from "../components/Input";
import {Button} from "../components/Button";
import {api} from "../services/api";
import {useNavigation} from "@react-navigation/native";

export function Find() {
	const [isLoading, setIsLoading] = useState(false);
	const [code, setCoCode] = useState('');
	const toast = useToast();
	const {navigate} = useNavigation();

	async function handleJoinPool() {
		try {
			setIsLoading(true);
			if(!code.trim()) {
				toast.show({
					title: 'Informe o código para seu bolão! 😁',
					placement: 'bottom',
					bgColor: 'red.500'
				});
			}
			await api.post('/pools/join', {code});
			navigate('pools');
			toast.show({
				title: 'Agora você é membro do bolão! ⚽',
				placement: 'bottom',
				bgColor: 'green.500'
			});
			setIsLoading(false);
			setCoCode('');
		} catch (e) {
			console.log(e);
			setIsLoading(false);
			const message = e.response?.data?.message;
			if (message) {
				return toast.show({
					title: message,
					placement: 'bottom',
					bgColor: 'red.500'
				});
			}
			toast.show({
				title: 'Não foi possível encontrar o bolão! 😥',
				placement: 'bottom',
				bgColor: 'red.500'
			});
		}
	}

	return (
		<VStack flex={1}>
			<Header title='Buscar por código' showBackButton/>
			<VStack mt={8} mx={5} alignItems='center'>
				<Heading fontFamily='heading' color='white' fontSize='xl' mb={8} textAlign='center'>
					Encontre um bolão através de {'\n'} seu código único
				</Heading>
				<Input mb={2} placeholder='Qual o código do bolão?' onChangeText={setCoCode} value={code}
					   autoFocus={true} autoCapitalize='characters'/>
				<Button width='full' title='BUSCAR BOLÃO' onPress={handleJoinPool} isLoading={isLoading}/>
			</VStack>
		</VStack>
	)
}

// BOL123
