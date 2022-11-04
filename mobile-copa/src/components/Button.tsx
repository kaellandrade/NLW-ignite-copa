import {Button as ButtonNativeBase, Text, IButtonProps} from 'native-base';

interface Props extends IButtonProps {
	title: string,
	type?: 'PRIMARY' | 'SECONDARY'
}
/**
 * Componente botão.
 * @param title
 * @param type
 * @param rest
 * @constructor
 */
export function Button({title, type = 'PRIMARY', ...rest}: Props) {
	return (
		<ButtonNativeBase
			w='xl'
			h={14}
			rounded='sm'
			fontSize='md'
			bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
			_pressed={{
				bg: type === 'SECONDARY' ? 'red.600' : "yellow.600"
			}}
			_loading={{
				_spinner: {color: 'black'}
			}}
			{...rest}
		>
			<Text textTransform='uppercase' fontSize='sm' color={type === 'SECONDARY' ? 'white' : 'black'}>
				{title}
			</Text>
		</ButtonNativeBase>
	);
}
