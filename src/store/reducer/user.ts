import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserInfoGetResponse } from '@/apis/types/info';
import {
  DisabilityEnum,
  GenderEnum,
  RoleEnum,
  RunningGroup,
} from '@/types/group';

const initialState: UserInfoGetResponse = {
  userId: '',
  gender: GenderEnum.M,
  age: 0,
  name: '',
  phoneNumber: '',
  recordDegree: RunningGroup.P,
  role: RoleEnum.New,
  snsId: '',
  type: DisabilityEnum.GUIDE,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoGetResponse>) => {
      state = action.payload;
      return state;
    },
    updateInfo: (
      state,
      action: PayloadAction<Partial<UserInfoGetResponse>>,
    ) => {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
    resetUserInfo: (state) => {
      state = { ...initialState };
      return state;
    },
  },
});

export const { setUserInfo, updateInfo } = userSlice.actions;
export default userSlice.reducer;
