import { store } from './../../application/store/configureStore';

export const getCurrentRelatedCompanyId = async (): string => {
  const { user, isAdmin } = store.getState().auth;
  const { adminSelectedCompanyId, userCompanyId } = store.getState().companies;

  if (isAdmin && adminSelectedCompanyId) {
    if (adminSelectedCompanyId === 'Todas') return;
    return adminSelectedCompanyId;
  } else if (!isAdmin && userCompanyId) {
    return userCompanyId;
  }
};
