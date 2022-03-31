import { store } from '../configureStore';
import { setAdminSelectedCompanyId } from '../features/company/companySlice';

export const dispatchSetAdminSelectedCompanyId = (companyId: string) => {
  store.dispatch(setAdminSelectedCompanyId(companyId));
};
