import {createContext, ReactNode, useEffect, useState} from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
	name: string;
	avatarUrl: string;
}

export interface AuthContextDataProps {
	user: UserProps;
	signIn: () => Promise<void>;
	isUserLoding:boolean
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
	const [user,setUser ] = useState<UserProps>({} as UserProps);
	const [isUserLoding,setUserLoading ] = useState(false);
	const [resquest, response, proptAsync] = Google.useAuthRequest({
		clientId:"329365535884-d8l09p6jsli56m7h88sf0dnncqh18jne.apps.googleusercontent.com",
		redirectUri:AuthSession.makeRedirectUri({useProxy: true}),
		scopes: ['profile', 'email']
	});
	useEffect(()=>{
		if(response?.type === 'success' && response.authentication.accessToken){
			signInWithGoogle(response.authentication.accessToken);
		}
	},[response])

	async function signIn() {
		try{
			setUserLoading(true);
			await proptAsync();
		}catch (error){
			console.log(error);
			throw error;
		}finally {
			setUserLoading(false);
		}
	}

	/**
	 * Autenticação com Google
	 * @param access_token
	 */
	async function signInWithGoogle(access_token:string){
		console.log(access_token);
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
