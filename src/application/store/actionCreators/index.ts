import { authActions } from './../features/auth/authSlice';
import { companyActions } from './../features/company/companySlice';
import { driversActions } from './../features/drivers/driversSlice';

export const actionCreators = {
  ...authActions,
  ...companyActions,
  ...driversActions,
};
