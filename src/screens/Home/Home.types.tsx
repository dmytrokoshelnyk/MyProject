import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList>;

export type ItemType = string;

export type CategoryMenuType = {
  name: string;
  previewUrl: string;
};
