import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducer/auth';
import localeReducer from './reducer/locale';
import userReducer from './reducer/user';

export const store = configureStore({
  reducer: { locale: localeReducer, auth: authReducer, user: userReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
