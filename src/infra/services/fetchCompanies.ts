import { CompanyRepositoryDatabase } from '../repository/CompanyRepositoryDatabase';
import { store } from './../../application/store/configureStore';

export const fetchCompanies = async (setCompanies: any) => {
  const { user, isAdmin } = store.getState().auth;
  const { adminSelectedCompanyId, userCompanyId } = store.getState().companies;
  const repo = new CompanyRepositoryDatabase();

  if (isAdmin) {
    const companies = await repo.adminGetAllCompanies();
    setCompanies(companies);
  } else if (!isAdmin && userCompanyId) {
    const company = await repo.getCompanyFromId(userCompanyId!);
    setCompanies([company]);
  }
};
