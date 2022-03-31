import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  userId: string;
  isAdmin: boolean;
}

const initialState: AuthState = {
  userId: '',
  isAdmin: false,
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
  },
});

// Action creators are generated for each case reducer function
// export const { setUserId } = counterSlice.actions;
export const authActions = authSlice.actions;
export const { setUserId, setIsAdmin } = authActions;
export default authSlice.reducer;
