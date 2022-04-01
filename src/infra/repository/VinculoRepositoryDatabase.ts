import { Vinculo } from './../../domain/entities/Vinculo';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  where,
  query,
  DocumentData,
  Query,
  collectionGroup,
} from 'firebase/firestore';
import { db } from './../../firebase/firebase';
import { VinculoRepository } from '../../domain/repository/VinculoRepository';

export class VinculoRepositoryDatabase {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addVinculo(vinculo: Vinculo, companyId: string): Promise<void> {
    const colRef = collection(this.db, `companies/${companyId}/vinculos`);
    // // const q = query(colRef, where('Placa', '==', Vinculo.values.Placa));
    // const q = query(colRef);
    // const querySnapshot = await getDocs(q);

    // if (querySnapshot.docs.length > 0)
    //   throw new Error('Itinerário já cadastrado!');

    addDoc(colRef, vinculo.values);
  }

  async getVinculos(): Promise<Vinculo[]> {
    const colRef = collection(this.db, 'vinculos');
    return this.getVinculosFromQuery(colRef);
  }

  async getVinculosFromQuery(query: Query<DocumentData>) {
    const querySnapshot = await getDocs(query);
    let vinculos: Vinculo[] = [];
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      vinculos.push(new Vinculo(data));
    });
    return vinculos;
  }

  async getVinculosFromCompanyId(companyId: string) {
    const colRef = collection(this.db, `companies/${companyId}/vinculos`);
    return this.getVinculosFromQuery(colRef);
  }

  async adminGetAllVinculos() {
    const group = collectionGroup(this.db, 'vinculos');
    return this.getVinculosFromQuery(group);
  }
}
