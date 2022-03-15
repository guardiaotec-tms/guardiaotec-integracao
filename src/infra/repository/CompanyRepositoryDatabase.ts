import {
  Firestore,
  where,
  collection,
  query,
  getDocs,
  addDoc,
} from 'firebase/firestore/lite';
import { Company } from '../../domain/entities/Company';
import { db } from '../../firebase/firebase';
import { CompanyRepository } from './../../domain/repository/CompanyRepository';

export class CompanyRepositoryDatabase implements CompanyRepository {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addCompany(company: Company): Promise<void> {
    const colRef = collection(this.db, 'companies');
    const q = query(colRef, where('CNPJ', '==', company.values.CNPJ));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0)
      throw new Error('Transportadora com este CNPJ já foi cadastrada!');

    await addDoc(colRef, company.values);
  }

  async getCompanies(): Promise<Company[]> {
    throw new Error('Method not implemented.');
  }
}
