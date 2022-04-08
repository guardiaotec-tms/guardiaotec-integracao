import { store } from './../store/configureStore';

export const canRegister = () => {
  const state = store.getState();
  const { isAdmin, user } = state.auth;
  const adminSelectedCompanyId = state.companies.adminSelectedCompanyId;

  if (isAdmin) {
    return adminSelectedCompanyId !== 'Todas' && adminSelectedCompanyId !== '';
  } else {
    const isCompanyAdmin = user?.accessType === 'Administrador';
    const isCompanyEditor = user?.accessType === 'Editor';
    return isCompanyAdmin || isCompanyEditor;
  }
};
