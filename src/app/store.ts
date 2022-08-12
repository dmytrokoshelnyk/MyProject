import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const createDebugger = require('redux-flipper').default;

import postReducer from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
  middleware: getDefaultMiddleware => {
    if (__DEV__) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return getDefaultMiddleware().concat(createDebugger());
    }
    return getDefaultMiddleware();
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
