import { store } from '../configureStore';
import {
  setAdminSelectedCompanyId,
  setSelectedLTU,
} from '../features/company/companySlice';

export const dispatchSetAdminSelectedCompanyId = (companyId: string) => {
  store.dispatch(setAdminSelectedCompanyId(companyId));
};

export const dispatchSetSelectedLTU = (LTU: string) => {
  store.dispatch(setSelectedLTU(LTU));
};
