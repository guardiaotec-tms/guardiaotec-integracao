import { CompanyAccessType } from './../../../../infra/services/createUserInFirestore';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserData = {
  accessType: CompanyAccessType;
  companyId: string;
};

export interface AuthState {
  userId: string;
  isAdmin: boolean;
  user: UserData | null;
  //   isCompanyAdmin: boolean;
}

const initialState: AuthState = {
  userId: '',
  isAdmin: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.userId = userId;
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      const isAdmin = action.payload;
      state.isAdmin = isAdmin;
    },
    // setIsCompanyAdmin: (state, action: PayloadAction<boolean>) => {
    //   const isCompanyAdmin = action.payload;
    //   state.isCompanyAdmin = isCompanyAdmin;
    // },
    setUser: (state, action: PayloadAction<UserData | null>) => {
      const user = action.payload;
      state.user = user;
    },
    reset: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setUserId } = counterSlice.actions;
export const authActions = authSlice.actions;
export const { setUserId, setIsAdmin, setUser, reset } = authActions;
export default authSlice.reducer;
