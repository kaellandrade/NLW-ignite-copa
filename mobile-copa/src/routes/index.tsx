import {NavigationContainer} from "@react-navigation/native";
import {AppRoutes} from "./app.routes";
import {Box, useTheme} from "native-base";
import {SignIn} from '../screens/SignIn'
import {useAuth} from "../../hooks/useAuth";


/**
 * Componente de rotas.
 * @constructor
 */
export function Routes() {
	const {user} = useAuth();

	const {colors} = useTheme();
	return (
		<Box flex={1} bg="gray.900">
			<NavigationContainer theme={{colors: {background: colors.gray[900]}}}>
				{user.name ? <AppRoutes/> : <SignIn/>}
			</NavigationContainer>
		</Box>
	);
}
