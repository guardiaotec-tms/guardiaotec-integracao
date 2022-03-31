import { store } from './../store/configureStore';

export const canRegister = () => {
  const state = store.getState();
  const { isAdmin, user } = state.auth;
  const adminSelectedCompanyId = state.companies.adminSelectedCompanyId;

  if (isAdmin) {
    return adminSelectedCompanyId !== 'Todas' && adminSelectedCompanyId !== '';
  } else {
    console.log(user);
    const isCompanyAdmin = user?.accessType === 'Administrador';
    return isCompanyAdmin;
  }
};
