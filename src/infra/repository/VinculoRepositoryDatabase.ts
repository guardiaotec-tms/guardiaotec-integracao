import { Vinculo } from './../../domain/entities/Vinculo';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  where,
  query,
} from 'firebase/firestore/lite';
import { db } from './../../firebase/firebase';
import { VinculoRepository } from '../../domain/repository/VinculoRepository';

export class VinculoRepositoryDatabase implements VinculoRepository {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addVinculo(vinculo: Vinculo): Promise<void> {
    const colRef = collection(this.db, 'vinculos');
    // // const q = query(colRef, where('Placa', '==', Vinculo.values.Placa));
    // const q = query(colRef);
    // const querySnapshot = await getDocs(q);

    // if (querySnapshot.docs.length > 0)
    //   throw new Error('Itinerário já cadastrado!');

    addDoc(colRef, vinculo.values);
  }

  async getVinculos(): Promise<Vinculo[]> {
    const colRef = collection(this.db, 'vinculos');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    let vinculos: Vinculo[] = [];
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      vinculos.push(new Vinculo(data));
    });
    return vinculos;
  }
}
