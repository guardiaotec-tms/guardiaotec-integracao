import { authActions } from './../features/auth/authSlice';
import { driversActions } from './../features/drivers/driversSlice';

export const actionCreators = {
  ...authActions,
  ...driversActions,
};
