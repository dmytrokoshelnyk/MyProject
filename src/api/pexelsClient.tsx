import Config from 'react-native-config';

import {ErrorResponseT, ImageResponse, requestParamsT} from './client.types';
import {getCollectionsPropsT, getCollectionsResponseT} from './pexels.types';

const PEXELS_URL = 'https://api.pexels.com/v1/';
const PER_PAGE = 10;
const API_KEY = Config.API_PEXELS;

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

  getCollections = (params: getCollectionsPropsT): Promise<getCollectionsResponseT> => {
    console.log(params);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const query = new URLSearchParams(params).toString();
    const url = this.API_URL + '?' + query;
    return fetch(url).then(response => response.json() as unknown as getCollectionsResponseT);
  };
}

export const PexelsAPI = new _ApiClient(PEXELS_URL, API_KEY);
