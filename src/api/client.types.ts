import {PostT} from '../screens/List/List.types';

export type requestParamsT = {
  key: string;
  q?: string;
  lang?: string;
  id?: string;
  image_type?: string;
  orientation?: 'all' | 'horizontal' | 'vertical';
  category?: string;
  min_width?: number;
  min_height?: number;
  colors?: string;
  editors_choice?: boolean;
  safesearch?: boolean;
  order?: string;
  page?: number;
  per_page?: number;
  callback?: string;
  pretty?: boolean;
};

export type fetchPostParams = Omit<requestParamsT, 'key'>;

export type ImageResponse = {
  hits: PostT[];
  total: number;
  totalHits: number;
};

export interface ImageResponseWithPage extends ImageResponse {
  page: number;
}

export type ErrorResponseT = {
  message?: string;
};
