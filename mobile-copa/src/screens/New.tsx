import {Heading, Text, VStack, useToast} from "native-base";
import {Header} from "../components/Header";
import Logo from '../assets/logo.svg';
import {Input} from "../components/Input";
import {Button} from "../components/Button";
import {useAuth} from "../../hooks/useAuth";
import {useState} from "react";
import {api} from "../services/api";
export function New() {
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const {user} = useAuth();
	const [title, setTitle] = useState('');

	/**
	 * Adiciona um novo bolão.
	 */
	async function handlePoolCreate() {
		if(!title.trim()) {
			return toast.show({
				title:'Informe um nome para seu bolão! ❗',
				placement:'bottom',
				bgColor:'red.500'
			})
		}
		try {
			setIsLoading(true);
			await api.post('/pools', {title})
			toast.show({
				title:'Bolão criado com sucesso! ⚽',
				bgColor:'green.500',
				placement:'bottom'
			});
			setTitle('');
		}catch (e) {
			console.log(e);
			toast.show({
				title: 'Não foi possível criar o bolão! 😥',
				placement:'bottom',
				bgColor:'red.500'
			})
		}finally {
			setIsLoading(false);
		}
	}

	return (
		<VStack flex={1}>
			<Header title='Criar um novo bolão'/>
			<VStack mt={8} mx={5} alignItems='center'>
				<Logo/>
				<Heading fontFamily='heading' color='white' fontSize='xl' my={8} textAlign='center'>
					Crie seu próprio bolão da copa {'\n'}e compartilhe entre amigos!
				</Heading>
				<Input
					mb={2}
					placeholder={`Qual o nome do seu bolão ?`}
					onChangeText={setTitle}
					value={title}
				/>
				<Button width='full' title='criar meu bolão' onPress={handlePoolCreate} isLoading={isLoading}/>
				<Text color="gray.200" fontSize='sm' textAlign='center' px={10} mt={4}>
					Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
				</Text>
			</VStack>
		</VStack>
	)
}
