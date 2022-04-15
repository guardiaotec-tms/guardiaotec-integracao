import { store } from '../store/configureStore';
import { reset as resetCompany } from '../store/features/company/companySlice';
import { reset as resetAuth } from '../store/features/auth/authSlice';

export const resetStore = () => {
  store.dispatch(resetCompany());
  store.dispatch(resetAuth());
};
