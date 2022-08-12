import Config from 'react-native-config';

import {ErrorResponseT, ImageResponse, requestParamsT} from './client.types';

const PIXABAY_URL = 'https://pixabay.com/api/';
const PER_PAGE = 10;
const API_KEY = Config.API_KEY;

let instance: _ApiClient | null = null;

class _ApiClient {
  API_URL: string;
  API_KEY: string;

  constructor(API_URL: string, API_KEY: string) {
    if (!instance) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      instance = this;
    }
    this.API_URL = API_URL;
    this.API_KEY = API_KEY;

    return instance;
  }

  getImages = ({category = 'backgrounds', page = 1}): Promise<ImageResponse | ErrorResponseT> => {
    const params = {
      category,
      page: page.toString(),
      per_page: PER_PAGE.toString(),
      key: this.API_KEY,
    };

    const query = new URLSearchParams(params).toString();
    console.log('-----------Config.API_KEY', Config.API_KEY);
    console.log('query', query);
    const url = this.API_URL + '?' + query;
    console.log('url', url);
    return fetch(url).then(res => res.json() as unknown as ImageResponse);
  };
}

export const API = new _ApiClient(PIXABAY_URL, API_KEY);
