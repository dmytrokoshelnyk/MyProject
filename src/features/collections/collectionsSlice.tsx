import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {API} from '../../api/client';
import {ErrorResponseT, fetchPostParams, ImageResponseWithPage} from '../../api/client.types';
import {PostT} from '../../screens/List/List.types';
import { CollectionT } from "../../api/pexels.types";

// Define a type for the slice state
interface CollectionsState {
  data: CollectionT[];
  loading: boolean;
  loadingMore: boolean;
}

// Define the initial state using that type
const initialState: CollectionsState = {
  data: [],
  loading: false,
  loadingMore: false,
};

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    postsLoadingStart: (state, action: PayloadAction<fetchPostParams>) => {
      const isNextPageLoad = action.payload.page !== 1;
      if (isNextPageLoad) {
        state.loadingMore = true;
      } else {
        state.loading = true;
      }
    },
  },
});

export const {postsLoadingStart} = collectionsSlice.actions;

export const fetchCollections = (params: fe)

export const collectionsReducer = collectionsSlice.reducer;
