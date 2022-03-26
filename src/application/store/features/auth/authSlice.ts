import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  userId: string;
}

const initialState: AuthState = {
  userId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.userId = userId;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setUserId } = counterSlice.actions;
export const authActions = authSlice.actions;
export const { setUserId } = authActions;
export default authSlice.reducer;
