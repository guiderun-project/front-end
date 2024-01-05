import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Locale } from '@/types/locale';

export interface LocaleState {
  locale: Locale;
}

const initialState: LocaleState = {
  locale: Locale.Ko,
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
  },
});

export const { change } = localeSlice.actions;
export default localeSlice.reducer;
