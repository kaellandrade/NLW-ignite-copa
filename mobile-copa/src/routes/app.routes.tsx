import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {New} from "../screens/New";
import {Pools} from "../screens/Pools";
import {PlusCircle, SoccerBall} from "phosphor-react-native";
import {useTheme} from "native-base";
import {Find} from "../screens/Find";
import {Details} from "../screens/Details";

const {Navigator, Screen} = createBottomTabNavigator();
/**
 * Componente para as screens.
 * @constructor
 */
export const AppRoutes = () => {
	const {colors, sizes} = useTheme();
	const size = sizes[6];
	return (
		<Navigator screenOptions={
			{
				headerShown: false,
				tabBarActiveTintColor: colors.yellow[500],
				tabBarInactiveTintColor: colors.gray[300],
				tabBarStyle: {
					position: 'absolute',
					height: sizes[22],
					backgroundColor: colors.gray[800]
				},
				tabBarItemStyle: {
					position: 'relative',
				}
			}
		}>
			<Screen
				name="new"
				component={New}
				options={
					{
						tabBarIcon: ({color}) => <PlusCircle color={color} size={size}/>,
						tabBarLabel: 'Novo bolão'
					}
				}

			/>
			<Screen
				name="pools"
				component={Pools}
				options={
					{
						tabBarIcon: ({color}) => <SoccerBall color={color} size={size}/>,
						tabBarLabel: 'Meus bolões'
					}
				}
			/>

			<Screen
				name="find"
				component={Find}
				options={{tabBarButton: () => null}}
			/>
			<Screen
				name="details"
				component={Details}
				options={{tabBarButton: () => null}}
			/>
		</Navigator>
	);
}
