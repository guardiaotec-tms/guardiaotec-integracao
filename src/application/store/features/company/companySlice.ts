import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompanyState {
  companyId: string;
}

const initialState: CompanyState = {
  companyId: '',
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyId: (state, action: PayloadAction<string>) => {
      const companyId = action.payload;
      state.companyId = companyId;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setUserId } = counterSlice.actions;
export const companyActions = companySlice.actions;
export const { setCompanyId } = companyActions;
export default companySlice.reducer;
