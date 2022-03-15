import { Company } from '../entities/Company';

export interface CompanyRepository {
  addCompany(company: Company): Promise<void>;
  getCompanies(): Promise<Company[]>;
}
