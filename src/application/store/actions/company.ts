import { store } from '../configureStore';
import { setAdminFilterCompanyId } from '../features/company/companySlice';

export const dispatchSetAdminFilterCompanyId = (companyId: string) => {
  store.dispatch(setAdminFilterCompanyId(companyId));
};
