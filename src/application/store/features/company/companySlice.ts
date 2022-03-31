import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompanyState {
  companyId: string;
  adminFilterCompanyId: string;
}

const initialState: CompanyState = {
  companyId: '',
  adminFilterCompanyId: '',
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyId: (state, action: PayloadAction<string>) => {
      const companyId = action.payload;
      state.companyId = companyId;
    },
    setAdminFilterCompanyId: (state, action: PayloadAction<string>) => {
      const adminFilterCompanyId = action.payload;
      state.adminFilterCompanyId = adminFilterCompanyId;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setUserId } = counterSlice.actions;
export const companyActions = companySlice.actions;
export const { setCompanyId, setAdminFilterCompanyId } = companyActions;
export default companySlice.reducer;
