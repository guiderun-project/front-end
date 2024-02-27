import { userInfoGetResponse } from '@/apis/types/info';
import {
  DisabilityEnum,
  GenderEnum,
  RoleEnum,
  RunningGroup,
} from '@/types/group';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: userInfoGetResponse = {
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
    setUserInfo: (state, action: PayloadAction<userInfoGetResponse>) => {
      state = action.payload;
    },
    updateInfo: (
      state,
      action: PayloadAction<Partial<userInfoGetResponse>>,
    ) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
    resetUserInfo: (state) => {
      state = initialState;
    },
  },
});

export const { resetUserInfo, setUserInfo, updateInfo } = userSlice.actions;
export default userSlice.reducer;
