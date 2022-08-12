import {PostT} from '../../screens/List/List.types';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/src/types';

export type ListItemProps = {
  item: PostT;
  navigation: NativeStackNavigationProp<RootStackParamList, 'List'>;
};
