import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompanyState {
  userCompanyId: string;
  adminSelectedCompanyId: string;
  selectedLTU: string;
}

const initialState: CompanyState = {
  userCompanyId: '',
  adminSelectedCompanyId: '',
  selectedLTU: '',
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setUserCompanyId: (state, action: PayloadAction<string>) => {
      const userCompanyId = action.payload;
      state.userCompanyId = userCompanyId;
    },
    setAdminSelectedCompanyId: (state, action: PayloadAction<string>) => {
      const adminSelectedCompanyId = action.payload;
      state.adminSelectedCompanyId = adminSelectedCompanyId;
      state.selectedLTU = '';
    },
    setSelectedLTU: (state, action: PayloadAction<string>) => {
      const selectedLTU = action.payload;
      state.selectedLTU = selectedLTU;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setUserId } = counterSlice.actions;
export const companyActions = companySlice.actions;
export const { setUserCompanyId, setAdminSelectedCompanyId, setSelectedLTU } =
  companyActions;
export default companySlice.reducer;
