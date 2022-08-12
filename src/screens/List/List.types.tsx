import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
export type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

export type PostT = {
  collections: number;
  comments: number;
  downloads: number;
  id: number;
  imageHeight: number;
  imageSize: number;
  imageWidth: number;
  largeImageURL: string;
  likes: number;
  pageURL: string;
  previewHeight: number;
  previewURL: string;
  previewWidth: number;
  tags: string;
  type: string;
  user: string;
  userImageURL: string;
  user_id: number;
  views: string;
  webformatHeight: number;
  webformatURL: string;
  webformatWidth: number;
};

export interface RenderItemProp {
  item: PostT;
  index: number;
}
