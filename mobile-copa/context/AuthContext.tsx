import {createContext, ReactNode, useEffect, useState} from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from "expo-web-browser";
import {api} from '../src/services/api'
import {useToast} from "native-base";
WebBrowser.maybeCompleteAuthSession();

interface UserProps {
	name: string;
	avatarUrl: string;
}

export interface AuthContextDataProps {
	user: UserProps;
	signIn: () => Promise<void>;
	isUserLoding: boolean
}

interface AuthProviderProps {
	children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps);


/**
 * Permite compartilhar todo contexto com a aplicação.
 * @constructor
 */
export function AuthContextProvider({children}: AuthProviderProps) {
	const toast = useToast();
	const [user, setUser] = useState<UserProps>({} as UserProps);
	const [isUserLoding, setUserLoading] = useState(false);
	const [, response, proptAsync] = Google.useAuthRequest({
		clientId: process.env.CLIENT_ID,
		redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
		scopes: ['profile', 'email']
	});
	useEffect(() => {
		if (response?.type === 'success' && response.authentication.accessToken) {
			signInWithGoogle(response.authentication.accessToken);
		}
	}, [response])

	async function signIn() {
		try {
			setUserLoading(true);
			await proptAsync();
		} catch (error) {
			toast.show({
				title:'Erro ao autenticar. Verifique sua conexão e tente novamente. 😥',
				bgColor:'red.500',
				placement:'bottom'
			});
		} finally {
			setUserLoading(false);
		}
	}

	/**
	 * Autenticação com Google
	 * @param access_token
	 */
	async function signInWithGoogle(access_token: string) {
		try {
			setUserLoading(true);
			const tokenResponse = await api.post('/users', {access_token});
			api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

			const userInfoResponse = await api.get('/me');
			setUser(userInfoResponse.data);

		} catch (error) {
			toast.show({
				title:'Erro ao autenticar. Verifique sua conexão e tente novamente. 😥',
				bgColor:'red.500',
				placement:'bottom'
			});
		} finally {
			setUserLoading(false);
		}
	}

	return (
		<AuthContext.Provider value={{
			signIn,
			user,
			isUserLoding
		}}>
			{children}
		</AuthContext.Provider>
	);
}
