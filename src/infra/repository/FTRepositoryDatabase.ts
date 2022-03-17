import { FT } from './../../domain/entities/FT';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  where,
  query,
} from 'firebase/firestore/lite';
import { db } from './../../firebase/firebase';
import { FTRepository } from '../../domain/repository/FTRepository';

export class FTRepositoryDatabase implements FTRepository {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addFT(FT: FT): Promise<void> {
    const colRef = collection(this.db, 'fts');
    const q = query(colRef, where('Nº da FT', '==', FT.values['Nº da FT']));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0)
      throw new Error('Ficha Técnica com esse número já cadastrada!');

    addDoc(colRef, FT.values);
  }

  async getFTs(): Promise<FT[]> {
    const colRef = collection(this.db, 'fts');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    let fts: FT[] = [];
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      // data['Data de Vigencia Início'] =
      //   data['Data de Vigencia Início'].toDate();
      // data['Data de Vigencia Fim'] = data['Data de Vigencia Fim'].toDate();

      fts.push(new FT(data));
    });
    return fts;
  }
}
