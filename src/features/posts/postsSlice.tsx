import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../../api/client";
import { ErrorResponseT, fetchPostParams, ImageResponseWithPage } from "../../api/client.types";
import { PostT } from "../../screens/List/List.types";

// Define a type for the slice state
interface PostsState {
  data: PostT[];
  error: ErrorResponseT;
  loading: boolean;
  moreLoading: boolean;
  isEndList: boolean;
  total: number;
  page: number;
}

// Define the initial state using that type
const initialState: PostsState = {
  data: [],
  page: 1,
  total: 0,
  error: {},
  loading: false,
  moreLoading: false,
  isEndList: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsLoadingStart: (state, action: PayloadAction<fetchPostParams>) => {
      const isNextPageLoad = action.payload.page !== 1;
      if (isNextPageLoad) {
        state.moreLoading = true;
      } else {
        state.loading = true;
      }
    },
    postsLoadingFinishSuccess: (state, action: PayloadAction<ImageResponseWithPage>) => {
      const isNextPageLoad = action.payload.page !== 1;

      if (isNextPageLoad) {
        state.data = [...state.data, ...action.payload.hits] as PostT[];
        state.page = action.payload.page;
        state.moreLoading = false;
        state.isEndList = state.data.length >= state.total;
      } else {
        state.data = action.payload.hits;
        state.total = action.payload.total;
        state.loading = false;
      }
    },
    postsLoadingFinishError: (state, action: PayloadAction<ErrorResponseT>) => {
      state.error = action.payload;
      state.loading = false;
      state.moreLoading = false;
    },
  },
});

export const {postsLoadingStart, postsLoadingFinishSuccess, postsLoadingFinishError} =
  postsSlice.actions;

export const fetchPosts = (params: fetchPostParams) => (dispatch: Dispatch) => {
  dispatch(postsLoadingStart(params));
  API.getImages(params)
    .then(response =>
      dispatch(
        postsLoadingFinishSuccess({
          ...response,
          page: params.page,
        } as ImageResponseWithPage),
      ),
    )
    .catch(error => dispatch(postsLoadingFinishError(error as ErrorResponseT)));
};

export default postsSlice.reducer;
