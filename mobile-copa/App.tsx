import {NativeBaseProvider, StatusBar, Center} from "native-base";
import {THEME} from './src/styles/theme';
import {useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto';
import {Loading} from "./src/components/Loading";
import {SignIn} from "./src/screens/SignIn";
import {AuthContextProvider} from "./context/AuthContext";
import {New} from "./src/screens/New";
import {Pools} from "./src/screens/Pools";

export default function App() {
	const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold});


	return (
		<NativeBaseProvider theme={THEME}>
			<AuthContextProvider>
				<StatusBar
					barStyle="light-content"
					backgroundColor="transparent"
					translucent
				/>
				<Center flex={1} bgColor="gray.900">
					{fontsLoaded ? <Pools/> : <Loading/>}
				</Center>
			</AuthContextProvider>
		</NativeBaseProvider>
	);
}