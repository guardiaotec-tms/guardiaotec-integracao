import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompanyState {
  userCompanyId: string;
  adminSelectedCompanyId: string;
  selectedLTU: string;
  companyInfo: { nome: string } | null;
}

const initialState: CompanyState = {
  userCompanyId: '',
  adminSelectedCompanyId: '',
  selectedLTU: '',
  companyInfo: null,
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
    setCompanyInfo: (state, action: PayloadAction<any>) => {
      const companyInfo = action.payload;
      state.companyInfo = companyInfo;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setUserId } = counterSlice.actions;
export const companyActions = companySlice.actions;
export const {
  setUserCompanyId,
  setAdminSelectedCompanyId,
  setSelectedLTU,
  setCompanyInfo,
} = companyActions;
export default companySlice.reducer;
