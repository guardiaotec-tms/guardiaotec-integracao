import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompanyState {
  userCompanyId: string;
  adminSelectedCompanyId: string;
  selectedLTU: string;
  selectedFTType: 'A' | 'B' | '';
  companyInfo: { nome: string } | null;
}

const initialState: CompanyState = {
  userCompanyId: '',
  adminSelectedCompanyId: '',
  selectedLTU: '',
  selectedFTType: '',
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
    setSelectedFTType: (state, action: PayloadAction<'A' | 'B'>) => {
      const selectedFTType = action.payload;
      state.selectedFTType = selectedFTType;
    },
    setCompanyInfo: (state, action: PayloadAction<any>) => {
      const companyInfo = action.payload;
      state.companyInfo = companyInfo;
    },
    reset: () => {
      return initialState;
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
  setSelectedFTType,
  reset,
} = companyActions;
export default companySlice.reducer;
