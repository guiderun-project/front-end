import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AccessToken {
  accessToken: string | null;
}

const initialState: AccessToken = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    resetAccessToken: (state) => {
      state.accessToken = initialState.accessToken;
    },
  },
});

export const { setAccessToken, resetAccessToken } = authSlice.actions;
export default authSlice.reducer;
