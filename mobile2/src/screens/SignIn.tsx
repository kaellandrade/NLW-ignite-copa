import {Center, Icon, Text} from 'native-base';
import {Fontisto} from '@expo/vector-icons';
import Logo from '../assets/logo.svg';
import {Button} from "../components/Button";
import {useAuth} from "../../hooks/useAuth";

export function SignIn() {
	const {signIn, user} = useAuth();
	console.log(user);
	return (
		<Center flex={1} bgColor="gray.900">
			<Logo width={212} height={40}/>
			<Button
				onPress={signIn}
				alignContent='center'
				isLoading={false}
				title="entrar com google"
				leftIcon={<Icon as={Fontisto} name='google' color='white' size='md'/>}
				type='SECONDARY'
				mt={12}
			/>
			<Text mt={5} color='white' textAlign='center'>
				Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
			</Text>
		</Center>
	);
}
