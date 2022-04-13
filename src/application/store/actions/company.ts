import { store } from '../configureStore';
import {
  setAdminSelectedCompanyId,
  setSelectedLTU,
  setSelectedFTType,
} from '../features/company/companySlice';

export const dispatchSetAdminSelectedCompanyId = (companyId: string) => {
  store.dispatch(setAdminSelectedCompanyId(companyId));
};

export const dispatchSetSelectedLTU = (LTU: string) => {
  store.dispatch(setSelectedLTU(LTU));
};

export const dispatchSetSelectedFTType = (ftType: 'A' | 'B') => {
  store.dispatch(setSelectedFTType(ftType));
};
