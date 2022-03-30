import { CompanyRepositoryDatabase } from '../repository/CompanyRepositoryDatabase';

export const fetchCompanies = async (setCompanies: any) => {
  const repo = new CompanyRepositoryDatabase();
  const companies = await repo.getCompanies();
  setCompanies(companies);
};
