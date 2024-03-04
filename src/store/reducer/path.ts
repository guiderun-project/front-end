import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Path {
  prevPath: string | null;
}

const initialState: Path = {
  prevPath: null,
};

export const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPrevPath: (state, action: PayloadAction<string>) => {
      state.prevPath = action.payload;
    },
    resetPrevPath: (state) => {
      state.prevPath = initialState.prevPath;
    },
  },
});

export const { setPrevPath, resetPrevPath } = pathSlice.actions;
export default pathSlice.reducer;
